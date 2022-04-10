import jwt from "jsonwebtoken";
export default async function useRedirectUser(context) {
  const token = context?.req?.cookies?.token;
  const userId = await jwt.decode(token, process.env.JWT_SECRET)?.issuer;
  if (!userId) {
    return {
      props: {},
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {
      userId,
      token,
    },
  };
}
