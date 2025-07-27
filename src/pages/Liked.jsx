import React from 'react'
import Player from '../components/Player'
import { useSelector } from 'react-redux'
import Card from '../components/Card';

function Liked() {

  // স্টোর থেকে পছন্দের গানগুলোর লিস্ট নিয়ে আসছি
  let songs = useSelector(state => state.liked)

  return (
    <div className='w-full h-[100vh] bg-black flex justify-start items-center flex-col
     pt-[20px] md:mt-[40px] gap-[30px] '>

      {/* গান চালানোর জন্য প্লেয়ার বসানো হলো */}
      <Player />

      {/* যদি পছন্দ করা গানের সংখ্যা শূন্য না হয়, তাহলে গানগুলো দেখাবে */}
      {!songs.length < 1 ? <>

        {/* উপরে টাইটেল হিসেবে লিখছি — Liked Songs */}
        <h1 className='text-white font-semibold text-[20px]'>Liked Songs</h1>

        {/* গানগুলোর লিস্ট কার্ড আকারে দেখানোর জন্য একটি ডিভ */}
        <div className='w-full h-[65%] md:h-[100%] flex flex-col justify-start
      items-center gap-[20px] overflow-auto '>

          {/* প্রতিটি গানকে Card কম্পোনেন্ট দিয়ে আলাদা আলাদা দেখাচ্ছি */}
          {songs.map((song) => (
            <Card
              name={song.name}           // গানের নাম
              image={song.image}         // গানের ছবি
              singer={song.singer}       // গায়ক/গায়িকার নাম
              songIndex={song.songIndex} // গানটির অবস্থান
            />
          ))}

        </div>
      </>
        :
        // যদি কোনো গান পছন্দ করা না থাকে, তখন জানিয়ে দিচ্ছি — No Liked Songs
        <div className='text-gray-700 text-[30px]'>No Liked Songs</div>
      }

    </div>
  )
}

// এই কম্পোনেন্টটা এক্সপোর্ট করে দিচ্ছি যেন বাইরে থেকে ব্যবহার করা যায়
export default Liked
