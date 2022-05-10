import SosTheoryForm from "../../../../components/physics/SosTheoryForm";
import Head from 'next/head';
import { getSession } from "next-auth/react";

export default function EditSosTheory({ theory }) {
    return <>
        <Head>
            <title>Edit Theory</title>
        </Head>
        <SosTheoryForm data={theory} />
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

    const res = await fetch(process.env.api + "/physics/getPhysicsSosTheoryById/" + id.toString());
    if (!res.ok) {
        return {
            props: {}
        }
    }

    const data = await res.json()
    const theory = data.data[0];

    return {
        props: { theory }
    };
}
