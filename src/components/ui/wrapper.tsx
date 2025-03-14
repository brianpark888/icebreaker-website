import React from 'react'
import Modal from "./modal"
interface WrapperProps {
    isModalVisible: boolean;
    onBackdropClick: () => void;
}

const Wrapper: React.FC<WrapperProps> = ({onBackdropClick, isModalVisible}) => {
    if (!isModalVisible) {
        return null
    }

    return (<Modal onBackdropClick={onBackdropClick} />)
}

export default Wrapper