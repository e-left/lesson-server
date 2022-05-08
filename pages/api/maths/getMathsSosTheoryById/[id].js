import cors from "../../../../utils/corsHandler";
import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
    await cors(req, res);
    const prisma = new PrismaClient();
    const {id} = req.query;

    if (req.method !== "GET") {
        return res.status(400).json({ status: "error", data: { error: "Method not supported" } });
    }

    const theory = await prisma.maths_sos_theory.findMany({
        where: {
            id: parseInt(id)
        }
    });

    return res.status(200).json({ status: "success", data: theory });

}