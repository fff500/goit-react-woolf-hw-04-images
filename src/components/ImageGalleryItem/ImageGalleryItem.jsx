import { useState } from 'react';

import { Modal } from 'components/Modal/Modal';

import style from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ webformatURL, largeImageURL }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(state => !state);

  return (
    <>
      <li className={style.ImageGalleryItem} onClick={toggleModal}>
        <img src={webformatURL} alt="Search result" />
      </li>
      {showModal && (
        <Modal largeImageURL={largeImageURL} toggleModal={toggleModal} />
      )}
    </>
  );
};
