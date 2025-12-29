import * as XLSX from "xlsx";
import ExcelJS from "exceljs";
import type {Customer} from "$lib/types/models.js";
import {createCustomer, formatCustomer} from "$lib/utils/customer.utils.js";
import {rateLimit} from "$lib/utils/async.utils.js";

type ImportError = {
    sheetName?: string;
    rowIndex?: number;
    message: string;
};

export type ImportResult = {
    createdSheets: number;
    createdCustomers: number;
    errors: ImportError[];
};

export async function importXlsData(event: Event): Promise<ImportResult> {
    const result: ImportResult = {
        createdSheets: 0,
        createdCustomers: 0,
        errors: []
    };

    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (!file) {
        result.errors.push({
            message: "Une erreur est survenue lors de l'importation du fichier"
        });
        return result;
    }

    const arrayBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer);

    for (const sheetName of workbook.SheetNames) {
        const worksheet = workbook.Sheets[sheetName];
        const jsonRows: Record<string, any>[] = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

        let sheetId: string | null = null;

        try {
            const res = await fetch("/api/sheets", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: sheetName,
                    description: `Import Excel — ${sheetName}`,
                    customerIds: []
                })
            });

            if (!res.ok) throw new Error(await res.text());

            const data = await res.json();
            sheetId = data.sheet.id;

            result.createdSheets++;

        } catch (err: any) {
            result.errors.push({
                sheetName,
                message: `Impossible de créer le sheet "${sheetName}": ${err.message}`
            });
            continue;
        }

        const tasks = jsonRows.map((row, i) => async () => {
            const dto = formatCustomer(row);
            let res: Response | null = null;

            if (sheetId !== null) {
                res = await createCustomer(dto, sheetId);
            } else {
                result.errors.push({
                    message: `La variable sheetId est nulle`
                })
            }

            if (res !== null && !res.ok) {
                throw new Error(await res.text());
            }

            return true;
        });

        const results = await rateLimit(tasks, 3, (fn) => fn());

        results.forEach((r, i) => {
            if (typeof r !== "boolean" && "error" in r) {
                result.errors.push({
                    sheetName,
                    rowIndex: i,
                    message: `Erreur ligne ${i + 1}: ${r.error?.message ?? r.error}`
                });
            } else {
                result.createdCustomers++;
            }
        });
    }
    return result;
}

export const exportXlsData = async (sheets: Array<{label: string, value: string}>) => {
    const workbook = new ExcelJS.Workbook();
    const now = new Date();
    const timestamp = `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()}`;

    for (const sheet of sheets) {
        try {
            const response = await fetch(`/api/sheets/${sheet.value}/customers`);
            if (!response.ok) {
                console.error(`Erreur lors de la récupération des customers pour ${sheet.label}`);
                continue;
            }

            const data = await response.json();
            const customers: Customer[] = data.customers || [];

            if (customers.length === 0) {
                console.warn(`Aucun customer trouvé pour ${sheet.label}`);
                continue;
            }

            const customersData = customers.map(customer => {
                let formattedDate = '';
                if (customer.lastCommunication) {
                    const date = new Date(customer.lastCommunication);
                    formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
                }

                return {
                    'Nom': customer.name || '',
                    'Type': customer.type || '',
                    'Type de contenant': customer.containerType || '',
                    'Priorité': customer.priority || '',
                    'Statut': customer.status || '',
                    'Adresses': customer.addresses?.join('\n') || '',
                    'Dernière communication': formattedDate,
                    'Commentaires': customer.comments?.join('\n') || '',
                    'Contacts': customer.contacts?.join('\n') || '',
                    ...customer.otherData
                };
            });

            const worksheet = workbook.addWorksheet(sheet.label);

            const headers = Object.keys(customersData[0] || {});
            worksheet.columns = headers.map(header => ({
                header: header,
                key: header,
                width: 10
            }));

            customersData.forEach(row => {
                worksheet.addRow(row);
            });

            const headerRow = worksheet.getRow(1);
            headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
            headerRow.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FF15803d' }
            };
            headerRow.alignment = { horizontal: 'center', vertical: 'middle' };
            headerRow.height = 20;

            worksheet.columns.forEach((column, index) => {
                let maxWidth = headers[index].length;

                customersData.forEach(row => {
                    const value = String(row[headers[index] as keyof typeof row] || '');
                    const lines = value.split('\n');
                    const maxLineLength = Math.max(...lines.map(line => line.length));
                    maxWidth = Math.max(maxWidth, maxLineLength);
                });

                column.width = Math.min(maxWidth + 2, 50);
            });

        } catch (error) {
            console.error(`Erreur lors de l'export de ${sheet.label}:`, error);
        }
    }

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `CLIENTS_${timestamp}.xlsx`;
    link.click();
    window.URL.revokeObjectURL(url);
}
