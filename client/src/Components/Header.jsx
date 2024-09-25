import {FaSearch} from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import {useSelector} from 'react-redux';
import { useState } from "react";
import { useEffect } from "react";

export default function Header() {
  const {currentUser} = useSelector(state => state.user)
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams (window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
    };

    useEffect(() => {
      const urlParams = new URLSearchParams (location.search);
      const searchTermFromUrl = urlParams.get('searchTerm');
      if (searchTermFromUrl) {
      setSearchTerm (searchTermFromUrl);
      }
      }, [location.search]);

  return (
    <header className='bg-stone-300 shadow-md'>
    <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to="/">
      <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
        <span className='text-stone-700'>Bellamy</span>
        <span className='text-stone-800'>Court</span>
      </h1>
      </Link>
      <form onSubmit={handleSubmit} className='bg-slate-100 p-2 rounded-md flex items-center'>
        <input className='bg-transparent focus:outline-none w-24 sm:w-64' type="text" placeholder='Search...'
        value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}/>
        <button>
        <FaSearch className="text-stone-800"/>
        </button>
      </form>
      <ul className="flex items-center gap-3 font-semibold">
      <Link to="/">
        <li className="hidden sm:inline text-stone-800 hover:underline">Home</li> </Link>
        <Link to="/about"> <li className="hidden sm:inline text-stone-800 hover:underline">About</li> </Link>        
        <Link to="/sign-up"> 
        {currentUser? (<img className="rounded-full h-7 w-7 objesct-cover" src={currentUser.avator} alt="profile"/>):
        (<li className="text-stone-800 hover:underline">Sign up</li>
      )}
        </Link>
        
        
      </ul>
    </div>
    </header>
  )
}
