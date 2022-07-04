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
    q: 'random',
    page: 1,
    totalPages: 0,
    showModal: false,
    modalContent:[],
    error: false,
    loading: false,
  };

  componentDidMount() {
    this.fetchProductsList();
  }
  componentDidUpdate(prevProps, prevState) {
    const { page, q} = this.state;
    if (q !== prevState.q) {
      this.fetchProductsList();
      this.setState({
        page: 1,
      });
    }
    if (page > prevState.page) {
      this.fetchProductsList();
    }
  }

  async fetchProductsList() {
    const { q, page } = this.state;
    this.setState({
      loading: true,
      error: false,
    });
    try {
      const { data } = await getImagesList(q, page);
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

  handleSubmit = e => {
    e.preventDefault();
    const { target } = e;
    const {
      elements: { query },
    } = target;

    this.setState(prevState => {
      if (prevState.q !== query.value) {
        return {
          q: query.value,
          page: 1,
          items: [],
        };
      }
    });
  };

  loadMore = () => {
    this.setState(({ page }) => {
      return {
        page: page + 1,
      };
    });
  };

  getImgId = (id) => {
    const { items } = this.state;
    this.setState({
      showModal: true,
      modalContent: items.filter(el => el.id === id)[0],
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
    const { closeModal, handleSubmit,  loadMore } = this;

    return (
      <>
        {showModal && 
          <Modal closeModal={closeModal}>
            <img src={modalContent.largeImageURL} alt={modalContent.tags} width="900"/>
          </Modal>
        }

        <SearchForm onSubmit={handleSubmit} />
        {error && <p>Не удалось загрузить посты</p>}
        {loading && <Loader />}

        <ImageGallery items={items} onClick={this.getImgId} />
        {!loading && items.length >= 12 && page * 12 <= totalPages && (
          <Button loadMore={loadMore} />
        )}
      </>
    );
  }
}

export default Searchbar;
