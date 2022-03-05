import TopBar from "../../../components/maths/TopBar";
import TypeList from '../../../components/maths/TypeList';
import Head from 'next/head';
import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";

export default function MathsTypes() {
    let [searchString, updateSearchString] = useState("");
    let [data, changeData] = useState([])
    let [resTypes, changeResTypes] = useState([]);
    let [count, changeCount] = useState(0);

    useEffect(() => {
        fetch(process.env.api + "/maths/getMathsTypes/")
            .then(res => res.json())
            .then(data => {
                changeData(data.data);
                changeCount(data.count);
            })
            .catch(() => { });
    }, []);

    useEffect(() => {
        if (searchString !== "") {
            fetch(process.env.api + "/maths/getMathsTypesByQuery/" + searchString)
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
            <title>Maths Types</title>
        </Head>
        <TopBar searchString={searchString} count={count} searchFunction={updateSearchString} content="New Type" title="Maths Types" addLink="/maths/types/addtype" />
        <TypeList data={resTypes} />
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
