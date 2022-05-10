import prisma from '../../../utils/db';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
    // authenticated route
    const session = await getSession({ req });
    if (!session || (session.user.permissions !== "all" && session.user.permissions !== "physics")) {
        return res.status(401).send();
    }

    const { title, taksh, main_content, ex_number, page_number } = req.body;

    if (req.method !== "POST") {
        return res.status(400).json({ status: "error", data: { error: "Method not supported" } });
    }

    if (title === "" || main_content === "" || taksh === "" || ex_number === "" || page_number === "") {
        return res.status(500).json({ status: "error", data: { error: "Fields cannot be null" } });
    }

    const existingBookExercise = await prisma.physics_book_exercises.findFirst({
        where: {
            main_content: main_content
        }
    });

    if (existingBookExercise !== null) {
        return res.status(400).json({ status: "error", data: { error: "Book Exercise already exists" } });
    }

    const newBookExercise = await prisma.physics_book_exercises.create({
        data: {
            title: title,
            taksh: taksh,
            exNumber: ex_number,
            pageNumber: page_number,
            main_content: main_content,
            userid: session.user.id
        }
    });

    return res.status(201).json({ status: "success", data: { id: newBookExercise.id, createdAt: newBookExercise.createdAt } });
}
