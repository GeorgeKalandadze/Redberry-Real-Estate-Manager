import React from "react";
import GuestLayout from "../../layouts/GuestLayout";
import Card from "../../components/Card";
import RandomImg from "../../assets/random-img.jpg";

const Home = () => {
  // Dummy data array
  const properties = [
    {
      id: 1,
      price: "80 000",
      address: "თბილისი, ი. ჭავჭავაძის 53",
      beds: 2,
      area: 55,
      mailIndex: 160,
      label: "ქირავდება",
      image: RandomImg, // Using the same image for all cards for now
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
      price: "85 000",
      address: "რუსთავი, მტკვრის მარჯვენა",
      beds: 4,
      area: 95,
      mailIndex: 133,
      label: "იყიდება",
      image: RandomImg,
    },
    {
      id: 5,
      price: "85 000",
      address: "რუსთავი, მტკვრის მარჯვენა",
      beds: 4,
      area: 95,
      mailIndex: 133,
      label: "იყიდება",
      image: RandomImg,
    },
  ];

  return (
    <GuestLayout>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {properties.map((property) => (
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
        ))}
      </div>
    </GuestLayout>
  );
};

export default Home;
