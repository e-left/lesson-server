import { getSession } from 'next-auth/react';
import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
    // authenticated route
    const session = await getSession({ req });
    const prisma = new PrismaClient();
    if (!session || (session.user.permissions !== "all" && session.user.permissions !== "chem")) {
        return res.status(401).send();
    }

    const { id, taksh, main_content } = req.body;

    if (req.method !== "PUT") {
        return res.status(400).json({ status: "error", data: { error: "Method not supported" } });
    }

    if (id === "") {
        return res.status(500).json({ status: "error", data: { error: "Id cannot be null" } });
    }

    const existingSosTheory = await prisma.chem_sos_theory.findFirst({
        where: {
            id: id
        }
    });

    if (existingSosTheory === null) {
        return res.status(400).json({ status: "error", data: { error: "Sos Theory does not exist" } });
    }

    if (taksh === "" && main_content === "") {
        return res.status(500).json({ status: "error", data: { error: "Fields cannot be null" } });
    }

    if (taksh === "") {
        taksh = existingSosTheory.taksh;
    }

    if (main_content === "") {
        main_content = existingSosTheory.main_content;
    }

    await prisma.chem_sos_theory.update({
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
