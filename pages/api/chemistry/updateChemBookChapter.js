import prisma from '../../../utils/db';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
    // authenticated route
    const session = await getSession({ req });
    if (!session || (session.user.permissions !== "all" && session.user.permissions !== "chem")) {
        return res.status(401).send();
    }

    const { id, title, taksh, main_content } = req.body;

    if (req.method !== "PUT") {
        return res.status(400).json({ status: "error", data: { error: "Method not supported" } });
    }

    if (id === "") {
        return res.status(500).json({ status: "error", data: { error: "Id cannot be null" } });
    }

    const existingBookChapter = await prisma.chem_book_chapters.findFirst({
        where: {
            id: id
        }
    });

    if (existingBookChapter === null) {
        return res.status(400).json({ status: "error", data: { error: "Book Chapter does not exist" } });
    }

    if (taksh === "" && main_content === "" && title === "") {
        return res.status(500).json({ status: "error", data: { error: "Fields cannot be null" } });
    }

    if (taksh === "") {
        taksh = existingBookChapter.taksh;
    }

    if (main_content === "") {
        main_content = existingBookChapter.main_content;
    }

    if (title === "") {
        title = existingBookChapter.title;
    }

    await prisma.chem_book_chapters.update({
        where: {
            id: id
        },

        data: {
            taksh: taksh,
            title: title,
            main_content: main_content,
            userid: session.user.id
        }
    });

    return res.status(204).send();
}
