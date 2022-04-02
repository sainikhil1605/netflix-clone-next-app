import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import "../styles/globals.css";
function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const handleComplete = () => {
    setIsLoading(false);
  };
  useEffect(() => {
    router.events.on("routeChangeComplete", handleComplete);

    // const checkLogin = async () => {
    //   try {
    //     setIsLoading(true);
    //     const isLoggedIn = await magic.user.isLoggedIn();
    //     if (isLoggedIn) {
    //       router.push("/");
    //     } else {
    //       router.push("/login");
    //     }
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    // checkLogin();
    return () => {
      router.events.off("routeChangeComplete", handleComplete);
    };
  }, []);

  // if (isLoading) {
  //   return (
  //     <div>
  //       <Loading />
  //     </div>
  //   );
  // }
  return <Component {...pageProps} />;
}

export default MyApp;
