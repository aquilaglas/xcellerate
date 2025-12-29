import {browser} from "$app/environment";
import {goto} from "$app/navigation";

export const goBackCustomers = ()=>  {
    if (browser && window.history.length > 1) {
        window.history.back();
    } else {
        goto('/customers');
    }
}
