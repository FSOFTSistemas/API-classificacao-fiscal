"use client"
import styles from "./page.module.css";
import Conversor from "@/components/conversor";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Conversor/>
      </main>
      
    </div>
  );
}
