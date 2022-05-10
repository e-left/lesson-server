import React from "react";
import Link from 'next/link';
import styles from '../../styles/CurriculumForm.module.css';
import { useState, useEffect } from 'react';
import PhysicsEditor from './Editor';

function CurriculumForm({ data, newContent: newCurriculum }) {
    let id = 0;
    let taksi = 0;

    let originalCurriculum = "";
    let changeOriginalCurriculum = (curriculum) => {
        originalCurriculum = curriculum;
    }

    const [useEditors, changeUseEditors] = useState(false);

    if (newCurriculum !== "1") {
        id = data.id;
        taksi = data.taksh;
        originalCurriculum = data.main_content;
    }

    let originalCurriculumJSX = useEditors ? <PhysicsEditor value={originalCurriculum} onChange={changeOriginalCurriculum} /> : <></>;

    /* eslint-disable */
    useEffect(() => {
        // import and set editors
        if (!useEditors) {
            changeUseEditors(true);
        }

        if (newCurriculum !== "1") {
            document.getElementById("taksi").value = taksi;
        }
    }, []);

    const saveCallback = async () => {
        // get fields
        taksi = parseInt(document.getElementById("taksi").value);

        if (newCurriculum === "1") {
            // save new word
            const response = await fetch('/api/physics/createPhysicsCurriculum', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ taksh: parseInt(taksi), main_content: originalCurriculum }),
            });

            const data = await response.json();
            if (data.status !== "success") {
                alert("Error: " + data.data.error);
            }

            alert("Succesfully added curriculum");

            // redirect to main page
            window.location.href = "/physics/curriculum";
        } else {
            const response = await fetch('/api/physics/updatePhysicsCurriculum', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id, taksh: parseInt(taksi), main_content: originalCurriculum }),
            });

            if (response.status !== 204) {
                const data = await response.json();
                alert("Error: " + data.data.error);
            }

            alert("Succesfully updated curriculum");

            // redirect to main page
            window.location.href = "/physics/curriculum";
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
                        {originalCurriculumJSX}
                    </div>
                </div>

            </div>

            <div className="container">
                <div className="row justify-content-around">
                    {/* cancel button */}
                    <div className="col-auto">
                        <Link href="/physics/curriculum" passHref>
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

export default CurriculumForm;
