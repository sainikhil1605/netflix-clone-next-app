import Link from "next/link";
import Card from "./Card";
import styles from "./section-cards.module.css";
const SectionCards = (props) => {
  const { title, videos, size } = props;

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        {videos.map((card, index) => (
          <>
            <Link
              href={`/video/[id]`}
              as={`/video/${card.id}`}
              key={index}
              passHref
            >
              <a>
                <Card key={index} {...card} id={index} size={size} />
              </a>
            </Link>
          </>
        ))}
      </div>
    </section>
  );
};
export default SectionCards;
