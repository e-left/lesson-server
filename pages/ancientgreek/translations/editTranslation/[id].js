import TranslationForm from "../../../../components/ancientgreek/TranslationForm";
import Head from 'next/head';
import { getSession } from "next-auth/react";

export default function EditTranslation({ translation }) {
    return <>
        <Head>
            <title>Edit Translation</title>
        </Head>
        <TranslationForm data={translation} />
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

    const res = await fetch(process.env.api + "/ancientGreek/getAncientTranslationById/" + id.toString());
    if (!res.ok) {
        return {
            props: {}
        }
    }

    const data = await res.json()
    const translation = data.data[0];

    return {
        props: { translation }
    };
}
