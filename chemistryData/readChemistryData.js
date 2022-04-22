import * as fs from 'fs';
import * as csv from 'fast-csv';

const filename = "/home/eleft/dev/lesson-server/chemistryData/Άρθρα-Export-2022-April-21-1350.csv";

// 358
let an_enwseis = []
// 3
let or_enwseis = []
// 118
let xh_stoixeia = []
// 520 
let xh_antidraseis = []

// 'Ανόργανες Ενώσεις'
// 'Χημικά Στοιχεία'
// 'Οργανικές Ενώσεις'
// 'Χημικές Αντιδράσεις'

fs.createReadStream(filename)
    .pipe(csv.parse({ headers: true }))
    .on('error', error => console.error(error))
    .on('data', row => {
        // do some data cleaning
        row["category"] = row['Κατηγορίες'];
        delete row['Κατηγορίες'];
        row["solubility"] = row['διαλυτότητα'];
        delete row['διαλυτότητα'];
        // categorize data
        if(row["category"] == 'Ανόργανες Ενώσεις') {
            an_enwseis.push(row);
        }
        if(row["category"] == 'Οργανικές Ενώσεις') {
            or_enwseis.push(row);
        }
        if(row["category"] == 'Χημικά Στοιχεία') {
            xh_stoixeia.push(row);
        }
        if(row["category"] == 'Χημικές Αντιδράσεις') {
            xh_antidraseis.push(row);
        }
    })
    .on('end', (rowCount) => {
        console.log(`Parsed ${rowCount} rows`);
        // print the numbers of array elements
        console.log(`Ανόργανες Ενώσεις: ${an_enwseis.length}`);
        console.log(`Οργανικές Ενώσεις: ${or_enwseis.length}`);
        console.log(`Χημικά Στοιχεία: ${xh_stoixeia.length}`);
        console.log(`Χημικές Αντιδράσεις: ${xh_antidraseis.length}`);
        let final_obj = {
            an_enwseis,
            or_enwseis,
            xh_stoixeia,
            xh_antidraseis
        };
        let data = JSON.stringify(final_obj, null, '\t');
        fs.writeFileSync("exported_data.json", data);
    });
