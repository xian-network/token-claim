import { json } from "@sveltejs/kit";
import { recordData } from "$lib/server/db/action";

export const POST = async ({ request }) => {
    const { bscWallet, xianWallet, signature, agreedToTerms } =
        await request.json();
    const result = await recordData(
        bscWallet,
        xianWallet,
        signature,
        agreedToTerms,
    ).catch((err) => {
        return json(err, { status: 400 });
    });
    return json(result, { status: 200 });
};
