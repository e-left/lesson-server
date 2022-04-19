import React from 'react';
import BookExerciseElement from './BookExerciseElement';
import styles from '../../styles/BookExerciseList.module.css';

function BookExerciseList({ data }) {
    const renderedContent = data && data !== {} 
        ?
        data.map(content =>
            <BookExerciseElement key={content.id.toString()} data={content} />
        )
        : <></>;
    return <>
        <BookExerciseElement initial="1" />
        <div className={styles.ruler}>
            <hr></hr>
        </div>
        {renderedContent}
    </>;
}

export default BookExerciseList;
