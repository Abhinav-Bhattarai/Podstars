import React from 'react'
import styles from '../../styles/spinner.module.css';
import Spinner from './spinner';

const LoadingPage = () => {
    return (
        <div className={styles.Container}>
            <Spinner/>
        </div>
    )
}

export default LoadingPage;