import BookChapterForm from "../../../components/physics/BookChapterForm";
import Head from 'next/head';
import { getSession } from "next-auth/react";

export default function AddBookExercise() {

    return <>
        <Head>
            <title>New Book Chapter</title>
        </Head>
        <BookChapterForm newContent="1" />
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
    return {
        props: {},
    };
}
