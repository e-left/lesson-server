import TopBar from "../../../components/chem/TopBar";
import ElementList from '../../../components/chem/ElementList';
import Head from 'next/head';
import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import styles from '../../../styles/Words.module.css';

export default function ChemElements() {
    let [searchString, updateSearchString] = useState("");
    let [page, changePage] = useState(0);
    let [data, changeData] = useState([])
    let [resContent, changeResContent] = useState([]);
    let [moreElements, changeMoreElements] = useState(false);
    let [count, changeCount] = useState(0);

    useEffect(() => {
        fetch(process.env.api + "/chemistry/getChemElement/" + page)
            .then(res => res.json())
            .then(data => {
                changeData(data.data);
                changeCount(data.count);
                changeMoreElements(data.moreElements);
            })
            .catch(() => { });
    }, [page]);

    useEffect(() => {
        if (searchString !== "") {
            fetch(process.env.api + "/chemistry/getChemElementByQuery/" + searchString)
                .then(res => res.json())
                .then(data => {
                    changeMoreElements(false);
                    changeResContent(data.data);
                    changeCount(data.count);
                })
                .catch(() => { });
        } else {
            changeResContent(data);
            changeCount(data.length);
        }
    }, [data, searchString]);

    const backButton = page !== 0
        ? <button type="button" className="btn btn-lg btn-secondary" onClick={() => changePage(page - 1)}><i className="bi bi-arrow-left"></i></button>
        : <button type="button" className="btn btn-lg btn-secondary" onClick={() => changePage(page - 1)} disabled><i className="bi bi-arrow-left"></i></button>;

    const nextButton = moreElements
        ? <button type="button" className="btn btn-lg btn-secondary" onClick={() => changePage(page + 1)}><i className="bi bi-arrow-right"></i></button>
        : <button type="button" className="btn btn-lg btn-secondary" onClick={() => changePage(page + 1)} disabled><i className="bi bi-arrow-right"></i></button>;

    return <>
        <Head>
            <title>Chemistry Elements</title>
        </Head>
        <TopBar searchString={searchString} count={count} searchFunction={updateSearchString} content="New Element" title="Chemistry Elements" addLink="/chemistry/elements/addelement" />
        <ElementList data={resContent} />
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
    if (!session || (session.user.permissions !== "all" && session.user.permissions !== "chem")) {
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
}
