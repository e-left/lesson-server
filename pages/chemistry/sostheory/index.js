import TopBar from "../../../components/chem/TopBar";
import SosTheoryList from '../../../components/chem/SosTheoryList';
import Head from 'next/head';
import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";

export default function ChemSosTheory() {
    let [searchString, updateSearchString] = useState("");
    let [data, changeData] = useState([])
    let [resSosTheory, changeResSosTheory] = useState([]);
    let [count, changeCount] = useState(0);

    useEffect(() => {
        fetch(process.env.api + "/chemistry/getChemSosTheory/")
            .then(res => res.json())
            .then(data => {
                changeData(data.data);
                changeCount(data.count);
            })
            .catch(() => { });
    }, []);

    useEffect(() => {
        if (searchString !== "") {
            fetch(process.env.api + "/chemistry/getChemSosTheoryByQuery/" + searchString)
                .then(res => res.json())
                .then(data => {
                    changeResSosTheory(data.data);
                    changeCount(data.count);
                })
                .catch(() => { });
        } else {
            changeResSosTheory(data);
            changeCount(data.length);
        }
    }, [data, searchString]);


    return <>
        <Head>
            <title>Chemistry Sos Theory</title>
        </Head>
        <TopBar searchString={searchString} count={count} searchFunction={updateSearchString} content="New theory" title="Chemistry Sos Theory" addLink="/chemistry/sostheory/addsostheory" />
        <SosTheoryList data={resSosTheory} />
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
