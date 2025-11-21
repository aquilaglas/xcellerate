import type {OtherData} from "$lib/types/models.js";

export type CustomerCreateDTO = {
    name: string;
    addresses: string[];
    type: string;
    contacts: string[];
    containerType: string;
    status: string;
    lastCommunication: string | null;
    priority: string;
    comments: string[];
    otherData: OtherData;
};
