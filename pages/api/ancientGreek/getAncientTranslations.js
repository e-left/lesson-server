import prisma from '../../../utils/db';
import cors from "../../../utils/corsHandler";

export default async function handler(req, res) {
    await cors(req, res);

    if (req.method !== "GET") {
        return res.status(400).json({ status: "error", data: { error: "Method not supported" } });
    }

    const translations = await prisma.ancient_translations.findMany({
        // orderBy: [
        //     {
        //         chapter: "asc",
        //     },
        // ],
    });

    return res.status(200).json({ status: "success", data: translations });

}
