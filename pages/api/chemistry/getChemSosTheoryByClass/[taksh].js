import prisma from '../../../../utils/db';
import cors from "../../../../utils/corsHandler";

export default async function handler(req, res) {
    await cors(req, res);

    const { taksh } = req.query;

    if (req.method !== "GET") {
        return res.status(400).json({ status: "error", data: { error: "Method not supported" } });
    }

    if (taksh === "") {
        return res.status(400).json({ status: "error", data: { error: "No class supplied" } });
    }

    const sos_theory = await prisma.chem_sos_theory.findMany({
        where: {
            taksh: {
                lte: taksh
            }
        }
    });

    return res.status(200).json({ status: "success", data: sos_theory });
}