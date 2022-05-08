import { PrismaClient } from "@prisma/client";
import { getSession } from 'next-auth/react';
import { vIndices, oIndices, eIndices, aIndices, idArr } from '../../../utils/constants';

export default async function handler(req, res) {
    const prisma = new PrismaClient();
    // authenticated route
    const session = await getSession({ req });
    if (!session || (session.user.permissions !== "all" && session.user.permissions !== "ancientgreek")) {
        return res.status(401).send();
    }

    const { id, title, category, etumologia, ermhneia, dataArr } = req.body;
    let dataObj = {};

    if (category === "rhma") {
        for (let i = vIndices[0]; i <= vIndices[1]; i++) {
            dataObj[idArr[i]] = dataArr[i - vIndices[0]];
        }
    }

    if (category === "ous") {
        for (let i = oIndices[0]; i <= oIndices[1]; i++) {
            dataObj[idArr[i]] = dataArr[i - oIndices[0]];
        }
    }

    if (category === "epi") {
        for (let i = eIndices[0]; i <= eIndices[1]; i++) {
            dataObj[idArr[i]] = dataArr[i - eIndices[0]];
        }
    }

    if (category === "ap") {
        for (let i = aIndices[0]; i <= aIndices[1]; i++) {
            dataObj[idArr[i]] = dataArr[i - aIndices[0]];
        }
    }

    if (req.method !== "PUT") {
        return res.status(400).json({ status: "error", data: { error: "Method not supported" } });
    }

    if (id === "") {
        return res.status(500).json({ status: "error", data: { error: "Id cannot be null" } });
    }

    if (title === "" && category === "") {
        return res.status(500).json({ status: "error", data: { error: "All fields cannot be null" } });
    }

    const existingWord = await prisma.ancient_words.findFirst({
        where: {
            id: id
        }
    });

    if (existingWord === null) {
        return res.status(400).json({ status: "error", data: { error: "Word does not exist" } });
    }

    if (title === "") {
        title = existingWord.title;
    }

    if (category === "") {
        category = existingWord.category;
    }

    if (ermhneia === "") {
        ermhneia = existingWord.ermhneia;
    }

    if (etumologia === "") {
        etumologia = existingWord.etumologia;
    }

    await prisma.ancient_words.update({
        where: {
            id: id
        },

        data: {
            title: title,
            category: category,
            ermhneia: ermhneia,
            etumologia: etumologia,
            userid: session.user.id,
            ...dataObj
        }
    });

    return res.status(204).send();
}
