import { useEffect, useState } from 'react';
import { Audio } from 'react-loader-spinner';

import { SearchBar, ImageGallery, Button } from 'components';
import { getImages } from 'helpers/api';

import style from './App.module.css';

export const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalImages, setTotalImages] = useState(0);

  const hendleSearch = query => {
    setImages([]);
    setPage(1);
    setSearchQuery(query);
  };

  const handleLoadMore = () => {
    setPage(state => state + 1);
  };

  useEffect(() => {
    const loadImages = async () => {
      setIsLoading(true);
      try {
        const {
          data: { hits, totalHits },
        } = await getImages(searchQuery, page);

        const newImages = hits.map(({ id, webformatURL, largeImageURL }) => {
          return { id, webformatURL, largeImageURL };
        });

        setImages(state => [...state, ...newImages]);
        setTotalImages(totalHits);
      } catch (error) {
        alert(error.response?.data || 'Something went wrong!');
      } finally {
        setIsLoading(false);
      }
    };

    if (page && searchQuery) {
      loadImages();
    }
  }, [page, searchQuery]);

  const showLoadMore = !isLoading && !!page && images.length < totalImages;

  return (
    <div className={style.App}>
      <SearchBar onSubmit={hendleSearch} />
      <ImageGallery images={images} />
      {isLoading && (
        <Audio
          height="80"
          width="80"
          radius="9"
          color="green"
          ariaLabel="three-dots-loading"
          wrapperStyle
          wrapperClass
        />
      )}
      {showLoadMore && <Button onClick={handleLoadMore} />}
    </div>
  );
};
