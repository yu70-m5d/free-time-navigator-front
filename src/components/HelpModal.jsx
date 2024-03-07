import styles from '@/styles/Modal.module.css';
import FeedbackIcon from '@mui/icons-material/Feedback';
import Link from "next/link";


export default function HelpModal({ onClose }) {
  const handleClose = () => {
    onClose();
  }

  return(
    <>
      <div id={styles.helpOverlay} onClick={handleClose}>
        <div id={styles.helpContent}>
          <div className={styles.iconAndMessage}>
            <FeedbackIcon />
            <p className={styles.helpText}>LINE通知機能を使用するには、LINEログインとアカウントの友達追加が必要です。</p>
          </div>
          <Link href={"/auth/signin"}>
            <p className={styles.login}>ログイン</p>
          </Link>
          <Link href={"https://liff.line.me/1645278921-kWRPP32q/?accountId=233mawqn"} >
            <p className={styles.addFriend}>友達追加はこちら</p>
          </Link>
        </div>
      </div>
    </>
  );
}