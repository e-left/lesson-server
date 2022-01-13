import React from 'react';
import styles from './TopBar.module.css';
import Link from 'next/link';
import { signOut } from "next-auth/react";

function TopBar({ searchString, searchFunction }) {

    const inputOnChange = () => {
        if (document.getElementById("searchbar").value !== searchString) {
            searchFunction(document.getElementById("searchbar").value.trim());
        }
    }

    return (
        <div className="container">
            {/* Left to right:
        1) new word button
        2) search bar
        3) logout button */}
            <div className={styles.topbar}>
                <h2 className={styles.maintext}>Ancient Greek</h2>
                <hr></hr>
                <div className="row justify-content-around">

                    {/* new word button */}
                    <div className="col-auto">
                        <Link href="/ancientgreek/addword">
                            <button type="button" className="btn btn-success btn-lg">
                                <i className="bi bi-plus"></i>New word
                            </button>
                        </Link>

                    </div>

                    {/* search bar */}
                    <div className="col-auto">
                        <input type="text" className={styles.searchbar} id="searchbar" onChange={inputOnChange} placeholder="Search anything!"></input>
                    </div>

                    {/* logout */}
                    <div className="col-auto">
                        <Link href="/">
                            <button type="button" className="btn btn-dark btn-lg"><i className="bi bi-backspace-fill"></i>Index</button>
                        </Link>
                    </div>

                </div>
            </div>
        </div>);
}

export default TopBar;
