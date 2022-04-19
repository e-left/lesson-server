import React from 'react';
import CurriculumElement from './CurriculumElement';
import styles from '../../styles/CurriculumList.module.css';

function CurriculumList({ data }) {
    const renderedCurriculum = data && data !== {} 
        ?
        data.map(curriculum =>
            <CurriculumElement key={curriculum.id.toString()} data={curriculum} />
        )
        : <></>;
    return <>
        <CurriculumElement initial="1" />
        <div className={styles.ruler}>
            <hr></hr>
        </div>
        {renderedCurriculum}
    </>;
}

export default CurriculumList;
