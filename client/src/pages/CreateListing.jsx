import { useState } from "react";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { FaTrashAlt } from "react-icons/fa";
import { app } from "../firebase";

export default function CreateListing() {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({ imageUrls: [] });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  console.log(formData);

  const handleImageSubmit = (e) => {
    e.preventDefault();
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false)
        })
        .catch((error) => {
          setImageUploadError("Image Upload Failed (2MB max per image)");
          setUploading(false);
          
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false)
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  return (
    <main className="p-3 max-w-4xl mx-auto ">
      <h1 className="text-3xl font-semibold text-center my-2">
        Create a Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-10 p-5 bg-stone-100 rounded-lg">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength="62"
            minLength="10"
          />
          <textarea
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
          />

          <div className="flex flex-wrap gap-6 items-center">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="bedrooms"
                  min="1"
                  max="10"
                  className="p-1 border border-stone-700 rounded-lg"
                />
                <p>Beds</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="bathrooms"
                  min="1"
                  max="10"
                  className="p-1 border border-stone-700 rounded-lg"
                />
                <p>Baths</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="regularPrice"
                  min="1"
                  max="10"
                  className="p-1 border border-stone-700 rounded-lg"
                />
                <div className="flex flex-col items-center">
                  <p>Regular price</p>
                  <span className="text-xs">($/month)</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="discountPrice"
                  min="1"
                  max="10"
                  className="p-1 border border-stone-700 rounded-lg"
                />
                <div className="flex flex-col items-center">
                  <p>Discounted Price</p>
                  <span className="text-xs">($/month)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 flex-1">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-900 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={(e) => setFiles(e.target.files)}
              className="p-1 border border-gray-500 rounded w-full "
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              disabled={uploading}
              onClick={handleImageSubmit}
              className="p-1 text-green-600 border border-green-600 rounded uppercase hover:shadow-lg disabled:opacity-95"
            >
              {uploading? 'uploading...': 'Upload'}
            </button>
          </div>
          <p className="text-red-500">
            {" "}
            {imageUploadError && imageUploadError}{" "}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className="flex justify-between p-2 border items-center"
              >
                <img
                  className="w-20 h-20 object-contain rounded-lg"
                  src={url}
                  alt="listing image"
                />
                <button
                  type="button"
                  onClick={()=>handleRemoveImage(index)}
                  className="p-1 text-red-700 hover:opacity-95"
                >
                  <FaTrashAlt />
                </button>
              </div>
            ))}
          <button className="bg-green-500 uppercase p-2 rounded-lg font-semibold text-white hover:opacity-90 disabled:opacity-75">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}
