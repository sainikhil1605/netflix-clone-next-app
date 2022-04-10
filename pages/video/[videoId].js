import clsx from "classnames";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import DisLike from "../../components/icons/dislike-icon";
import Like from "../../components/icons/like-icon";
import NavBar from "../../components/Nav/Navbar";
import { getVideoDetails } from "../../lib/videos";
import styles from "../../styles/Video.module.css";
Modal.setAppElement("#__next");

export async function getStaticProps(context) {
  const { params } = context;
  const video = await getVideoDetails(params.videoId);
  // console.log(context);
  // const redirectUser = await useRedirectUser(context);
  // console.log(redirectUser);
  //  console.log(watchedVideos);
  // if (redirectUser.redirect) {
  //   return redirectUser;
  // }
  return {
    props: {
      video: video?.[0] ?? {},
    },
    revalidate: 30,
  };
}
export async function getStaticPaths() {
  const listOfVideos = ["CEOc2bGV3j8", "a-lbjsu1jgc", "eDm2o1x1T6o"];
  const paths = listOfVideos.map((videoId) => ({
    params: { videoId },
  }));
  return {
    paths,
    fallback: "blocking",
  };
}

const Video = ({ video }) => {
  const router = useRouter();
  const { videoId } = router.query;
  useEffect(() => {
    const getData = async () => {
      const res = await fetch("/api/stats?videoId=" + videoId);
      const data = await res.json();
      if (data?.length > 0) {
        const { favourited, watched } = data[0];
        if (favourited === 1) {
          setToggleLike(true);
        } else if (favourited === 0) {
          setToggleDisLike(true);
        }
      }
    };
    getData();
  }, []);
  const runRatingService = async (favourited) => {
    return await fetch("/api/stats", {
      method: "POST",
      body: JSON.stringify({
        videoId,
        favourited,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  const handleToggleLike = async () => {
    const val = !toggleLike;
    setToggleLike(val);
    setToggleDisLike(toggleLike);

    const favourited = val ? 1 : 0;
    const response = await runRatingService(favourited);
  };

  const handleToggleDislike = async () => {
    const val = !toggleDisLike;
    setToggleDisLike(val);
    setToggleLike(toggleDisLike);
    const favourited = val ? 0 : 1;
    const response = await runRatingService(favourited);
  };
  const [toggleLike, setToggleLike] = useState(false);
  const [toggleDisLike, setToggleDisLike] = useState(false);

  const {
    title,
    publishTime,
    description,
    channelTitle,
    statistics: { viewCount } = { viewCount: 0 },
  } = video;
  return (
    <div className={styles.container}>
      <NavBar />
      <Modal
        isOpen={true}
        contentLabel="Watch the video"
        onRequestClose={() => router.back()}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <iframe
          id="ytplayer"
          className={styles.videoPlayer}
          type="text/html"
          width="100%"
          height="360"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=0&origin=http://example.com&controls=0&rel=1`}
          frameBorder="0"
        ></iframe>

        <div className={styles.likeDislikeBtnWrapper}>
          <div className={styles.likeBtnWrapper}>
            <button onClick={handleToggleLike}>
              <div className={styles.btnWrapper}>
                <Like selected={toggleLike} />
              </div>
            </button>
          </div>
          <button onClick={handleToggleDislike}>
            <div className={styles.btnWrapper}>
              <DisLike selected={toggleDisLike} />
            </div>
          </button>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.modalBodyContent}>
            <div className={styles.col1}>
              <p className={styles.publishTime}>{publishTime}</p>
              <p className={styles.title}>{title}</p>
              <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.col2}>
              <p className={clsx(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>Cast: </span>
                <span className={styles.channelTitle}>{channelTitle}</span>
              </p>
              <p className={clsx(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>View Count: </span>
                <span className={styles.channelTitle}>{viewCount}</span>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default Video;
