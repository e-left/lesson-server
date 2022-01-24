import WordForm from "../../../components/ancientgreek/WordForm";
import Head from 'next/head';
import { getSession } from "next-auth/react";

export default function AddWord() {

    return <>
        <Head>
            <title>New word</title>
        </Head>
        <WordForm newWord="1" />
    </>
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
        props: {},
    };
}
