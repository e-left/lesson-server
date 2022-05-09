import prisma from '../../../utils/db';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
    // authenticated route
    const session = await getSession({ req });
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

    const existingTheory = await prisma.maths_sos_theory.findFirst({
        where: {
            main_content: main_content
        }
    });

    if (existingTheory !== null) {
        return res.status(400).json({ status: "error", data: { error: "Theory already exists" } });
    }

    const newTheory = await prisma.maths_sos_theory.create({
        data: {
            taksh: taksh,
            main_content: main_content,
            userid: session.user.id
        }
    });

    return res.status(201).json({ status: "success", data: { id: newTheory.id, createdAt: newTheory.createdAt } });
}
