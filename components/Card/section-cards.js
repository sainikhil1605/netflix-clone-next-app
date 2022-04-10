import clsx from "classnames";
import Link from "next/link";
import Card from "./Card";
import styles from "./section-cards.module.css";
const SectionCards = (props) => {
  const { title, videos, size, shouldWrap = false, shouldScale = true } = props;
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={clsx(styles.cardWrapper, shouldWrap && styles.wrap)}>
        {videos.map((card, index) => (
          <div key={card?.id}>
            <Link
              href={`/video/[id]`}
              as={`/video/${card.id}`}
              key={index}
              passHref
            >
              <a>
                <Card
                  shouldScale={shouldScale}
                  key={index}
                  {...card}
                  id={index}
                  size={size}
                />
              </a>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};
export default SectionCards;
