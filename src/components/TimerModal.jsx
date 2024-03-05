import useModalOperation from '@/hooks/useModalOperation';
import { modalIsOpenState } from '@/state/atoms';
import styles from '@/styles/Modal.module.css';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

export default function TimerModal() {
  const modalIsOpen = useRecoilValue(modalIsOpenState);
  const { modalClose } = useModalOperation();

  const [time, setTime] = useState('');

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // フォームの送信処理を追加することができます。
    // この例では、ただ単に入力された時間をコンソールに出力します。
    console.log('Selected time:', time);
    // その後、モーダルを閉じる処理を実行します。
    modalClose();
  };

  if (modalIsOpen) {
    return (
      <div id={styles.overlay} onClick={modalClose}>
        <div id={styles.content} onClick={(e) => e.stopPropagation()}>
          <p>これがモーダルウィンドウです。</p>
          <form onSubmit={handleSubmit}>
            <label>
              時間：
              <input type="time" value={time} onChange={handleTimeChange} />
            </label>
            <button type="submit">Submit</button>
          </form>
          <p><button onClick={modalClose}>close</button></p>
        </div>
      </div>
    )
  }
}