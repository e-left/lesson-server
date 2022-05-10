import BookChapterForm from "../../../../components/physics/BookChapterForm";
import Head from 'next/head';
import { getSession } from "next-auth/react";

export default function EditBookChapter({ content }) {
    return <>
        <Head>
            <title>Edit Book Chapter</title>
        </Head>
        <BookChapterForm data={content} />
    </>
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

    const { id } = context.query;

    const res = await fetch(process.env.api + "/physics/getPhysicsBookChapterById/" + id.toString());
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
