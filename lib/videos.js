import videos from "../video.json";
export const getCommonVideos = async (url) => {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
  try {
    const BASE_URL = "youtube.googleapis.com/youtube/v3";
    const response = await fetch(
      `https://${BASE_URL}/${url}&maxResults=25&key=${YOUTUBE_API_KEY}`
    );
    let data = await response.json();
    return data.items.map((item) => {
      return {
        title: item.snippet.title,
        imgUrl: item?.snippet?.thumbnails?.high?.url,
        id: item?.id?.videoId || item.id,
      };
    });
  } catch (err) {
    console.log("Something went wrong", err);
    return videos.items.map((item) => {
      return {
        title: item.snippet.title,
        imgUrl: item?.snippet?.thumbnails?.high?.url,
        id: item?.id?.videoId || item.id,
      };
    });
  }
};

export const getVideos = (searchQuery) => {
  const URL = `search?part=snippet&q=${searchQuery}&type=video`;
  return getCommonVideos(URL);
};
export const getPopularVideos = () => {
  const URL =
    "videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US";
  return getCommonVideos(URL);
};
