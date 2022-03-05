import ProofsForm from "../../../components/maths/ProofsForm";
import Head from 'next/head';
import { getSession } from "next-auth/react";

export default function AddProof() {

    return <>
        <Head>
            <title>New Proof</title>
        </Head>
        <ProofsForm newContent="1" />
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
