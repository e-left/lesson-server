import prisma from '../../../utils/db';
import cors from "../../../utils/corsHandler";
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
    await cors(req, res);

    const session = await getSession({ req });
    if (!session || (session.user.permissions !== "all" && session.user.permissions !== "ancientgreek")) {
        return res.status(401).send();
    }

    if (req.method !== "DELETE") {
        return res.status(400).json({ status: "error", data: { error: "Method not supported" } });
    }

    let quote = await prisma.quotes.findFirst({
        where: {
            lesson: "ancientgreek"
        }
    });

    if (quote === null) {
        quote = {
            lesson: "ancientgreek",
            author: "",
            content: ""
        }
        await prisma.quotes.create({
            data: quote
        });

        return res.status(200).json({ status: "success", data: quote });
    }

    quote.author = "";
    quote.content = "";

    await prisma.quotes.update({
        where: {
            lesson: "ancientgreek",
        },

        data: quote
    });

    return res.status(200).json({ status: "success", data: quote });
}
