import React, { useState, useEffect } from 'react';
import { getSession } from "next-auth/react";
import { useRouter } from 'next/router'
import styles from '../../styles/Statistics.module.css';
import Head from 'next/head';
import Link from 'next/link';

export default function UserStatistics() {
    // user id
    const router = useRouter();
    const { id } = router.query;

    // user name
    let [userName, changeUserName] = useState("");

    // user statistics
    let [wordCount, changeWordCount] = useState(0);
    let [translationCount, changeTranslationCount] = useState(0);

    useEffect(async () => {
        const nameResponse = await fetch("/api/getUserNameById/" + id.toString());
        const nameJSON = await nameResponse.json();

        const statsResponse = await fetch("/api/getUserStatsById/" + id.toString());
        const statsJSON = await statsResponse.json();

        changeUserName(nameJSON.name);

        changeWordCount(statsJSON.wordCount);
        changeTranslationCount(statsJSON.translationCount);
    }, []);

    return <>
        <Head>
            <title>User Statistics</title>
        </Head>
        <div className="container d-flex justify-content-center mt-5">
            <div className="border border-primary rounded p-3">
                <div className="col justify-content-center">
                    <div className="row p-3 m-3">
                        <p className={styles.text}>Στατιστικά για τον χρήστη: {userName}</p>
                    </div>

                    {/* ancient words */}
                    <div className="row p-3 m-3">
                        <button className="btn btn-secondary btn-lg" disable>Σύνολο λέξεων αρχαίων: {wordCount}</button>
                    </div>

                    {/* translations */}
                    <div className="row p-3 m-3">
                        <button className="btn btn-secondary btn-lg" disable>Σύνολο μεταφράσεων αρχαίων: {translationCount}</button>
                    </div>

                    {/* return button */}
                    <div className="row p-3 m-3">
                        <Link href="/manageUsers">
                            <button type="button" className="btn btn-dark btn-lg"><i className="bi bi-backspace-fill"></i>Back</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export async function getServerSideProps(context) {
    // get logged in user
    const session = await getSession(context);
    // if unauthorized go to login page
    if (!session || session.user.name !== "admin") {
        return {
            redirect: {
                permanent: false,
                destination: "/"
            }
        }
    }

    return {
        props: {}
    }
}
