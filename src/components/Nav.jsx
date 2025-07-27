import React from 'react'
import { TiHome } from "react-icons/ti";
import { IoSearch } from "react-icons/io5";
import { RiPlayListLine } from "react-icons/ri";
import { IoMdHeart } from "react-icons/io";
import { Link } from 'react-router-dom';
function Nav() {
  return (
    <div>
       <div className='w-full h-[65px] bg-black fixed bottom-0 md:top-0 text-white flex justify-around md:justify-center
         items-center gap-[50px]  p-[20px] z-30 rounded-t-[30px]'>
            <Link to={"/"}><TiHome className='w-[25px] h-[25px]'/></Link>
            <Link to={"/search"}><IoSearch className='w-[25px] h-[25px]'/></Link>
           <Link to={"/playlist"}><RiPlayListLine className='w-[25px] h-[25px]'/></Link> 
            <Link to={"/liked"}><IoMdHeart className='w-[25px] h-[25px]'/></Link>
          </div>
    </div>
  )
}

export default Nav
