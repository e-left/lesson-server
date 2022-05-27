import prisma from '../../../../utils/db';
import cors from "../../../../utils/corsHandler";

export default async function handler(req, res) {
    await cors(req, res);

    const { type } = req.query;

    if (req.method !== "GET") {
        return res.status(400).json({ status: "error", data: { error: "Method not supported" } });
    }

    if (type === "") {
        return res.status(400).json({ status: "error", data: { error: "No type supplied" } });
    }

    const element = await prisma.chem_element.findMany({
        where: {
            typos: type
            }
    });

    return res.status(200).json({ status: "success", data: element });
}