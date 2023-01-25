import toast from 'react-hot-toast';
import PropTypes from 'prop-types';
import { useEffect, useState, useFocusEffect } from 'react';
import { imagesAPI } from 'Services/imagesAPI';
import { Gallery } from './imageGallery.styled';

export function ImageGallery ({searchQuery, page, imageList, getImageList, getTotalHits, changeLoadingStatus, children}) {
 
  const [isloaded, setLoaded] = useState(false)


  // useFocusEffect(() => {



  useEffect (()=>{
    // if (!isloaded) {

    async function fetchData() {
      changeLoadingStatus(true);
      try {        
        const data = await imagesAPI(searchQuery, page);
        console.log('searchQuery :>> ', searchQuery);
        console.log('page :>> ', page);
        if (data.hits.length === 0) {
          // if (data.totalHits === 0) {
           toast.error(`Sorry, there are no images matching your search query`);
           return
        }
        if (page === 1) {
        toast.success(`Hooray! We found ${data.totalHits} images.`);
        }
    console.log('data.hits', data.hits);
        getImageList(data.hits);
        getTotalHits(data.totalHits);
        changeLoadingStatus(false);
      } catch (error) {
        return toast.error(
          `Something went wrong. ${error}. Please, try again later`
        );
      } 
    }
        fetchData();
      // }

        // setLoaded(true)

}, [searchQuery, page])

  // async componentDidUpdate(prevProps) {
    // const searchQuery;
    // const currentPage = page;
    // const prevSearchQuery = prevProps.searchQuery;
    // const prevPage = prevProps.page;

    // if (prevSearchQuery !== searchQuery || prevPage !== currentPage) {
      

      
  // }

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
