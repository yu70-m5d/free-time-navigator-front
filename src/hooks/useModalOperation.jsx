import { modalIsOpenState } from "@/state/atoms"
import { useSetRecoilState } from "recoil"

export const useModalOperation = () => {
  const setModalIsOpen = useSetRecoilState(modalIsOpenState)

  const modalOpen = () => {
    setModalIsOpen(true);
  };

  const modalClose = () => {
    setModalIsOpen(false);
  };

  return {modalOpen, modalClose};
}