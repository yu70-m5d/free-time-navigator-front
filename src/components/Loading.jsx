import styles from "@/styles/Loading.module.css";

export default function Loading() {

  return (
    <>
      <div className={styles.container}>
        <div id={styles.animationContainer}>
          <span></span>
          <span></span>
          <span></span>
          <p>LOADING</p>
        </div>
      </div>
    </>
  );
}