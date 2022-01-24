import React from 'react';
import WordElement from './WordElement';
import styles from '../../styles/WordList.module.css';

function WordList({ data }) {
    const renderedWords = data && data !== {} 
        ?
        data.map(word =>
            <WordElement key={word.id.toString()} data={word} />
        )
        : <></>;
    return <>
        <WordElement initial="1" />
        <div className={styles.ruler}>
            <hr></hr>
        </div>
        {renderedWords}
    </>;
}

export default WordList;
