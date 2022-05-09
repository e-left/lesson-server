import prisma from '../../../utils/db';
import { getSession } from 'next-auth/react';
import { vIndices, oIndices, eIndices, aIndices, idArr } from '../../../utils/constants';

export default async function handler(req, res) {
    // authenticated route
    const session = await getSession({ req });
    if (!session || (session.user.permissions !== "all" && session.user.permissions !== "ancientgreek")) {
        return res.status(401).send();
    }

    const { title, category, etumologia, ermhneia, dataArr } = req.body;
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

    if (req.method !== "POST") {
        return res.status(400).json({ status: "error", data: { error: "Method not supported" } });
    }

    if (title === "" || category === "" || etumologia === "" || ermhneia === "") {
        return res.status(500).json({ status: "error", data: { error: "Fields cannot be null " } });
    }

    dataArr.forEach(item => {
        if (item === "") {
            return res.status(500).json({ status: "error", data: { error: "Fields cannot be null " } });
        }
    });

    const existingWord = await prisma.ancient_words.findFirst({
        where: {
            title: title
        }
    });

    if (existingWord !== null) {
        return res.status(400).json({ status: "error", data: { error: "Word already exists" } });
    }

    const newWord = await prisma.ancient_words.create({
        data: {
            title: title,
            category: category,
            ermhneia: ermhneia,
            etumologia: etumologia,
            userid: session.user.id,
            ...dataObj
        }
    });

    return res.status(201).json({ status: "success", data: { id: newWord.id, createdAt: newWord.createdAt } });
}
