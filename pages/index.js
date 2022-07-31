import styles from "../styles/Home.module.css";
import { useState } from "react";
import { app } from "../firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { useEffect } from "react";
import Link from "next/link";

export default function Home() {
  let auth = getAuth();
  let googleProvider = new GoogleAuthProvider();
  let githubProvider = new GithubAuthProvider();
  const [data, setData] = useState({});
  const handleInput = (event) => {
    let newInput = { [event.target.name]: event.target.value };

    setData({ ...data, ...newInput });
    // console.log(data);
  };

  useEffect(() => {
    const user = auth.currentUser;
    console.log("connected user: ", user?.email);
  });

  useEffect(() => {
    onAuthStateChanged(auth, (data) => {
      if (data) {
        alert("loggged in", data);
      } else {
        alert("not logged in");
      }
    });
  }, []);

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((res) => {
        // console.log(res.user);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((res) => {
        // console.log(res.user);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleSignOut = () => {
    signOut(auth);
  };

  const handleSignInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        // console.log(res.user);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleSignInWithGithub = () => {
    signInWithPopup(auth, githubProvider)
      .then((res) => {
        // console.log(res.user);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className={styles.container}>
      <h1>Firebase + Next.js</h1>
      <div>
        <input
          name="email"
          placeholder="Email"
          onChange={(e) => handleInput(e)}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={(e) => handleInput(e)}
        />
        <button onClick={handleSignUp}>Sign Up</button>
      </div>
      <div>
        <input
          name="email"
          placeholder="Email"
          onChange={(e) => handleInput(e)}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={(e) => handleInput(e)}
        />
        <button onClick={handleSignIn}>Sign In</button>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
      <div>
        <button onClick={handleSignInWithGoogle}>Sign In With Google</button>
      </div>
      <div>
        <button onClick={handleSignInWithGithub}>Sign In With Github</button>
      </div>
      <div>
        <Link href="/firestore">
          <button>Firestore</button>
        </Link>
        <Link href="/firestore/queries">
          <button>Firestore queries</button>
        </Link>
      </div>
      <div>
        <Link href="/storage">
          <button>storage</button>
        </Link>
      </div>
    </div>
  );
}
