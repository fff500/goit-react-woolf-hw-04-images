import { useEffect } from 'react';

import style from './Modal.module.css';

export const Modal = ({ largeImageURL, toggleModal }) => {
  const handleEscClick = event => {
    if (event.key !== 'Escape') return;

    toggleModal();
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscClick);

    return () => document.removeEventListener('keydown', handleEscClick);
  }, [handleEscClick]);

  const handleClick = event => {
    if (event.target === event.currentTarget) {
      toggleModal();
    }
  };

  return (
    <div className={style.Overlay} onClick={handleClick}>
      <div className={style.Modal}>
        <img src={largeImageURL} alt="Search result" />
      </div>
    </div>
  );
};
