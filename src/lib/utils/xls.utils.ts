import * as XLSX from "xlsx";
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

export const exportXlsData = (customers: Customer[]) => {
    const customersData = customers.map(customer => (
        {
        'Nom': customer.name || '',
        'Type': customer.type || '',
        'Type de contenant': customer.containerType || '',
        'Priorité': customer.priority || '',
        'Statut': customer.status || '',
        'Adresses': customer.addresses?.join('\n') || '',
        'Dernière communication': customer.lastCommunication || '',
        'Commentaires': customer.comments?.join('\n') || '',
            //TODO: refaire les contacts
        'Contacts': customer.contacts?.join('\n') || '',
        ...customer.otherData
    }));

    const workbook = XLSX.utils.book_new();

    const customersSheet = XLSX.utils.json_to_sheet(customersData);
    XLSX.utils.book_append_sheet(workbook, customersSheet, 'Customers');

    const timestamp = new Date().toISOString().split('T')[0];
    XLSX.writeFile(workbook, `CLIENTS_${timestamp}.xlsx`);
}
