import PropTypes from 'prop-types';
import { GalleryItem, Img } from './ImageGallryItem.styled';

export function ImageGalleryItem({
  tags,
  imageUrl,
  largeImgUrl,
  getLargeImage,
  toggleModal,
}) {
  const hadleClick = () => {
    getLargeImage(largeImgUrl);
    toggleModal();
  };

  return (
    <GalleryItem onClick={hadleClick}>
      <Img src={imageUrl} alt={tags} />
    </GalleryItem>
  );
}

ImageGalleryItem.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  getLargeImage: PropTypes.func.isRequired,
  largeImgUrl: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
