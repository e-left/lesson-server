import BookExerciseForm from "../../../components/physics/BookExerciseForm";
import Head from 'next/head';
import { getSession } from "next-auth/react";

export default function AddBookExercise() {

    return <>
        <Head>
            <title>New Book Exercise</title>
        </Head>
        <BookExerciseForm newContent="1" />
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
