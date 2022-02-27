import prisma from '../../../utils/db';
import cors from "../../../utils/corsHandler";

export default async function handler(req, res) {
    await cors(req, res);

    if (req.method !== "GET") {
        return res.status(400).json({ status: "error", data: { error: "Method not supported" } });
    }

    const theory = await prisma.maths_sos_theory.findMany({});

    return res.status(200).json({ status: "success", data: theory });

}
