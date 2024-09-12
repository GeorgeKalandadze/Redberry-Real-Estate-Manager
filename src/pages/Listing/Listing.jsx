import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";
import GuestLayout from "../../layouts/GuestLayout";
import RandomImg from "../../assets/random-img.jpg";
import LocationIcon from "../../assets/location.png";
import BedIcon from "../../assets/bed.png";
import MailIndexIcon from "../../assets/mail-index.png";
import SpaceIcon from "../../assets/space.png";
import EmailIcon from "../../assets/email.png";
import PhoneIcon from "../../assets/phone.png";
import Card from "../../components/Card";
import ArrowIcon from "../../assets/arrow-icon.png"; // Assuming this is the arrow icon you want to use.
import DeleteListingModal from "../../components/DeleteListingModal";

const Listing = () => {
  const [swiper, setSwiper] = useState(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);


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

  // Dummy data for similar listings
  const similarProperties = [
    {
      id: 1,
      price: "80 000",
      address: "თბილისი, ი. ჭავჭავაძის 53",
      beds: 2,
      area: 55,
      mailIndex: 160,
      label: "ქირავდება",
      image: RandomImg,
    },
    {
      id: 2,
      price: "90 000",
      address: "ბათუმი, რუსთაველის 45",
      beds: 3,
      area: 75,
      mailIndex: 123,
      label: "იყიდება",
      image: RandomImg,
    },
    {
      id: 3,
      price: "70 000",
      address: "ქუთაისი, აღმაშენებლის 5",
      beds: 2,
      area: 60,
      mailIndex: 145,
      label: "ქირავდება",
      image: RandomImg,
    },
    {
      id: 4,
      price: "70 000",
      address: "ქუთაისი, აღმაშენებლის 5",
      beds: 2,
      area: 60,
      mailIndex: 145,
      label: "ქირავდება",
      image: RandomImg,
    },
    {
      id: 5,
      price: "70 000",
      address: "ქუთაისი, აღმაშენებლის 5",
      beds: 2,
      area: 60,
      mailIndex: 145,
      label: "ქირავდება",
      image: RandomImg,
    },
    {
      id: 6,
      price: "70 000",
      address: "ქუთაისი, აღმაშენებლის 5",
      beds: 2,
      area: 60,
      mailIndex: 145,
      label: "ქირავდება",
      image: RandomImg,
    },
  ];



  const handleDelete = () => {
    // Handle delete logic here
    console.log("Listing deleted");
    setIsModalOpen(false); // Close modal after deletion
  };

  return (
    <GuestLayout>
      <div className="flex flex-col justify-center py-12">
        <button className="mb-6">
          <img src={ArrowIcon} alt="Next" />
        </button>
        <div className=" flex flex-col lg:flex-row gap-16 w-full">
          <div className="w-full lg:w-1/2 relative">
            <img
              src={RandomImg}
              alt="Listing"
              className="w-full h-[620px] object-cover rounded-lg"
            />
            <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white text-sm px-2 py-1 rounded-2xl">
              იყიდება
            </div>
            <p className="text-[#808A93] text-[16px] absolute right-0 mt-4">
              გამოქვეყნების თარიღი 08/08/24
            </p>
          </div>

          {/* Right Side: Details Section */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4 justify-between">
            <div className="flex flex-col gap-4">
              <h1 className="text-3xl font-bold text-[48px]">80,458 ₾</h1>
              <div className="flex flex-col gap-2 text-[#808A93] text-[24px]">
                <div className="flex gap-2 items-center">
                  <img src={LocationIcon} alt="Location" />
                  <p>თბილისი, ი. ჭავჭავაძის 53</p>
                </div>
                <div className="flex gap-2 items-center">
                  <img src={SpaceIcon} alt="Space" />
                  <p>ფართი 55 მ²</p>
                </div>
                <div className="flex gap-2 items-center">
                  <img src={BedIcon} alt="Bedrooms" />
                  <p>საძინებლები 2</p>
                </div>
                <div className="flex gap-2 items-center">
                  <img src={MailIndexIcon} alt="Mail Index" />
                  <p>საფოსტო ინდექსი 2525</p>
                </div>
              </div>
            </div>

            <div className="text-[16px] w-[500px] text-[#808A93] leading-relaxed">
              <p>
                იყიდება ბინა ქავთარაძის ქუჩაზე, ვაკეში. ბინა არის ახალ
                რეაბილიტირებული, ორი საძინებლით და დიდი აივნით. მყუდროება და
                ვაკის ხედი გარანტირებულია.
              </p>
            </div>

            {/* Agent Section */}
            <div className="flex flex-col items-start gap-4 p-4 border rounded-lg ">
              <div className="flex gap-2 justify-center items-center">
                <img
                  src={RandomImg}
                  alt="Agent"
                  className="w-16 h-16 object-cover rounded-full"
                />
                <div className="flex flex-col">
                  <p className="font-bold text-[#021526] text-[16px]">
                    სოფიო გელოვანი
                  </p>
                  <p className="text-sm text-[#676E76] text-[14px]">აგენტი</p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[#85858D]">
                  <img src={EmailIcon} alt="Email" />
                  <p>sophio.gelovani@redberry.ge</p>
                </div>
                <div className="flex items-center gap-2 text-[#85858D]">
                  <img src={PhoneIcon} alt="Phone" />
                  <p className="text-sm">577 777 777</p>
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

        {/* Similar Listings Section */}
        <div className="w-full mt-20">
          <h2 className="text-[30px] font-bold text-left">
            ბინები მსგავს ლოკაციაზე
          </h2>

          <div className="relative flex justify-center items-center py-8">
            {/* Previous Button */}
            <button
              className="absolute left-[-50px] z-10  "
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
                <SwiperSlide key={property.id}>
                  <Card
                    key={property.id}
                    image={property.image}
                    price={property.price}
                    address={property.address}
                    beds={property.beds}
                    area={property.area}
                    mailIndex={property.mailIndex}
                    label={property.label}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Next Button */}
            <button
              className="absolute right-[-50px] z-10 transform rotate-180"
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
        onDelete={handleDelete}
      />
    </GuestLayout>
  );
};

export default Listing;
