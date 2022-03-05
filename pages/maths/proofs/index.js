import TopBar from "../../../components/maths/TopBar";
import ProofsList from '../../../components/maths/ProofsList';
import Head from 'next/head';
import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";

export default function MathsProofs() {
    let [searchString, updateSearchString] = useState("");
    let [data, changeData] = useState([])
    let [resProofs, changeResProofs] = useState([]);
    let [count, changeCount] = useState(0);

    useEffect(() => {
        fetch(process.env.api + "/maths/getMathsProofs/")
            .then(res => res.json())
            .then(data => {
                changeData(data.data);
                changeCount(data.count);
            })
            .catch(() => { });
    }, []);

    useEffect(() => {
        if (searchString !== "") {
            fetch(process.env.api + "/maths/getMathsProofsByQuery/" + searchString)
                .then(res => res.json())
                .then(data => {
                    changeResProofs(data.data);
                    changeCount(data.count);
                })
                .catch(() => { });
        } else {
            changeResProofs(data);
            changeCount(data.length);
        }
    }, [data, searchString]);


    return <>
        <Head>
            <title>Maths Proofs</title>
        </Head>
        <TopBar searchString={searchString} count={count} searchFunction={updateSearchString} content="New proof" title="Maths Proofs" addLink="/maths/proofs/addproof" />
        <ProofsList data={resProofs} />
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
