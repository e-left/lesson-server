import BookChapterForm from "../../../components/chem/BookChapterForm";
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
