import React from "react";
import Link from 'next/link';
import styles from '../../styles/BookExerciseForm.module.css';
import { useState, useEffect } from 'react';
import PhysicsEditor from './Editor';

function BookExerciseForm({ data, newContent }) {
    let id = 0;
    let title = "";
    let pageNumber = 0;
    let exNumber = 0;
    let taksi = 0;

    let originalContent = "";
    let changeOriginalContent = (content) => {
        originalContent = content;
    }

    const [useEditors, changeUseEditors] = useState(false);

    if (newContent !== "1") {
        id = data.id;
        title = data.title;
        pageNumber = data.pageNumber;
        exNumber = data.exNumber;
        taksi = data.taksh;
        originalContent = data.main_content;
    }

    let originalContentJSX = useEditors ? <PhysicsEditor value={originalContent} onChange={changeOriginalContent} /> : <></>;

    /* eslint-disable */
    useEffect(() => {
        // import and set editors
        if (!useEditors) {
            changeUseEditors(true);
        }

        if (newContent !== "1") {
            document.getElementById("titlos").value = title;
            document.getElementById("pageNumber").value = pageNumber;
            document.getElementById("exNumber").value = exNumber;
            document.getElementById("taksi").value = taksi;
        }
    }, []);

    const saveCallback = async () => {
        // get fields
        title = document.getElementById("titlos").value;
        pageNumber = parseInt(document.getElementById("pageNumber").value);
        exNumber = parseInt(document.getElementById("exNumber").value);
        taksi = parseInt(document.getElementById("taksi").value);

        if (title === "") {
            alert("Fields cannot be empty!");
            return;
        }

        if (newContent === "1") {
            // save new word
            const response = await fetch('/api/physics/createPhysicsBookExercise', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, page_number: parseInt(pageNumber), ex_number: parseInt(exNumber), taksh: parseInt(taksi), main_content: originalContent }),
            });

            const data = await response.json();
            if (data.status !== "success") {
                alert("Error: " + data.data.error);
            }

            alert("Succesfully added book exercise");

            // redirect to main page
            window.location.href = "/physics/bookexercises";
        } else {
            const response = await fetch('/api/physics/updatePhysicsBookExercise', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id, title, page_number: parseInt(pageNumber), ex_number: parseInt(exNumber), taksh: parseInt(taksi), main_content: originalContent }),
            });

            if (response.status !== 204) {
                const data = await response.json();
                alert("Error: " + data.data.error);
            }

            alert("Succesfully updated book exersise");

            // redirect to main page
            window.location.href = "/physics/bookexercises";
        }
    }

    return (
        <div className={styles.main}>
            <div className="form-group mb-4">
                {/* titlos */}
                <label htmlFor="titlos">????????????</label>
                <input type="text" className="form-control mb-3 mt-3" id="titlos" placeholder="????????????" autoComplete="off"></input>

                {/* page number */}
                <label htmlFor="pageNumber">?????????????? ??????????????</label>
                <input type="number" className="form-control mb-3 mt-3" id="pageNumber" placeholder="?????????????? ??????????????" autoComplete="off"></input>

                {/* exercise number */}
                <label htmlFor="exNumber">?????????????? ??????????????</label>
                <input type="number" className="form-control mb-3 mt-3" id="exNumber" placeholder="?????????????? ??????????????" autoComplete="off"></input>

                {/* taksi */}
                <label htmlFor="taksi">????????</label>
                <select className="form-control mb-3 mt-3" name="taksi" id="taksi">
                    <option value="1">??' ??????????????????</option>
                    <option value="2">??' ??????????????????</option>
                    <option value="3">??' ??????????????????</option>
                    <option value="4">??' ??????????????</option>
                    <option value="5">??' ??????????????</option>
                    <option value="6">??' ?????????????? ??????</option>
                    <option value="7">??' ?????????????? ????????</option>
                </select>
                {/* <input type="number" className="form-control mb-3 mt-3" id="taksi" placeholder="0" autoComplete="off"></input> */}

                {/* main content editor */}
                <label htmlFor="originalContentEditor">??????????????????????</label>
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
                        <Link href="/physics/bookexercises" passHref>
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

export default BookExerciseForm;
