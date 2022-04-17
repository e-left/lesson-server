import prisma from '../../../utils/db';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
    // authenticated route
    const session = await getSession({ req });
    if (!session || (session.user.permissions !== "all" && session.user.permissions !== "chem")) {
        return res.status(401).send();
    }

    const { title, taksh, main_content, typos } = req.body;

    if (req.method !== "POST") {
        return res.status(400).json({ status: "error", data: { error: "Method not supported" } });
    }

    if (title === "" || main_content === "" || taksh === "" || typos === "") {
        return res.status(500).json({ status: "error", data: { error: "Fields cannot be null" } });
    }

    const existingElement = await prisma.chem_element.findFirst({
        where: {
            main_content: main_content
        }
    });

    if (existingElement !== null) {
        return res.status(400).json({ status: "error", data: { error: "Element already exists" } });
    }

    const newElement = await prisma.chem_element.create({
        data: {
            title: title,
            taksh: taksh,
            typos: typos,
            main_content: main_content,
            userid: session.user.id
        }
    });

    return res.status(201).json({ status: "success", data: { id: newElement.id, createdAt: newElement.createdAt } });
}
