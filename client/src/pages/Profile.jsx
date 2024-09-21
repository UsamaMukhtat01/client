import {useSelector} from 'react-redux'
import { useRef, useState, useEffect } from 'react'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase'

export default function Profile() {
  const fileRef = useRef(null)
const {currentUser} = useSelector((state) => state.user)
const [file, setFile] = useState(undefined);
const [filePerc, setFilePerc] = useState(0);
const [fileUploadError, setFileUploaError] = useState(false);
const [formData, setFormData] = useState({})
console.log(filePerc);
console.log(file);
// firebase Storage 
//       allow read, 
//       allow write: if 
//       request.resource.size< 2 * 1024 * 1024 &&
//       request.resource.contentType.matches('image/.*')
useEffect(()=>{
  if(file){
    handleFieldUpload(file);
  }
},[file]);

const handleFieldUpload =(file)=>{
  const storage = getStorage(app)
  const fileName = new Date().getTime() + file.name;
  const storageRef = ref(storage, fileName);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    'state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setFilePerc(Math.round(progress))
    },
    (error) => {
      setFileUploaError(true);
    },
      () => {
      getDownloadURL(uploadTask.snapshot.ref).then
      ((downloadURL) =>
      setFormData({ ...formData, avator: downloadURL })
      );
    }
  )
};


return (
<div className='p-3 max-w-lg mx-auto'>
<h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
<form className='flex flex-col gap-3'>
  <input onChange={(e)=>setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept='image/*'/>
<img onClick={()=>fileRef.current.click()} src={formData.avator || currentUser.avator} alt="profile"
className='rounded-full h-24 w-24 object-cover
cursor-pointer self-center mt-2' />

<p className='text-sm self-center'>
  {fileUploadError ? (
  <span className='text-red-700'>Error Image
  upload</span>
  ): filePerc > 0 && filePerc < 100 ? (
  <span className='text-yellow-900'>{`Uploading ${filePerc}%`}</span>

  ): filePerc === 100? (
  <span className='text-green-500'>Image
  successfully uploaded!</span>
  ):(
    ''
  )}
</p>

<input id='username' type="text" placeholder='username'
className='border p-3 rounded-lg' />
<input id='email' type="email" placeholder='email'
className='border p-3 rounded-lg' />
<input id='password' type="password" placeholder='password'
className='border p-3 rounded-lg' />
<button className='text-white bg-stone-500 rounded-md p-2 uppercase hover:opacity-85'>
  update
</button>
</form>
<div className="flex justify-between mt-5">
<span className='text-red-700 cursor-pointer'>Delete
account</span>
<span className='text-red-700 cursor-pointer'>Sign out</span>
</div>
</div>
)
}