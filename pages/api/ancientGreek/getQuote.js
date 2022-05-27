import prisma from '../../../utils/db';
import cors from "../../../utils/corsHandler";

export default async function handler(req, res) {
    await cors(req, res);

    if (req.method !== "GET") {
        return res.status(400).json({ status: "error", data: { error: "Method not supported" } });
    }

    let quote = await prisma.quotes.findFirst({
        where: {
            lesson: "ancientgreek"
        }
    });

    if(quote === null) {
        quote = {
            lesson: "ancientgreek",
            author: "",
            content: ""
        }

        await prisma.quotes.create({
            data: quote
        });
    }

    return res.status(200).json({ status: "success", data: quote });

}
