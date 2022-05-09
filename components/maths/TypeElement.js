import React, { useState, useEffect } from "react";
import styles from '../../styles/TypesElement.module.css';
import Link from 'next/link';

function TypeElement({ data, initial }) {

    const returnDeleteCallback = (id) => {
        return async () => {
            const response = await fetch('/api/maths/deleteMathsTypes', {
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
                    {/* taksi */}
                    <div className="col col-4">
                        <b>
                            Τάξη
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
        const editLink = "/maths/types/editType/" + data.id.toString();
        let taksi = "";
        switch (data.taksh) {
            case 1 :{
                taksi = "Α' Γυμνασίου";
                break
            }
            case 2 :{
                taksi = "Β' Γυμνασίου";
                break
            }
            case 3 :{
                taksi = "Γ' Γυμνασίου";
                break
            }
            case 4 :{
                taksi = "Α' Λυκείου";
                break
            }
            case 5 :{
                taksi = "Β' Λυκείου";
                break
            }
            case 6 :{
                taksi = "Γ' Λυκείου ΓΕΛ";
                break
            }
            case 7 :{
                taksi = "Γ' Λυκείου ΕΠΑΛ";
                break
            }
        }
        return <div className="container">
            <div className={styles.main}>
                <div className="row justify-content-around">
                    {/* taksh */}
                    <div className="col col-4">
                        {taksi}
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

export default TypeElement;
