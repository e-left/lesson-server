import { getSession } from 'next-auth/react';
import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
    // authenticated route
    const session = await getSession({ req });
    const prisma = new PrismaClient();
    if (!session || (session.user.permissions !== "all" && session.user.permissions !== "maths")) {
        return res.status(401).send();
    }

    const { taksh, main_content } = req.body;

    if (req.method !== "POST") {
        return res.status(400).json({ status: "error", data: { error: "Method not supported" } });
    }

    if (taksh === "" || main_content === "") {
        return res.status(500).json({ status: "error", data: { error: "Fields cannot be null " } });
    }

    const existingProof = await prisma.maths_proofs.findFirst({
        where: {
            main_content: main_content
        }
    });

    if (existingProof !== null) {
        return res.status(400).json({ status: "error", data: { error: "Proof already exists" } });
    }

    const newProof = await prisma.maths_proofs.create({
        data: {
            taksh: taksh,
            main_content: main_content,
            userid: session.user.id
        }
    });

    return res.status(201).json({ status: "success", data: { id: newProof.id, createdAt: newProof.createdAt } });
}
