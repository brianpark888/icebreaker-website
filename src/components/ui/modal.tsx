import React from "react"
import ReactDom from "react-dom"

interface ModalProps {
    onBackdropClick: () => void;
}

const Modal: React.FC<ModalProps> = ({onBackdropClick, children}) => {
    return ReactDOM.createPortal(<div onClick={onBackdropClick}>
        <span>Test Modal</span>
        </div>, document.getElementById('modal-root'))
}

export default Modal