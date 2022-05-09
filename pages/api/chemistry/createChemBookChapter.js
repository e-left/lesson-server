import prisma from '../../../utils/db';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
    // authenticated route
    const session = await getSession({ req });
    if (!session || (session.user.permissions !== "all" && session.user.permissions !== "chem")) {
        return res.status(401).send();
    }

    const { title, taksh, main_content } = req.body;

    if (req.method !== "POST") {
        return res.status(400).json({ status: "error", data: { error: "Method not supported" } });
    }

    if (title === "" || main_content === "" || taksh === "") {
        return res.status(500).json({ status: "error", data: { error: "Fields cannot be null" } });
    }

    const existingBookChapter = await prisma.chem_book_chapters.findFirst({
        where: {
            main_content: main_content
        }
    });

    if (existingBookChapter !== null) {
        return res.status(400).json({ status: "error", data: { error: "Book Chapter already exists" } });
    }

    const newBookChapter = await prisma.chem_book_chapters.create({
        data: {
            title: title,
            taksh: taksh,
            main_content: main_content,
            userid: session.user.id
        }
    });

    return res.status(201).json({ status: "success", data: { id: newBookChapter.id, createdAt: newBookChapter.createdAt } });
}
