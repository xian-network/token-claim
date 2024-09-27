import { json } from "@sveltejs/kit";
import { isNotSigned } from "$lib/server/db/action";

export const POST = async ({ request }) => {
    const { bscAddress } = await request.json();
    const result = await isNotSigned(bscAddress).catch((err) => {
        return json(err, { status: 400 });
    });
    return json(result, { status: 200 });
};
