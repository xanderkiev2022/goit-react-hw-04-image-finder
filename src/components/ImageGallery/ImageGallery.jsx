
import PropTypes from 'prop-types';
import { Gallery } from './imageGallery.styled';

export function ImageGallery({
  imageList,
  children,
}) {
  
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth',
  });

  return <div>{imageList && <Gallery>{children}</Gallery>}</div>;
}

ImageGallery.propTypes = {
  imageList: PropTypes.array,
  children: PropTypes.array.isRequired,
};
