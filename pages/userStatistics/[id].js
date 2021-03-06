import React, { useState, useEffect } from 'react';
import { getSession } from "next-auth/react";
import { useRouter } from 'next/router'
import styles from '../../styles/Statistics.module.css';
import Head from 'next/head';
import Link from 'next/link';

export default function UserStatistics() {
    // user id
    const router = useRouter();
    const { id } = router.query;

    // user name
    let [userName, changeUserName] = useState("");

    // user statistics
    let [wordCount, changeWordCount] = useState(0);
    let [translationCount, changeTranslationCount] = useState(0);
    let [mathsTypesCount, changeMathsTypesCount] = useState(0); 
    let [mathsTheoryCount, changeMathsTheoryCount] = useState(0); 
    let [mathsProofsCount, changeMathsProofsCount] = useState(0); 
    let [mathsCurriculumCount, changeMathsCurriculumCount] = useState(0); 
    let [mathsContentCount, changeMathsContentCount] = useState(0); 
    let [mathsAppendixCount, changeMathsAppendixCount] = useState(0); 
    let [chemTypesCount, changeChemTypesCount] = useState(0); 
    let [chemTheoryCount, changeChemTheoryCount] = useState(0); 
    let [chemBookChaptersCount, changeChemBookChaptersCount] = useState(0); 
    let [chemCurriculumCount, changeChemCurriculumCount] = useState(0); 
    let [chemBookExercisesCount, changeChemBookExercisesCount] = useState(0); 
    let [chemAppendixCount, changeChemAppendixCount] = useState(0); 
    let [chemElementCount, changeChemElementCount] = useState(0); 
    let [physicsTypesCount, changePhysicsTypesCount] = useState(0); 
    let [physicsTheoryCount, changePhysicsTheoryCount] = useState(0); 
    let [physicsBookChaptersCount, changePhysicsBookChaptersCount] = useState(0); 
    let [physicsCurriculumCount, changePhysicsCurriculumCount] = useState(0); 
    let [physicsBookExercisesCount, changePhysicsBookExercisesCount] = useState(0); 
    let [physicsAppendixCount, changePhysicsAppendixCount] = useState(0); 

    useEffect(async () => {
        const nameResponse = await fetch("/api/getUserNameById/" + id.toString());
        const nameJSON = await nameResponse.json();

        const statsResponse = await fetch("/api/getUserStatsById/" + id.toString());
        const statsJSON = await statsResponse.json();

        changeUserName(nameJSON.name);

        changeWordCount(statsJSON.wordCount);
        changeTranslationCount(statsJSON.translationCount);
        changeMathsTypesCount(statsJSON.mathsTypesCount);
        changeMathsTheoryCount(statsJSON.mathsTheoryCount);
        changeMathsProofsCount(statsJSON.mathsProofsCount);
        changeMathsCurriculumCount(statsJSON.mathsCurriculumCount);
        changeMathsContentCount(statsJSON.mathsContentCount);
        changeMathsAppendixCount(statsJSON.mathsAppendixCount);
        changeChemTypesCount(statsJSON.chemTypesCount);
        changeChemTheoryCount(statsJSON.chemTheoryCount);
        changeChemBookChaptersCount(statsJSON.chemBookChaptersCount);
        changeChemCurriculumCount(statsJSON.chemCurriculumCount);
        changeChemBookExercisesCount(statsJSON.chemBookExercisesCount);
        changeChemAppendixCount(statsJSON.chemAppendixCount);
        changeChemElementCount(statsJSON.chemElementCount);
        changePhysicsTypesCount(statsJSON.physicsTypesCount);
        changePhysicsTheoryCount(statsJSON.physicsTheoryCount);
        changePhysicsBookChaptersCount(statsJSON.physicsBookChaptersCount);
        changePhysicsCurriculumCount(statsJSON.physicsCurriculumCount);
        changePhysicsBookExercisesCount(statsJSON.physicsBookExercisesCount);
        changePhysicsAppendixCount(statsJSON.physicsAppendixCount);
    }, []);

    return <>
        <Head>
            <title>User Statistics</title>
        </Head>
        <div className="container d-flex justify-content-center mt-5">
            <div className="border border-primary rounded p-3">
                <div className="col justify-content-center">
                    <div className="row p-3 m-3">
                        <p className={styles.text}>???????????????????? ?????? ?????? ????????????: {userName}</p>
                    </div>

                    {/* ancient words */}
                    <div className="row p-3 m-3">
                        <button className="btn btn-secondary btn-lg" disable>???????????? ???????????? ??????????????: {wordCount}</button>
                    </div>

                    {/* translations */}
                    <div className="row p-3 m-3">
                        <button className="btn btn-secondary btn-lg" disable>???????????? ?????????????????????? ??????????????: {translationCount}</button>
                    </div>

                    {/* maths types */}
                    <div className="row p-3 m-3">
                        <button className="btn btn-secondary btn-lg" disable>???????????? ???????????????????? ??????????????????????: {mathsTypesCount}</button>
                    </div>

                    {/* maths theory */}
                    <div className="row p-3 m-3">
                        <button className="btn btn-secondary btn-lg" disable>???????????? ?????????????? ??????????????????????: {mathsTheoryCount}</button>
                    </div>

                    {/* maths proofs */}
                    <div className="row p-3 m-3">
                        <button className="btn btn-secondary btn-lg" disable>???????????? ???????????????????? ??????????????????????: {mathsProofsCount}</button>
                    </div>

                    {/* maths curriculum */}
                    <div className="row p-3 m-3">
                        <button className="btn btn-secondary btn-lg" disable>???????????? ???????? ??????????????????????: {mathsCurriculumCount}</button>
                    </div>

                    {/* maths content */}
                    <div className="row p-3 m-3">
                        <button className="btn btn-secondary btn-lg" disable>???????????? ???????????????????????? ??????????????????????: {mathsContentCount}</button>
                    </div>

                    {/* maths appendix */}
                    <div className="row p-3 m-3">
                        <button className="btn btn-secondary btn-lg" disable>???????????? ???????????????????? ??????????????????????: {mathsAppendixCount}</button>
                    </div>

                    {/* chemistry types */}
                    <div className="row p-3 m-3">
                        <button className="btn btn-secondary btn-lg" disable>???????????? ???????????????????? ??????????????: {chemTypesCount}</button>
                    </div>

                    {/* chemistry theory */}
                    <div className="row p-3 m-3">
                        <button className="btn btn-secondary btn-lg" disable>???????????? ?????????????? ??????????????: {chemTheoryCount}</button>
                    </div>

                    {/* chemistry book chapters */}
                    <div className="row p-3 m-3">
                        <button className="btn btn-secondary btn-lg" disable>???????????? ?????????????????? ?????????????? ??????????????: {chemBookChaptersCount}</button>
                    </div>

                    {/* chemistry curriculum */}
                    <div className="row p-3 m-3">
                        <button className="btn btn-secondary btn-lg" disable>???????????? ???????? ??????????????: {chemCurriculumCount}</button>
                    </div>

                    {/* chemistry book exercises */}
                    <div className="row p-3 m-3">
                        <button className="btn btn-secondary btn-lg" disable>???????????? ???????????????? ?????????????? ??????????????: {chemBookExercisesCount}</button>
                    </div>

                    {/* chemistry appendix */}
                    <div className="row p-3 m-3">
                        <button className="btn btn-secondary btn-lg" disable>???????????? ???????????????????? ??????????????: {chemAppendixCount}</button>
                    </div>

                    {/* chemistry element */}
                    <div className="row p-3 m-3">
                        <button className="btn btn-secondary btn-lg" disable>???????????? ?????????????? ??????????????: {chemElementCount}</button>
                    </div>

                    {/* physics types */}
                    <div className="row p-3 m-3">
                        <button className="btn btn-secondary btn-lg" disable>???????????? ???????????????????? ??????????????: {physicsTypesCount}</button>
                    </div>

                    {/* physics theory */}
                    <div className="row p-3 m-3">
                        <button className="btn btn-secondary btn-lg" disable>???????????? ?????????????? ??????????????: {physicsTheoryCount}</button>
                    </div>

                    {/* physics book chapters */}
                    <div className="row p-3 m-3">
                        <button className="btn btn-secondary btn-lg" disable>???????????? ?????????????????? ?????????????? ??????????????: {physicsBookChaptersCount}</button>
                    </div>

                    {/* physics curriculum */}
                    <div className="row p-3 m-3">
                        <button className="btn btn-secondary btn-lg" disable>???????????? ???????? ??????????????: {physicsCurriculumCount}</button>
                    </div>

                    {/* physics book exercises */}
                    <div className="row p-3 m-3">
                        <button className="btn btn-secondary btn-lg" disable>???????????? ???????????????? ?????????????? ??????????????: {physicsBookExercisesCount}</button>
                    </div>

                    {/* physics appendix */}
                    <div className="row p-3 m-3">
                        <button className="btn btn-secondary btn-lg" disable>???????????? ???????????????????? ??????????????: {physicsAppendixCount}</button>
                    </div>

                    {/* return button */}
                    <div className="row p-3 m-3">
                        <Link href="/manageUsers">
                            <button type="button" className="btn btn-dark btn-lg"><i className="bi bi-backspace-fill"></i>Back</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </>
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
