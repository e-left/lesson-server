import cors from "../../../utils/corsHandler";
import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
    await cors(req, res);
    const prisma = new PrismaClient();

    if (req.method !== "GET") {
        return res.status(400).json({ status: "error", data: { error: "Method not supported" } });
    }

    const sosTheory = await prisma.chem_sos_theory.findMany({});

    return res.status(200).json({ status: "success", data: sosTheory, count: sosTheory.length });

}
