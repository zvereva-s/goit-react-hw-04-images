import { Component } from 'react';

import SearchForm from './SearchForm';
import ImageGallery from 'modules/ImageGallery';
import Loader from 'shared/components/Loader';
import Button from 'modules/Button';
import Modal from 'shared/components/Modal';

import { getImagesList} from 'shared/services/api/getImages';

class Searchbar extends Component {
  state = {
    items: [],
    query: '',
    page: 1,
    totalPages: 0,
    showModal: false,
    modalContent:{},
    error: false,
    loading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { page, query} = this.state;
    if (query !== prevState.query) {
      this.fetchProductsList();
    }
    if (page > prevState.page) {
      this.fetchProductsList();
    }
  }

  async fetchProductsList() {
    const { query, page } = this.state;
    this.setState({
      loading: true,
      error: false,
    });
    try {
      const { data } = await getImagesList(query, page);
      const { totalHits, hits } = data;

      this.setState(prevState => {
        if (page === 1) {
          return {
            items: [...hits],
            totalPages: totalHits,
          };
        }
        return {
          items: [...prevState.items, ...hits],
          totalPages: totalHits,
        };
      });
    } catch (error) {
      this.setState({
        error: true,
      });
    } finally {
      this.setState({ loading: false });
    }
  }

  setQuery = ({ query }) => {
    this.setState(prevState => {
      if (prevState.query !== query) {
        return {
          query,
          page: 1,
          items: [],
        };
      }
    });
  }

  loadMore = () => {
    this.setState(({ page }) => {
      return {
        page: page + 1,
      };
    });
  };

  getImgObj = ({largeImageURL, tags}) => {
    
    this.setState({
      showModal: true,
      modalContent: {largeImageURL, tags},
    })
  }

  closeModal = () => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    const { items, error, loading, showModal, modalContent, totalPages, page } =
      this.state;
    const { largeImageURL, tags } = modalContent;
    const { closeModal, setQuery,  loadMore, getImgObj } = this;

    return (
      <>
        {showModal && 
          <Modal closeModal={closeModal}>
            <img src={largeImageURL} alt={tags} width="900"/>
          </Modal>
        }

        <SearchForm onSubmit={setQuery} />
        {error && <p>Не удалось загрузить посты</p>}
        {loading && <Loader />}

        <ImageGallery items={items} onClick={getImgObj} />
        {!loading && items.length >= 12 && page * 12 <= totalPages && (
          <Button loadMore={loadMore} />
        )}
      </>
    );
  }
}

export default Searchbar;
