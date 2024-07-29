import React from 'react';
import { Carousel, Image } from 'antd';
import { useNavigate } from 'react-router-dom';
import ProductAnimation from './ProductAnimation';
import keyboard from "../assets/Images/keyboard.png";
import headset from '../assets/Images/razer-headset.jpg';
import monitor from '../assets/Images/monitor.png';
import mouse from '../assets/Images/mouse.webp';
import microphone from '../assets/Images/microphone.webp';
const UserHome = () => {
const brand =JSON.parse( localStorage.getItem('brand'));
 const products = JSON.parse(localStorage.getItem('product'))
  const nav = useNavigate();

  const handleProduct = (product) => {
    nav(`/Ecommerce/Product/${product.id}`);
  };

  const popular = products.filter(p => p.id < 4);
  const slider = [keyboard, headset, monitor, mouse, microphone];

  return (
    <>
      <Carousel className=' -z-10' autoplay autoplaySpeed={3000}>
        {slider.map((i, index) => 
          <div key={index} >
            <Image  style={{ height: 400, width: "100vw", objectFit: "fill" }} src={i} alt={i} />
          </div>
        )}
      </Carousel>
      <h6 className='font-freehand text-3xl text-center mt-10 underline'>ទំនិញគ្រប់ប្រភេទ</h6>
      <article className="">
        <div className='grid lg:grid-cols-3 lg:grid-rows-5 md:grid-rows-10 md:grid-cols-2 sm:grid-cols-1 lg:mx-10 mt-10 gap-10 ProductBorder'>
          {products.map((product, index) => (
            <ProductAnimation
              key={index}
              products={product}
              handleProduct={handleProduct}
              index={index}
            />
          ))}
        </div>
      </article>

      <h6 className='font-freehand text-3xl text-center underline mt-10'>ផលិតផលក់ដាច់ជាងគេ</h6>
      <div className='grid lg:grid-cols-3 lg:grid-rows-2 md:grid-rows-10 md:grid-cols-2 sm:grid-cols-1 lg:mx-10 sm:mx-5 mt-10 gap-10 ProductBorder'>
        {popular.map((pro, index) => (
          <ProductAnimation
            key={index}
            products={pro}
            handleProduct={handleProduct}
            index={index}
          />
        ))}
      </div>

      <h2 className='text-center m-20 font-freehand text-3xl'>ដៃគូរសហការ</h2>
      <div className='marquee'>
        <div className="marquee-content">
          {brand.length > 0 ? (
            brand.map((b, index) => (
              <div key={index} className='flex justify-evenly gap-10'>
                <img className='w-32 h-32 lg:w-52 lg:h-52  object-cover' src={b.image} alt={b.name} />
              </div>
            ))
          ) : (
            <p>No brands available</p>
          )}
        </div>
      </div>
    </>
  );
}

export default UserHome;
