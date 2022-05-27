import Link from "next/link";
import Head from 'next/head';
import styles from '../../styles/Maths.module.css';
import { getSession } from "next-auth/react";

export default function Maths() {

    return (
        <>
            <Head>
                <title>Maths</title>
            </Head>
            <div className="container d-flex justify-content-center mt-5">
                <div className="border border-primary rounded p-3">
                    <div className="col justify-content-center">
                        <div className="row p-3 m-3">
                            <p className={styles.text}>Maths</p>
                        </div>

                        {/* page list */}
                        <div className="row p-3 m-3">
                            <Link href="/maths/maincontent" passHref>
                                <button className="btn btn-outline-success btn-lg">Main Content</button>
                            </Link>
                        </div>

                        <div className="row p-3 m-3">
                            <Link href="/maths/sostheory" passHref>
                                <button className="btn btn-outline-success btn-lg">SOS Theory</button>
                            </Link>
                        </div>

                        <div className="row p-3 m-3">
                            <Link href="/maths/proofs" passHref>
                                <button className="btn btn-outline-success btn-lg">Proofs</button>
                            </Link>
                        </div>

                        <div className="row p-3 m-3">
                            <Link href="/maths/types" passHref>
                                <button className="btn btn-outline-success btn-lg">Types</button>
                            </Link>
                        </div>

                        <div className="row p-3 m-3">
                            <Link href="/maths/appendix" passHref>
                                <button className="btn btn-outline-success btn-lg">Appendix</button>
                            </Link>
                        </div>

                        <div className="row p-3 m-3">
                            <Link href="/maths/curriculum" passHref>
                                <button className="btn btn-outline-success btn-lg">Curriculum</button>
                            </Link>
                        </div>

                        <div className="row p-3 m-3">
                            <Link href="/maths/LaTexConverter" passHref>
                                <button className="btn btn-outline-success btn-lg">LaTexConverter</button>
                            </Link>
                        </div>

                        <div className="row p-3 m-3">
                            <Link href="/maths/quotes" passHref>
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
    if (!session || (session.user.permissions !== "all" && session.user.permissions !== "maths")) {
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