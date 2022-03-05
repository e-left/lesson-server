import React from "react";
import Link from 'next/link';
import styles from '../../styles/ContentForm.module.css';
import { useState, useEffect } from 'react';
import MathsEditor from './Editor';

function ContentForm({ data, newContent }) {
    let id = 0;
    let kefalaio = "";
    let enothta = "";
    let taksi = 0;

    let originalContent = "";
    let changeOriginalContent = (content) => {
        originalContent = content;
    }

    const [useEditors, changeUseEditors] = useState(false);

    if (newContent !== "1") {
        id = data.id;
        kefalaio = data.kefalaio;
        enothta = data.enothta;
        taksi = data.taksh;
        originalContent = data.main_content;
    }

    let originalContentJSX = useEditors ? <MathsEditor value={originalContent} onChange={changeOriginalContent} /> : <></>;

    /* eslint-disable */
    useEffect(() => {
        // import and set editors
        if (!useEditors) {
            changeUseEditors(true);
        }

        if (newContent !== "1") {
            document.getElementById("kefalaio").value = kefalaio;
            document.getElementById("enothta").value = enothta;
            document.getElementById("taksi").value = taksi;
        }
    }, []);

    const saveCallback = async () => {
        // get fields
        kefalaio = document.getElementById("kefalaio").value.trim();
        enothta = document.getElementById("enothta").value.trim();
        taksi = parseInt(document.getElementById("taksi").value);

        if (kefalaio === "" || enothta === "") {
            alert("Fields cannot be empty!");
            return;
        }

        if (newContent === "1") {
            // save new word
            const response = await fetch('/api/maths/createMathsContent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ kefalaio, enothta, taksh: parseInt(taksi), main_content: originalContent }),
            });

            const data = await response.json();
            if (data.status !== "success") {
                alert("Error: " + data.data.error);
            }

            alert("Succesfully added content");

            // redirect to main page
            window.location.href = "/maths/maincontent";
        } else {
            const response = await fetch('/api/maths/updateMathsContent', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id, kefalaio, enothta, taksh: parseInt(taksi), main_content: originalContent }),
            });

            if (response.status !== 204) {
                const data = await response.json();
                alert("Error: " + data.data.error);
            }

            alert("Succesfully updated content");

            // redirect to main page
            window.location.href = "/maths/maincontent";
        }
    }

    return (
        <div className={styles.main}>
            <div className="form-group mb-4">
                {/* enothta */}
                <label htmlFor="enothta">Ενότητα</label>
                <input type="text" className="form-control mb-3 mt-3" id="enothta" placeholder="Ενότητα" autoComplete="off"></input>

                {/* kefalaio */}
                <label htmlFor="kefalaio">Κεφάλαιο</label>
                <input type="text" className="form-control mb-3 mt-3" id="kefalaio" placeholder="Κεφάλαιο" autoComplete="off"></input>

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
                        {originalContentJSX}
                    </div>
                </div>

            </div>

            <div className="container">
                <div className="row justify-content-around">
                    {/* cancel button */}
                    <div className="col-auto">
                        <Link href="/maths/maincontent" passHref>
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

export default ContentForm;
