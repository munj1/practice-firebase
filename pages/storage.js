import { useState } from "react";
import { app, storage } from "../firebase";
import { useEffect } from "react";
import Link from "next/link";
import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const Storage = () => {
  const [data, setData] = useState();

  const handleInput = (e) => {
    setData(e.target?.files[0]);
  };

  const handleSubmit = () => {
    const storageRef = ref(storage, `images/${data.name}`);
    const uploadTask = uploadBytesResumable(storageRef, data);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // handle unsuccessful uploads
        console.log(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
        });
      }
    );

    console.log(data);
  };

  const loadData = async () => {};

  const updateData = () => {};

  const deleteData = async () => {};

  return (
    <div>
      <Link href="/">
        <button>Back to dashboard</button>
      </Link>

      <div>
        <input
          type="file"
          name="email"
          placeholder="Email"
          onChange={handleInput}
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

export default Storage;
