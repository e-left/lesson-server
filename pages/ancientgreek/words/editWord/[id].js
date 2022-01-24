import WordForm from "../../../../components/ancientgreek/WordForm";
import Head from 'next/head';
import { getSession } from "next-auth/react";

export default function EditWord({ word }) {
    return <>
        <Head>
            <title>Edit word</title>
        </Head>
        <WordForm data={word} />
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

    const { id } = context.query;

    const res = await fetch(process.env.api + "/ancientGreek/getAncientWordById/" + id.toString());
    if (!res.ok) {
        return {
            props: {}
        }
    }

    const data = await res.json()
    const word = data.data[0];

    return {
        props: { word }
    };
}
