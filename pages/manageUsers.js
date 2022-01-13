import { getSession } from "next-auth/react";
import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css'

export default function ManageUsers() {
    const [users, changeUsers] = useState([]);
    const [fetched, changeFetched] = useState(false);

    /* eslint-disable */
    useEffect(() => {
        if (!fetched) {
            fetch(process.env.api + "/getUsers", {
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(res => res.json())
                .then(data => {
                    changeUsers(data.data);
                    changeFetched(true);
                });
        }
    }, []);

    const createDeleteCallback = (name) => {
        return async () => {
            if (name === "admin") {
                alert("Cannot delete admin user!");
                return;
            }

            const response = await fetch('/api/deleteUser', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name }),
            });

            if (response.status !== 204) {
                const data = await response.json();
                alert("Error: " + data.data.error);
                return;
            }

            window.location.reload();

        }
    }

    const submitUser = async () => {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const permissions = document.getElementById("permissions").value;

        // check if every field is properly included
        if (name === "" || email === "" || password === "") {
            alert("Empty fields!");
            return;
        }

        // make the request
        const response = await fetch('/api/addUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password, permissions }),
        });

        const data = await response.json();
        if (data.status !== "success") {
            alert("Error: " + data.data.error);
        }

        alert("Succesfully added user");
        window.location.reload(false);
    }

    // TODO: make it all look good
    return (
        <div>
            <Head>
                <title>Manage Users</title>
            </Head>
            <div className="container d-flex justify-content-center mt-5 w-50">
                <div className="border border-primary rounded p-3">
                    <div className="col justify-content-center align-items-center">
                        <div className="row p-3 m-3 justify-content-center">
                            <p className={styles.text}>Manage Users</p>
                        </div>

                        {/* user list */}
                        <div className="row px-3 py-1 mx-3 my-1">

                            <div className="col">
                                User Name
                            </div>

                            <div className="col">
                                User Permissions
                            </div>

                            <div className="col-auto mr-auto">
                                Delete User
                            </div>

                        </div>
                        <hr className="w-100 m-auto" />
                        {users.map(u =>

                            <div key={u.id} className="row px-3 py-1 mx-3 my-1">

                                <div className="col">
                                    {u.name}
                                </div>

                                <div className="col">
                                    {u.permissions}
                                </div>

                                <div className="col-auto mr-auto"><button className="btn btn-danger" onClick={createDeleteCallback(u.name)}><i className="bi bi-trash-fill"></i></button>
                                </div>

                            </div>

                        )}
                        <div className="row p-3 m-3 form-group">
                            <label htmlFor="name">Name:</label>
                            <input type="text" className="form-control" id="name" autoComplete="off"></input>
                            <label htmlFor="email">Email:</label>
                            <input type="text" className="form-control" id="email" autoComplete="off"></input>
                            <label htmlFor="permissions">Permissions:</label>
                            <select name="permissions" className="form-control" id="permissions">
                                <option value="all">All</option>
                                <option value="ancientgreek">Ancient Greek</option>
                            </select>
                            <label htmlFor="password">Password:</label>
                            <input type="password" className="form-control" id="password" autoComplete="off"></input>
                        </div>


                        <div className="row p-3 m-3">
                            {/* TODO: check if columns here */}
                            <button className="btn btn-success btn-lg" onClick={submitUser}><i className="bi bi-plus-fill"></i> New User</button>
                        </div>
                        <div className="row p-3 m-3">
                            <Link href="/">
                                <button type="button" className="btn btn-dark btn-lg"><i className="bi bi-backspace-fill"></i>Index</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    // get logged in user
    const session = await getSession(context);
    // if unauthorized go to login page
    if (!session || session.user.name !== "admin") {
        return {
            redirect: {
                permanent: false,
                destination: "/"
            }
        }
    }

    return {
        props: {}
    }
}
