import React from 'react';
import TypeElement from './TypeElement';
import styles from '../../styles/TypesList.module.css';

function TypesList({ data }) {
    const renderedTypes = data && data !== {} 
        ?
        data.map(type =>
            <TypeElement key={type.id.toString()} data={type} />
        )
        : <></>;
    return <>
        <TypeElement initial="1" />
        <div className={styles.ruler}>
            <hr></hr>
        </div>
        {renderedTypes}
    </>;
}

export default TypesList;
