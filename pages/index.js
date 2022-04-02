import Head from "next/head";
import Banner from "../components/Banner/Banner";
import SectionCards from "../components/Card/section-cards";
import NavBar from "../components/Nav/Navbar";
import { getPopularVideos, getVideos } from "../lib/videos";
import styles from "../styles/Home.module.css";

export async function getServerSideProps() {
  const disneyVideos = await getVideos("disney trailer");
  const productivityVideos = await getVideos("productivity");
  const travelVideos = await getVideos("travel");
  const popularVideos = await getPopularVideos();
  return {
    props: { disneyVideos, productivityVideos, travelVideos, popularVideos },
  };
}
export default function Home({
  disneyVideos,
  productivityVideos,
  travelVideos,
  popularVideos,
}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <NavBar username="nikhil@gmail.com" />
        <Banner
          title="Clifford the red dog"
          subTitle="Red Dog"
          imgUrl="/static/clifford.webp"
          videoId="eDm2o1x1T6o"
        />
        <div className={styles.sectionWrapper}>
          <SectionCards title="Disney" videos={disneyVideos} size="large" />
        </div>

        <div className={styles.sectionWrapper}>
          <SectionCards title="Travel" videos={travelVideos} size="medium" />
        </div>
        <div className={styles.sectionWrapper}>
          <SectionCards
            title="Productivity"
            videos={productivityVideos}
            size="small"
          />
        </div>
        <div className={styles.sectionWrapper}>
          <SectionCards title="Popular" videos={popularVideos} size="small" />
        </div>
      </div>
    </div>
  );
}
