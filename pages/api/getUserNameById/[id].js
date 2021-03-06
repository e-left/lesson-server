import prisma from '../../../utils/db';
import cors from "../../../utils/corsHandler";

export default async function handler(req, res) {
    await cors(req, res);

    if (req.method !== "GET") {
        return res.status(400).json({ status: "error", data: { error: "Method not supported" } });
    }

    const { id } = req.query;

    let user = await prisma.user.findMany({
        where: {
            id: parseInt(id)
        }
    });

    return res.status(200).json({ status: "success", name: user[0].name });
}
