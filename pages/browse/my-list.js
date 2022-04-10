import Head from "next/head";
import SectionCards from "../../components/Card/section-cards";
import NavBar from "../../components/Nav/Navbar";
import useRedirectUser from "../../lib/redirectHook";
import { getWatchItAgaianVideos } from "../../lib/videos";
import styles from "../../styles/MyList.module.css";
export async function getServerSideProps(context) {
  const redirectUser = await useRedirectUser(context);

  const { userId, token } = redirectUser.props;

  const videos = await getWatchItAgaianVideos(userId, token);

  return {
    props: {
      myListVideos: videos,
    },
  };
}

const MyList = ({ myListVideos }) => {
  return (
    <div>
      <Head>
        <title>My list</title>
      </Head>
      <main className={styles.main}>
        <NavBar />
        <div className={styles.sectionWrapper}>
          <SectionCards
            title="My List"
            videos={myListVideos}
            size="small"
            shouldWrap
            shouldScale={false}
          />
        </div>
      </main>
    </div>
  );
};

export default MyList;
