import ImageGalleryItem from 'modules/ImageGallery/ImageGalleryItem';
import styles from './imageGallery.module.css';

function ImageGallery({items, onClick, onOpenModal }) {
    const images = items.map(({ id, webformatURL, tags }) => <ImageGalleryItem key={id} url={webformatURL} tags={tags} onClick={()=>onClick(id)} />)
    
    return (
        <ul className={styles.ImageGallery}>
        {images}
        </ul>
    )
}
ImageGallery.defaultProps = {
    items: [],
}
export default ImageGallery;