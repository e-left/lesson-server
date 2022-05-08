import cors from "../../../../utils/corsHandler";
import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
    await cors(req, res);
    const prisma = new PrismaClient();

    const { query } = req.query;

    if (req.method !== "GET") {
        return res.status(400).json({ status: "error", data: { error: "Method not supported" } });
    }

    if (query === "") {
        return res.status(400).json({ status: "error", data: { error: "No search string supplied" } });
    }

    const translations = await prisma.ancient_translations.findMany({
        orderBy: [
            {
                chapter: "asc",
            },
        ],
        where: {
            title : {
                contains: query,
            }
        }
    });

    const count = translations.length;

    return res.status(200).json({ status: "success", data: translations, count: count });

}