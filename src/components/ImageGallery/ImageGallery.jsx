import toast from 'react-hot-toast';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { imagesAPI } from 'Services/imagesAPI';
import { Gallery } from './imageGallery.styled';

export function ImageGallery({
  searchQuery,
  page,
  imageList,
  getImageList,
  getTotalHits,
  changeLoadingStatus,
  children,
}) {
  
  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    async function fetchData() {
      changeLoadingStatus(true);
      try {
        const data = await imagesAPI(searchQuery, page);
        if (data.hits.length === 0) {
          toast.error(`Sorry, there are no images matching your search query`);
          return;
        }
        if (page === 1) {
          toast.success(`Hooray! We found ${data.totalHits} images.`);
        }
        getImageList(data.hits);
        getTotalHits(data.totalHits);
      } catch (error) {
        return toast.error(`Something went wrong. ${error}. Please, try again later`
        );
      } finally {
        changeLoadingStatus(false);
      }
    }
    fetchData();
  }, [searchQuery, page]);

  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth',
  });

  return <div>{imageList && <Gallery>{children}</Gallery>}</div>;
}

ImageGallery.propTypes = {
  changeLoadingStatus: PropTypes.func.isRequired,
  getImageList: PropTypes.func.isRequired,
  getTotalHits: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  imageList: PropTypes.array,
  children: PropTypes.array.isRequired,
};
