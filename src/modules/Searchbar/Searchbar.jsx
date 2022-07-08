import { useState, useEffect, useRef,useCallback } from 'react';

import SearchForm from './SearchForm';
import ImageGallery from 'modules/ImageGallery';
import Loader from 'shared/components/Loader';
import Button from 'modules/Button';
import Modal from 'shared/components/Modal';

import { getImagesList } from 'shared/services/api/getImages';

function Searchbar() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  
  const firstRender = useRef(true);

  useEffect(() => {
    async function fetchProductsList() {
      setLoading(true);
      setError(false);

      try {
        const { data } = await getImagesList(query, page);
        const { totalHits, hits } = data;

          if (page === 1) {
            setItems(hits);
            setTotal(totalHits);
          }
          setItems(prevState => ([...prevState, ...hits]));
          setTotal(totalHits);
          
      }
      catch (error) {
        setError(true);
      }
      finally {
        setLoading(false);
      }
    }
    // query && fetchProductsList();
    if (!firstRender.current) {
      fetchProductsList();
    }
    else {
      firstRender.current = false;
    }
    
  }, [page, query])
  

  const setSearchQuery = useCallback(({ query }) => {
    setQuery(prevState => {
      if (prevState.query !== query) {
        setPage(1);
        setItems([]);
        return query
      }
    })
  }, [setItems])

  function loadMore() {
    setPage(page + 1);
  }
  const getImgObj = useCallback(({ largeImageURL, tags }) =>
  {
    setModalOpen(true);
    setModalContent({ largeImageURL, tags })   
  }, [setModalContent])

  function closeModal() {
    setModalOpen(false);
  }
    
  const { largeImageURL, tags } = modalContent;
  return(
    <>
      {modalOpen && (
        <Modal closeModal={closeModal}>
          <img src={largeImageURL} alt={tags} width="900" />
        </Modal>
      )}

      <SearchForm onSubmit={setSearchQuery} />
      {error && <p>Не удалось загрузить посты</p>}
      {loading && <Loader />}

      <ImageGallery items={items} onClick={getImgObj} />
      {!loading && items.length >= 12 && page * 12 <= total && (
        <Button loadMore={loadMore} />
      )}
    </>
  );
}

export default Searchbar;
