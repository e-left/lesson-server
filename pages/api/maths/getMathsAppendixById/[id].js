import prisma from '../../../../utils/db';

export default async function handler(req, res) {
    const {id} = req.query;

    if (req.method !== "GET") {
        return res.status(400).json({ status: "error", data: { error: "Method not supported" } });
    }

    const appendix = await prisma.maths_basic_appendix.findMany({
        where: {
            id: parseInt(id)
        }
    });

    return res.status(200).json({ status: "success", data: appendix });
}