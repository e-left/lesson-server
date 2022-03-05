import React from 'react';
import ProofsElement from './ProofsElement';
import styles from '../../styles/ProofsList.module.css';

function ProofsList({ data }) {
    const renderedProofs = data && data !== {} 
        ?
        data.map(proof =>
            <ProofsElement key={proof.id.toString()} data={proof} />
        )
        : <></>;
    return <>
        <ProofsElement initial="1" />
        <div className={styles.ruler}>
            <hr></hr>
        </div>
        {renderedProofs}
    </>;
}

export default ProofsList;
