import useModalOperation from '@/hooks/useModalOperation';
import useNotification from '@/hooks/useNotification';
import { modalIsOpenState, providerState } from '@/state/atoms';
import styles from '@/styles/Modal.module.css';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import HelpIcon from '@mui/icons-material/Help';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import HelpModal from './HelpModal';
import { useRouter } from 'next/router';

export default function TimerModal() {
  const router = useRouter();
  const modalIsOpen = useRecoilValue(modalIsOpenState);
  const provider = useRecoilValue(providerState);
  const { modalClose } = useModalOperation();

  const { sendNotification } = useNotification();

  const [time, setTime] = useState('');
  const [showHelp, setShowHelp] = useState(false);

  const helpOpen = () => {
    setShowHelp(true);
  }

  const helpClose = () => {
    setShowHelp(false);
  }

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (provider !== 'line') {
      alert("LINEでログインしてください。");
      router.push('/auth/signup');
      return;
    };
    // フォームの送信処理を追加することができます。
    sendNotification(time);
    // この例では、ただ単に入力された時間をコンソールに出力します。
    console.log('Selected time:', time);
    // その後、モーダルを閉じる処理を実行します。
    modalClose();
  };


  if (modalIsOpen) {
    return (
      <>
        <div id={styles.overlay} onClick={modalClose}>
          <div id={styles.content} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <HelpIcon className={styles.helpIcon} onClick={helpOpen} />
              <p className={styles.message}>設定した時刻の5分前にLINEで通知します。</p>
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.labelContainer}>
                <label className={styles.label} >
                  予定終了時間：
                  <input className={styles.input} type="time" value={time} onChange={handleTimeChange} />
                </label>
              </div>
              <div className={styles.buttons}>
                <button className={styles.submitButton} type="submit">通知する</button>
                <button className={styles.closeButton} onClick={modalClose}>キャンセル</button>
              </div>
            </form>
          </div>
        </div>
        { showHelp && <HelpModal onClose={helpClose} /> }
      </>
    )
  }
}