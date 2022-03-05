import React from 'react';
import SosTheoryElement from './SosTheoryElement';
import styles from '../../styles/SosTheoryList.module.css';

function SosTheoryList({ data }) {
    const renderedSosTheory = data && data !== {} 
        ?
        data.map(theory =>
            <SosTheoryElement key={theory.id.toString()} data={theory} />
        )
        : <></>;
    return <>
        <SosTheoryElement initial="1" />
        <div className={styles.ruler}>
            <hr></hr>
        </div>
        {renderedSosTheory}
    </>;
}

export default SosTheoryList;
