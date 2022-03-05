import React from 'react';
import AppendixElement from './AppendixElement';
import styles from '../../styles/AppendixList.module.css';

function AppendixList({ data }) {
    const renderedAppendix = data && data !== {} 
        ?
        data.map(appendix =>
            <AppendixElement key={appendix.id.toString()} data={appendix} />
        )
        : <></>;
    return <>
        <AppendixElement initial="1" />
        <div className={styles.ruler}>
            <hr></hr>
        </div>
        {renderedAppendix}
    </>;
}

export default AppendixList;
