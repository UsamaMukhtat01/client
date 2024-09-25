import React from "react";
import { Link } from "react-router-dom";
import { FaLocationArrow } from "react-icons/fa";

export default function ListingItem({ listing }) {
  return (
    <div
      className="bg-white shadow-md hover:shadow-lg
    transition-shadow overflow-hidden rounded-lg w-full sm:w-[300px]"
    >
      <Link to={`/listing/${listing._id}`}>
        {/* <div className="flex flex-col gap-2"> */}
          <img
            src={listing.imageUrls[0]}
            alt="listing cover"
            className="h-[320px] sm:h-[230px] w-full object-cover hover:scale-105 transition-scale
          duration-300"
          />
          <div className="p-3 flex flex-col gap-2">
            <p className="truncate text-lg font-semibold text-stone-600">
              {listing.name}
            </p>
            <div className="flex items-center gap-1">
              <FaLocationArrow className="h-4 w-4 text-green-700"/>
              <p className="text-xs">{listing.address}</p>
            </div>
            <p className="text-stone-800 text-sm line-clamp-2">
              {listing.description}
            </p>
            <p className='text-stone-800 mt-1 ml-4 font-semibold text-lg'>
            $
            {listing.offer? listing.discountPrice.
            toLocaleString('en-US') : listing.regularPrice.
            toLocaleString('en-US')}
            {listing.type === 'rent' && ' / month'}
            </p>
            <div className="flex gap-4">
              <p>
            {listing.bedrooms > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed`}
              </p>
              <p>
            {listing.bathrooms > 1 ? `${listing.bathrooms} baths` : `${listing.bathrooms} bath`}
              </p>
            </div>
          </div>
        {/* </div> */}
      </Link>
    </div>
  );
}
