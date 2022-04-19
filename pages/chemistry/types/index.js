import TopBar from "../../../components/chem/TopBar";
import TypeList from '../../../components/chem/TypeList';
import Head from 'next/head';
import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";

export default function ChemTypes() {
    let [searchString, updateSearchString] = useState("");
    let [data, changeData] = useState([])
    let [resTypes, changeResTypes] = useState([]);
    let [count, changeCount] = useState(0);

    useEffect(() => {
        fetch(process.env.api + "/chemistry/getChemTypes/")
            .then(res => res.json())
            .then(data => {
                changeData(data.data);
                changeCount(data.count);
            })
            .catch(() => { });
    }, []);

    useEffect(() => {
        if (searchString !== "") {
            fetch(process.env.api + "/chemistry/getChemTypesByQuery/" + searchString)
                .then(res => res.json())
                .then(data => {
                    changeResTypes(data.data);
                    changeCount(data.count);
                })
                .catch(() => { });
        } else {
            changeResTypes(data);
            changeCount(data.length);
        }
    }, [data, searchString]);


    return <>
        <Head>
            <title>Chemistry Types</title>
        </Head>
        <TopBar searchString={searchString} count={count} searchFunction={updateSearchString} content="New Type" title="Chemistry Types" addLink="/chemistry/types/addtype" />
        <TypeList data={resTypes} />
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
