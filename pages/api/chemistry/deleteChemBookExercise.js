import prisma from '../../../utils/db';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
    // authenticated route
    const session = await getSession({ req });
    if (!session || (session.user.permissions !== "all" && session.user.permissions !== "chem")) {
        return res.status(401).send();
    }

    const { id } = req.body;

    if (req.method !== "DELETE") {
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

    await prisma.chem_book_exercises.delete({
        where: {
            id: id
        }
    });

    return res.status(200).send();
}
