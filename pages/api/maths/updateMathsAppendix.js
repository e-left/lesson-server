import prisma from '../../../utils/db';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
    // authenticated route
    const session = await getSession({ req });
    if (!session || (session.user.permissions !== "all" && session.user.permissions !== "maths")) {
        return res.status(401).send();
    }

    const { id, title, taksh, main_content } = req.body;

    if (req.method !== "PUT") {
        return res.status(400).json({ status: "error", data: { error: "Method not supported" } });
    }

    if (id === "") {
        return res.status(500).json({ status: "error", data: { error: "Id cannot be null" } });
    }

    const existingAppendix = await prisma.maths_basic_appendix.findFirst({
        where: {
            id: id
        }
    });

    if (existingAppendix === null) {
        return res.status(400).json({ status: "error", data: { error: "Appendix does not exist" } });
    }

    if (taksh === "" && main_content === "" && title === "") {
        return res.status(500).json({ status: "error", data: { error: "Fields cannot be null" } });
    }

    if (taksh === "") {
        taksh = existingAppendix.taksh;
    }

    if (main_content === "") {
        main_content = existingAppendix.main_content;
    }

    if (title === "") {
        title = existingAppendix.title;
    }

    await prisma.maths_basic_appendix.update({
        where: {
            id: id
        },

        data: {
            taksh: taksh,
            title: title,
            main_content: main_content,
            userid: session.user.id
        }
    });

    return res.status(204).send();
}
