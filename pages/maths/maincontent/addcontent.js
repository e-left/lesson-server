import ContentForm from "../../../components/maths/ContentForm";
import Head from 'next/head';
import { getSession } from "next-auth/react";

export default function AddContent() {

    return <>
        <Head>
            <title>New Content</title>
        </Head>
        <ContentForm newContent="1" />
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
