import ReactModal from 'react-modal';

import './Modal.css';

ReactModal.setAppElement('#root')

const Modal = ({ children, modalStat, modalClose, customStyles }) => {
  return (
    <div>
      <ReactModal
        isOpen={modalStat}
        onRequestClose={modalClose}
        className={!customStyles ? "modal" : customStyles.notifModal}
        overlayClassName="Overlay"
      >
        {children}
      </ReactModal>
    </div>
  )
}

Modal.defaultProps = {
  modalStat: false,
  children: 'This is a reusable Modal.',
  customStyles: false,
  modalClose: () => alert('The modalClose method is hasnt defined yet!')
}

export default Modal
