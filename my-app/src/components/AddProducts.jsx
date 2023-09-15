import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState, ChangeEvent } from "react";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { TfiArrowCircleLeft } from "react-icons/tfi";
import { auth, db, storage } from "./firebase/config";

const initialState = {
  name: "",
  imagenURL: "",
  price: 0,
};

const AddProducts = () => {
  const { id } = useParams();
  const [products, setProducts] = useState({ ...initialState });
  const [uploadProgress, setUploadProgress] = useState(0);
  const navigate = useNavigate();

;

  const agregarProd = (e) => {
    e.preventDefault();

    try {
      const docRef = addDoc(collection(db, "Productos"), {
        nombre: products.name,
        imagenURL: products.imagenURL,
        precio: Number(products.price),
        createdAt: Timestamp.now().toDate(),
      });
      setUploadProgress(0);
      setProducts({ ...initialState });
      window.alert("Excelente datos subidos satisfactoriamente!");
    } catch (error) {
 window.alert("Error")
    }
  };

    const handleImageChange = (event) => {
      let file = event.target.files?.[0];
      if (event.target.files?.[0]) {
        file = event.target.files[0];
        const storageRef = ref(storage, file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
          },
          (error) => {
            window.alert(error)
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setProducts({ ...products, imagenURL: downloadURL });
             window.alert("success")
            });
          }
        );
      }
    };

  const user = auth.currentUser;
  const userId = user ? user.uid : "";
  console.log(products);

  return (
    <body className="flex flex-col items-center justify-center bg-[#111523] antialiased min-h-screen">
      <div className="container mx-auto my-60 min-h-screen mt-[150px] ">
        <div className="bg-neutral-800  relative shadow rounded-lg w-5/6 md:w-5/6 lg:w-4/6 xl:w-3/6 mx-auto">
          <NavLink to={"/"}>
            <button className="pr-98 pl-[20px] mt-3 vml-3 mobile:ml-0 mobile:mt-5">
              <TfiArrowCircleLeft
                size={28}
                className="text-gray-400 hover:text-blue-600"
              />
            </button>
          </NavLink>
          <div className="mt-16">
            <h1 className="font-bold text-center text-3xl text-gray-300 mt-[-40px]">
              Agregar Productos
            </h1>
            {/* {isLoading && <Loading />} */}
            <div className="flex flex-col justify-center items-center bg-neutral-800 py-8">
              <form
                onSubmit={agregarProd}
                className="w-full max-w-lg mobile- bg-neutral-600 p-8 border-gray-300 rounded-lg"
              >
                <div className="mb-4">
                  <div className="bg-white rounded-lg border-2 border-gray-400 p-2 w-full mobile:text-xs mobile:flex mobile:flex-col">
                    {uploadProgress === 0 ? null : (
                      <div className="styles.progress">
                        <div
                          className={"progress-bar"}
                          style={{ width: `${uploadProgress}%` }}
                        >
                          {uploadProgress < 100
                            ? `Uploading ${uploadProgress}`
                            : `Uploaded Complete ${uploadProgress} %`}
                        </div>
                      </div>
                    )}
                    <input
                      type="file"
                      placeholder="Image File"
                      accept="image/*"
                      name="imagen"
                      className="mobile:text-xs"
                      onChange={handleImageChange}
                    />
                    {products.imagenURL === "" ? null : (
                      <input
                        type="text"
                        placeholder="Image URL"
                        name="imagenURL"
                        value={products.imagenURL}
                        disabled
                        className="text-sm"
                      />
                    )}
                  </div>
                </div>
                <div className="mb-4 relative ">
                  <label className="text-gray-300 block  mb-2" htmlFor="precio">
                    Nombre:
                  </label>
                  <input
                    className="border border-gray-400 p-2 pl-8 w-full"
                    type="text"
                    required
                    name="name"
                    value={products.name}
                    onChange={(e) =>
                      setProducts({ ...products, name: e.target.value })
                    }
                  />
                </div>
                <div className="mb-4 relative ">
                  <label className="text-gray-300 block  mb-2" htmlFor="precio">
                    Precio:
                  </label>
                  <span className="absolute left-0 top-0 px-2 py-10">$</span>
                  <input
                    className="border border-gray-400 p-2 pl-8 w-full"
                    type="text"
                    required
                    name="precio"
                    value={products?.price}
                    onChange={(e) =>
                      setProducts({ ...products, price: e.target.value })
                    }
                  />
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Guardar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default AddProducts;
