import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import magic from "../../lib/magic-client";
import styles from "./Navbar.module.css";
const NavBar = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [username, setUsername] = useState("");
  const router = useRouter();
  useEffect(() => {
    const getEmail = async () => {
      try {
        const { email } = await magic.user.getMetadata();
        const didToken = await magic.user.getIdToken();
        // console.log(didToken);
        setUsername(email);
      } catch (err) {
        console.log(err);
      }
    };
    getEmail();
  }, []);
  const handleOnClickHome = (e) => {
    e.preventDefault();
    router.push("/");
  };
  const handleOnClickMyList = (e) => {
    e.preventDefault();
    router.push("/browe/my-list");
  };
  const handleSignOut = async () => {
    try {
      await magic.user.logout();
    } catch (err) {
      console.log(err);
    }
    router.push("/login");
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link href="/" passHref>
          <a className={styles.logoLink}>
            <div className={styles.logoWrapper}>
              <Image
                src={"/static/netflix.svg"}
                alt="Netflix Logo"
                width="128px"
                height="34px"
              />
            </div>
          </a>
        </Link>

        <ul className={styles.navItems}>
          <li className={styles.navItem} onClick={handleOnClickHome}>
            Home
          </li>
          <li className={styles.navItem2} onClick={handleOnClickMyList}>
            My List
          </li>
        </ul>
        <nav className={styles.navContainer}>
          <div>
            <button
              className={styles.usernameBtn}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <p className={styles.username}>{username}</p>
              <Image
                src={"/static/expand_more.svg"}
                alt="Expand dropdown"
                width="24px"
                height="24px"
              />
            </button>
            {showDropdown && (
              <div className={styles.navDropdown}>
                <div>
                  <Link href="/login">
                    <a
                      className={styles.linkName}
                      onClick={() => handleSignOut()}
                    >
                      Sign Out
                    </a>
                  </Link>
                  <div className={styles.lineWrapper}></div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};
export default NavBar;
