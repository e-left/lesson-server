import TopBar from "../../../components/maths/TopBar";
import ContentList from '../../../components/maths/ContentList';
import Head from 'next/head';
import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";

export default function MathsContent() {
    let [searchString, updateSearchString] = useState("");
    let [data, changeData] = useState([])
    let [resContent, changeResContent] = useState([]);
    let [count, changeCount] = useState(0);

    useEffect(() => {
        fetch(process.env.api + "/maths/getMathsContent/")
            .then(res => res.json())
            .then(data => {
                changeData(data.data);
                changeCount(data.count);
            })
            .catch(() => { });
    }, []);

    useEffect(() => {
        if (searchString !== "") {
            fetch(process.env.api + "/maths/getMathsContentByQuery/" + searchString)
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
            <title>Maths Main Content</title>
        </Head>
        <TopBar searchString={searchString} count={count} searchFunction={updateSearchString} content="New content" title="Maths Main Content" addLink="/maths/maincontent/addcontent" />
        <ContentList data={resContent} />
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
