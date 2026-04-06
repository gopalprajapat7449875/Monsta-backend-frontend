import React, { useEffect, useState } from 'react'
import $ from "jquery";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
export default function Addproduct() {

  const [images, setImages] = useState([]);
  const [perent, setperent] = useState([])

  const [subperent, setsubperent] = useState([])
  const [subsubperent, setsubsubpernet] = useState([])
  const [color, setcolor] = useState([])
  const [material, setmaterial] = useState([])

  const [SelectedColors, setSelectedColors] = useState([])

  const [Selectedmatrial, setSelectedmatrial] = useState([])
  console.log(color, material)
  let apibaseurl = import.meta.env.VITE_APIBASEURL
  const handleFiles = (files) => {
    const newImages = Array.from(files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const removeImage = (index) => {
    const newList = [...images];
    newList.splice(index, 1);
    setImages(newList);
  };

  let categorydata = () => {
    axios.get(`${apibaseurl}product/parent`)
      .then((res) => res.data)
      .then((finalres) => {
        setperent(finalres.Productres)

      })
  }

  let getidforsubcategory = (e) => {
    let pernetid = e.target.value
    axios.get(`${apibaseurl}product/subcategory/${pernetid}`)
      .then((res) => res.data)
      .then((finaleres) => {
        setsubperent(finaleres.SubCategoryres)
      })


  }

  let getsubsubcaegory = (e) => {
    let subid = e.target.value
    axios.get(`${apibaseurl}product/subsubcategory/${subid}`)
      .then((res) => res.data)
      .then((finaleres) => {
        setsubsubpernet(finaleres.subsubCategoryres)
      })


  }
  let Materialdata = () => {
    axios.get(`${apibaseurl}product/metarial`)
      .then((res) => res.data)
      .then((finalres) => {
        setmaterial(finalres.Metarialres)

      })
  }
  let Colordata = () => {
    axios.get(`${apibaseurl}product/color`)
      .then((res) => res.data)
      .then((finalres) => {
        setcolor(finalres.colorres)

      })
  }

  //   const handleChangecolor = (e) => {
  //   const values = Array.from(e.target.selectedOptions, (option) => option.value);
  //   setSelectedColors(values);
  // };
  // let handleChangematerial  = (e) => {
  //   const values = Array.from(e.target.selectedOptions, (option) => option.value);
  //   setSelectedmatrial(values);
  // };

  let AddProduct = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    // Gallery images append
    images.forEach((img) => {
      formData.append('_Gallery_image', img.file);
    });

    // Material
    Selectedmatrial.forEach((item) => {
      formData.append('_Material', item);
    });

    // Color
    SelectedColors.forEach((item) => {
      formData.append('_Color', item);
    });

    axios.post(`${apibaseurl}product/create`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
      .then((res) => res.data)
      .then((finalres) => {

        if (finalres._status) {
          toast.success(finalres._Message);
          e.target.reset();
          setImages([]);
        } else {
          if (finalres.erre) {
            finalres.erre.forEach((item) => {
              Object.values(item).forEach((msg) => {
                toast.error(msg);
              });
            });
          } else {
            toast.error(finalres._Message);
          }
        }
      });
  };
  useEffect(() => {
    categorydata()
    Materialdata()
    Colordata()
  }, [])





  useEffect(() => {
    $(".hello").dropify({

      messages: {
        'default': 'file here or click',

      }
    });
  }, []);
  return (
    <>
      <ToastContainer />
      <div className=' w-6xl mx-auto min-h-[88vh]'>
        <h2 className='ps-3 py-2'>Home/Product/Addproduct</h2>

        <div className='shadow p-2  w-6xl  mx-auto bg-neutral-100'>
          <div className='shadow-xs shadow-violet-600 '> <h2 className='shadow-violet-900 text-2xl font-bold px-3 py-1 text-neutral-600'>Add New product</h2>  </div>

          <form onSubmit={AddProduct} action="submit">
            <div className='grid grid-cols-3'>



              <div className='col-span-1  pe-5   my-5'>
                <div>
                  <h3 className='text-xl text-neutral-700   text-center font-bold'>Main image</h3>
                  <input
                    type="file"
                    className="hello"
                    name='_image'
                    data-height="300"
                    data-allowed-file-extensions="jpg png jpeg webp"


                  />

                </div>

                <h3 className='text-xl text-neutral-700  my-3  text-center font-bold'>Gellery image</h3>

                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  className="border-2 border border-gray-400 p-10 text-center rounded-xl cursor-pointer"
                >
                  <input
                    type="file"
                    multiple
                    // accept="image/*"
                    name='_Gallery_image'
                    onChange={(e) => handleFiles(e.target.files)}
                    className="hidden"
                    id="fileInput"
                  />

                  <label htmlFor="fileInput" className="cursor-pointer font-bold">
                    Drag & Drop Images Here <br />
                    <span className="text-blue-500">or Click to Upload</span>
                  </label>
                </div>

                {/* Preview */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                  {images.map((img, index) => (
                    <div key={index} className="relative">
                      <img
                        src={img.preview}
                        alt=""
                        className="w-full h-22 object-fill rounded-lg"
                      />

                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white px-2 rounded"
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>








              </div>
              <div className='col-span-2'>



                <div className='flex flex-col mx-2 my-4 gap-2 text-[18px ] font-bold'>
                  <label htmlFor="Name" > Parent Catagory Name </label>
                  <select name='_PerentCategory' type="text" placeholder='Enter Catagory Name ' className=' w-[640px]  px-2 py-2 border border-violet-300 bg-white outline-none rounded  text-neutral-500' onChange={getidforsubcategory} >
                    <option value="">Select Parent Catagory</option>

                    {
                      perent.map(item => (
                        <option value={item._id}> {item._CategoryName}</option>
                      ))
                    }


                  </select>
                </div>
                <div className='flex gap-5'>

                  <div className='flex flex-col mx-2 my-4 gap-2 text-[18px ] font-bold'>

                    <label htmlFor="Name" >Sub Catagory Name </label>
                    <select name='_SubCategory' type="text" placeholder='Enter sub Catagory Name ' className='w-[300px] px-2 py-2 border border-violet-300 bg-white outline-none rounded  text-neutral-500' onChange={getsubsubcaegory} >
                      <option value="">Select Sub Catagory</option>
                      {subperent.map((item, i) => {
                        return (
                          <option key={i} className='text-neutral-700 font-serif' value={item._id}> {item._SubCategoryName
                          } </option>
                        )
                      })}
                    </select>
                  </div>
                  <div className='flex flex-col mx-2 my-4 gap-2 text-[18px ] font-bold'>
                    <label htmlFor="Name" >Sub Sub Catagory Name </label>
                    <select name='_SubSubCategory' type="text" placeholder='Enter Sub Sub Catagory Name ' className='w-[300px] px-2 py-2 border border-violet-300 bg-white outline-none rounded  text-neutral-500' >
                      <option value="">Select Sub Sub Catagory</option>
                      {subsubperent.map((item, i) => {
                        return (
                          <option key={i} className='text-neutral-700 font-serif' value={item._id}> {item._SubSubCategoryName
                          } </option>
                        )
                      })}
                    </select>
                  </div>
                </div>

                <div className='flex flex-col mx-2 my-4 gap-2 text-[18px ] font-bold'>
                  <label htmlFor="Name" > Product Name </label>
                  <input name='_ProductName' type="text" placeholder='Enter Product Name ' className='w-[640px] px-2 py-2 border border-violet-300 bg-white outline-none rounded' />
                </div>


                <div className='flex gap-5'>

                  <div className='flex flex-col mx-2 my-4 gap-2 text-[18px ] font-bold'>

                    <label htmlFor="Name" >Material </label>
                    <select name='_Material' multiple size={1} type="text" className='w-[300px] px-2 py-2 border border-violet-300 bg-white outline-none rounded  text-neutral-500' >

                      {
                        material.map(item => (
                          <option multiple value={item._id}> {item._MetarialName}</option>
                        ))
                      }
                    </select>
                  </div>
                  <div className='flex flex-col mx-2 my-4 gap-2 text-[18px ] font-bold'>
                    <label htmlFor="Name" > Color </label>
                    <select name='_Color' multiple size={1} type="text" className='w-[300px]   px-2 py-2 border border-violet-300 bg-white outline-none rounded  text-neutral-500' >

                      {
                        color.map(item => (
                          <option multiple value={item._id}> {item._ColorName}</option>
                        ))
                      }
                    </select>
                  </div>
                </div>
                <div className='flex gap-11'>

                  <div className='flex flex-col mx-2 my-4 gap-2 text-[18px ] font-bold'>

                    <label htmlFor="Name" >Prodcut Type </label>
                    <select name='_Prodcut_Type' type="text" className='w-[170px] px-2 py-2 border border-violet-300 bg-white outline-none rounded  text-neutral-500' >
                      <option value="">Select  type</option>
                      <option value="1">Featured</option>
                      <option value="2">New Arrivals</option>
                      <option value="3">Onsale</option>

                    </select>


                  </div>
                  <div className='flex flex-col mx-2 my-4 gap-2 text-[18px ] font-bold'>
                    <label htmlFor="Name" >Best Selling</label>
                    <select name='_Product_Best_Selling' type="Boolean" className='w-[170px] px-2 py-2 border border-violet-300 bg-white outline-none rounded  text-neutral-500' >
                      <option value="">Select Best Selling</option>
                      <option value={true}>Yes</option>
                      <option value={false}>No</option>
                    </select>


                  </div>
                  <div className='flex flex-col mx-2 my-4 gap-2 text-[18px ] font-bold'>
                    <label htmlFor="Name" > Top_Rated </label>
                    <select name='_Product_Top_Rated' type="Boolean" className='w-[170px] px-2 py-2 border border-violet-300 bg-white outline-none rounded  text-neutral-500' >
                      <option value="">Select Top Rated</option>
                      <option value={true}>Yes</option>
                      <option value={false}>No</option>
                    </select>


                  </div>
                </div>

                <div className='flex flex-col mx-2 my-4 gap-2 text-[18px ] font-bold'>
                  <label htmlFor="Name" > Product  order </label>
                  <input name='_ProductOrder' type="number" placeholder='Enter order ' className='w-[640px]  px-2 py-2 border border-violet-300 bg-white outline-none rounded' />
                </div>

                <div className='flex flex-col mx-2 my-4 gap-2 text-[18px ] font-bold'>
                  <label htmlFor="Name" > Short Discrition </label>
                  <textarea name='_Product_Short_Description' type="text" className='w-[640px]  px-2 py-2 border border-violet-300 bg-white outline-none rounded' ></textarea>
                </div>
                <div className='flex flex-col mx-2 my-4 gap-2 text-[18px ] font-bold'>
                  <label htmlFor="Name" > Discrition </label>
                  <textarea name='_Product_Long_Description' type="text" className='w-[640px]  px-2 py-2 border border-violet-300 bg-white outline-none rounded' ></textarea>
                </div>
                <div className='flex gap-11'>

                  <div className='flex flex-col mx-2 my-4 gap-2 text-[18px ] font-bold'>

                    <label htmlFor="Name" >Original price </label>
                    <input name='_Product_Original_Price' type="number" className='w-[170px] px-2 py-2 border border-violet-300 bg-white outline-none rounded  text-neutral-500' />


                  </div>
                  <div className='flex flex-col mx-2 my-4 gap-2 text-[18px ] font-bold'>
                    <label htmlFor="Name" >Discount price</label>
                    <input name='_Product_Discount_Price' type="number" className='w-[170px] px-2 py-2 border border-violet-300 bg-white outline-none rounded  text-neutral-500' />


                  </div>
                  <div className='flex flex-col mx-2 my-4 gap-2 text-[18px ] font-bold'>
                    <label htmlFor="Name" > Sell price </label>
                    <input name='_Product_Sell_Price' type="number" className='w-[170px] px-2 py-2 border border-violet-300 bg-white outline-none rounded  text-neutral-500' />


                  </div>
                </div>
                <div className='flex gap-11'>

                  <div className='flex flex-col mx-2 my-4 gap-2 text-[18px ] font-bold'>

                    <label htmlFor="Name" > Width </label>
                    <input name='_Product_Width' type="number" className='w-[170px] px-2 py-2 border border-violet-300 bg-white outline-none rounded  text-neutral-500' />


                  </div>
                  <div className='flex flex-col mx-2 my-4 gap-2 text-[18px ] font-bold'>
                    <label htmlFor="Name" >Hight</label>
                    <input name='_Product_Hight' type="number" className='w-[170px] px-2 py-2 border border-violet-300 bg-white outline-none rounded  text-neutral-500' />


                  </div>
                  <div className='flex flex-col mx-2 my-4 gap-2 text-[18px ] font-bold'>
                    <label htmlFor="Name" > Length </label>
                    <input name='_Product_Length' type="number" className='w-[170px] px-2 py-2 border border-violet-300 bg-white outline-none rounded  text-neutral-500' />


                  </div>
                </div>
                <div className='flex flex-col mx-2 my-4 gap-2 text-[18px ] font-bold'>
                  <label htmlFor="Name" > Meta Tital </label>
                  <input name='_Meta_Title' type="text" placeholder='Meta Tital ' className='w-[640px] px-2 py-2 border border-violet-300 bg-white outline-none rounded' />
                </div>
                <div className='flex flex-col mx-2 my-4 gap-2 text-[18px ] font-bold'>
                  <label htmlFor="Name" >Meta Discrition </label>
                  <input name='_Meta_Discrition' type="text" placeholder='Meta Discrition  ' className='w-[640px] px-2 py-2 border border-violet-300 bg-white outline-none rounded' />
                </div>
                <div className='flex flex-col mx-2 my-4 gap-2 text-[18px ] font-bold'>
                  <label htmlFor="Name" > Meta Slug </label>
                  <input name='_Meta_Slug' type="text" placeholder='Meta Slug ' className='w-[640px] px-2 py-2 border border-violet-300 bg-white outline-none rounded' />
                </div>



                <button className='font-bold py-2 px-6 rounded bg-neutral-500 text-white mx-2 my-2 hover:bg-neutral-600 cursor-pointer'>Add</button>

              </div>

            </div>
          </form>
        </div >

      </div >
    </>

  )
}
