import TopBar from "../../../components/chem/TopBar";
import CurriculumList from '../../../components/chem/CurriculumList';
import Head from 'next/head';
import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";

export default function ChemCurriculum() {
    let [searchString, updateSearchString] = useState("");
    let [data, changeData] = useState([])
    let [resCurriculum, changeResCurriculum] = useState([]);
    let [count, changeCount] = useState(0);

    useEffect(() => {
        fetch(process.env.api + "/chemistry/getChemCurriculum/")
            .then(res => res.json())
            .then(data => {
                changeData(data.data);
                changeCount(data.count);
            })
            .catch(() => { });
    }, []);

    useEffect(() => {
        if (searchString !== "") {
            fetch(process.env.api + "/chemistry/getChemCurriculumByQuery/" + searchString)
                .then(res => res.json())
                .then(data => {
                    changeResCurriculum(data.data);
                    changeCount(data.count);
                })
                .catch(() => { });
        } else {
            changeResCurriculum(data);
            changeCount(data.length);
        }
    }, [data, searchString]);


    return <>
        <Head>
            <title>Chemistry Curriculum</title>
        </Head>
        <TopBar searchString={searchString} count={count} searchFunction={updateSearchString} content="New Curriculum" title="Chemistry Curriculum" addLink="/chemistry/curriculum/addcurriculum" />
        <CurriculumList data={resCurriculum} />
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
