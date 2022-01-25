import React from "react";
import styles from '../../styles/TranslationElement.module.css';
import Link from 'next/link';

function TranslationElement({ data, initial }) {

    const returnDeleteCallback = (id) => {
        return async () => {
            const response = await fetch('/api/ancientGreek/deleteAncientTranslation', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id }),
            });

            if (response.status !== 200) {
                const data = await response.json();
                alert("Error: " + data.data.error);
                return;
            }

            window.location.reload();
        }
    }

    // render top row
    if (initial === "1") {
        return <div className="container">
            <div className={styles.toprow}>
                <div className="row justify-content-around align-items-center">
                    {/* category */}
                    <div className="col col-1">
                        <b>
                            Chapter
                        </b>
                    </div>

                    {/* title */}
                    <div className="col col-2">
                        <b>
                            Title
                        </b>
                    </div>

                    {/* content */}
                    {/*
                    <div className="col col-7">

                        <div className={styles.content}>
                            <b>
                                Content
                            </b>

                        </div>

                    </div>
                */}

                    {/* edit button */}
                    <div className="col col-1">
                        <b>
                            Edit
                        </b>
                    </div>

                    {/* delete button */}
                    <div className="col col-1">
                        <b>
                            Delete
                        </b>
                    </div>
                </div>
            </div>
        </div>;

    } else {
        const editLink = "/ancientgreek/translations/editTranslation/" + data.id.toString();
        return <div className="container">
            <div className={styles.main}>
                <div className="row justify-content-around">
                    {/* category */}
                    <div className="col col-1">
                        {data.chapter}
                    </div>

                    {/* title */}
                    <div className="col col-2">
                        {data.title}
                    </div>

                    {/* edit button */}
                    <div className="col col-1">
                        <Link href={editLink}>
                            <button type="button" className="btn btn-warning"><i className="bi bi-pencil-fill"></i></button>
                        </Link>
                    </div>

                    {/* delete button */}
                    <div className="col col-1">
                        <button type="button" className="btn btn-danger" onClick={returnDeleteCallback(data.id)}><i className="bi bi-trash-fill"></i></button>
                    </div>
                </div>
            </div>
        </div>;
    }
}

export default TranslationElement;
