import React, { useEffect } from 'react'
import $ from "jquery";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

export default function Addcatagory() {


  let navigete = useNavigate()
  let apibaseurl = import.meta.env.VITE_APIBASEURL
  let Addcategory = (e) => {
    e.preventDefault()
    let data = new FormData(e.target)
    console.log(data)
    axios.post(`${apibaseurl}category/create`, data)
      .then((res) => res.data)
      .then((finalres) => {


        if (finalres._status) {



          toast.success(finalres._Message)
          setTimeout(() => {
            navigete('/catagory/view_catagory')
          }, 2000)

          e.target.reset()

        }
        else {
          if ((finalres.erre)) {
            finalres.erre.forEach((item) => {
              Object.values(item).forEach((msg) => {
                toast.error(msg);
              });
            });
          }


          else {

            toast.error(finalres._Message)
          }
        }

      })
  }






  // const [images, setImages] = useState([]);

  // const handleFiles = (files) => {
  //   const newImages = Array.from(files).map((file) => ({
  //     file,
  //     preview: URL.createObjectURL(file),
  //   }));

  //   setImages((prev) => [...prev, ...newImages]);
  // };

  // const handleDrop = (e) => {
  //   e.preventDefault();
  //   handleFiles(e.dataTransfer.files);
  // };

  // const removeImage = (index) => {
  //   const newList = [...images];
  //   newList.splice(index, 1);
  //   setImages(newList);
  // };

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
      <div className=' w-5xl mx-auto min-h-[88vh]'>
        <h2 className='ps-3 py-2'>Home/Addcatagory</h2>

        <div className='shadow p-2 w-5xl mx-auto bg-neutral-100'>
          <div className='shadow-xs shadow-violet-600 '> <h2 className='shadow-violet-900 text-2xl font-bold px-3 py-1 text-neutral-600'>Add Addcatagory</h2>  </div>
           <form action="submit" onSubmit={Addcategory}>
          <div className='grid grid-cols-3'>
           
              <div className='col-span-2'>

                <div className='flex flex-col mx-2 my-4 gap-2 text-[18px ] font-bold'>
                  <label htmlFor="Name" > Catagory Name </label>
                  <input type="text" name='_CategoryName' placeholder='Enter Catagory Name ' className='w-xl px-2 py-2 border border-violet-300 bg-white outline-none rounded' />
                </div>

                <div className='flex flex-col mx-2 my-4 gap-2 text-[18px ] font-bold'>
                  <label htmlFor="Name" > Catagory  order </label>
                  <input type="number" name='_CategoryOrder' placeholder='Enter order ' className='w-xl px-2 py-2 border border-violet-300 bg-white outline-none rounded' />
                </div>



                <button className='font-bold py-2 px-6 rounded bg-neutral-500 text-white mx-2 my-2 hover:bg-neutral-600 cursor-pointer'>Add</button>




              </div>


              <div className='col-span-1  pe-5   my-5'>
                <div>



                  <input
                    type="file"
                    multiple
                    name='_image'
                    className="hello "
                    data-height="300"
                    data-allowed-file-extensions="jpg png jpeg webp"


                  />


                  {/* <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  className="border-2 border-dashed border-gray-400 p-10 text-center rounded-xl cursor-pointer"
                >
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleFiles(e.target.files)}
                    className="hidden"
                    id="fileInput"
                  />

                  <label htmlFor="fileInput" className="cursor-pointer">
                    Drag & Drop Images Here <br />
                    <span className="text-blue-500">or Click to Upload</span>
                  </label>
                </div> */}

                  {/* Preview */}
                  {/* <div className="grid grid-cols-4 gap-4 mt-6">
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
                </div> */}

                </div>

              </div>
         


          </div>
             </form>
        </div>

      </div>
    </>
  )
}
