import Head from 'next/head';
import { getSession } from "next-auth/react";
import CurriculumForm from "../../../../components/maths/CurriculumForm";

export default function EditCurriculum({ curriculum }) {
    return <>
        <Head>
            <title>Edit Curriculum</title>
        </Head>
        <CurriculumForm data={curriculum} />
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

    const res = await fetch(process.env.api + "/maths/getMathsCurriculumById/" + id.toString());
    if (!res.ok) {
        return {
            props: {}
        }
    }

    const data = await res.json()
    const curriculum = data.data[0];

    return {
        props: { curriculum }
    };
}
