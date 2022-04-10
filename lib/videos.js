import videos from "../video.json";
import { getMyListVideos } from "./db/hasura";
export const getCommonVideos = async (url) => {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
  try {
    const BASE_URL = "youtube.googleapis.com/youtube/v3";
    const response = await fetch(
      `https://${BASE_URL}/${url}&maxResults=25&key=${YOUTUBE_API_KEY}`
    );
    let data = await response.json();
    return data.items.map((item) => {
      const id = item?.id?.videoId || item.id;
      return {
        title: item.snippet.title,
        imgUrl: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
        id: id,
        description: item.snippet.description,
        publishTime: item.snippet.publishedAt,
        channelTitle: item.snippet.channelTitle,
        statistics: item?.statistics ? item?.statistics : { viewCount: 0 },
      };
    });
  } catch (err) {
    // console.log("Something went wrong", err);
    return videos.items.map((item) => {
      const id = item?.id?.videoId || item.id;
      return {
        title: item?.snippet?.title,
        imgUrl: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
        id: item?.id?.videoId || item.id,
        description: item.snippet.description,
        publishTime: item.snippet.publishedAt,
        channelTitle: item.snippet.channelTitle,
        statistics: item?.statistics ? item?.statistics : { viewCount: 0 },
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

export const getVideoDetails = (videoId) => {
  const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`;
  return getCommonVideos(URL);
};
export const getWatchItAgaianVideos = async (userId, token) => {
  const videos = await getMyListVideos(userId, token);
  return videos.map((item) => {
    return {
      id: item.videoId,
      imgUrl: `https://i.ytimg.com/vi/${item.videoId}/maxresdefault.jpg`,
    };
  });
};
