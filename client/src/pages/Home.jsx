import React, { useEffect, useState } from "react";
import {Link } from 'react-router-dom'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Navigation} from 'swiper/modules'
import swiperCore from 'swiper'
import 'swiper/css/bundle';
import ListingItem from "../Components/ListingItems";

export default function Home() {
  const [offerListing, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  swiperCore.use([Navigation])
  console.log(offerListing);

  useEffect(()=>{
    const fetchOfferListings = async ()=>{
      try{
        const res = await fetch('api/listing/get?offer=true&limit=4')
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      }catch (error){
        console.log(error)
      }
    } 
    const fetchRentListings = async ()=>{
      try{
        const res = await fetch('api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      }catch(error){
        console.log(error);
      }
    }
    const fetchSaleListings = async ()=>{
      try{
        const res = await fetch('api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      }catch(error){
        log(error);
      }
    }
    fetchOfferListings();
  },[])

  return (
    <div>
      {/* top */}
      <div className="flex flex-col gap-6 p-10 px-3 max-w-6xl mx-auto">
        <h1 className="text-stone-600 font-bold text-3xl lg:text-6xl ">
          Find your next <span className="text-stone-800">perfect</span>
          <br />
          place with ease
        </h1>
        <div className="text-stone-500 sm:text-sm text-xs">
          Sahand Estate is the best place to find your next perfect place to
          live.
          <br />
          We have wide range of properties for you to choose from.
        </div>
        <Link to={'/search'} className="text-xs sm:text-sm text-blue-400 hover:underline">
        Let's get started...
        </Link>
      </div>
      {/* Swiper */}
      <Swiper navigation>
        {offerListing && offerListing.length > 0 && offerListing.map((listing)=>(
          <SwiperSlide>
            <div style={{background:`url(${listing.imageUrls[0]}) center no-repeat`,
          backgroundSize:"cover"}} className="h-[500px]" key={listing._id}></div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* listing results for offer, sale and rent */}
        <div className="max-w-6xl mx-auto p-3 flex flex-col
        gap-8 my-10">
        {offerListing && offerListing.length > 0 && (
        <div className="flex flex-col gap-3 bg-stone-200 p-3 rounded-lg">
        <div className="flex flex-col gap-5">
        <h2 className="text-3xl font-semibold text-stone-600 underline">Recent offers:</h2>
        <Link to={'/search?offer=true'} className="w-fit" >
        <botton className="text-white font-semibold p-2 bg-stone-600 rounded-lg hover:opacity-80">
        Show more offers
        </botton>
        </Link>
        </div>
        <div className="flex flex-wrap gap-5 w-full mx-auto">
          {offerListing.map((listing)=>(
            <ListingItem listing={listing} key={listing._id}/>
          ))}
        </div>
        </div>
        )}
        {rentListings && rentListings.length > 0 && (
        <div className="flex flex-col gap-3 bg-stone-200 p-3 rounded-lg">
        <div className="flex flex-col gap-5">
        <h2 className="text-3xl font-semibold text-stone-600 underline">Recent places for rent</h2>
        <Link to={'/search?type=rent'} className="w-fit" >
        <botton className="text-white font-semibold p-2 bg-stone-600 rounded-lg hover:opacity-80">
        Show more places for rent
        </botton>
        </Link>
        </div>
        <div className="flex flex-wrap gap-5 w-full mx-auto">
          {rentListings.map((listing)=>(
            <ListingItem listing={listing} key={listing._id}/>
          ))}
        </div>
        </div>
        )}
        {saleListings && saleListings.length > 0 && (
        <div className="flex flex-col gap-3 bg-stone-200 p-3 rounded-lg">
        <div className="flex flex-col gap-5">
        <h2 className="text-3xl font-semibold text-stone-600 underline">Recent places for sale</h2>
        <Link to={'/search?type=sale'} className="w-fit" >
        <botton className="text-white font-semibold p-2 bg-stone-600 rounded-lg hover:opacity-80">
        Show more places for sale
        </botton>
        </Link>
        </div>
        <div className="flex flex-wrap gap-5 w-full mx-auto">
          {saleListings.map((listing)=>(
            <ListingItem listing={listing} key={listing._id}/>
          ))}
        </div>
        </div>
        )}
        </div>
    </div>
  );
}
