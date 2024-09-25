import React from "react";
import { useState, useEffect } from "react";
import {Link} from 'react-router-dom';

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);

  const onChange = (e)=>{
    setMessage(e.target.value)
  }
  return (
    <>
    {landlord && (
      <div className="flex flex-col gap-3 m-3">
      <p>Contact to <span className='font-semibold text-xl'>
      {landlord.username}</span> for <span
      className='font-semibold'>{listing.name.toLowerCase
      ()}</span></p>
      <textarea className="bg-slate-200 w-full border p-2 rounded-lg text-sm placeholder:text-black" name="message" id="message" rows="2"
      value={message} onChange={onChange} 
      placeholder="Enter Your text here...">
      </textarea>
      <Link to={`mailto:${landlord.email}?subject=Regarding${listing.name}&body=${message}`}
      className="bg-stone-700 text-white p-2 uppercase text-center hover:opacity-85 rounded-md">
      Send message
      </Link>
      </div>
    )}
    </>

  )
}
