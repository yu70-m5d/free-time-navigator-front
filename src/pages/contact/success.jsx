import Header from "@/components/Header";
import styles from "@/styles/ContactSuccessPage.module.css";

export default function Page() {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <p className={styles.item1}>
          ありがとうございます。<br />
          お問い合わせを送信しました。
        </p>
      </div>
    </>
  )
}