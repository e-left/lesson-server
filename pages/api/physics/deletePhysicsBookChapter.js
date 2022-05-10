import prisma from '../../../utils/db';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
    // authenticated route
    const session = await getSession({ req });
    if (!session || (session.user.permissions !== "all" && session.user.permissions !== "physics")) {
        return res.status(401).send();
    }

    const { id } = req.body;

    if (req.method !== "DELETE") {
        return res.status(400).json({ status: "error", data: { error: "Method not supported" } });
    }

    if (id === "") {
        return res.status(500).json({ status: "error", data: { error: "Id cannot be null" } });
    }

    const existingBookChapter = await prisma.physics_book_chapters.findFirst({
        where: {
            id: id
        }
    });

    if (existingBookChapter === null) {
        return res.status(400).json({ status: "error", data: { error: "Book Chapter does not exist" } });
    }

    await prisma.physics_book_chapters.delete({
        where: {
            id: id
        }
    });

    return res.status(200).send();
}
