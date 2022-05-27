import Link from "next/link";
import Head from 'next/head';
import styles from '../../styles/AncientGreek.module.css';
import { getSession } from "next-auth/react";

export default function AncientGreek() {

    return (
        <>
            <Head>
                <title>Ancient Greek</title>
            </Head>
            <div className="container d-flex justify-content-center mt-5">
                <div className="border border-primary rounded p-3">
                    <div className="col justify-content-center">
                        <div className="row p-3 m-3">
                            <p className={styles.text}>Ancient Greek</p>
                        </div>

                        {/* page list */}
                        <div className="row p-3 m-3">
                            <Link href="/ancientgreek/words" passHref>
                                <button className="btn btn-outline-success btn-lg">Words</button>
                            </Link>
                        </div>

                        <div className="row p-3 m-3">
                            <Link href="/ancientgreek/translations" passHref>
                                <button className="btn btn-outline-success btn-lg">Translations</button>
                            </Link>
                        </div>

                        <div className="row p-3 m-3">
                            <Link href="/ancientgreek/quotes" passHref>
                                <button className="btn btn-outline-success btn-lg">Quotes</button>
                            </Link>
                        </div>

                        {/* index page button */}
                        <div className="row p-3 m-3">
                            <Link href="/" passHref>
                                <button className="btn btn-dark btn-lg"><i className="bi bi-door-open-fill"></i>Index</button>
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export async function getServerSideProps(context) {
    // get logged in user
    const session = await getSession(context);
    // if unauthorized go to login page
    if (!session || (session.user.permissions !== "all" && session.user.permissions !== "ancientgreek")) {
        return {
            redirect: {
                permanent: false,
                destination: "/"
            }
        }
    }

    return {
        props: {}
    };
}