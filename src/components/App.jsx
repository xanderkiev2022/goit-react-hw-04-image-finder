import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { imagesAPI } from 'Services/imagesAPI';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Modal } from './Modal/Modal';
import { ButtonLoadMore } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Container } from './App.styled';

export function App () {

  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [imageList, setImageList] = useState([]);
  const [largeImage, setLargeImage] = useState(null);
  const [totalhits, setTotalhits] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!searchQuery) {return;}

    async function fetchData() {
      setIsLoading(true);
      try {
        const {hits, totalHits} = await imagesAPI(searchQuery, page);
        if (hits.length === 0) {toast.error(`Sorry, there are no images matching your search query`);return;}
        if (page === 1) {toast.success(`Hooray! We found ${totalHits} images.`);}
        setImageList(prevData => [...prevData, ...hits]);
        setTotalhits(totalHits);}
      catch (error) {return toast.error(`Something went wrong. ${error}. Please, try again later`);}
      finally {setIsLoading(false);}
    }

    fetchData();
  }, [searchQuery, page ]);


  const handleSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setPage (1);
    setImageList([])
  };
  const getLargeImage = largeImage => setLargeImage(largeImage);
  const loadMore = () => {setPage (prevPage=> prevPage + 1)};
  const toggleModal = () => {setShowModal(prevModal => !prevModal);};

    return (
      <Container>
        <Toaster position="top-right" reverseOrder={false} />
        <Searchbar onSubmit={handleSubmit} />
        <ImageGallery imageList={imageList}>
          {imageList?.map(image => (
            <ImageGalleryItem
              key={image.webformatURL}
              imageUrl={image.webformatURL}
              largeImgUrl={image.largeImageURL}
              tags={image.tags}
              toggleModal={toggleModal}
              getLargeImage={getLargeImage}
            ></ImageGalleryItem>
          ))}
        </ImageGallery>
        {isLoading && <Loader />}
        {showModal && <Modal largeImage={largeImage} toggleModal={toggleModal} />}
        {imageList && totalhits > 12 && <ButtonLoadMore loadMore={loadMore} />
        }
      </Container>
    );
  }
