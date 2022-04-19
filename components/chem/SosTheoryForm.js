import React from "react";
import Link from 'next/link';
import styles from '../../styles/SosTheoryForm.module.css';
import { useState, useEffect } from 'react';
import ChemEditor from './Editor';

function SosTheoryForm({ data, newContent: newTheory }) {
    let id = 0;
    let taksi = 0;

    let originalTheory = "";
    let changeOriginalTheory = (theory) => {
        originalTheory = theory;
    }

    const [useEditors, changeUseEditors] = useState(false);

    if (newTheory !== "1") {
        id = data.id;
        taksi = data.taksh;
        originalTheory = data.main_content;
    }

    let originalTheoryJSX = useEditors ? <ChemEditor value={originalTheory} onChange={changeOriginalTheory} /> : <></>;

    /* eslint-disable */
    useEffect(() => {
        // import and set editors
        if (!useEditors) {
            changeUseEditors(true);
        }

        if (newTheory !== "1") {
            document.getElementById("taksi").value = taksi;
        }
    }, []);

    const saveCallback = async () => {
        // get fields
        taksi = parseInt(document.getElementById("taksi").value);

        if (newTheory === "1") {
            // save new word
            const response = await fetch('/api/chemistry/createChemSosTheory', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ taksh: parseInt(taksi), main_content: originalTheory }),
            });

            const data = await response.json();
            if (data.status !== "success") {
                alert("Error: " + data.data.error);
            }

            alert("Succesfully added theory");

            // redirect to main page
            window.location.href = "/chemistry/sostheory";
        } else {
            const response = await fetch('/api/chemistry/updateChemSosTheory', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id, taksh: parseInt(taksi), main_content: originalTheory }),
            });

            if (response.status !== 204) {
                const data = await response.json();
                alert("Error: " + data.data.error);
            }

            alert("Succesfully updated theory");

            // redirect to main page
            window.location.href = "/chemistry/sostheory";
        }
    }

    return (
        <div className={styles.main}>
            <div className="form-group mb-4">
                {/* taksi */}
                <label htmlFor="taksi">Τάξη</label>
                <select className="form-control mb-3 mt-3" name="taksi" id="taksi">
                    <option value="1">Α' Γυμνασίου</option>
                    <option value="2">Β' Γυμνασίου</option>
                    <option value="3">Γ' Γυμνασίου</option>
                    <option value="4">Α' Λυκείου</option>
                    <option value="5">Β' Λυκείου</option>
                    <option value="6">Γ' Λυκείου ΓΕΛ</option>
                    <option value="7">Γ' Λυκείου ΕΠΑΛ</option>
                </select>
                {/* <input type="number" className="form-control mb-3 mt-3" id="taksi" placeholder="0" autoComplete="off"></input> */}

                {/* main content editor */}
                <label htmlFor="originalContentEditor">Περιεχόμενο</label>
                <div className="mb-3 mt-3">
                    <div className={styles.editorBc}>
                        {originalTheoryJSX}
                    </div>
                </div>

            </div>

            <div className="container">
                <div className="row justify-content-around">
                    {/* cancel button */}
                    <div className="col-auto">
                        <Link href="/chemistry/sostheory" passHref>
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

export default SosTheoryForm;
