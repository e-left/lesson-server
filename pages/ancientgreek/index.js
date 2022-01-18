import TopBar from "../../components/TopBar";
import WordList from '../../components/WordList';
import Head from 'next/head';
import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import styles from './index.module.css';

export default function AncientGreek() {
    let [searchString, updateSearchString] = useState("");
    let [page, changePage] = useState(0);
    let [data, changeData] = useState([])
    let [resWords, changeResWords] = useState([]);
    let [moreWords, changeMoreWords] = useState(false);

    useEffect(() => {
        fetch(process.env.api + "/getAncientWords/" + page)
            .then(res => res.json())
            .then(data => {
                changeData(data.data);
                changeMoreWords(data.moreWords);
            })
            .catch(() => { });
    }, [page]);

    useEffect(() => {
        if (searchString !== "") {
            fetch(process.env.api + "/getAncientWordsByQuery/" + searchString)
                .then(res => res.json())
                .then(data => {
                    changeMoreWords(false);
                    changeResWords(data.data);
                })
                .catch(() => { });
        } else {
            changeResWords(data);
        }
    }, [data, searchString]);

    const backButton = page !== 0
        ? <button type="button" className="btn btn-lg btn-secondary" onClick={() => changePage(page - 1)}><i className="bi bi-arrow-left"></i></button>
        : <button type="button" className="btn btn-lg btn-secondary" onClick={() => changePage(page - 1)} disabled><i className="bi bi-arrow-left"></i></button>;

    const nextButton = moreWords
        ? <button type="button" className="btn btn-lg btn-secondary" onClick={() => changePage(page + 1)}><i className="bi bi-arrow-right"></i></button>
        : <button type="button" className="btn btn-lg btn-secondary" onClick={() => changePage(page + 1)} disabled><i className="bi bi-arrow-right"></i></button>;

    return <>
        <Head>
            <title>Ancient Greek</title>
        </Head>
        <TopBar searchString={searchString} searchFunction={updateSearchString} />
        <WordList data={resWords} />
        <div className="container">
            <div className={styles.buttonContainer}>
                <div className="row justify-content-center align-items-center">
                    <div className="col col-auto">
                        {backButton}
                    </div>
                    <div className="col col-auto">
                        {nextButton}
                    </div>
                </div>
            </div>
        </div>

    </>;
}

export async function getServerSideProps(context) {
    // get logged in user
    const session = await getSession(context);
    // if unauthorized go to login page
    if (!session || (session.user.permissions !== "all" && session.user.permissions !== "ancientgreek")) {
        return {
            redirect: {
                permanent: false,
                destination: "/"
            }
        }
    }

    return {
        props: {}
    };

    // const res = await fetch(process.env.api + "/getAncientWords/" + page);
    // if (!res.ok) {
    //     return {
    //         // props: { data: [] }
    //         props: { data: [] }
    //     }
    // }

    // const data = await res.json()

    // return {
    //     props: data
    // };
}
