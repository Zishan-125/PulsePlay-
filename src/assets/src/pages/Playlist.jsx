import React from 'react'
import Player from '../components/Player'
import { useSelector } from 'react-redux'
import Card from '../components/Card';

function Playlist() {

  // রিডাক্স স্টোর থেকে প্লেলিস্টের গানগুলো নিয়ে আসছি
  let songs = useSelector(state => state.playlist)

  // ডেভেলপমেন্টের জন্য কনসোল লগ — গানগুলোর লিস্ট দেখতে
  console.log(songs);

  return (
    <div className='w-full h-[100vh] bg-black flex justify-start items-center flex-col
     pt-[20px] md:pt-[100px] gap-[30px] '>

      {/* উপরে গান চালানোর জন্য প্লেয়ার */}
      <Player />

      {/* যদি প্লেলিস্টে অন্তত ১টি গান থাকে */}
      {!songs.length < 1 ? <>

        {/* শিরোনাম */}
        <h1 className='text-white font-semibold text-[20px]'>Playlist</h1>

        {/* গানগুলোর লিস্ট এখানে কার্ড আকারে দেখানো হচ্ছে */}
        <div className='w-full h-[65%] md:h-[100%] flex flex-col justify-start
      items-center gap-[20px] overflow-auto'>
          {songs.map((song) => (
            <Card
              name={song.name}         // গানের নাম
              image={song.image}       // গানের ছবি
              singer={song.singer}     // গায়ক/গায়িকার নাম
              songIndex={song.songIndex} // গানটির ইনডেক্স
            />
          ))}
        </div>
      </>
        :
        // যদি কোনো গান না থাকে প্লেলিস্টে, তাহলে মেসেজ দেখাবে
        <div className='text-gray-700 text-[30px]'>No Song In Playlist</div>
      }

    </div>
  )
}

// এই কম্পোনেন্ট এক্সপোর্ট করা হচ্ছে যেন অন্য জায়গায় ব্যবহার করা যায়
export default Playlist
