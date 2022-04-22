// import * as fs from 'fs';
const fs = require('fs');
// import { PrismaClient } from "@prisma/client";
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

let fileData = fs.readFileSync("processed_data.json");
let data = JSON.parse(fileData);

let main = async () => {
    await Promise.all(data.map(async entry => {
        await prisma.chem_element.create({
            data: {
                title: entry.title,
                typos: entry.typos,
                main_content: entry.main_content,
                userid: entry.userid
            }
        });
    }));
};

main();