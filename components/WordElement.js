import React from "react";
import styles from './WordElement.module.css';
import Link from 'next/link';

function WordElement({ data, initial }) {

    const returnDeleteCallback = (id) => {
        return async () => {
            const response = await fetch('/api/deleteAncientWord', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id }),
            });

            if (response.status !== 204) {
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
                    {/* title */}
                    <div className="col col-2">
                        <b>
                            Title
                        </b>
                    </div>

                    {/* category */}
                    <div className="col col-1">
                        <b>
                            Category
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
        const editLink = "/ancientgreek/editWord/" + data.id.toString();

        let categoryText;
        if (data.category === "rhma") {
            categoryText = "Ρήμα";
        }

        if (data.category === "ous") {
            categoryText = "Ουσιαστικό";
        }

        if (data.category === "epi") {
            categoryText = "Επίθετο";
        }

        if (data.category === "ap") {
            categoryText = "Απαρέμφατο";
        }

        return <div className="container">
            <div className={styles.main}>
                <div className="row justify-content-around">
                    {/* title */}
                    <div className="col col-2">
                        {data.title}
                    </div>

                    {/* category */}
                    <div className="col col-1">
                        {categoryText}
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

export default WordElement
