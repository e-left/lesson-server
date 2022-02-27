import prisma from '../../../utils/db';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
    // authenticated route
    const session = await getSession({ req });
    if (!session || (session.user.permissions !== "all" && session.user.permissions !== "maths")) {
        return res.status(401).send();
    }

    const { id } = req.body;

    if (req.method !== "DELETE") {
        return res.status(400).json({ status: "error", data: { error: "Method not supported" } });
    }

    if (id === "") {
        return res.status(500).json({ status: "error", data: { error: "Id cannot be null" } });
    }

    const existingContent = await prisma.maths_content.findFirst({
        where: {
            id: id
        }
    });

    if (existingContent === null) {
        return res.status(400).json({ status: "error", data: { error: "Content does not exist" } });
    }

    await prisma.maths_content.delete({
        where: {
            id: id
        }
    });

    return res.status(200).send();
}
