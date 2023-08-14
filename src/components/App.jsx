import { useEffect, useState } from 'react';
import { GlobalStyle, Header, Section } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchPhotos } from './services/api';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Notification } from './Notification/Notification';

const message = {
  galleryEnd(query) {
    return `No more images were found for your query "${query}". Please try another search.`;
  },
  greeting() {
    return 'Welcome to the image search page! Explore and find captivating pictures using keywords.';
  },
  notFound(query) {
    return `Unfortunately, nothing found for your search "${query}". Please try another search.`;
  },
  error() {
    return 'Oops, something went wrong, please reload the page or try again later';
  },
};

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loadMoreBtn, setLoadMoreBtn] = useState(false);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!query) {
      return;
    }

    handleLoader();

    fetchPhotos(query, page)
      .then(({ hits, totalHits }) => {
        setImages(prevImages => [...prevImages, ...hits]);
        setLoadMoreBtn(page < Math.ceil(totalHits / 12));
      })
      .catch(() => setError(true))
      .finally(handleLoader);
  }, [query, page]);

  const handleSubmit = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  const handleLoader = () => {
    setLoader(prevLoader => {
      return !prevLoader;
    });
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      <GlobalStyle />
      <Section>
        <Header>
          <Searchbar onSubmit={handleSubmit} />
        </Header>
      </Section>
      <Section>{images.length > 0 && <ImageGallery images={images} />}</Section>
      <Section>
        {loadMoreBtn && <Button onClick={loadMore}>Load More</Button>}
        {images.length > 0 && !loadMoreBtn && (
          <Notification text={message.galleryEnd(query)} />
        )}
        {!images.length && !query && <Notification text={message.greeting()} />}
        {!images.length && query && (
          <Notification text={message.notFound(query)} />
        )}
        {error && <Notification text={message.error()} />}
        {loader && <Loader />}
      </Section>
    </>
  );
};
