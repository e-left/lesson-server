import Head from 'next/head';
import { getSession } from "next-auth/react";
import AppendixForm from "../../../../components/maths/AppendixForm";

export default function EditAppendix({ Appendix }) {
    return <>
        <Head>
            <title>Edit Appendix</title>
        </Head>
        <AppendixForm data={type} />
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

    const res = await fetch(process.env.api + "/maths/getMathsAppendixById/" + id.toString());
    if (!res.ok) {
        return {
            props: {}
        }
    }

    const data = await res.json()
    const appendix = data.data[0];

    return {
        props: { appendix }
    };
}
