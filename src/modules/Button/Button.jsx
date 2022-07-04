import PropTypes from 'prop-types';
import styles from './button.module.css';

function Button({loadMore}) {
    return (
        <div className={styles.box}>
            <button className={styles.button} onClick={loadMore}>Load more</button>
        </div>
    )
    
}
Button.defaultProps = {
    loadMore: ()=>{},
}
Button.propTypes = {
    loadMore: PropTypes.func.isRequired,
}
export default Button;