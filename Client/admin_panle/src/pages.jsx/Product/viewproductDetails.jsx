import axios from "axios";
import { use, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import React from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import Slider from "react-slick";
export default function ProductDetailAdmin() {
  const settings = {


    speed: 200,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true
  };

  const [image, setimage] = useState("")
  const [mainImage, setMainImage] = useState([]);
  // console.log(mainImage)
 

  let { slug } = useParams() 
  

  const [data, setdata] = useState([])        
  const [path, setpath] = useState('')      
  const [cdate, setcdate] = useState("")    
  const [udate, setudate] = useState('') 
  // console.log(data, path)             

  let apibaseurl = import.meta.env.VITE_APIBASEURL

  let ProductDetail = () => {
    axios.get(`${apibaseurl}product/view/${slug}`)
      .then((res) => res.data)
      .then((finalres) => {

        setdata(finalres.dproductres)
        setimage(finalres.dproductres._image)
        setMainImage(finalres.dproductres._Gallery_image || [])
        setpath(finalres._Path)
      })
  }
  useEffect(() => {
    ProductDetail()
  }, [slug])




  let createdate = data._Product_Creted_to
  let updatedate = data._Product_Updated_to


  const Cd = new Date(createdate);
  const Ud = new Date(updatedate);
  const options = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  };
  let finalcdate = Cd.toLocaleString("en-IN", options);
  let finaludate = Ud.toLocaleString("en-IN", options);

  return (
    <div className="min-h-screen bg-gray-100 p-6 overflow-hidden">
      <div className="bg-white rounded-2xl shadow-lg w-full grid md:grid-cols-2 gap-8 p-6">

        {/* LEFT - Images */}
        <div>
          <div className="w-full h-[450px] bg-gray-200 rounded-xl overflow-hidden">
            <img
              src={path + image}
              alt="product"
              className="w-full h-full object-cover"
            />
          </div>



          <div className="  gap-3 mt-4 slider-container ">




            <Slider {...settings}>
              {mainImage.map((img, i) => (
                <div key={i} className="px-1">
                  <img
                    src={path + img}
                    onClick={() => setimage(img)}
                    className={`w-24 h-24 object-cover rounded-lg cursor-pointer border-2 ${image === img ? "border-blue-500" : "border-gray-200"
                      }`}
                  />
                </div>
              ))}
            </Slider>






          </div>

        </div>

        {/* RIGHT - Details */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {data._ProductName}
            </h1>

            <p className="text-gray-500 mt-3 leading-relaxed">
              {data._Product_Short_Description}
            </p>

            <div className="mt-5">
              <span className="text-3xl font-bold text-green-600">
                ₹ {data._Product_Sell_Price}
              </span>
              <span className="text-gray-400 line-through ml-3">
                ₹ {data._Product_Original_Price}
              </span>
            </div>

            {/* Stock & Category */}
            <div className="mt-6 text-sm text-gray-600 space-y-2">
              <p><strong>Category:</strong> {data._PerentCategory?._CategoryName}</p>
              <p><strong> Sub Category:</strong> {data._SubCategory?._SubCategoryName}</p>
              <p><strong> Sub Sub Category:</strong> {data._SubSubCategory?._SubSubCategoryName}</p>
              <p className="flex gap-1"><strong>Dimention:</strong> {data._Product_Width}X{data._Product_Hight}X{data._Product_Length}  </p>
              <p className="flex "><strong>Status:</strong> {data._ProductStatus ? <h3 className="text-green-600 font-bold"> Active </h3> : <h3 className="text-red-600 font-bold"> InActive </h3>}</p>
              <p className="flex"><strong>Avelable Material:</strong>{data._Material?.map(item => (
                <p> {item._MetarialName}</p>
              ))} </p>
              <p className="flex"><strong>Avelable Color:</strong>{data._Color?.map(item => (
                <p> {item._ColorName + ","}</p>
              ))} </p>
              <div className=""><strong>   Long Discription : </strong> <p className="text-gray-500 mt-3 leading-relaxed">
                {data._Product_Long_Description}
              </p></div>

            </div>
          </div>

          {/* Admin Buttons */}
          <div className="flex gap-4 mt-8">
            <Link to={`/product/update_product/${data._id}`} > <button className='bg-blue-500 font-bold px-6 py-3 rounded-xl text-white'> Edit </button></Link>


            <Link to={'/product/view_product'}>

              <button className="bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 transition">
                Back
              </button>
            </Link>


          </div>


          {/* Extra Info */}
          <div className="mt-10 border-t pt-4 text-sm text-gray-500">
            <p>✔ Created: {finalcdate} </p>
            <p>✔ Last Updated: {finaludate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
