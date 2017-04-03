import React from 'react';
import styles from './boxes.mcss';

const Boxes = () => (
    <div>
        <div className={styles.container}>
            <div className={styles.c1}>
                <div className={styles.cWrap}>
                    <h2>foo</h2>
                    <h2>foo</h2>
                    <h2>foo</h2>
                    <h2>foo</h2>
                    <h2>foo</h2>
                    <h2>foo</h2>
                    <h2>foo</h2>
                </div>
            </div>
            <div className={styles.c2}>C2</div>
            <div className={styles.c3}>C3</div>
            <div className={styles.c4}>C4</div>
            <div className={styles.c5}>C5</div>
        </div>
    </div>
);

export default Boxes;
