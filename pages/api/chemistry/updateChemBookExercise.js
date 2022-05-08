import { getSession } from 'next-auth/react';
import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
    // authenticated route
    const session = await getSession({ req });
    const prisma = new PrismaClient();
    if (!session || (session.user.permissions !== "all" && session.user.permissions !== "chem")) {
        return res.status(401).send();
    }

    const { id, title, taksh, main_content, ex_number, page_number } = req.body;

    if (req.method !== "PUT") {
        return res.status(400).json({ status: "error", data: { error: "Method not supported" } });
    }

    if (id === "") {
        return res.status(500).json({ status: "error", data: { error: "Id cannot be null" } });
    }

    const existingBookExercise = await prisma.chem_book_exercises.findFirst({
        where: {
            id: id
        }
    });

    if (existingBookExercise === null) {
        return res.status(400).json({ status: "error", data: { error: "Book Exercise does not exist" } });
    }

    if (taksh === "" && main_content === "" && title === "" && ex_number === "" && page_number === "") {
        return res.status(500).json({ status: "error", data: { error: "Fields cannot be null" } });
    }

    if (taksh === "") {
        taksh = existingBookExercise.taksh;
    }

    if (main_content === "") {
        main_content = existingBookExercise.main_content;
    }

    if (title === "") {
        title = existingBookExercise.title;
    }

    if (ex_number === "") {
        ex_number = existingBookExercise.exNumber;
    }

    if (page_number === "") {
        page_number = existingBookExercise.pageNumber;
    }

    await prisma.chem_book_exercises.update({
        where: {
            id: id
        },

        data: {
            taksh: taksh,
            title: title,
            exNumber: ex_number,
            pageNumber: page_number,
            main_content: main_content,
            userid: session.user.id
        }
    });

    return res.status(204).send();
}
