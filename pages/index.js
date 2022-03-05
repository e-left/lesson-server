import styles from '../styles/Home.module.css'
import { useSession, signIn, signOut } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
    const { data: session } = useSession();
    if (session) {
        // logged in, render lesson group + logout button

        const adminButton = session.user.name === "admin"
            ?
            <div className="row p-3 m-3">
                <Link href="/manageUsers" passHref>
                    <button className="btn btn-outline-primary btn-lg">Manage Users</button>
                </Link>
            </div>
            : <></>;

        return (
            <>
                <Head>
                    <title>Lesson Server</title>
                </Head>
                <div className="container d-flex justify-content-center mt-5">
                    <div className="border border-primary rounded p-3">
                        <div className="col justify-content-center">
                            <div className="row p-3 m-3">
                                <p className={styles.text}>Signed in as {session.user.name}</p>
                            </div>
                            {/* lesson list */}
                            <div className="row p-3 m-3">
                                <Link href="/ancientgreek" passHref>
                                    <button className="btn btn-outline-success btn-lg">Ancient Greek</button>
                                </Link>
                            </div>

                            <div className="row p-3 m-3">
                                <Link href="/maths" passHref>
                                    <button className="btn btn-outline-success btn-lg">Maths</button>
                                </Link>
                            </div>

                            {/* if admin render user management */}
                            {adminButton}

                            <div className="row p-3 m-3">
                                <button className="btn btn-danger btn-lg" onClick={() => signOut()}><i className="bi bi-door-open-fill"></i>Logout</button>
                            </div>
                        </div>
                    </div>

                </div>
            </>
        );
    }
    // not logged in render only login button
    return (
        <>
            <Head>
                <title>Lesson Server</title>
            </Head>
            <div className="container d-flex justify-content-center mt-5">
                <div className="border border-success rounded p-3">
                    <div className="col justify-content-center">
                        <div className="row p-3 m-3">
                            <p className={styles.text}>Please Sign in</p>
                        </div>

                        <div className="row p-3 m-3">
                            <button className="btn btn-success btn-lg" onClick={() => signIn()}><i className="bi bi-key-fill"></i>Sign in</button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}
