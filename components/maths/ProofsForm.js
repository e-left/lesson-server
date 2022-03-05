import React from "react";
import Link from 'next/link';
import styles from '../../styles/ProofsForm.module.css';
import { useState, useEffect } from 'react';
import MathsEditor from './Editor';

function ProofsForm({ data, newContent: newProof }) {
    let id = 0;
    let taksi = 0;

    let originalProof = "";
    let changeOriginalProof = (proof) => {
        originalProof = proof;
    }

    const [useEditors, changeUseEditors] = useState(false);

    if (newProof !== "1") {
        id = data.id;
        taksi = data.taksh;
        originalProof = data.main_content;
    }

    let originalProofJSX = useEditors ? <MathsEditor value={originalProof} onChange={changeOriginalProof} /> : <></>;

    /* eslint-disable */
    useEffect(() => {
        // import and set editors
        if (!useEditors) {
            changeUseEditors(true);
        }

        if (newProof !== "1") {
            document.getElementById("taksi").value = taksi;
        }
    }, []);

    const saveCallback = async () => {
        // get fields
        taksi = parseInt(document.getElementById("taksi").value);

        if (newProof === "1") {
            // save new word
            const response = await fetch('/api/maths/createMathsProofs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ taksh: parseInt(taksi), main_content: originalProof }),
            });

            const data = await response.json();
            if (data.status !== "success") {
                alert("Error: " + data.data.error);
            }

            alert("Succesfully added proof");

            // redirect to main page
            window.location.href = "/maths/proofs";
        } else {
            const response = await fetch('/api/maths/updateMathsProofs', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id, taksh: parseInt(taksi), main_content: originalProof }),
            });

            if (response.status !== 204) {
                const data = await response.json();
                alert("Error: " + data.data.error);
            }

            alert("Succesfully updated proof");

            // redirect to main page
            window.location.href = "/maths/proofs";
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
                        {originalProofJSX}
                    </div>
                </div>

            </div>

            <div className="container">
                <div className="row justify-content-around">
                    {/* cancel button */}
                    <div className="col-auto">
                        <Link href="/maths/proofs" passHref>
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

export default ProofsForm;
