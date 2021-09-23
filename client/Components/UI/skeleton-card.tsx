import React from 'react'
import styles from '../../styles/skeletoncard.module.css';

const SkeletonCard = () => {
    return (
        <main id={styles.SkeletonCardContainer}>
            <div className={styles.mover} id={styles.mover1}></div>
            <div className={styles.mover} id={styles.mover2}></div>
            <div className={styles.mover} id={styles.mover3}></div>
        </main>
    )
}

export default SkeletonCard;
