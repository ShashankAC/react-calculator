import React from 'react'
import styles from './Button.module.css'

function Button(props) {

    return (
        <div className={styles.button}>
            <p style={{fontWeight: props.fontWeight}} className={styles.content}>{props.content}</p>
        </div>
    )
}

export default Button