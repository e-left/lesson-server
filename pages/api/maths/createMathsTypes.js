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

    const existingType = await prisma.maths_types.findFirst({
        where: {
            main_content: main_content
        }
    });

    if (existingType !== null) {
        return res.status(400).json({ status: "error", data: { error: "Type already exists" } });
    }

    const newType = await prisma.maths_type.create({
        data: {
            taksh: taksh,
            main_content: main_content
        }
    });

    return res.status(201).json({ status: "success", data: { id: newType.id, createdAt: newType.createdAt } });
}
