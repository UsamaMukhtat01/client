import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice';
import OAuth from '../Components/OAuth';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const {error} = useSelector((state)=>state.user);
  const [loading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const apiUrl = import.meta.env.VITE_API_URL

  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
      setIsLoading(true)
      dispatch(signInStart());
      const res = await fetch(`${apiUrl}/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data)
      if (data.success === false){
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data))
      console.log(data);
      navigate('/profile')
    }catch(error){
      dispatch(signInFailure(error.message))
    }finally{
      setIsLoading(false)
    }
    
  }
  // console.log(formData);
  return (
    <div className='p-3 max-w-md mx-auto'>
    <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} id='sign-in' className='flex flex-col gap-4'>
        <input type="text" placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange}/>
        <input type="text" placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange}/>
        <button disabled={loading} className='uppercase bg-slate-600 text-white p-2 border rounded-md text-lg hover:opacity-90 disabled:opacity-60 '>
        {loading? 'Loading...': 'Sign-In'}
        </button>
        <OAuth/>
      </form>
        <div className='flex gap-2 my-2'>
        <p>Dont have an account?</p>
        <Link to={"/sign-up"}>
        <span className='text-blue-500'>Sign-up</span>
        </Link>
        </div>
        {error && <p className='text-red-500 mt-3'>{error}</p>}
    </div>
    
  )
}
