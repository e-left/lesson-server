import prisma from '../../../utils/db';

export default async function handler(req, res) {
    const { query } = req.query;

    if (req.method !== "GET") {
        return res.status(400).json({ status: "error", data: { error: "Method not supported" } });
    }

    if (query === "") {
        return res.status(400).json({ status: "error", data: { error: "No search string supplied" } });
    }

    const words = await prisma.ancient_words.findMany({
        orderBy: [
            {
                title: "asc",
            },
        ],
        where: {
            title : {
                contains: query,
            }
        }
    });

    return res.status(200).json({ status: "success", data: words });

}