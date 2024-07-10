import { json } from "@sveltejs/kit";
import { participantTokenAmount } from "$lib/server/db/action";

export const POST = async ({ request }) => {
    const { truncBscWallet } = await request.json();
    const result = await participantTokenAmount(truncBscWallet).catch((err) => {
        return json(err, { status: 400 });
    });
    return json(result, { status: 200 });
};
