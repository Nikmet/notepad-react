import styles from "./Logo.module.css";

function Logo({ image }) {
    console.log("logo");
    return <img className={styles.logo} src={image} alt="logo" />;
}

export default Logo;
