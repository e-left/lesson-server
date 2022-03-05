import TopBar from "../../../components/maths/TopBar";
import SosTheoryList from '../../../components/maths/SosTheoryList';
import Head from 'next/head';
import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";

export default function MathsSosTheory() {
    let [searchString, updateSearchString] = useState("");
    let [data, changeData] = useState([])
    let [resSosTheory, changeResSosTheory] = useState([]);
    let [count, changeCount] = useState(0);

    useEffect(() => {
        fetch(process.env.api + "/maths/getMathsSosTheory/")
            .then(res => res.json())
            .then(data => {
                changeData(data.data);
                changeCount(data.count);
            })
            .catch(() => { });
    }, []);

    useEffect(() => {
        if (searchString !== "") {
            fetch(process.env.api + "/maths/getMathsSosTheoryByQuery/" + searchString)
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
            <title>Maths Sos Theory</title>
        </Head>
        <TopBar searchString={searchString} count={count} searchFunction={updateSearchString} content="New theory" title="Maths Sos Theory" addLink="/maths/sostheory/addsostheory" />
        <SosTheoryList data={resSosTheory} />
    </>;
}

export async function getServerSideProps(context) {
    // get logged in user
    const session = await getSession(context);
    // if unauthorized go to login page
    if (!session || (session.user.permissions !== "all" && session.user.permissions !== "maths")) {
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
