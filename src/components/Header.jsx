import React from 'react';
import Logo from './Logo';
import Dates from './Dates';
import styles from '../css/components/Header.module.scss';

export default function Header() {
    return (
        <header className={styles.container}>
            <Logo />
            <Dates />
        </header>
    );
}
