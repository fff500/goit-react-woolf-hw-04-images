import { ImageGalleryItem } from 'components';

import style from './ImageGallery.module.css';

export const ImageGallery = ({ images }) => {
  return (
    <ul className={style.ImageGallery}>
      {images.map(({ id, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
        />
      ))}
    </ul>
  );
};
