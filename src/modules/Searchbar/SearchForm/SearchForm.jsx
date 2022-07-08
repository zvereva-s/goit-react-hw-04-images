import { memo } from 'react';

import { useForm } from '../../../shared/hooks/useForm';
import { initialStateForm } from './initialStateForm';

import PropTypes from 'prop-types';

import styles from './searchForm.module.css';

function SearchForm({onSubmit}) {
  const { formState, handleChange, handleSubmit} = useForm({ initialStateForm, onSubmit });

  const { query } = formState;
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

SearchForm.defaultProps = {
  onSubmit: () => { },
  isReset: false,
};
SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialStateForm: PropTypes.object,
};
export default memo(SearchForm);
