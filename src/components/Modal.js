import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, title, message, onClose, icon = '⚠' }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          ✕
        </button>
        {icon && <div className="modal-icon">{icon}</div>}
        {title && <h3 className="modal-title">{title}</h3>}
        <p className="modal-message">{message}</p>
        <button className="modal-button" onClick={onClose}>
          Got it
        </button>
      </div>
    </div>
  );
};

export default Modal;
