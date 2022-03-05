import Head from 'next/head';
import { getSession } from "next-auth/react";
import TypeForm from "../../../../components/maths/TypeForm";

export default function EditType({ type }) {
    return <>
        <Head>
            <title>Edit Type</title>
        </Head>
        <TypeForm data={type} />
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

    const res = await fetch(process.env.api + "/maths/getMathsTypesById/" + id.toString());
    if (!res.ok) {
        return {
            props: {}
        }
    }

    const data = await res.json()
    const type = data.data[0];

    return {
        props: { type }
    };
}
