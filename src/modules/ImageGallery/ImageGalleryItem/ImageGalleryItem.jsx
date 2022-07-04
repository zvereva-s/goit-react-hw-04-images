import styles from './imageGalleryItem.module.css';

function ImageGalleryItem({ id, url, tags, onClick}) {
  return (
    <li className={styles.ImageGalleryItem} onClick={()=>onClick(id)}>
      <img className={styles[`ImageGalleryItem-image`]} src={url} alt={tags} />
    </li>
  );
}

export default ImageGalleryItem;
