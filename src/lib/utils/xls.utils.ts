import * as XLSX from "xlsx";
import type {Customer} from "$lib/types/customer.types.js";
import {createCustomer, formatCustomer} from "$lib/utils/customer.utils.js";
import type {Row, SheetData} from "$lib/types/xls.types.js";
import {StatusEnum} from "$lib/enums/status.enum.js";

export const importXlsData = async (event: Event): Promise<StatusEnum> => {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (!file) return StatusEnum.ERROR;

    const workbook = XLSX.read(await file.arrayBuffer(), {type: "array"});

    for (const sheetName of workbook.SheetNames) {
        const sheet = workbook.Sheets[sheetName];
        const jsonSheet = XLSX.utils.sheet_to_json<Record<string, any>>(sheet, {defval: null});
        if (jsonSheet.length === 0) throw new Error("Le fichier Excel est vide ou mal formaté.");

        if (!(await formatSheetAndSaveData(sheetName, jsonSheet))) {
            return StatusEnum.ERROR;
        }
    }

    return StatusEnum.SUCCESS;
};

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

async function formatSheetAndSaveData(sheetName: string, jsonSheet: SheetData) {
    switch (sheetName) {
        default:
            for (const row of jsonSheet) {
                const customer: Customer = formatCustomer(row as Row);
                const res = await createCustomer(customer);
                if (!res.ok) {
                    return false
                }
            }
            break;
    }
    return true
}
