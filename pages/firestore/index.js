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
    // console.log(querySnapshot);
    // querySnapshot.forEach((doc) => {
    //   console.log(doc.id);
    //   console.log(doc.data());
    // });

    // 일회성이아님 실행할때마다 쭉간다
    onSnapshot(usersCollectionRef, (data) => {
      console.log(
        data.docs.map((item) => {
          return item.data();
        })
      );
    });
  };

  const updateData = () => {
    const docId = "4Xtdj5g8mDlICdNQ2Lv8";
    const docToUpdate = doc(db, "users", docId);
    updateDoc(docToUpdate, {
      email: data.email,
      password: data.password,
    })
      .then(() => console.log("updated"))
      .catch((e) => alert(e.message));
  };

  const deleteData = async () => {
    const querySnapshot = await getDocs(usersCollectionRef);
    const docId = querySnapshot.docs[0].id;
    const docToDelete = doc(db, "users", docId);
    deleteDoc(docToDelete)
      .then(() => {
        alert("data deleted");
      })
      .catch((e) => alert(e.message));
  };

  return (
    <div>
      <Link href="/">
        <button>Back to dashboard</button>
      </Link>

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
        <button onClick={updateData}>Update data</button>
      </div>
      <div>
        <button onClick={loadData}>Load Data</button>
      </div>
      <div>
        <button onClick={deleteData}>Delete data</button>
      </div>
    </div>
  );
};

export default Firestore;
