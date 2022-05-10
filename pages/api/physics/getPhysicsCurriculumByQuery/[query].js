import prisma from '../../../../utils/db';
import cors from "../../../../utils/corsHandler";

export default async function handler(req, res) {
    await cors(req, res);

    const { query } = req.query;

    if (req.method !== "GET") {
        return res.status(400).json({ status: "error", data: { error: "Method not supported" } });
    }

    if (query === "") {
        return res.status(400).json({ status: "error", data: { error: "No search string supplied" } });
    }

    const curriculum = await prisma.physics_curriculum.findMany({
        where: {
            main_content : {
                contains: query,
            }
        }
    });

    return res.status(200).json({ status: "success", data: curriculum, count: curriculum.length });

}