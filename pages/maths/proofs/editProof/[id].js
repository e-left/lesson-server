import ProofsForm from "../../../../components/maths/ProofsForm";
import Head from 'next/head';
import { getSession } from "next-auth/react";

export default function EditProof({ proof }) {
    return <>
        <Head>
            <title>Edit Proof</title>
        </Head>
        <ProofsForm data={proof} />
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

    const res = await fetch(process.env.api + "/maths/getMathsProofsById/" + id.toString());
    if (!res.ok) {
        return {
            props: {}
        }
    }

    const data = await res.json()
    const proof = data.data[0];

    return {
        props: { proof }
    };
}
