import jwt from "jsonwebtoken";
import {
  findVideoIdByUser,
  insertStats,
  updateStats,
} from "../../lib/db/hasura";
export default async function stats(req, res) {
  const token = req.cookies.token;
  const inputParams = req.method === "POST" ? req.body : req.query;
  const { videoId } = inputParams;
  if (!token) {
    res.status(403).send({ message: "You are not logged in" });
  } else {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.issuer;

    const findVideo = await findVideoIdByUser(token, userId, videoId);
    const doesExist = findVideo.length > 0;
    if (req.method === "POST") {
      const { favourited, watched = true } = req.body;
      if (doesExist) {
        const resp = await updateStats(token, {
          watched,
          userId,
          videoId,
          favourited,
        });
        res.status(200).send({ data: resp });
      } else {
        // add it
        const response = await insertStats(token, {
          watched,
          userId,
          videoId,
          favourited,
        });
        res.send({ data: response });
      }
    } else {
      if (doesExist) {
        res.send(findVideo);
      } else {
        res.status(404);
        res.send({ user: null, msg: "Video not found" });
      }
    }
  }
}
