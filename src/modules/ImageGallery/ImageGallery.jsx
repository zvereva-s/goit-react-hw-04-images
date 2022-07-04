import PropTypes from 'prop-types';
import ImageGalleryItem from 'modules/ImageGallery/ImageGalleryItem';
import styles from './imageGallery.module.css';

function ImageGallery({items, onClick}) {
    const images = items.map(({ id, webformatURL, tags }) => <ImageGalleryItem key={id} url={webformatURL} tags={tags} onClick={()=>onClick(id)} />)
    
    return (
        <ul className={styles.ImageGallery}>
        {images}
        </ul>
    )
}
ImageGallery.defaultProps = {
    items: [],
    onClick: ()=>{},
}
ImageGallery.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            webformatURL: PropTypes.string.isRequired,
            tags: PropTypes.string, 
        })
    ),
    onClick: PropTypes.func.isRequired,
}
export default ImageGallery;