import prisma from '../../../utils/db';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
    // authenticated route
    const session = await getSession({ req });
    if (!session || (session.user.permissions !== "all" && session.user.permissions !== "chem")) {
        return res.status(401).send();
    }

    const { id, title, main_content, typos } = req.body;

    if (req.method !== "PUT") {
        return res.status(400).json({ status: "error", data: { error: "Method not supported" } });
    }

    if (id === "") {
        return res.status(500).json({ status: "error", data: { error: "Id cannot be null" } });
    }

    const existingElement = await prisma.chem_element.findFirst({
        where: {
            id: id
        }
    });

    if (existingElement === null) {
        return res.status(400).json({ status: "error", data: { error: "Element does not exist" } });
    }

    if (main_content === "" && title === "" && typos === "") {
        return res.status(500).json({ status: "error", data: { error: "Fields cannot be null" } });
    }

    if (main_content === "") {
        main_content = existingElement.main_content;
    }

    if (title === "") {
        title = existingElement.title;
    }

    if (typos === "") {
        typos = existingElement.typos;
    }

    await prisma.chem_element.update({
        where: {
            id: id
        },

        data: {
            title: title,
            typos: typos,
            main_content: main_content,
            userid: session.user.id
        }
    });

    return res.status(204).send();
}
