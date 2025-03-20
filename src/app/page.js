"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import styles from "./page.module.css";
import Conversor from "@/components/conversor";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const auth = Cookies.get("auth");
    if (auth !== "true") {
      router.push("/login")
    }
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Conversor />
      </main>
    </div>
  );
}
