import React from "react";
import Link from 'next/link';
import styles from '../../styles/WordForm.module.css';
import { useState, useEffect } from 'react';
import { vIndices, oIndices, eIndices, aIndices, idArr, labelArr } from '../../utils/constants';

function WordForm({ data, newWord }) {
    let title = "";
    let [category, changeCategory] = useState("rhma");
    let [changedCategory, changeChangedCategory] = useState(false);
    let id = 0;

    let ermhneia = "";
    let etumologia = "";

    let varr = new Array(78).fill("");
    let oarr = new Array(3).fill("");
    let earr = new Array(10).fill("");
    let aarr = new Array(7).fill("");

    if (newWord !== "1" && !changedCategory) {
        title = data.title;
        category = data.category;

        ermhneia = data.ermhneia;
        etumologia = data.etumologia;

        if (category === "rhma") {
            for (let i = vIndices[0]; i <= vIndices[1]; i++) {
                varr[i - vIndices[0]] = data[idArr[i]];
            }
        }

        if (category === "ous") {
            for (let i = oIndices[0]; i <= oIndices[1]; i++) {
                oarr[i - oIndices[0]] = data[idArr[i]];
            }
        }

        if (category === "epi") {
            for (let i = eIndices[0]; i <= eIndices[1]; i++) {
                earr[i - eIndices[0]] = data[idArr[i]];
            }
        }

        if (category === "ap") {
            for (let i = aIndices[0]; i <= aIndices[1]; i++) {
                aarr[i - aIndices[0]] = data[idArr[i]];
            }
        }

        id = data.id;
    }

    /* eslint-disable */
    useEffect(() => {
        if (newWord !== "1") {
            document.getElementById("title").value = title;
            document.getElementById("category").value = category;
            if (category !== data.category) {
                changeCategory(category);
            }

            document.getElementById("ermhneia").value = ermhneia;
            document.getElementById("etumologia").value = etumologia;

            if (category === "rhma") {
                for (let i = vIndices[0]; i <= vIndices[1]; i++) {
                    document.getElementById(idArr[i]).value = varr[i - vIndices[0]];
                }
            }

            if (category === "ous") {
                for (let i = oIndices[0]; i <= oIndices[1]; i++) {
                    document.getElementById(idArr[i]).value = oarr[i - oIndices[0]];
                }
            }

            if (category === "epi") {
                for (let i = eIndices[0]; i <= eIndices[1]; i++) {
                    document.getElementById(idArr[i]).value = earr[i - eIndices[0]];
                }
            }

            if (category === "ap") {
                for (let i = aIndices[0]; i <= aIndices[1]; i++) {
                    document.getElementById(idArr[i]).value = aarr[i - aIndices[0]];
                }
            }

        }
    });

    const changeCategoryCallback = () => {
        const newCat = document.getElementById("category").value;
        if (newWord !== "1") {
            if (newCat === data.category) {
                changeChangedCategory(false);
            } else {
                changeChangedCategory(true);
            }
        }
        changeCategory(newCat);
    }

    const saveCallback = async () => {
        // get fields
        title = document.getElementById("title").value.trim();
        ermhneia = document.getElementById("ermhneia").value.trim();
        etumologia = document.getElementById("etumologia").value.trim();
        category = document.getElementById("category").value.trim();

        if (title === "") {
            alert("Fields cannot be empty!");
            return;
        }

        let dataArr;
        if (category === "rhma") {
            for (let i = vIndices[0]; i <= vIndices[1]; i++) {
                varr[i - vIndices[0]] = document.getElementById(idArr[i]).value.trim();
            }
            dataArr = varr;
        }

        if (category === "ous") {
            for (let i = oIndices[0]; i <= oIndices[1]; i++) {
                oarr[i - oIndices[0]] = document.getElementById(idArr[i]).value.trim();
            }
            dataArr = oarr;
        }

        if (category === "epi") {
            for (let i = eIndices[0]; i <= eIndices[1]; i++) {
                earr[i - eIndices[0]] = document.getElementById(idArr[i]).value.trim();
            }
            dataArr = earr;
        }

        if (category === "ap") {
            for (let i = aIndices[0]; i <= aIndices[1]; i++) {
                aarr[i - aIndices[0]] = document.getElementById(idArr[i]).value.trim();
            }
            dataArr = aarr;
        }

        let badData = false;
        dataArr.forEach(element => {
            if (element === "") {
                badData = true;
            }
        });
        if (badData) {
            alert("Fields cannot be empty!");
            return;
        }

        if (newWord === "1") {
            // save new word
            const response = await fetch('/api/ancientGreek/addAncientWord', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, category, etumologia, ermhneia, dataArr }),
            });

            const data = await response.json();
            if (data.status !== "success") {
                alert("Error: " + data.data.error);
            }

            alert("Succesfully added word");

            // redirect to main page
            window.location.href = "/ancientgreek/words";
        } else {
            const response = await fetch('/api/ancientGreek/updateAncientWord', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id, title, category, etumologia, ermhneia, dataArr }),
            });

            if (response.status !== 204) {
                const data = await response.json();
                alert("Error: " + data.data.error);
            }

            alert("Succesfully updated word");

            // redirect to main page
            window.location.href = "/ancientgreek/words";
        }
    }

    let renderedJSX;

    if (category === "rhma") {
        renderedJSX = varr.map((_, i) =>
        (
            <div key={idArr[i + vIndices[0]]}>
                <label htmlFor={idArr[i + vIndices[0]]}>{labelArr[i + vIndices[0]]}</label>
                <textarea className="form-control mb-3 mt-3" rows="6" id={idArr[i + vIndices[0]]} autoComplete="off"></textarea>
            </div>
        )
        );
    }

    if (category === "ous") {
        renderedJSX = oarr.map((_, i) =>
        (
            <div key={idArr[i + oIndices[0]]}>
                <label htmlFor={idArr[i + oIndices[0]]}>{labelArr[i + oIndices[0]]}</label>
                <textarea className="form-control mb-3 mt-3" rows="6" id={idArr[i + oIndices[0]]} autoComplete="off"></textarea>
            </div>
        )
        );
    }

    if (category === "epi") {
        renderedJSX = earr.map((_, i) =>
        (
            <div key={idArr[i + eIndices[0]]}>
                <label htmlFor={idArr[i + eIndices[0]]}>{labelArr[i + eIndices[0]]}</label>
                <textarea className="form-control mb-3 mt-3" rows="6" id={idArr[i + eIndices[0]]} autoComplete="off"></textarea>
            </div>
        )
        );
    }

    if (category === "ap") {
        renderedJSX = aarr.map((_, i) =>
        (
            <div key={idArr[i + aIndices[0]]}>
                <label htmlFor={idArr[i + aIndices[0]]}>{labelArr[i + aIndices[0]]}</label>
                <textarea className="form-control mb-3 mt-3" rows="6" id={idArr[i + aIndices[0]]} autoComplete="off"></textarea>
            </div>
        )
        );
    }

    return <div className={styles.main}>
        <div className="form-group mb-4">
            {/* title */}
            <label htmlFor="title">Λέξη</label>
            <input type="text" className="form-control mb-3 mt-3" id="title" placeholder="λέξη" autoComplete="off"></input>

            {/* category */}
            <label htmlFor="category">Κατηγορία Λέξης</label>
            <select name="category" className="form-control mb-3 mt-3" id="category" onChange={changeCategoryCallback}>
                <option value="rhma">Ρήμα</option>
                <option value="ous">Ουσιαστικό</option>
                <option value="epi">Επίθετο</option>
                <option value="ap">Αντωνυμία</option>
            </select>

            {/* etumologia */}
            <label htmlFor="etumologia">Ετυμολογία</label>
            <textarea className="form-control mb-3 mt-3" id="etumologia" rows="6" autoComplete="off"></textarea>

            {/* ermhneia */}
            <label htmlFor="title">Ερμηνεία</label>
            <textarea className="form-control mb-3 mt-3" id="ermhneia" rows="6" autoComplete="off"></textarea>

            {renderedJSX}
        </div>

        <div className="container">
            <div className="row justify-content-around">
                {/* cancel button */}
                <div className="col-auto">
                    <Link href="/ancientgreek/words" passHref>
                        <button className="btn btn-danger btn-lg"><i className="bi bi-trash-fill"></i> Cancel</button>
                    </Link>
                </div>

                {/* save button */}
                <div className="col-auto">
                    <button className="btn btn-success btn-lg" onClick={saveCallback}><i className="bi bi-save-fill"></i> Save</button>
                </div>
            </div>
        </div>
    </div>
}

export default WordForm;
