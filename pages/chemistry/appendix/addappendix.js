import AppendixForm from "../../../components/chem/AppendixForm";
import Head from 'next/head';
import { getSession } from "next-auth/react";

export default function AddAppendix() {

    return <>
        <Head>
            <title>New Appendix</title>
        </Head>
        <AppendixForm newContent="1" />
    </>
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
        props: {},
    };
}
