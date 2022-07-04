import PropTypes from 'prop-types';
import styles from './imageGalleryItem.module.css';

function ImageGalleryItem({ id, url, tags, onClick}) {
  return (
    <li className={styles.ImageGalleryItem} onClick={()=>onClick(id)}>
      <img className={styles[`ImageGalleryItem-image`]} src={url} alt={tags} />
    </li>
  );
}
ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  tags: PropTypes.string, 
  onClick: PropTypes.func.isRequired,
}
export default ImageGalleryItem;
