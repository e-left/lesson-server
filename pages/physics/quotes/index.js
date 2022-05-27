import Link from "next/link";
import Head from 'next/head';
import { getSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function Quotes() {
    // state
    let [content, changeContent] = useState("");
    let [author, changeAuthor] = useState("");

    // use effect to load content on startup
    useEffect(() => {
        fetch(process.env.api + "/physics/getQuote/")
            .then(res => res.json())
            .then(data => {
                changeContent(data.data.content);
                changeAuthor(data.data.author);
            })
            .catch(() => { });
    }, []);

    useEffect(() => {
        console.log("Change content");
        document.getElementById("content").value = content;
        document.getElementById("author").value = author;
    }, [content, author]);

    // save handler
    const onSave = async () => {
        const content = document.getElementById("content").value;
        const author = document.getElementById("author").value;

        if (content === "" || author === "") {
            alert("Fields cannot be empty!");
            return;
        }

        // save the quote
        const response = await fetch('/api/physics/setQuote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content, author }),
        });

        const data = await response.json();
        if (data.status !== "success") {
            alert("Error: " + data.data.error);
        }

        alert("Succesfully changed quote");

        window.location.reload();
    };

    // clear handler
    const onClear = async () => {
        const response = await fetch('/api/physics/clearQuote/', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (response.status !== 200) {
            const data = await response.json();
            alert("Error: " + data.data.error);
            return;
        }

        // changeContent("");
        // changeAuthor("");

        window.location.reload();
    };

    return (
        <>
            <Head>
                <title>Physics Quote Editor</title>
            </Head>
            {/* main body: textarea, below textarea, below button button, buttons in same row */}
            <div className="container d-flex justify-content-center mt-5">
                <div className="border border-primary rounded p-3">
                    <div className="col justify-content-center">
                        <div className="row justify-content-center p-3 m-3">
                            <div className="col-auto">
                                <h3>Physics Quote Editor</h3>
                            </div>
                        </div>
                        <div className="row p-3 m-3">
                            Κείμενο
                            <textarea id="content"></textarea>
                        </div>
                        <div className="row p-3 m-3">
                            Ποιός το είπε:
                            <input type="text" id="author" autoComplete="off"></input>
                        </div>
                        <div className="row justify-content-center p-3 m-3">
                            <div className="col-auto">
                                <button onClick={onSave} className="btn btn-outline-success btn-lg" >Save</button>
                            </div>
                            <div className="col-auto">
                                <button onClick={onClear} className="btn btn-outline-danger btn-lg" >Clear</button>
                            </div>
                            <div className="col-auto">
                                <Link href="/physics" passHref>
                                    <button className="btn btn-outline-dark btn-lg">Back</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
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

    return {
        props: {}
    };
}