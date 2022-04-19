import React, { useState, useEffect } from "react";
import styles from '../../styles/ElementElement.module.css';
import Link from 'next/link';

function ElementElement({ data, initial }) {

    let [userName, changeUserName] = useState("");

    useEffect(async () => {
        if (initial !== "1") {
            const response = await fetch('/api/getUserNameById/' + data.userid.toString());
            const jsonData = await response.json();
            console.log(jsonData);
            changeUserName(jsonData.name);
        }
    }, []);

    const returnDeleteCallback = (id) => {
        return async () => {
            const response = await fetch('/api/chemistry/deleteChemElement', {
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
                            Όνομα
                        </b>
                    </div>

                    {/* type */}
                    <div className="col col-1">
                        <b>
                            Τύπος
                        </b>
                    </div>

                    {/* user */}
                    <div className="col col-1">

                        <b>
                            User
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
        const editLink = "/chemistry/elements/editElement/" + data.id.toString();
        let typos = "";
        if (data.typos == "stoixeio") {
            typos = "Στοιχείο";
        }
        if (data.typos == "anenwsh") {
            typos = "Ανόργανη Ένωση";
        }
        if (data.typos == "orenwsh") {
            typos = "Οργανική Ένωση";
        }
        if (data.typos == "antidrash") {
            typos = "Χημική Αντίδραση";
        }
        return <div className="container">
            <div className={styles.main}>
                <div className="row justify-content-around">
                    {/* onoma */}
                    <div className="col col-1">
                        {data.title}
                    </div>

                    {/* typos */}
                    <div className="col col-1">
                        {typos}
                    </div>

                    {/* username */}
                    <div className="col col-1">
                        {userName}
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

export default ElementElement;
