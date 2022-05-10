import TopBar from "../../../components/physics/TopBar";
import SosTheoryList from '../../../components/physics/SosTheoryList';
import Head from 'next/head';
import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";

export default function PhysicsSosTheory() {
    let [searchString, updateSearchString] = useState("");
    let [data, changeData] = useState([])
    let [resSosTheory, changeResSosTheory] = useState([]);
    let [count, changeCount] = useState(0);

    useEffect(() => {
        fetch(process.env.api + "/physics/getPhysicsSosTheory/")
            .then(res => res.json())
            .then(data => {
                changeData(data.data);
                changeCount(data.count);
            })
            .catch(() => { });
    }, []);

    useEffect(() => {
        if (searchString !== "") {
            fetch(process.env.api + "/physics/getPhysicsSosTheoryByQuery/" + searchString)
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
            <title>Physics Sos Theory</title>
        </Head>
        <TopBar searchString={searchString} count={count} searchFunction={updateSearchString} content="New theory" title="Physics Sos Theory" addLink="/physics/sostheory/addsostheory" />
        <SosTheoryList data={resSosTheory} />
    </>;
}

export async function getServerSideProps(context) {
    // get logged in user
    const session = await getSession(context);
    // if unauthorized go to login page
    if (!session || (session.user.permissions !== "all" && session.user.permissions !== "physics")) {
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
