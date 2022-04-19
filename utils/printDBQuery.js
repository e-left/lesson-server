// template:
// {
//     title: {
//         contains: query,
//             mode: 'insensitive',
//            }
// },
// replace title with string

import { idArr } from "./constants.js";

idArr.forEach(element => {
    console.log("{");
    console.log(`${element}: {`);
    console.log("contains: query,");
    console.log("mode: 'insensitive'");
    console.log("}");
    console.log("},");
});