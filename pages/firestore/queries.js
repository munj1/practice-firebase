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
  query,
  where,
} from "firebase/firestore";

const Firestore = () => {
  const [data, setData] = useState({});
  const userDataCollectionRef = collection(db, "userdata");

  const handleInput = (event) => {
    let newInput = { [event.target.name]: event.target.value };

    setData({ ...data, ...newInput });
    // console.log(data);
  };

  const ageQuery = query(userDataCollectionRef, where("age", "<", 30));
  // collection, ref처럼 쓸수있음 , onSnapshot 안에 집어넣기 쌉가능

  const handleSubmit = () => {
    addDoc(userDataCollectionRef, {
      email: data.email,
      name: data.name,
      age: parseInt(data.age),
    })
      .then((docRef) => console.log(docRef.id))
      .catch((e) => alert(e.message));
  };

  const loadData = async () => {
    // const querySnapshot = await getDocs(userDataCollectionRef);
    // console.log(querySnapshot);
    // querySnapshot.forEach((doc) => {
    //   console.log(doc.id);
    //   console.log(doc.data());
    // });

    // 일회성이아님 실행할때마다 쭉간다
    onSnapshot(ageQuery, (data) => {
      console.log(
        data.docs.map((item) => {
          return item.data();
        })
      );
    });
  };

  const updateData = () => {
    const docId = "4Xtdj5g8mDlICdNQ2Lv8";
    const docToUpdate = doc(db, "userdata", docId);
    updateDoc(docToUpdate, {
      email: data.email,
      name: data.name,
      age: data.age,
    })
      .then(() => console.log("updated"))
      .catch((e) => alert(e.message));
  };

  const deleteData = async () => {
    const querySnapshot = await getDocs(userDataCollectionRef);
    const docId = querySnapshot.docs[0].id;
    const docToDelete = doc(db, "userdata", docId);
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
          name="name"
          placeholder="Name"
          onChange={(e) => handleInput(e)}
        />
        <input name="age" placeholder="Age" onChange={(e) => handleInput(e)} />

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
