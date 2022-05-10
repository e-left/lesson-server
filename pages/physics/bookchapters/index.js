import TopBar from "../../../components/physics/TopBar";
import BookChapterList from '../../../components/physics/BookChapterList';
import Head from 'next/head';
import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";

export default function PhysicsBookChapters() {
    let [searchString, updateSearchString] = useState("");
    let [data, changeData] = useState([])
    let [resContent, changeResContent] = useState([]);
    let [count, changeCount] = useState(0);

    useEffect(() => {
        fetch(process.env.api + "/physics/getPhysicsBookChapter/")
            .then(res => res.json())
            .then(data => {
                changeData(data.data);
                changeCount(data.count);
            })
            .catch(() => { });
    }, []);

    useEffect(() => {
        if (searchString !== "") {
            fetch(process.env.api + "/physics/getPhysicsBookChapterByQuery/" + searchString)
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
            <title>Physics Book Chapters</title>
        </Head>
        <TopBar searchString={searchString} count={count} searchFunction={updateSearchString} content="New chapter" title="Physics Book Chapters" addLink="/physics/bookchapters/addbookchapter" />
        <BookChapterList data={resContent} />
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
