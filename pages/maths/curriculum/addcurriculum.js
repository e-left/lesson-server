import CurriculumForm from "../../../components/maths/CurriculumForm";
import Head from 'next/head';
import { getSession } from "next-auth/react";

export default function AddCurriculum() {

    return <>
        <Head>
            <title>New Curriculum</title>
        </Head>
        <CurriculumForm newContent="1" />
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
