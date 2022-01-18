import prisma from '../../../utils/db';
import { resultsPerPage } from '../../../utils/constants';

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(400).json({ status: "error", data: { error: "Method not supported" } });
    }

    const { page } = req.query;

    const count = await prisma.ancient_words.count();

    const toBeSkipped = page * resultsPerPage;

    if (toBeSkipped > count) {
        return res.status(500).json({ status: "error", data: { error: "More words requested than existing" } });
    }

    const toBeReturned = toBeSkipped + resultsPerPage >= count ? count - toBeSkipped : resultsPerPage;
    const isMoreWords = toBeSkipped + toBeReturned < count ? true : false;

    const words = await prisma.ancient_words.findMany({
        orderBy: [
            {
                title: "asc",
            },
        ],
        skip: toBeSkipped,
        take: toBeReturned
    });

    return res.status(200).json({ status: "success", data: words, moreWords: isMoreWords });

}
