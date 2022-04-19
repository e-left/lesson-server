import Head from 'next/head';
import { getSession } from "next-auth/react";
import AppendixForm from "../../../../components/chem/AppendixForm";

export default function EditAppendix({ appendix }) {
    return <>
        <Head>
            <title>Edit Appendix</title>
        </Head>
        <AppendixForm data={appendix} />
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

    const { id } = context.query;

    const res = await fetch(process.env.api + "/chemistry/getChemAppendixById/" + id.toString());
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
