import SosTheoryForm from "../../../components/maths/SosTheoryForm";
import Head from 'next/head';
import { getSession } from "next-auth/react";

export default function AddSosTheory() {

    return <>
        <Head>
            <title>New Theory</title>
        </Head>
        <SosTheoryForm newContent="1" />
    </>
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
        props: {},
    };
}
