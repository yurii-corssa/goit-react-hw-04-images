import { List, ListContainer } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { useState } from 'react';
import { Modal } from 'components/Modal/Modal';
import { Loader } from 'components/Loader/Loader';

export const ImageGallery = ({ images }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState('');
  const [tags, setTags] = useState('');

  const openModal = (image, tags) => {
    setIsModalOpen(true);
    setImage(image);
    setTags(tags);
    setIsLoading(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setImage('');
    setTags('');
  };

  return (
    <ListContainer>
      <List>
        {images.map(({ id, webformatURL, largeImageURL, tags }) => {
          return (
            <ImageGalleryItem
              key={id}
              image={webformatURL}
              alt={tags}
              onClick={() => openModal(largeImageURL, tags)}
            />
          );
        })}
      </List>

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <img
            src={image}
            alt={tags}
            loading="lazy"
            onLoad={() => setIsLoading(false)}
          />
          {isLoading && <Loader />}
        </Modal>
      )}
    </ListContainer>
  );
};
