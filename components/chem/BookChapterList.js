import React from 'react';
import BookChapterElement from './BookChapterElement';
import styles from '../../styles/BookChapterElement.module.css';

function BookChapterList({ data }) {
    const renderedContent = data && data !== {} 
        ?
        data.map(content =>
            <BookChapterElement key={content.id.toString()} data={content} />
        )
        : <></>;
    return <>
        <BookChapterElement initial="1" />
        <div className={styles.ruler}>
            <hr></hr>
        </div>
        {renderedContent}
    </>;
}

export default BookChapterList;
