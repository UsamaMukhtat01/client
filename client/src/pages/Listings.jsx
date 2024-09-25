import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import {useSelector} from 'react-redux' 
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { FaBath, FaBed, FaParking, FaChair} from "react-icons/fa";
import Contact from "../Components/Contact";

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const params = useParams();
  const {currentUser} = useSelector((state)=>state.user);
  console.log(currentUser._id, currentUser.userRef)
  const [contact, setContact] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);
  return (
    <main>
      {loading && <p className="text-center text-2xl">loading...</p>}
      {error && <p className="text-center text-2xl">Something went wrong</p>}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[450px] flex"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "contain",
                  }}
                ></div>
              </SwiperSlide>
            ))}
            <div className="flex flex-col max-w-fit mx-auto p-4 mt-5">
              <p className="font-semibold text-2xl">
                {listing.name} - $
                {listing.offer ? listing.discountPrice.toLocaleString('en-US') : listing.regularPrice.toLocaleString('en-US') }{" "}
                {listing.type === "rent" && "/ month"}
              </p>
              <div className="flex items-center gap-4 mt-6">
                <p
                  className="bg-red-900 w-full max-w-[200px] text-white
                    text-center p-1 rounded-md"
                >
                  {listing.type === "rent" ? "For Rent" : "For Sale"}
                </p>
                {listing.offer && (
                  <p
                    className="bg-green-900 w-full max-w-[200px] text-white
                        text-center p-1 rounded-md"
                  >
                    Save ${+listing.regularPrice - +listing.discountPrice}
                  </p>
                )}
              </div>
              <p className="mt-2 max-w-3xl text-sm">
                {" "}
                <span className="text-2xl font-semibold">Description:-</span>
                {listing.description} Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque provident excepturi distinctio. Sit eum quos libero inventore non architecto autem provident et, quod nostrum ut, repudiandae officia similique reprehenderit quibusdam suscipit at laudantium. Recusandae!
              </p>
              <p className="h-0.5 bg-stone-400"></p>
              <ul className="flex flex-wrap justify-center gap-4 sm:gap-6 text-green-400 font-semibold text-sm mt-5">
                <li className="flex items-center gap-1 whitespace-nowrap">
                  <FaBed className="text-lg" />
                  {listing.bedrooms > 1
                    ? `${listing.bedrooms} beds`
                    : `${listing.bedrooms} bed`}
                </li>
                <li className="flex items-center gap-1 whitespace-nowrap">
                  <FaBath className="text-lg" />
                  {listing.bathrooms > 1
                    ? `${listing.bathrooms} baths`
                    : `${listing.bathrooms} bath`}
                </li>
                <li className="flex items-center gap-1 whitespace-nowrap">
                  <FaParking className="text-lg" />
                  {listing.parking ? 'Parking' : 'No parking'}
                </li>
                <li className="flex items-center gap-1 whitespace-nowrap">
                  <FaChair className="text-lg" />
                  {listing.furnished ? 'Furnished':'No furnished'}
                </li>              
              </ul>
              {currentUser && listing.userRef !== currentUser._id && !contact &&(
                  <button onClick={()=>setContact(true)} className='bg-slate-700
                  text-white
                  rounded-lg uppercase hover:opacity-95 p-3 mt-3'>
                  Contact landlord
                  </button>
                  )}
                  {contact && <Contact listing={listing}/>}
            </div>
          </Swiper>
        </div>
      )}
    </main>
  );
}
