import TopBar from "../../../components/chem/TopBar";
import ElementList from '../../../components/chem/ElementList';
import Head from 'next/head';
import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";

export default function ChemElements() {
    let [searchString, updateSearchString] = useState("");
    let [data, changeData] = useState([])
    let [resContent, changeResContent] = useState([]);
    let [count, changeCount] = useState(0);

    useEffect(() => {
        fetch(process.env.api + "/chemistry/getChemElement/")
            .then(res => res.json())
            .then(data => {
                changeData(data.data);
                changeCount(data.count);
            })
            .catch(() => { });
    }, []);

    useEffect(() => {
        if (searchString !== "") {
            fetch(process.env.api + "/chemistry/getChemElementByQuery/" + searchString)
                .then(res => res.json())
                .then(data => {
                    changeResContent(data.data);
                    changeCount(data.count);
                })
                .catch(() => { });
        } else {
            changeResContent(data);
            changeCount(data.length);
        }
    }, [data, searchString]);


    return <>
        <Head>
            <title>Chemistry Elements</title>
        </Head>
        <TopBar searchString={searchString} count={count} searchFunction={updateSearchString} content="New Element" title="Chemistry Elements" addLink="/chemistry/elements/addelement" />
        <ElementList data={resContent} />
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
