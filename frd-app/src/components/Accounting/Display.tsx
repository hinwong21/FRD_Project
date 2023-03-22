import { useState } from "react"
import styles from "./Display.module.scss";

export function Display({ result }: { result: string }) {

    return <div>
        <div className={styles.display}>{result}</div>
    </div>
}