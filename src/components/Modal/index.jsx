import { createPortal } from "react-dom";
import { MdOutlineClose } from "react-icons/md";
import "./index.css";

const Modal = ({ children, onClose, status }) => {
  return (
    <div className="modal">
      <div
        className={`modal__content ${
          status ? "modal__content--" + status : ""
        }`}
      >
        <button onClick={onClose} className="modal__btn-close">
          <MdOutlineClose />
        </button>

        <div className="modal__body">{children}</div>
      </div>
    </div>
  );
};

export default function ModalPortal({ children, onClose, status }) {
  return createPortal(
    <Modal onClose={onClose} status={status}>
      {children}
    </Modal>,
    document.getElementById("modal-root")
  );
}
