import prisma from '../../../utils/db';

export default async function handler(req, res) {
    const {category} = req.query;

    if (req.method !== "GET") {
        return res.status(400).json({ status: "error", data: { error: "Method not supported" } });
    }

    if (category === "") {
        return res.status(400).json({status:"error", data: {error: "No category supplied"}});
    }

    const words = await prisma.ancient_words.findMany({
        where: {
            category: category
        }
    });

    return res.status(200).json({ status: "success", data: words});

}