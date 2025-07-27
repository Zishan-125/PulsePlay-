import React, { useContext } from 'react'
import { songsData } from '../songs'
import { MdPlaylistAdd } from "react-icons/md";
import { GoHeart } from "react-icons/go";
import { datacontext } from '../context/UserContext';
import { useDispatch, useSelector } from 'react-redux';
import { AddSong } from '../redux/PlaylistSlice';
import { MdOutlinePlaylistRemove } from "react-icons/md";
import { RemoveSong } from '../redux/PlaylistSlice';
import { AddLiked, RemoveLiked } from '../redux/LikedSlice';
import { GoHeartFill } from "react-icons/go";

function Card({name,image,singer,songIndex}) {
    let {playSong,index,setIndex} = useContext(datacontext)
    let dispatch = useDispatch()
    let naat = useSelector(state=>state.playlist)
    const songExistInPlaylist = naat.some((song)=>song.songIndex===songIndex)
    let likedSong = useSelector(state=>state.liked)
    const songExistInLiked = likedSong.some((song)=>song.songIndex===songIndex)
  return (
    <div className='w-[90%] h-[70px] md:h-[120px] bg-gray-800 rounded-lg pt-4 mb-4 flex justify-center items-center hover:bg-gray-600 transition-all'>
        <div className=' flex justify-start items-center gap-[20px] w-[80%] h-[100%] cursor-pointer
        ' onClick={()=>{
            setIndex(songIndex)
            playSong()
        }}>
            <div>
                <img src={image}  className='w-[60px] max-h-[60px]   md:max-h-[100px] md:w-[93px]
                rounded-lg pt-0 pb-0'/>
            </div>
            <div className='text-[16px] md:text-[20px]'>
            <div className='text-white text-[1em] font-semibold '>{name}</div>    
            <div className='text-gray-400 text-[0.7em] font-semibold text-center'>{singer}</div>
            </div>

        </div>

        <div className=' flex justify-start items-center gap-[20px] w-[20%] h-[100%] text-[16px] md:text-[20px]'>

{!songExistInPlaylist && (<div onClick={()=>{
    dispatch(AddSong({name:name , image : image, singer : singer, songIndex:songIndex}))
}}>
    <MdPlaylistAdd className='text-white text-[1.5em] cursor-pointer'/>
</div>)}

{songExistInPlaylist && (<div onClick={()=>{
    dispatch(RemoveSong(songIndex))
}}>
    <MdOutlinePlaylistRemove  className='text-white text-[1.5em] cursor-pointer'/>
</div>)}
{!songExistInLiked && (<div onClick={()=>{
    dispatch(AddLiked({name:name , image : image, singer : singer, songIndex:songIndex}))
}}>
    <GoHeart className='text-white text-[1.3em] cursor-pointer'/>
</div>)}

{songExistInLiked && (<div onClick={()=>{
    dispatch(RemoveLiked(songIndex))
}}>
    <GoHeartFill  className='text-white text-[1.3em] cursor-pointer'/>
</div>)}

        </div>
      
    </div>
  )
}

export default Card
