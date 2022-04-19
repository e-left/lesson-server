import React from 'react';
import ElementElement from './ElementElement';
import styles from '../../styles/ElementList.module.css';

function ElementList({ data }) {
    const renderedContent = data && data !== {} 
        ?
        data.map(content =>
            <ElementElement key={content.id.toString()} data={content} />
        )
        : <></>;
    return <>
        <ElementElement initial="1" />
        <div className={styles.ruler}>
            <hr></hr>
        </div>
        {renderedContent}
    </>;
}

export default ElementList;
