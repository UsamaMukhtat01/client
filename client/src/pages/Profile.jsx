import {useSelector} from 'react-redux'


export default function Profile() {
const {currentUser} = useSelector((state) => state.user)
return (
<div className='p-3 max-w-lg mx-auto'>
<h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
<form className='flex flex-col gap-3'>
<img src={currentUser.avator} alt="profile"
className='rounded-full h-24 w-24 object-cover
cursor-pointer self-center mt-2' />
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