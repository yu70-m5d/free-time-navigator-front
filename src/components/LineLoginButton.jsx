import Image from 'next/image';
import lineIcon from '/public/images/2x/line_64.png'
import styles from '@/styles/LineLogInButton.module.css';
import { useLineLogIn } from '@/hooks/useLineLogIn';

export default function LineLoginButton () {

  const { lineLogIn } = useLineLogIn();

  return (
    <>
      <div className={styles.lineLoginBtn} onClick={lineLogIn}>
        <div className={styles.mouseOver}>
          <Image src={lineIcon} width={64} height={64} />
          <div className={styles.line}></div>
          <p className={styles.text}>
            LINEでログイン
          </p>
        </div>
      </div>
    </>
  )

}