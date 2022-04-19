import React from "react";
import Link from 'next/link';
import styles from '../../styles/AppendixForm.module.css';
import { useState, useEffect } from 'react';
import ChemEditor from './Editor';

function AppendixForm({ data, newContent: newAppendix }) {
    let id = 0;
    let title = "";
    let taksi = 0;

    let originalAppendix = "";
    let changeOriginalAppendix = (appendix) => {
        originalAppendix = appendix;
    }

    const [useEditors, changeUseEditors] = useState(false);

    if (newAppendix !== "1") {
        id = data.id;
        title = data.title;
        taksi = data.taksh;
        originalAppendix = data.main_content;
    }

    let originalAppendixJSX = useEditors ? <ChemEditor value={originalAppendix} onChange={changeOriginalAppendix} /> : <></>;

    /* eslint-disable */
    useEffect(() => {
        // import and set editors
        if (!useEditors) {
            changeUseEditors(true);
        }

        if (newAppendix !== "1") {
            document.getElementById("titlos").value = title;
            document.getElementById("taksi").value = taksi;
        }
    }, []);

    const saveCallback = async () => {
        // get fields
        title = document.getElementById("titlos").value.trim();
        taksi = parseInt(document.getElementById("taksi").value);

        if (title === "") {
            alert("Fields cannot be empty!");
            return;
        }

        if (newAppendix === "1") {
            // save new word
            const response = await fetch('/api/chemistry/createChemAppendix', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, taksh: parseInt(taksi), main_content: originalAppendix }),
            });

            const data = await response.json();
            if (data.status !== "success") {
                alert("Error: " + data.data.error);
            }

            alert("Succesfully added appendix");

            // redirect to main page
            window.location.href = "/chemistry/appendix";
        } else {
            const response = await fetch('/api/chemistry/updateChemAppendix', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id, title, taksh: parseInt(taksi), main_content: originalAppendix }),
            });

            if (response.status !== 204) {
                const data = await response.json();
                alert("Error: " + data.data.error);
            }

            alert("Succesfully updated appendix");

            // redirect to main page
            window.location.href = "/chemistry/appendix";
        }
    }

    return (
        <div className={styles.main}>
            <div className="form-group mb-4">
                {/* title */}
                <label htmlFor="titlos">Τίτλος</label>
                <input type="text" className="form-control mb-3 mt-3" id="titlos" placeholder="Τίτλος" autoComplete="off"></input>

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
                        {originalAppendixJSX}
                    </div>
                </div>

            </div>

            <div className="container">
                <div className="row justify-content-around">
                    {/* cancel button */}
                    <div className="col-auto">
                        <Link href="/chemistry/appendix" passHref>
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

export default AppendixForm;
