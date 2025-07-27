import React, { useEffect } from 'react'
import Player from '../components/Player'
import { IoSearch } from "react-icons/io5";
import { songsData } from '../songs';
import Card from '../components/Card';
import { useState } from 'react';

function Search() {

  // এখানে ইউজারের সার্চ ইনপুট ধরে রাখার জন্য স্টেট
  let [input, setInput] = useState()

  // ফিল্টার করা গানের লিস্ট এখানে রাখা হবে
  let [newList, setnewList] = useState([])

  // যখনই ইনপুট বদলাবে, তখনই নতুন করে গানগুলো ফিল্টার করে আপডেট করা হবে
  useEffect(() => {
    // songsData থেকে এমন গান খুঁজে বের করা হচ্ছে যেগুলো ইনপুটের সাথে মিলে
    let a = songsData.filter((song) =>
      song.name.toLowerCase().includes(input) ||         // ছোট হরফে মিলে কিনা
      song.singer.toLowerCase().includes(input) ||       // ছোট হরফে গায়ক মিলে কিনা
      song.name.includes(input) ||                       // সরাসরি মিলে কিনা
      song.singer.includes(input) ||                     // সরাসরি গায়ক মিলে কিনা
      song.name.toUpperCase().includes(input) ||         // বড় হরফে মিলে কিনা
      song.singer.toUpperCase().includes(input)          // বড় হরফে গায়ক মিলে কিনা
    )
    setnewList(a)   // ফিল্টার করা লিস্ট সেট করা হচ্ছে
  }, [input])

  return (
    <div className='bg-black w-full h-[100vh] flex justify-start items-center flex-col
     pt-[20px] md:pt-[100px] gap-[30px] '>

      {/* গান প্লেয়ার উপরে দেখানো হচ্ছে */}
      <Player />

      {/* সার্চ বক্স */}
      <form className='w-[90%] md:max-w-[60%] h-[60px] bg-gray-800 flex justify-center items-center
      gap-5 rounded-lg overflow-hidden p-[15px] md:p-[0]' onSubmit={(e) => {
        e.preventDefault() // সাবমিট করলে রিফ্রেশ যেন না হয়
      }}>
        {/* সার্চ আইকন */}
        <IoSearch className='text-gray-200 text-[18px]' />

        {/* ইনপুট ফিল্ড, যেখানে গান বা গায়ক এর নাম লিখে খোঁজা যাবে */}
        <input type='text' className='w-[90%] h-[100%] bg-gray-800 outline-none
        border-0 text-white p-[10px] text-[18px]' placeholder='Search Song....'
          onChange={(e) => setInput(e.target.value)} value={input} />
      </form>

      {/* যদি ইনপুটে কিছু লেখা থাকে, তাহলে ফিল্টার করা গানগুলোর লিস্ট দেখাবে */}
      {input ?
        <div className='w-[100%] md:w-[80%] h-[70%] md:h-[100%] flex flex-col justify-start
      p-[15px] items-center gap-5 overflow-auto'>

          {/* প্রতিটি গানকে আলাদা কার্ড আকারে দেখানো হচ্ছে */}
          {newList.map((song) => (
            <Card
              name={song.name}           // গানের নাম
              image={song.image}         // গানের ছবি
              singer={song.singer}       // গায়ক/গায়িকার নাম
              songIndex={song.id - 1}    // গানের ইনডেক্স
            />
          ))}

        </div>
        :
        // যদি এখনো কোনো ইনপুট না থাকে, তখন মেসেজ দেখাবে
        <div className='text-gray-700 text-[30px]'>Search Songs...</div>
      }
    </div>
  )
}

// এই কম্পোনেন্টটা এক্সপোর্ট করা হলো যেন অন্য জায়গায় ব্যবহার করা যায়
export default Search
