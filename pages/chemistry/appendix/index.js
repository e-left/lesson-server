import TopBar from "../../../components/chem/TopBar";
import AppendixList from '../../../components/chem/AppendixList';
import Head from 'next/head';
import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";

export default function ChemAppendix() {
    let [searchString, updateSearchString] = useState("");
    let [data, changeData] = useState([])
    let [resAppendix, changeResAppendix] = useState([]);
    let [count, changeCount] = useState(0);

    useEffect(() => {
        fetch(process.env.api + "/chemistry/getChemAppendix/")
            .then(res => res.json())
            .then(data => {
                changeData(data.data);
                changeCount(data.count);
            })
            .catch(() => { });
    }, []);

    useEffect(() => {
        if (searchString !== "") {
            fetch(process.env.api + "/chemistry/getChemAppendixByQuery/" + searchString)
                .then(res => res.json())
                .then(data => {
                    changeResAppendix(data.data);
                    changeCount(data.count);
                })
                .catch(() => { });
        } else {
            changeResAppendix(data);
            changeCount(data.length);
        }
    }, [data, searchString]);


    return <>
        <Head>
            <title>Chemistry Appendix</title>
        </Head>
        <TopBar searchString={searchString} count={count} searchFunction={updateSearchString} content="New Appendix" title="Chemistry Appendix" addLink="/chemistry/appendix/addappendix" />
        <AppendixList data={resAppendix} />
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
