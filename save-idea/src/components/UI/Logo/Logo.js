import React from 'react';
import Logo from '../../../assets/images/save-idea-logo.png';
import styles from './Logo.module.css';

const logo = () => {
    return (
        <div className={styles.Logo}>
            <img src={Logo} alt="SaveIdea"/>
        </div>
    );
};

export default logo;