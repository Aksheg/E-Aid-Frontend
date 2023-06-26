import "./Modal.css";
import { CgClose } from "react-icons/cg";

type ModalProps = {
  children?: any;
  handleCloseModal?: () => void;
  modalContainer?: string;
  modalBackground?: string;
  modalBtn?: string;
};

const Modal: React.FC<ModalProps> = ({
  children,
  handleCloseModal,
  modalContainer,
  modalBackground,
  modalBtn,
}) => {
  return (
    <div className={`modalBackground ${modalBackground}`}>
      <button className={`modal-btn ${modalBtn}`} onClick={handleCloseModal}>
        <CgClose />
      </button>
      <div className={modalContainer}>{children}</div>
    </div>
  );
};

export default Modal;
