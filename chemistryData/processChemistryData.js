import * as fs from 'fs';

// final form:
// {
//     userid: admin_id,
//     title: title,
//     typos: typos, stoixeio|anenwsh|orenwsh|antidrash
//     main_content: main_content
// }
const adminID = 1; // fotis in dev, admin in prod
let finalArray = [];

let fileData = fs.readFileSync("exported_data.json");
let data = JSON.parse(fileData);

data.an_enwseis.forEach(el => {
    let obj = {
        userid: adminID,
        title: el.Title,
        typos: "anenwsh",
    };

    let content = "";

    content += "<strong>Περιεχόμενο</strong>\n";
    content += el.Content
    .replace(/<img[^>"']*((("[^"]*")|('[^']*'))[^"'>]*)*>/g,"")
    .replace("<!-- wp:paragraph -->", "")
    .replace("<!-- /wp:paragraph -->", "")
    .replace("<!-- wp:paragraph {\"align\":\"center\"} -->", "")
    .replace("<!-- wp:image {\"align\":\"center\",\"id\":1303,\"sizeSlug\":\"large\",\"linkDestination\":\"none\"} -->", "")
    .replace("class=\"wp-block-image\"", "")
    .replace("<!-- /wp:image -->", "");
    content += "\n";
    content += "<strong>Μοριακός Τύπος</strong>\n";
    content += el.ce_molecular_type;
    content += "\n";
    content += "<strong>Μοριακή Μάζα</strong>\n";
    content += el.ce_molecular_maza;
    content += "\n";
    content += "<strong>Σημείο Τήξεως</strong>\n";
    content += el.ce_steady_point;
    content += "\n";
    content += "<strong>Σημείο Ζέσεως</strong>\n";
    content += el.ce_zeseos_point;
    content += "\n";
    content += "<strong>Πυκνότητα</strong>\n";
    content += el.ce_density;
    content += "\n";
    content += "<strong>Αριθμοί Οξείδωσης</strong>\n";
    content += el.ce_number_of;
    content += "\n";
    content += "<strong>Διαλυτότητα</strong>\n";
    content += el.ce_solubility;
    content += "\n";
    content += "<strong>Κατάσταση σε θερμοκρασία δωματίου</strong>\n";
    content += el.cs_condition;
    content += "\n";

    // if there is a youtube video, add it
    if(el.ca_youtube !== "") {
        let videoID = el.ca_youtube;
        let videoElement = `<iframe class="ql-video" allowfullscreen="true" src="https://www.youtube.com/embed/${videoID}?showinfo=0" frameborder="0"></iframe>`
        content += "<strong>Youtube Video</strong>\n";
        content += videoElement;
        content += "\n";
    }

    obj.main_content = content;
    finalArray.push(obj);
});

// skip or_enwseis, three misinputed entries

data.xh_stoixeia.forEach(el => {
    let obj = {
        userid: adminID,
        title: el.Title,
        typos: "stoixeio",
    };

    let content = "";

    content += "<strong>Περιεχόμενο</strong>\n";
    // more wp tags removed manualy
    content += el.Content
    .replace(/<img[^>"']*((("[^"]*")|('[^']*'))[^"'>]*)*>/g,"")
    .replace("<!-- wp:paragraph -->", "")
    .replace("<!-- /wp:paragraph -->", "")
    .replace("<!-- wp:paragraph {\"align\":\"center\"} -->", "")
    .replace("<!-- wp:image {\"align\":\"center\",\"id\":1518,\"sizeSlug\":\"large\",\"linkDestination\":\"none\"} -->", "")
    // .replace("<!-- wp:image {\"align\":\"center\",\"id\":1303,\"sizeSlug\":\"large\",\"linkDestination\":\"none\"} -->", "")
    .replace("class=\"wp-block-image\"", "")
    .replace("<!-- /wp:image -->", "");
    content += "\n";
    content += "<strong>Κατάσταση σε θερμοκρασία δωματίου</strong>\n";
    content += el.cs_condition;
    content += "\n";
    content += "<strong>Χημικό Σύμβολο</strong>\n";
    content += el.cs_symbol;
    content += "\n";
    content += "<strong>Ατομικός αριθμός Z</strong>\n";
    content += el.cs_number_z;
    content += "\n";
    content += "<strong>Ατομική Μάζα</strong>\n";
    content += el.cs_atomic_maza;
    content += "\n";
    content += "<strong>Ηλεκτρονιακή Δόμηση</strong>\n";
    content += el.cs_electric_domisi;
    content += "\n";
    content += "<strong>Αριθμοί Οξείδωσης</strong>\n";
    content += el.cs_numberof;
    content += "\n";
    content += "<strong>Ομάδα Περιοδικού Πίνακα</strong>\n";
    content += el.cs_team;
    content += "\n";
    content += "<strong>Περίοδος Περιοδικού Πίνακα</strong>\n";
    content += el.cs_period;
    content += "\n";
    content += "<strong>Τομέας Περιοδικού Πίνακα</strong>\n";
    content += el.cs_tomeas;
    content += "\n";
    content += "<strong>Ατομική Ακτίνα</strong>\n";
    content += el.cs_atomic_radio;
    content += "\n";
    content += "<strong>Ηλεκτραρνητικότητα</strong>\n";
    content += el.cs_electric_negativity;
    content += "\n";
    content += "<strong>Σημείο Τήξεως</strong>\n";
    content += el.cs_steady_point;
    content += "\n";
    content += "<strong>Σημείο Ζέσεως</strong>\n";
    content += el.cs_boil_point;
    content += "\n";
    content += "<strong>Πυκνότητα</strong>\n";
    content += el.cs_density;
    content += "\n";
    content += "<strong>Ενέργεια Πρώτου Ιοντισμού</strong>\n";
    content += el.cs_ionization_energy;
    content += "\n";

    if(el.ca_youtube !== "") {
        let videoID = el.ca_youtube;
        let videoElement = `<iframe class="ql-video" allowfullscreen="true" src="https://www.youtube.com/embed/${videoID}?showinfo=0" frameborder="0"></iframe>`
        content += "<strong>Youtube Video</strong>\n";
        content += videoElement;
        content += "\n";
    }

    obj.main_content = content;
    finalArray.push(obj);
});

data.xh_antidraseis.forEach(el => {
    let obj = {
        userid: adminID,
        title: el.Title,
        typos: "antidrash",
    };

    let content = "";

    content += "<strong>Αντίδραση</strong>\n";
    // remove wp tags
    content += el.Content
    .replace("<!-- wp:paragraph -->", "")
    .replace("<!-- /wp:paragraph -->", "")
    .replace("<!-- wp:paragraph {\"align\":\"center\"} -->", "")
    .replace("<!-- wp:image {\"align\":\"center\",\"id\":1303,\"sizeSlug\":\"large\",\"linkDestination\":\"none\"} -->", "");
    content += "\n";
    content += "<strong>Περιγραφή</strong>\n";
    content += el.ca_equation;
    content += "\n";


    if(el.ca_youtube !== "") {
        let videoID = el.ca_youtube;
        let videoElement = `<iframe class="ql-video" allowfullscreen="true" src="https://www.youtube.com/embed/${videoID}?showinfo=0" frameborder="0"></iframe>`
        content += "<strong>Youtube Video</strong>\n";
        content += videoElement;
        content += "\n";
    }

    obj.main_content = content;
    finalArray.push(obj);
});


let finalData = JSON.stringify(finalArray, null, '\t');
fs.writeFileSync("processed_data.json", finalData);