import TopBar from "../../../components/ancientgreek/TopBar";
import TranslationList from '../../../components/ancientgreek/TranslationList';
import Head from 'next/head';
import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";

export default function Translations() {
    let [searchString, updateSearchString] = useState("");
    let [data, changeData] = useState([])
    let [resTranslations, changeResTranslations] = useState([]);
    let [count, changeCount] = useState(0);

    useEffect(() => {
        fetch(process.env.api + "/ancientGreek/getAncientTranslations/")
            .then(res => res.json())
            .then(data => {
                changeData(data.data);
                changeCount(data.count);
            })
            .catch(() => { });
    }, []);

    useEffect(() => {
        if (searchString !== "") {
            fetch(process.env.api + "/ancientGreek/getAncientTranslationsByQuery/" + searchString)
                .then(res => res.json())
                .then(data => {
                    changeResTranslations(data.data);
                    changeCount(data.count);
                })
                .catch(() => { });
        } else {
            changeResTranslations(data);
            changeCount(data.length);
        }
    }, [data, searchString]);


    return <>
        <Head>
            <title>Ancient Greek Translations</title>
        </Head>
        <TopBar searchString={searchString} count={count} searchFunction={updateSearchString} content="New translation" title="Ancient Greek Translations" addLink="/ancientgreek/translations/addtranslation" />
        <TranslationList data={resTranslations} />
    </>;
}

export async function getServerSideProps(context) {
    // get logged in user
    const session = await getSession(context);
    // if unauthorized go to login page
    if (!session || (session.user.permissions !== "all" && session.user.permissions !== "ancientgreek")) {
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
