import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Reserve from "./Reserve";
import { ThreeDots } from "react-loader-spinner";
import { useQuery } from "@tanstack/react-query";
import { apis } from "../constants";
const Foralluser = () => {
  const { id } = useParams();
  const [hoteldata, setHotelData] = useState([]);
  const [Photo, setPhoto] = useState(false);

  // useEffect(() => {
  //   if (!id) {
  //     return;
  //   }
  //   axios.get(`/accomodation/${id}`).then(({ data }) => {
  //     setHotelData(data);
  //   });
  // }, [id]);

  const getDetail=async()=>{
    const res = await fetch(`${apis.url}/accomodation/${id}`);
    
    return res?.json()
    

  }

  const {data,isLoading}=useQuery({queryKey:['getTrendingdata',id],queryFn:getDetail})

  



  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="gray"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      </div>
    );
  }

  if (Photo) {
    return (
      <div className="relative flex justify-center items-center flex-col w-full bg-black right-0 p-4 left-0 gap-4 top-[74px]">
        <div
          onClick={() => setPhoto(false)}
          className="fixed top-[90px] left-[40px] bg-white p-2 rounded-md  cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        {data?.photos?.length > 0 &&
          data?.photos.map((image) => {
            return (
              <img
              loading="lazy"
                className="rounded-lg h-auto w-full object-cover"
                src={`https://airbnbclone-3off.onrender.com/uploads/${image}`}
                alt="hotelimg"
              />
            );
          })}
        <div className="fixed top-[100px] text-[#ccc4c4] font-semibold ">
          Photos of {data?.title}
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-slate-200   ">
      <div className="p-16  flex flex-col gap-2  max-md:p-8 max-lg:p-12  ">
        <h2 className="text-xl">{data?.title}</h2>
        <a
          className=" font-bold cursor-pointer underline"
          href={`https://www.google.com/maps/place/${data?.address}`}
        >
          <div className="flex gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
            {data?.address}
          </div>
        </a>
        <div className="grid grid-cols-[2fr_1fr] max-sm:grid-cols-1 max-sm:gap-4   relative gap-2  ">
          {data?.photos?.[0] && (
            <div>
              <img
                onClick={() => setPhoto(true)}
                className=" w-full h-[400px] max-sm:h-[240px] object-cover cursor-pointer rounded-l-lg aspect-square"
                src={`https://airbnbclone-3off.onrender.com/uploads/${data?.photos[0]}`}
                alt="hostelimg1"
                loading="lazy"
              />
            </div>
          )}
          
            {data?.photos?.[1] && (
              <div>
                <img
                  onClick={() => setPhoto(true)}
                  className="w-full object-cover max-sm:h-[240px] cursor-pointer h-[400px] aspect-square rounded-r-lg"
                  src={`https://airbnbclone-3off.onrender.com/uploads/${data.photos[1]}`}
                  alt="hotelimg2"
                  loading="lazy"
                />
              </div>
            )}
           
         
          {data?.photos && (
            <div
              onClick={() => setPhoto(true)}
              className="absolute bottom-[12px] p-2 cursor-pointer rounded-md bg-black right-2"
            >
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6  text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 max-md:grid-cols-1 max-md:gap-6 gap-4 mt-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col mt-4">
              <h2 className="font-bold">Desciption</h2>
              <p className="text-[14px] font-semibold">
                {data?.description}
              </p>
            </div>
            <div className="flex flex-col font-semibold ">
              <span>checkin : {data?.checkIn}</span>
              <span>checkout: {data?.checkOut}</span>
              <span>Max number of peoples: {data?.maxGuests}</span>
            </div>
          </div>
          {/* <>
            <Reserve hoteldata={data} />
          </> */}
        </div>
        {hoteldata.extraInfo && (
          <div className="flex flex-col mt-2 bg-white w-full rounded-lg p-2">
            <h2 className="font-bold">Extra Information</h2>
            <p className="text-[14px] font-semibold">{data?.extraInfo}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Foralluser;
