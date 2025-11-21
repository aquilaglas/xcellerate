import { json, type RequestHandler } from "@sveltejs/kit";

export const DELETE: RequestHandler = async ({ locals }) => {
    if (!locals.user) {
        return json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = locals.user.id;

    try {
        const { error: custError } = await locals.supabase
            .from("customers")
            .delete()
            .eq("user_id", userId);

        if (custError) {
            return json({ error: custError.message }, { status: 400 });
        }

        const { error: sheetError } = await locals.supabase
            .from("sheets")
            .delete()
            .eq("user_id", userId);

        if (sheetError) {
            return json({ error: sheetError.message }, { status: 400 });
        }

        return json({ message: "All user data removed" }, { status: 200 });

    } catch (error) {
        return json({ error: "Server error while cleaning data" }, { status: 500 });
    }
};
