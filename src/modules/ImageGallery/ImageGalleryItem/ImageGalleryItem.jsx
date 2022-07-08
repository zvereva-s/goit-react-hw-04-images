import { memo } from "react";

import PropTypes from 'prop-types';
import styles from './imageGalleryItem.module.css';

function ImageGalleryItem({url, tags,largeImageURL, onClick}) {
  return (
    <li className={styles.ImageGalleryItem} onClick={()=>onClick({largeImageURL, tags})}>
    <img className={styles[`ImageGalleryItem-image`]} src={url} alt={tags} />
    </li>
  );
}
ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  tags: PropTypes.string, 
  largeImageURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}
export default memo(ImageGalleryItem);
