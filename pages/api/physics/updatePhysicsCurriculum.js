import prisma from '../../../utils/db';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
    // authenticated route
    const session = await getSession({ req });
    if (!session || (session.user.permissions !== "all" && session.user.permissions !== "physics")) {
        return res.status(401).send();
    }

    const { id, taksh, main_content } = req.body;

    if (req.method !== "PUT") {
        return res.status(400).json({ status: "error", data: { error: "Method not supported" } });
    }

    if (id === "") {
        return res.status(500).json({ status: "error", data: { error: "Id cannot be null" } });
    }

    const existingCurriculum = await prisma.physics_curriculum.findFirst({
        where: {
            id: id
        }
    });

    if (existingCurriculum === null) {
        return res.status(400).json({ status: "error", data: { error: "Curriculum does not exist" } });
    }

    if (taksh === "" && main_content === "") {
        return res.status(500).json({ status: "error", data: { error: "Fields cannot be null" } });
    }

    if (taksh === "") {
        taksh = existingCurriculum.taksh;
    }

    if (main_content === "") {
        main_content = existingCurriculum.main_content;
    }

    await prisma.physics_curriculum.update({
        where: {
            id: id
        },

        data: {
            taksh: taksh,
            main_content: main_content,
            userid: session.user.id
        }
    });

    return res.status(204).send();
}
