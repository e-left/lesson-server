import TranslationForm from "../../../components/ancientgreek/TranslationForm";
import Head from 'next/head';
import { getSession } from "next-auth/react";

export default function AddTranslation() {

    return <>
        <Head>
            <title>New Translation</title>
        </Head>
        <TranslationForm newTranslation="1" />
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
