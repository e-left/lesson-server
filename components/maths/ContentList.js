import React from 'react';
import ContentElement from './ContentElement';
import styles from '../../styles/ContentList.module.css';

function ContentList({ data }) {
    const renderedContent = data && data !== {} 
        ?
        data.map(content =>
            <ContentElement key={content.id.toString()} data={content} />
        )
        : <></>;
    return <>
        <ContentElement initial="1" />
        <div className={styles.ruler}>
            <hr></hr>
        </div>
        {renderedContent}
    </>;
}

export default ContentList;
