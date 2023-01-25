import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
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

  const handleSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setPage (1);
    setImageList([])
  };
  const changeLoadingStatus = value => setIsLoading(value);
  const getLargeImage = largeImage => setLargeImage(largeImage);
  const getTotalHits = totalhits => setTotalhits(totalhits);

  const loadMore = () => {setPage (prevPage=> prevPage + 1)};
  const toggleModal = () => {setShowModal(prevModal => !prevModal);};

  // const getImageList = data => {
  //   imageList ? setImageList(prevData => [...prevData, ...data]):setImageList(data);
  // };

  const getImageList = data => {

    console.log('data :>> ', data);
    if (!imageList) {
      setImageList(data);
      return;
    }
    if (imageList) {
      // setImageList(data)
      setImageList(prevData => [...prevData, ...data])
      return;
    }
  };


    return (
      <Container>
        <Toaster position="top-right" reverseOrder={false} />
        <Searchbar onSubmit={handleSubmit} />
        <ImageGallery
          searchQuery={searchQuery}
          page={page}
          imageList={imageList}
          getImageList={getImageList}
          getTotalHits={getTotalHits}
          changeLoadingStatus={changeLoadingStatus}
        >
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
