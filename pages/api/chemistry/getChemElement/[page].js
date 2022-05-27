import prisma from '../../../../utils/db';
import { resultsPerPage } from '../../../../utils/constants';
import cors from "../../../../utils/corsHandler";

export default async function handler(req, res) {
    await cors(req, res);

    if (req.method !== "GET") {
        return res.status(400).json({ status: "error", data: { error: "Method not supported" } });
    }

    const { page } = req.query;

    const count = await prisma.chem_element.count();

    const toBeSkipped = page * resultsPerPage;

    if (toBeSkipped > count) {
        return res.status(500).json({ status: "error", data: { error: "More elements requested than existing" } });
    }

    const toBeReturned = toBeSkipped + resultsPerPage >= count ? count - toBeSkipped : resultsPerPage;
    const isMoreELements = toBeSkipped + toBeReturned < count ? true : false;

    const elements = await prisma.chem_element.findMany({
        orderBy: [
            {
                title: "asc",
            },
        ],
        skip: toBeSkipped,
        take: toBeReturned
    });

    return res.status(200).json({ status: "success", data: elements, moreElements: isMoreELements, count: count });

}
