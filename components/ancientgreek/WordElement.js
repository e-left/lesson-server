import React, { useState, useEffect } from "react";
import styles from '../../styles/WordElement.module.css';
import Link from 'next/link';

function WordElement({ data, initial }) {
    const returnDeleteCallback = (id) => {
        return async () => {
            const response = await fetch('/api/ancientGreek/deleteAncientWord', {
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
                    {/* title */}
                    <div className="col col-2">
                        <b>
                            Title
                        </b>
                    </div>

                    {/* category */}
                    <div className="col col-2">
                        <b>
                            Category
                        </b>
                    </div>

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
        const editLink = "/ancientgreek/words/editWord/" + data.id.toString();

        let categoryText;
        if (data.category === "rhma") {
            categoryText = "????????";
        }

        if (data.category === "ous") {
            categoryText = "????????????????????";
        }

        if (data.category === "epi") {
            categoryText = "??????????????";
        }

        if (data.category === "ap") {
            categoryText = "??????????????????";
        }

        return <div className="container">
            <div className={styles.main}>
                <div className="row justify-content-around">
                    {/* title */}
                    <div className="col col-2">
                        {data.title}
                    </div>

                    {/* category */}
                    <div className="col col-2">
                        {categoryText}
                    </div>

                    {/* edit button */}
                    <div className="col col-1">
                        <Link href={editLink} passHref>
                            <a  >
                                <button type="button" className="btn btn-warning"><i className="bi bi-pencil-fill"></i></button>
                            </a>
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
