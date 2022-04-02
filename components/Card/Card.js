import cls from "classnames";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./card.module.css";
const Card = (props) => {
  const { imgUrl = "/static/clifford.webp", size = "medium", id } = props;
  const classMap = {
    large: styles.lgItem,
    medium: styles.mdItem,
    small: styles.smItem,
  };
  const handleOnError = () => {
    console.log("error");
  };
  const scale = id === 0 ? { scaleY: 1.1 } : { scale: 1.1 };
  return (
    <div className={styles.container}>
      <motion.div
        className={cls(styles.imgMotionWrapper, classMap[size])}
        whileHover={{ ...scale }}
      >
        <Image
          src={imgUrl}
          alt="Netflix Logo"
          layout="fill"
          onError={handleOnError}
        />
      </motion.div>
    </div>
  );
};
export default Card;
