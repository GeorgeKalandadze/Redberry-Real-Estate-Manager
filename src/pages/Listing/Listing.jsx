import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";
import GuestLayout from "../../layouts/GuestLayout";
import LocationIcon from "../../assets/location.png";
import BedIcon from "../../assets/bed.png";
import MailIndexIcon from "../../assets/mail-index.png";
import SpaceIcon from "../../assets/space.png";
import EmailIcon from "../../assets/email.png";
import PhoneIcon from "../../assets/phone.png";
import Card from "../../components/Card";
import ArrowIcon from "../../assets/arrow-icon.png";
import DeleteListingModal from "../../components/DeleteListingModal";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../config/axiosClient";
import { useGlobalContext } from "../../contexts/Context";

const Listing = () => {
  const { id } = useParams();
  const [listingDetails, setListingDetails] = useState(null);
  const [swiper, setSwiper] = useState(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const {
    realEstateList,
    fetchRealEstateList,
    setRealEstateList,
  } = useGlobalContext();

    
  useEffect(() => {
    const fetchListingDetails = async () => {
      try {
        const response = await axiosClient.get(`/real-estates/${id}`);
        
        setListingDetails(response.data);
      } catch (error) {
        console.error("Error fetching listing details:", error);
      }
    };

    fetchListingDetails();
  }, [id]);

  

  const handleDeleteRealEstate = async (id) => {
    try {
      const response = await axiosClient.delete(`/real-estates/${id}`);
      if (response.status === 200) {
        setRealEstateList((prevList) => {
          return prevList.filter((item) => item.id != id);
        });
        navigate("/");
      }
    } catch (error) {
      console.error(
        "Error deleting real estate:",
        error.response?.data || error
      );
    }
  };
 

  const goToNextSlide = () => {
    if (swiper !== null) {
      swiper.slideNext();
    }
  };

  const goToPrevSlide = () => {
    if (swiper !== null) {
      swiper.slidePrev();
    }
  };

  const handleSlideChange = (swiper) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  };

  const similarProperties = realEstateList.filter((property) => {
    return (
      listingDetails &&
      property.city.region_id === listingDetails.city.region_id
    );
  });


  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  const rentalLabel = listingDetails?.is_rental === 1 ? "ქირავდება" : "იყიდება";
  
if (!listingDetails) {
  return (
    <div
      role="status"
      className="w-screen h-screen flex justify-center items-center"
    >
      <svg
        aria-hidden="true"
        className="w-14 h-14 text-gray-200 animate-spin dark:text-gray-600 fill-red-500"
        viewBox="0 0 100 101"
        fill="red"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
      <div className="font-bold text-5xl ml-2">მიმდინარეობს ჩატვირთვა</div>
    </div>
  );
}
  

  return (
    <GuestLayout>
      <div className="flex flex-col justify-center py-12">
        <Link to="/" className="mb-6">
          <img src={ArrowIcon} alt="Next" />
        </Link>
        <div className=" flex flex-col lg:flex-row gap-16 w-full">
          <div className="w-full lg:w-1/2 relative">
            <img
              src={listingDetails?.image}
              alt="Listing"
              className="w-full h-[620px] object-cover rounded-lg"
            />
            <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white text-sm px-2 py-1 rounded-2xl">
              {rentalLabel}
            </div>
            <p className="text-[#808A93] text-[16px] absolute right-0 mt-4">
              გამოქვეყნების თარიღი {formatDate(listingDetails?.created_at)}
            </p>
          </div>
          <div className="w-full lg:w-1/2 flex flex-col gap-4 justify-between">
            <div className="flex flex-col gap-4">
              <h1 className="text-3xl font-bold text-[48px]">
                {listingDetails?.price} ₾
              </h1>
              <div className="flex flex-col gap-2 text-[#808A93] text-[24px]">
                <div className="flex gap-2 items-center">
                  <img src={LocationIcon} alt="Location" />
                  <p>
                    {listingDetails?.city?.name}, {listingDetails?.address}
                  </p>
                </div>
                <div className="flex gap-2 items-center">
                  <img src={SpaceIcon} alt="Space" />
                  <p>ფართი {listingDetails?.area} მ²</p>
                </div>
                <div className="flex gap-2 items-center">
                  <img src={BedIcon} alt="Bedrooms" />
                  <p>საძინებლები {listingDetails?.bedrooms}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <img src={MailIndexIcon} alt="Mail Index" />
                  <p>საფოსტო ინდექსი {listingDetails?.zip_code}</p>
                </div>
              </div>
            </div>

            <div className="text-[16px] w-[500px] text-[#808A93] leading-relaxed">
              <p>{listingDetails?.description}</p>
            </div>
            <div className="flex flex-col items-start gap-4 p-4 border rounded-lg ">
              <div className="flex gap-2 justify-center items-center">
                <img
                  src={listingDetails?.agent?.avatar}
                  alt="Agent"
                  className="w-16 h-16 object-cover rounded-full"
                />
                <div className="flex flex-col">
                  <p className="font-bold text-[#021526] text-[16px]">
                    {listingDetails?.agent?.name}{" "}
                    {listingDetails?.agent?.surname}
                  </p>
                  <p className="text-sm text-[#676E76] text-[14px]">აგენტი</p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[#85858D]">
                  <img src={EmailIcon} alt="Email" />
                  <p>{listingDetails?.agent?.email}</p>
                </div>
                <div className="flex items-center gap-2 text-[#85858D]">
                  <img src={PhoneIcon} alt="Phone" />
                  <p className="text-sm">{listingDetails?.agent?.phone}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-left">
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-[#676E76] font-bold border-[2px] border-[#676E76]  px-6 py-3 rounded-xl"
              >
                ლისტინგის წაშლა
              </button>
            </div>
          </div>
        </div>

        <div className="w-full mt-20">
          <h2 className="text-[30px] font-bold text-left">
            ბინები მსგავს ლოკაციაზე
          </h2>

          <div className="relative flex justify-center items-center py-8">
            <button
              className="absolute left-[-50px] z-10 transition-transform transition-shadow duration-200 active:scale-95 active:shadow-pressed"
              onClick={goToPrevSlide}
            >
              <img src={ArrowIcon} alt="Previous" />
            </button>

            <Swiper
              breakpoints={{
                768: {
                  slidesPerView: 2,
                  spaceBetween: 5,
                },
                1280: {
                  slidesPerView: 4,
                  spaceBetween: 15,
                },
              }}
              spaceBetween={50}
              freeMode={true}
              onSlideChange={handleSlideChange}
              onSwiper={setSwiper}
              pagination={{ clickable: true }}
              modules={[FreeMode]}
              className="w-full"
            >
              {similarProperties.map((property) => (
                <SwiperSlide key={property.id} onClick={scrollToTop}>
                  <Link to={`/listing/${property.id}`}>
                    <Card
                      key={property.id}
                      image={property.image}
                      price={property.price}
                      address={property.address}
                      beds={property.beds}
                      area={property.area}
                      mailIndex={property.mailIndex}
                      label={property.label}
                      city={property?.city?.name}
                    />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
            <button
              className="absolute right-[-50px] rotate-180 z-10 transition-transform transition-shadow duration-200 active:scale-95 active:shadow-pressed"
              onClick={goToNextSlide}
            >
              <img src={ArrowIcon} alt="Next" />
            </button>
          </div>
        </div>
      </div>
      <DeleteListingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDelete={() => handleDeleteRealEstate(id)}
      />
    </GuestLayout>
  );
};

export default Listing;
