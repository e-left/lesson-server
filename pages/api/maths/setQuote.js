import prisma from '../../../utils/db';
import cors from "../../../utils/corsHandler";
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
    await cors(req, res);

    const session = await getSession({ req });
    if (!session || (session.user.permissions !== "all" && session.user.permissions !== "maths")) {
        return res.status(401).send();
    }

    if (req.method !== "POST") {
        return res.status(400).json({ status: "error", data: { error: "Method not supported" } });
    }

    const { author, content } = req.body;

    if (author === "" && content === "") {
        return res.status(500).json({ status: "error", data: { error: "Fields cannot be null" } });
    }

    let quote = await prisma.quotes.findFirst({
        where: {
            lesson: "maths"
        }
    });

    if (quote === null) {
        quote = {
            lesson: "maths",
            author: author,
            content: content
        }
        await prisma.quotes.create({
            data: quote
        });

        return res.status(200).json({ status: "success", data: quote });
    }

    quote.author = author;
    quote.content = content;

    await prisma.quotes.update({
        where: {
            lesson: "maths",
        },

        data: quote
    });

    return res.status(200).json({ status: "success", data: quote });
}
