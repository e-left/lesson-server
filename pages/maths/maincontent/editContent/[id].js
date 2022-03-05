import ContentForm from "../../../../components/maths/ContentForm";
import Head from 'next/head';
import { getSession } from "next-auth/react";

export default function EditContent({ content }) {
    return <>
        <Head>
            <title>Edit Content</title>
        </Head>
        <ContentForm data={content} />
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

    const { id } = context.query;

    const res = await fetch(process.env.api + "/maths/getMathsContentById/" + id.toString());
    if (!res.ok) {
        return {
            props: {}
        }
    }

    const data = await res.json()
    const content = data.data[0];

    return {
        props: { content }
    };
}
