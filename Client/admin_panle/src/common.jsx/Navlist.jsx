import React from 'react'
import { FaChalkboardTeacher, FaCommentAlt, FaFirstOrder, FaQuestionCircle, FaUserFriends } from 'react-icons/fa'
import { FiSliders } from 'react-icons/fi'
import { GiResize, GiSprout } from 'react-icons/gi'
import { IoMdColorPalette } from 'react-icons/io'
import {  MdAccountBalance, MdOutlineWebhook, MdProductionQuantityLimits } from 'react-icons/md'
import { RiMenu4Fill } from 'react-icons/ri'
import { SiMaterialformkdocs } from 'react-icons/si'
import { TiThMenu } from 'react-icons/ti'

export const Navlist = [


    {
        id: 1,
        Navicon: <MdOutlineWebhook />,
        Navname: 'Web Pages',

        submenu: [

            {
                
                Navname: 'Home',
                Link: '/home'

            },
            {
               
                Navname: 'About us',
                Link: '/about_us'

            }, {
               
                Navname: 'Size Guid',
                Link: '/size-guid'

            },
        ],

    },
    {
        id: 2,
        Navicon: <FaUserFriends />,
        Navname: 'Users',

        submenu: [

           
            {
               
                Navname: 'View User',
                Link: '/view_user'

            }
            
        ]

    },
    {
        id: 3,
        Navicon: <FaCommentAlt />,
        Navname: 'Enquirys',

        submenu: [

            {
                
                Navname: 'Contact Enquirys',
                Link: '/contact_enquirys'

            },
            {
                
                Navname: 'News latters',
                Link: '/news_latters'

            }
        ]

    },
      {
        id: 4,
        Navicon:<SiMaterialformkdocs />,
        Navname: 'Meterial',

        submenu: [

            {
                
                Navname: 'Addmeterial',
                Link: '/meterial/add_meterial'

            },
            {
                
                Navname: 'Viewmeterial',
                Link: '/meterial/view_meterial'

            }
        ]

    },
    {
        id: 5,
        Navicon: <IoMdColorPalette />,
        Navname: 'Colors',

        submenu: [

            {
                
                Navname: 'Add color',
                Link: '/color/add_color'

            },
            {
                
                Navname: 'View color',
                Link: '/color/view_color'

            }
        ]

    },
    {
        id: 6,
        Navicon: <GiResize />,
        Navname: 'Size',

        submenu: [

            {
                
                Navname: 'Add size',
                Link: '/size/add_size'

            },
            {
                
                Navname: 'View size',
                Link: '/size/view_size'

            }
        ]

    },
    {
        id: 7,
        Navicon: <TiThMenu />,
        Navname: 'Catagory',

        submenu: [

            {
                
                Navname: 'Add catagory',
                Link: '/catagory/add_catagory'

            },
            {
                
                Navname: 'View catagory',
                Link: '/catagory/view_catagory'

            }
        ]

    },
    {
        id: 8,
        Navicon: <RiMenu4Fill />,
        Navname: 'Sub catagorys',

        submenu: [

            {
                
                Navname: 'Add Sub catagorys',
                Link: '/add_sub_catagory'

            },
            {
           
                Navname: 'view Sub catagorys',
                Link: 'subcategory/view_sub_catagory'

            }
        ]

    },
     {
        id: 9,
        Navicon: <RiMenu4Fill />,
        Navname: 'Sub Sub catagorys',

        submenu: [

            {
                
                Navname: 'Add Sub catagorys',
                Link: 'sub_sub_category/add_sub_sub_catagory'

            },
            {
           
                Navname: 'view Sub catagorys',
                  Link: 'sub_sub_category/view_sub_sub_catagory'

            }
        ]

    },
    {
        id: 10,
        Navicon: <MdProductionQuantityLimits />,
        Navname: 'Product',

        submenu: [

            {
                
                Navname: 'Add product',
                Link: '/product/add_product'

            },
            {
                
                Navname: 'View product',
                Link: '/product/view_product'

            }
            
        ]

    },
    {
        id: 11,
        Navicon: <FaChalkboardTeacher />,
        Navname: 'Why Choose us',

        submenu: [

            {
               
                Navname: 'Add Why Choose us',
                Link: '/add_why_choose_us'

            },
            {
               
                Navname: 'View Why Choose us',
                Link: '/view_why_choose_us'

            }
        ]

    },
    {
        id: 12,
        Navicon: <FaFirstOrder />,
        Navname: 'Order',

        submenu: [

            {
              
                Navname: 'Orders',
                Link: '/orders'

            }
        ]

    },
    {
        id: 13,
        Navicon: <FiSliders />,
        Navname: 'Slider',

        submenu: [

            {
              
                Navname: 'Add Slider',
                Link: '/slider/add_slider'

            },
            {
                
                Navname: 'View Slider',
                Link: '/slider/view_slider'

            }
        ]

    },
    {
        id: 14,
        Navicon: <MdAccountBalance />,
        Navname: 'Country',

        submenu: [

            {
               
                Navname: 'Add Country',
                Link: '/country/add_country'

            },
            {
               
                Navname: 'View Country',
                Link: '/country/view_country'

            }
        ]

    },

    {
        id: 15,
        Navicon: <GiSprout />,
        Navname: 'Testimonials',

        submenu: [

            {
               
                Navname: 'Add Testimonials',
                Link: '/testimonials/add_testimonial'

            },
            {
                
                Navname: 'View Testimonials',
                Link: '/testimonials/view_testimonial'

            }
        ]

    },
    {
        id: 16,
        Navicon: <FaQuestionCircle />,
        Navname: 'Faqs',

        submenu: [

            {
                
                Navname: 'Add Faq',
                Link: '/faq/add_faq'

            },
            {
                
                Navname: 'View faq',
                Link: '/faq/view_faq'

            }
        ]

    }
    
]
