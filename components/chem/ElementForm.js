import React from "react";
import Link from 'next/link';
import styles from '../../styles/ElementForm.module.css';
import { useState, useEffect } from 'react';
import ChemEditor from './Editor';

function ElementForm({ data, newContent }) {
    let id = 0;
    let title = "";
    let typos = "";

    let originalContent = "";
    let changeOriginalContent = (content) => {
        originalContent = content;
    }

    const [useEditors, changeUseEditors] = useState(false);

    if (newContent !== "1") {
        id = data.id;
        title = data.title;
        typos = data.typos;
        originalContent = data.main_content;
    }

    let originalContentJSX = useEditors ? <ChemEditor value={originalContent} onChange={changeOriginalContent} /> : <></>;

    /* eslint-disable */
    useEffect(() => {
        // import and set editors
        if (!useEditors) {
            changeUseEditors(true);
        }

        if (newContent !== "1") {
            document.getElementById("titlos").value = title;
            document.getElementById("typos").value = typos;
        }
    }, []);

    const saveCallback = async () => {
        // get fields
        title = document.getElementById("titlos").value;
        typos = document.getElementById("typos").value;

        if (title === "") {
            alert("Fields cannot be empty!");
            return;
        }

        if (newContent === "1") {
            // save new word
            const response = await fetch('/api/chemistry/createChemElement', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, typos, main_content: originalContent }),
            });

            const data = await response.json();
            if (data.status !== "success") {
                alert("Error: " + data.data.error);
            }

            alert("Succesfully added element");

            // redirect to main page
            window.location.href = "/chemistry/elements";
        } else {
            const response = await fetch('/api/chemistry/updateChemElement', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id, title, typos, main_content: originalContent }),
            });

            if (response.status !== 204) {
                const data = await response.json();
                alert("Error: " + data.data.error);
            }

            alert("Succesfully updated element");

            // redirect to main page
            window.location.href = "/chemistry/elements";
        }
    }

    return (
        <div className={styles.main}>
            <div className="form-group mb-4">
                {/* titlos */}
                <label htmlFor="titlos">Τίτλος</label>
                <input type="text" className="form-control mb-3 mt-3" id="titlos" placeholder="Τίτλος" autoComplete="off"></input>

                {/* typos */}
                <label htmlFor="typos">Τύπος</label>
                <select className="form-control mb-3 mt-3" name="typos" id="typos">
                    <option value="stoixeio">Χημικό Στοιχείο</option>
                    <option value="anenwsh">Ανόργανη Χημική Ένωση</option>
                    <option value="orenwsh">Οργανική Χημική Ένωση</option>
                    <option value="antidrash">Χημική Αντίδραση</option>
                </select>

                {/* main content editor */}
                <label htmlFor="originalContentEditor">Περιεχόμενο</label>
                <div className="mb-3 mt-3">
                    <div className={styles.editorBc}>
                        {originalContentJSX}
                    </div>
                </div>

            </div>

            <div className="container">
                <div className="row justify-content-around">
                    {/* cancel button */}
                    <div className="col-auto">
                        <Link href="/chemistry/elements" passHref>
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
    );
}

export default ElementForm;
