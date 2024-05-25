import {motion} from 'framer-motion';
import Backdrop from '../Backdrop/Backdrop';

import './Modal.scss'

interface ModaLProps {
    handleClose: () => void;
    text: String;
}

const dropIn = {
    hidden: {
        y: "-100vh",
        opacity: 0,
    },
    visible: {
        y: "0",
        opacity: 1,
        transition: {
            duration: 0.1,
            type: "spring",
            damping: 25,
            stiffness: 500,
        }
    },
    exit: {
        y: "100vh",
        opacity: 0,
    }
}

function Modal({handleClose, text}: ModaLProps) {
    return (
        <Backdrop onClick={handleClose}>
            <motion.div
                onClick={(e) => e.stopPropagation()}
                className="modal"
                variants={dropIn}
                initial="hidden"
                animate="visible"
                exit="exit"
            >

            </motion.div>
        </Backdrop>
    )
}

export default Modal