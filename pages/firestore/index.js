import styles from "../../styles/Home.module.css";
import { useState } from "react";
import { app, db } from "../../firebase";
import { useEffect } from "react";
import Link from "next/link";

import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";

const Firestore = () => {
  const [data, setData] = useState({});
  const [show, setShow] = useState(false);
  const [display, setdisplay] = useState();
  const usersCollectionRef = collection(db, "users");

  const handleInput = (event) => {
    let newInput = { [event.target.name]: event.target.value };

    setData({ ...data, ...newInput });
    // console.log(data);
  };

  const handleSubmit = () => {
    addDoc(usersCollectionRef, {
      email: data.email,
      password: data.password,
    })
      .then((docRef) => console.log(docRef.id))
      .catch((e) => alert(e.message));
  };

  const loadData = async () => {
    // const querySnapshot = await getDocs(usersCollectionRef);
    // // console.log(querySnapshot);
    // const queryResult = [];
    // querySnapshot.forEach((doc) => {
    //   // console.log(doc.id);
    //   // console.log(doc.data());
    //   queryResult.push({ ...doc.data(), id: doc.id });
    // });

    // setdisplay(queryResult);
    setShow(!show);
  };

  const updateData = (docId) => {
    const docToUpdate = doc(db, "users", docId);
    updateDoc(docToUpdate, {
      email: data.email,
      password: data.password,
    })
      .then(() => console.log("updated"))
      .catch((e) => alert(e.message));
  };

  const deleteData = async (docId) => {
    const docToDelete = doc(db, "users", docId);
    deleteDoc(docToDelete)
      .then(() => {
        alert("data deleted");
      })
      .catch((e) => alert(e.message));
  };

  useEffect(() => {
    // 일회성이아님 실행할때마다 쭉간다
    onSnapshot(usersCollectionRef, (data) => {
      console.log(
        data.docs.map((item) => {
          return item.data();
        })
      );
      console.log("display", display);
      const dataArr = data.docs.map((item) => {
        return { id: item.id, ...item.data() };
      });
      setdisplay(dataArr);
    });
  }, []);

  return (
    <div className={styles.container}>
      <Link href="/">
        <button>Back to dashboard</button>
      </Link>

      <h1>[users] firestore db </h1>
      <h1>Need to be logged in</h1>

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
        <button onClick={handleSubmit}>Upload data</button>
      </div>
      <div>
        <button onClick={loadData}>Load Data</button>
      </div>
      <div>
        <button onClick={deleteData}>Delete data</button>
      </div>

      {show && display && (
        <>
          <div style={{ padding: "10px", marginTop: "10px" }}>
            Edit:
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
          </div>

          <ul>
            {display.map((user, i) => {
              return (
                <li key={user.id} style={{ padding: "10px" }}>
                  {`${user.email} - ${user.password}`}
                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={() => updateData(user.id)}
                  >
                    edit
                  </button>
                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={() => deleteData(user.id)}
                  >
                    delete
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};

export default Firestore;
