import React from "react";
import Link from 'next/link';
import styles from '../../styles/TranslationForm.module.css';
import { useState, useEffect } from 'react';
import AncientGreekEditor from './Editor';

function TranslationForm({ data, newTranslation }) {
    let title = "";
    let id = 0;
    let chapter = "";

    let originalText = "";
    let changeOriginalText = (text) => {
        originalText = text;
    }

    let translatedText = "";
    let changeTranslatedText = (text) => {
        translatedText = text;
    }

    let syntacticAnalysis = "";
    let changeSyntacticAnalysis = (text) => {
        syntacticAnalysis = text;
    }

    const [useEditors, changeUseEditors] = useState(false);

    if (newTranslation !== "1") {
        title = data.title;
        id = data.id;
        chapter = data.chapter;
        originalText = data.original_text;
        translatedText = data.translated_text;
        syntacticAnalysis = data.syntactic_analysis;
    }
    console.log(originalText);

    let originalTextJSX = useEditors ? <AncientGreekEditor starterText={originalText} changeText={changeOriginalText} /> : <></>;
    let translatedTextJSX = useEditors ? <AncientGreekEditor starterText={translatedText} changeText={changeTranslatedText} /> : <></>;
    let syntacticAnalysisJSX = useEditors ? <AncientGreekEditor starterText={syntacticAnalysis} changeText={changeSyntacticAnalysis} /> : <></>;


    /* eslint-disable */
    useEffect(() => {
        // import and set editors
        if (!useEditors) {
            changeUseEditors(true);
        }

        if (newTranslation !== "1") {
            document.getElementById("title").value = title;
            document.getElementById("chapter").value = chapter;
        }
    }, []);

    const saveCallback = async () => {
        // get fields
        title = document.getElementById("title").value.trim();
        chapter = document.getElementById("chapter").value.trim();

        if (title === "") {
            alert("Fields cannot be empty!");
            return;
        }

        if (newTranslation === "1") {
            // save new word
            const response = await fetch('/api/ancientGreek/addAncientTranslation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, chapter, original_text: originalText, translated_text: translatedText, syntactic_analysis: syntacticAnalysis }),
            });

            const data = await response.json();
            if (data.status !== "success") {
                alert("Error: " + data.data.error);
            }

            alert("Succesfully added translation");

            // redirect to main page
            window.location.href = "/ancientgreek/translations";
        } else {
            const response = await fetch('/api/ancientGreek/updateAncientTranslation', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id, title, chapter, original_text: originalText, translated_text: translatedText, syntactic_analysis: syntacticAnalysis }),
            });

            if (response.status !== 204) {
                const data = await response.json();
                alert("Error: " + data.data.error);
            }

            alert("Succesfully updated translation");

            // redirect to main page
            window.location.href = "/ancientgreek/translations";
        }
    }

    return (
        <div className={styles.main}>
            <div className="form-group mb-4">
                {/* chapter */}
                <label htmlFor="chapter">Κεφάλαιο</label>
                <input type="text" className="form-control mb-3 mt-3" id="chapter" placeholder="Κεφάλαιο" autoComplete="off"></input>

                {/* title */}
                <label htmlFor="title">Μετάφραση</label>
                <input type="text" className="form-control mb-3 mt-3" id="title" placeholder="Τίτλος μετάφρασης" autoComplete="off"></input>

                {/* original text editor */}
                <label htmlFor="originalText">Πρωτότυπο</label>
                <div className="mb-3 mt-3">
                    <div className={styles.editorBc}>
                        {originalTextJSX}
                    </div>
                </div>

                {/* translated text editor */}
                <label htmlFor="translatedText">Μετάφραση</label>
                <div className="mb-3 mt-3">
                    <div className={styles.editorBc}>
                        {translatedTextJSX}
                    </div>
                </div>

                {/* syntactic analysis editor */}
                <label htmlFor="syntacticAnalysis">Συντακτική ανάλυση</label>
                <div className="mb-3 mt-3">
                    <div className={styles.editorBc}>
                        {syntacticAnalysisJSX}
                    </div>
                </div>

            </div>

            <div className="container">
                <div className="row justify-content-around">
                    {/* cancel button */}
                    <div className="col-auto">
                        <Link href="/ancientgreek/translations" passHref>
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

export default TranslationForm;
