import styles from './button.module.css';

function Button({loadMore}) {
    return (
        <div className={styles.box}>
            <button className={styles.button} onClick={loadMore}>Load more</button>
        </div>
    )
    
}

export default Button;