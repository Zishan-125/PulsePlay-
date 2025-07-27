import React, { useContext } from 'react'
import { MdOutlinePlaylistRemove } from "react-icons/md";
import { songsData } from '../songs'
import { MdPlaylistAdd } from "react-icons/md";              // প্লেলিস্টে গান যোগ করার আইকন
import { GoHeart } from "react-icons/go";                    // লাইক করার আইকন (ফাঁকা হার্ট)
import { datacontext } from '../context/UserContext';        // কনটেক্সট থেকে গান চালানো সম্পর্কিত ডেটা আনছে
import { useDispatch, useSelector } from 'react-redux';      // Redux এর hook গুলো
import { AddSong, RemoveSong } from '../redux/PlaylistSlice' // প্লেলিস্টে গান অ্যাড বা রিমুভ করার action
import { AddLiked, RemoveLiked } from '../redux/LikedSlice'; // লাইক লিস্টে গান অ্যাড বা রিমুভ করার action
import { GoHeartFill } from "react-icons/go";                // লাইক করা গান বোঝাতে ভরা হার্ট আইকন

function Card({ name, image, singer, songIndex }) {
    const { playSong, index, setIndex } = useContext(datacontext)  // কনটেক্সট থেকে গান চালানো ও ইনডেক্স সেট করার ফাংশন
    const dispatch = useDispatch()

    const playlist = useSelector(state => state.playlist)          // Redux থেকে প্লেলিস্টের বর্তমান অবস্থা নিচ্ছে
    const songExistInPlaylist = playlist.some(song => song.songIndex === songIndex) // গানটি প্লেলিস্টে আগে থেকেই আছে কিনা চেক করছে

    const likedSongs = useSelector(state => state.liked)           // Redux থেকে পছন্দ করা গানের তালিকা নিচ্ছে
    const songExistInLiked = likedSongs.some(song => song.songIndex === songIndex) // গানটি লাইক করা আছে কিনা চেক করছে

    return (
        <div className='w-[90%] h-[70px] md:h-[120px] bg-gray-800 rounded-lg pt-4 mb-4 flex justify-center items-center hover:bg-gray-600 transition-all'>

            {/* গানের মূল তথ্য: ইমেজ, নাম এবং শিল্পীর নাম */}
            <div
                className='flex justify-start items-center gap-[20px] w-[80%] h-[100%] cursor-pointer'
                onClick={() => {
                    setIndex(songIndex) // কোন গান চালানো হবে সেটার ইনডেক্স সেট করা হচ্ছে
                    playSong()          // গান চালু করা হচ্ছে
                }}
            >
                {/* গানের কভার ইমেজ */}
                <div>
                    <img
                        src={image}
                        className='w-[60px] max-h-[60px] md:max-h-[100px] md:w-[93px] rounded-lg pt-0 pb-0'
                        alt='song cover'
                    />
                </div>

                {/* গানের নাম এবং শিল্পীর নাম দেখানো */}
                <div className='text-[16px] md:text-[20px]'>
                    <div className='text-white text-[1em] font-semibold'>{name}</div>
                    <div className='text-gray-400 text-[0.7em] font-semibold text-center'>{singer}</div>
                </div>
            </div>

            {/* ডান পাশে গান অ্যাড, রিমুভ এবং লাইক/আনলাইক করার অপশন */}
            <div className='flex justify-start items-center gap-[20px] w-[20%] h-[100%] text-[16px] md:text-[20px]'>

                {/* গান যদি প্লেলিস্টে না থাকে, তাহলে প্লেলিস্টে যোগ করার অপশন দেখাও */}
                {!songExistInPlaylist && (
                    <div onClick={() => {
                        dispatch(AddSong({ name, image, singer, songIndex }))
                    }}>
                        <MdPlaylistAdd className='text-white text-[1.5em] cursor-pointer' />
                    </div>
                )}

                {/* গান যদি প্লেলিস্টে আগে থেকেই থাকে, তাহলে সরানোর অপশন দেখাও */}
                {songExistInPlaylist && (
                    <div onClick={() => {
                        dispatch(RemoveSong(songIndex))
                    }}>
                        <MdOutlinePlaylistRemove className='text-white text-[1.5em] cursor-pointer' />
                    </div>
                )}

                {/* গান যদি এখনো লাইক না করা থাকে, তাহলে লাইক করার অপশন দেখাও */}
                {!songExistInLiked && (
                    <div onClick={() => {
                        dispatch(AddLiked({ name, image, singer, songIndex }))
                    }}>
                        <GoHeart className='text-white text-[1.3em] cursor-pointer' />
                    </div>
                )}

                {/* গান যদি আগে থেকে লাইক করা থাকে, তাহলে আনলাইক করার অপশন দেখাও */}
                {songExistInLiked && (
                    <div onClick={() => {
                        dispatch(RemoveLiked(songIndex))
                    }}>
                        <GoHeartFill className='text-white text-[1.3em] cursor-pointer' />
                    </div>
                )}

            </div>
        </div>
    )
}

export default Card
