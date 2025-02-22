import React, {useState} from 'react'
// import { Link } from 'react-router-dom'
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../Components/OAuth';
import { notification } from "antd";


export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      setLoading(true)
      const res = await fetch(`/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data)
      if (data.success === false){
        setLoading(false);
        setError(data.message);
        return;
      }
      notification.success({
        message: "Created",
        description: data.message,
      });
      setLoading(false);
      setError(null);
      console.log(data);
      navigate('/sign-in')
    }catch(error){
      setLoading(false);
      setError(error.message);
    }
    
  }
  console.log(formData);
  return (
    <div className='p-3 max-w-md mx-auto'>
    <h1 className='text-3xl text-center font-semibold my-7'>SignUp</h1>
      <form onSubmit={handleSubmit} id='sign-up' className='flex flex-col gap-4'>
        <input type="text" placeholder='username' className='border p-3 rounded-lg' id='username' onChange={handleChange}/>
        <input type="email" placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange}/>
        <input type="password" placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange}/>
        <button disabled={loading} className='uppercase bg-slate-600 text-white p-2 border rounded-md text-lg hover:opacity-90 disabled:opacity-60 '>
        {loading? 'Loading...': 'Sign-Up'}
        </button>
        
        <OAuth/>
      </form>
        <div className='flex gap-2 my-2'>
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
        <span className='text-blue-500'>Sign-in</span>
        </Link>
        </div>
        {error && <p className='text-red-500 mt-3'>{error}</p>}
    </div>
    
  )
}
