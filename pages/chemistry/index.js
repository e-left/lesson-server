import Link from "next/link";
import Head from 'next/head';
import styles from '../../styles/Chemistry.module.css';
import { getSession } from "next-auth/react";

export default function Chem() {

    return (
        <>
            <Head>
                <title>Chemistry</title>
            </Head>
            <div className="container d-flex justify-content-center mt-5">
                <div className="border border-primary rounded p-3">
                    <div className="col justify-content-center">
                        <div className="row p-3 m-3">
                            <p className={styles.text}>Chemistry</p>
                        </div>

                        {/* page list */}
                        <div className="row p-3 m-3">
                            <Link href="/chemistry/elements" passHref>
                                <button className="btn btn-outline-success btn-lg">Elements</button>
                            </Link>
                        </div>

                        <div className="row p-3 m-3">
                            <Link href="/chemistry/bookchapters" passHref>
                                <button className="btn btn-outline-success btn-lg">Book Chapters</button>
                            </Link>
                        </div>

                        <div className="row p-3 m-3">
                            <Link href="/chemistry/bookexercises" passHref>
                                <button className="btn btn-outline-success btn-lg">Book Exercises</button>
                            </Link>
                        </div>

                        <div className="row p-3 m-3">
                            <Link href="/chemistry/sostheory" passHref>
                                <button className="btn btn-outline-success btn-lg">SOS Theory</button>
                            </Link>
                        </div>

                        <div className="row p-3 m-3">
                            <Link href="/chemistry/types" passHref>
                                <button className="btn btn-outline-success btn-lg">Types</button>
                            </Link>
                        </div>

                        <div className="row p-3 m-3">
                            <Link href="/chemistry/appendix" passHref>
                                <button className="btn btn-outline-success btn-lg">Appendix</button>
                            </Link>
                        </div>

                        <div className="row p-3 m-3">
                            <Link href="/chemistry/curriculum" passHref>
                                <button className="btn btn-outline-success btn-lg">Curriculum</button>
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
    if (!session || (session.user.permissions !== "all" && session.user.permissions !== "chem")) {
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