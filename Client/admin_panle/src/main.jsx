import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "dropify/dist/css/dropify.min.css";
import "dropify/dist/js/dropify.min.js";
import ReactDOM from "react-dom/client";
import './index.css'
import Mainlayout from './Main_Router/Mainlayout'
import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes } from 'react-router-dom'
import Dashbord from './pages.jsx/Dashbord'
import About_us from './pages.jsx/WebPages/about_us'
import Home from './pages.jsx/WebPages/home'
import Size_guid from './pages.jsx/WebPages/size_guid'
import Viewuser from './pages.jsx/Users.jsx/viewuser'
import Contactenquirys from './pages.jsx/Enquirys/contactenquirys'
import Newslatters from './pages.jsx/Enquirys/newslatters'
import Addcolor from './pages.jsx/Colors/addcolor'
import Viewcolor from './pages.jsx/Colors/viewcolor'
import Addsize from './pages.jsx/Size/addsize'
import Viewsize from './pages.jsx/Size/viewsize'

import Addsubcatagory from './pages.jsx/SubCatagory/addsubcatagory'
import Viewsubcatagory from './pages.jsx/SubCatagory/viewsubcatagory'
import Addproduct from './pages.jsx/Product/addproduct'
import Viewproduct from './pages.jsx/Product/viewproduct'
import Viewwhychoose from './pages.jsx/Why_Choose_Us/viewwhychoose'
import Order from './pages.jsx/Orders/order'
import Addslider from './pages.jsx/Slider/addslider'
import Viewslider from './pages.jsx/Slider/viewslider'
import Addcountry from './pages.jsx/Country/addcountry'
import Viewcountry from './pages.jsx/Country/viewcountry'
import Addtestimonial from './pages.jsx/Testimonial/addtestimonial'
import Addfaq from './pages.jsx/Faq/addfaq'
import Viewfaq from './pages.jsx/Faq/viewfaq'
import Addwhychoose from './pages.jsx/Why_Choose_Us/addwhychoose'
import Viewtestimonial from './pages.jsx/Testimonial/viewtestimonial'
import Login from './pages.jsx/Login/Login';
import ContextFile from './common.jsx/comancontesxt';
import MainAdmin from './Main_Router/MainAdmin';
import Addmeterial from './pages.jsx/Meterial/Addmeterial';
import ViewMeterial from './pages.jsx/Meterial/Viewmetarial';
import Editfaq from './pages.jsx/Faq/FaqEdit';
import Updatemeterial from './pages.jsx/Meterial/EditMeterial';
import Addcatagory from './pages.jsx/Catagory/addcatagory';
import Viewcatagory from './pages.jsx/Catagory/viewcatagory';
import Updatecatagory from './pages.jsx/Catagory/updatecategory';
import Updatesubcatagory from './pages.jsx/SubCatagory/updatecategory';
import AddSubSubCatagory from './pages.jsx/SubSubCategory/addsubsubcategory';
import ViewSubSubCategory from './pages.jsx/SubSubCategory/viewSubSubCategory';
import UpdateSlider from './pages.jsx/Slider/updateslider';
import Updatesubsubcatagory from './pages.jsx/SubSubCategory/updatesubsubcategory';
import Profile from './pages.jsx/Profile/Profile';
import CompanyProfile from './pages.jsx/ComponyProfile/ComponyProfile';
import ProductDetailAdmin from './pages.jsx/Product/viewproductDetails';
import ProductUpdate from './pages.jsx/Product/ProductUpdate';


// const importent = createBrowserRouter(
//   createRoutesFromElements(

//   )
// )

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <StrictMode>

    <ContextFile>
      <BrowserRouter>

        <Routes>
          <Route path='/' element={<Login />} />

          <Route path='/' element={<MainAdmin />} >




            <Route path='/dashboard' element={<Dashbord />} />
            <Route path='/componyprofile' element={<CompanyProfile />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/home' element={<Home />} />
            <Route path='/about_us' element={<About_us />} />
            <Route path='/size-guid' element={<Size_guid />} />


            <Route path='/view_user' element={<Viewuser />} />


            <Route path='/contact_enquirys' element={<Contactenquirys />} />
            <Route path='/news_latters' element={<Newslatters />} />

            <Route path='/color/add_color' element={<Addcolor />} />
            <Route path='/color/add_color/:_id' element={<Addcolor />} />
            <Route path='/color/view_color' element={<Viewcolor />} />

            <Route path='/size/add_size' element={<Addsize />} />
            <Route path='/size/view_size' element={<Viewsize />} />

            <Route path='/catagory/add_catagory' element={<Addcatagory />} />
            <Route path='/catagory/update_catagory/:_id' element={<Updatecatagory />} />
            <Route path='/catagory/view_catagory' element={<Viewcatagory />} />

            <Route path='/add_sub_catagory' element={<Addsubcatagory />} />
            <Route path='/subcategory/view_sub_catagory' element={<Viewsubcatagory />} />
            <Route path='/subcategory/update_sub_catagory/:_id' element={<Updatesubcatagory />} />


            <Route path='/sub_sub_category/add_sub_sub_catagory' element={<AddSubSubCatagory />} />
            <Route path='/sub_sub_category/update_sub_sub_catagory/:_id' element={<Updatesubsubcatagory />} />
            <Route path='/sub_sub_category/view_sub_sub_catagory' element={<ViewSubSubCategory />} />


            <Route path='/product/add_product' element={<Addproduct />} />
            <Route path='/product/view_product' element={<Viewproduct />} />
            <Route path='/product/view/productditail/:slug' element={<ProductDetailAdmin />} />
            <Route path='/product/update_product/:_id' element={<ProductUpdate />} />


            <Route path='/add_why_choose_us' element={<Addwhychoose />} />
            <Route path='/view_why_choose_us' element={<Viewwhychoose />} />

            <Route path='/orders' element={<Order />} />


            <Route path='/slider/add_slider' element={<Addslider />} />
            <Route path='/slider/update_slider/:_id' element={<UpdateSlider />} />
            <Route path='/slider/view_slider' element={<Viewslider />} />

            <Route path='/meterial/add_meterial' element={<Addmeterial />} />
            <Route path='/meterial/update/:_id' element={<Updatemeterial />} />

            <Route path='/meterial/view_meterial' element={<ViewMeterial />} />

            <Route path='/country/add_country' element={<Addcountry />} />
            <Route path='/country/view_country' element={<Viewcountry />} />

            <Route path='/testimonials/add_testimonial' element={<Addtestimonial />} />
            <Route path='/testimonials/view_testimonial' element={<Viewtestimonial />} />

            <Route path='/faq/add_faq' element={<Addfaq />} />
            <Route path='/faq/view_faq' element={<Viewfaq />} />
            <Route path='/faq/update/:_id' element={<Editfaq />} />





          </Route>

        </Routes>
      </BrowserRouter>
      {/* <RouterProvider router={importent} /> */}
    </ContextFile>
  </StrictMode>

)
