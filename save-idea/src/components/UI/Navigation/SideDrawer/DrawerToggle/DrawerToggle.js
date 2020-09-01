import React from 'react';

import styles from './DrawerToggle.module.css';

const drawerToggle = (props) => (
    <div className={styles.DrawerToggle} onClick={props.clicked}/>
);

export default drawerToggle;