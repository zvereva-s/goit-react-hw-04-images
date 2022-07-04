import { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './searchForm.module.css';

class SearchForm extends Component {
  render() {
    return (
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={this.props.onSubmit}>
          <button type="submit" className={styles[`SearchForm-button`]}>
            <span className={styles[`SearchForm-button-label`]}>Search</span>
          </button>
          <input
            className={styles[`SearchForm-input`]}
            type="text"
            name="query"
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
