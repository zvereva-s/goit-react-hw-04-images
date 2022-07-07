import { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './searchForm.module.css';

class SearchForm extends Component {
  state = {
    query: '',
  }

 

  handleChange = ({ target }) => {
    
        const { name, value } = target;
        this.setState({
            [name]: value
        })
    }
  
  handleSubmit=(e)=> {
    e.preventDefault();
    this.props.onSubmit({...this.state});


    
    this.resetForm();
  }

  resetForm() {
    this.setState({
     query: '',})
    }

  render() {
    const { query } = this.state;
    const { handleChange, handleSubmit } = this;

        return (
          <header className={styles.Searchbar}>
            <form className={styles.SearchForm} onSubmit={handleSubmit}>
              <button type="submit" className={styles[`SearchForm-button`]}>
                <span className={styles[`SearchForm-button-label`]}>Search</span>
              </button>
              <input
                className={styles[`SearchForm-input`]}
                type="text"
                name="query"
                value={query}
                onChange={handleChange}
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
              />
            </form>
          </header>
        );
      }
}

SearchForm.defaultProps = {
  onSubmit: ()=>{},
}
SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}
export default SearchForm;
