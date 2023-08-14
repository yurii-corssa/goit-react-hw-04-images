import { Image, ListItems } from './ImageGalleryItem.styled';
import { useState } from 'react';
import { ImageLoader } from 'components/ImageLoader/ImageLoader';

export const ImageGalleryItem = ({ image, alt, onClick }) => {
  const [isLoad, setIsLoad] = useState(false);

  return (
    <ListItems onClick={onClick}>
      <Image
        src={image}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoad(true)}
      />
      {!isLoad && <ImageLoader />}
    </ListItems>
  );
};
