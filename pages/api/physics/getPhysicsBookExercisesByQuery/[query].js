import prisma from '../../../../utils/db';
import cors from "../../../../utils/corsHandler";

export default async function handler(req, res) {
    await cors(req, res);

    const { query } = req.query;

    if (req.method !== "GET") {
        return res.status(400).json({ status: "error", data: { error: "Method not supported" } });
    }

    if (query === "") {
        return res.status(400).json({ status: "error", data: { error: "No search string supplied" } });
    }

    const bookExercises = await prisma.physics_book_exercises.findMany({
        where: {
            title : {
                contains: query,
            }
        }
    });

    return res.status(200).json({ status: "success", data: bookExercises, count: bookExercises.length });

}