import React from 'react';
import styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = props => (
    <ul className={styles.NavigationItems}>
        <NavigationItem link="/" exact>Save Idea</NavigationItem>
        {props.isAuth
            ? <NavigationItem link="/your-ideas">Your Ideas</NavigationItem>
            : null}
        {props.isAuth
            ? <NavigationItem link="/logout">Logout</NavigationItem>
            : <NavigationItem link="/auth">Login</NavigationItem>}
    </ul>
);

export default navigationItems;