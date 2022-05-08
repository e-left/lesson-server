import cors from "../../../../utils/corsHandler";
import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
    await cors(req, res);
    const prisma = new PrismaClient();

    const { taksh } = req.query;

    if (req.method !== "GET") {
        return res.status(400).json({ status: "error", data: { error: "Method not supported" } });
    }

    if (taksh === "") {
        return res.status(400).json({ status: "error", data: { error: "No class supplied" } });
    }

    const curriculum = await prisma.maths_curriculum.findMany({
        where: {
            taksh: {
                lte: taksh
            }
        }
    });

    return res.status(200).json({ status: "success", data: curriculum });
}