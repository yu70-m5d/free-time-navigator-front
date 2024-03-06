import styles from '@/styles/Modal.module.css';
import FeedbackIcon from '@mui/icons-material/Feedback';

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
            <p>LINE通知機能を使用するには、LINEログインとアカウントの友達追加が必要です。</p>
          </div>
        </div>
      </div>
    </>
  );
}