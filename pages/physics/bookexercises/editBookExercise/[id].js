import BookExerciseForm from "../../../../components/physics/BookExerciseForm";
import Head from 'next/head';
import { getSession } from "next-auth/react";

export default function EditBookExercise({ content }) {
    return <>
        <Head>
            <title>Edit Book Exercise</title>
        </Head>
        <BookExerciseForm data={content} />
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

    const res = await fetch(process.env.api + "/physics/getPhysicsBookExercisesById/" + id.toString());
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
