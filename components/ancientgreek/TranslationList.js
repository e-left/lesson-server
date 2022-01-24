import React from 'react';
import TranslationElement from './TranslationElement';
import styles from '../../styles/TranslationList.module.css';

function TranslationList({ data }) {
    const renderedWords = data && data !== {} 
        ?
        data.map(word =>
            <TranslationElement key={word.id.toString()} data={word} />
        )
        : <></>;
    return <>
        <TranslationElement initial="1" />
        <div className={styles.ruler}>
            <hr></hr>
        </div>
        {renderedWords}
    </>;
}

export default TranslationList;
