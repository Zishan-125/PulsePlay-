import React, { useContext, useEffect, useRef, useState } from 'react';
import { songsData } from '../songs';
import musicImg from "../assets/musicanim.webp";
import { CgPlayTrackPrev, CgPlayTrackNext } from "react-icons/cg";
import { IoPlay } from "react-icons/io5";
import { MdOutlinePause, MdKeyboardArrowDown } from "react-icons/md";
import { datacontext } from '../context/UserContext';
import Card from '../components/Card';
import Player from '../components/Player';

function Home() {
  const {
    audioRef,
    playingSong,
    playSong,
    pauseSong,
    nextSong,
    index,
    prevSong
  } = useContext(datacontext);

  const [range, setRange] = useState(0);
  const progress = useRef(null);
  const [arrow, setArrow] = useState(false);

  useEffect(() => {
    const updateProgress = () => {
      const duration = audioRef.current?.duration || 0;
      const currentTime = audioRef.current?.currentTime || 0;
      const progressPercentage = (currentTime / duration) * 100 || 0;
      setRange(progressPercentage);
      if (progress.current) {
        progress.current.style.width = `${progressPercentage}%`;
      }
    };

    const audio = audioRef.current;
    if (!audio) return;

    audio.addEventListener("timeupdate", updateProgress);
    return () => audio.removeEventListener("timeupdate", updateProgress);
  }, [audioRef]);

  const handleRange = (e) => {
    const newRange = e.target.value;
    setRange(newRange);
    const duration = audioRef.current?.duration || 0;
    audioRef.current.currentTime = (duration * newRange) / 100;
  };

  return (
    <div className='w-full h-screen bg-black flex flex-col relative overflow-hidden
  ${arrow?"rotate-[-90deg]":null}'>

      {/* Toggle Button (mobile only) */}
      <MdKeyboardArrowDown
        className={`absolute text-white top-6 left-[10%] text-3xl md:hidden z-20 cursor-pointer`}
        onClick={() => setArrow(prev => !prev)}
      />

      {!arrow ? (
        <div className='flex flex-col md:flex-row w-full h-full'>

          {/* Now Playing */}
          <div className='w-full md:w-1/2 h-full flex flex-col justify-start items-center gap-6 pt-20 md:pt-32 px-4'>
            <h1 className='text-white font-semibold text-xl'>Now Playing</h1>

            {/* Album Art */}
            <div className='w-4/5 max-w-[250px] h-[250px] rounded-md overflow-hidden relative shadow-lg'>
              <img
                src={songsData[index].image}
                className='w-full h-full object-cover'
                alt={songsData[index].name}
              />
              {playingSong && (
                <div className='w-full h-full bg-black bg-opacity-50 absolute top-0 flex justify-center items-center'>
                  <img src={musicImg} className='w-1/2' alt="Music animation" />
                </div>
              )}
            </div>

            {/* Song Info */}
            <div className='text-center'>
              <div className='text-white text-2xl font-bold'>{songsData[index].name}</div>
              <div className='text-gray-400 text-lg'>{songsData[index].singer}</div>
            </div>

            {/* Progress Bar */}
            <div className='w-3/5 flex justify-center items-center relative rounded-md'>
              <input
                type='range'
                className='appearance-none w-full h-[7px] rounded-md bg-gray-600 relative z-10'
                value={range}
                onChange={handleRange}
              />
              <div
                className='bg-white h-[7px] absolute left-0 top-0 rounded-md pointer-events-none'
                ref={progress}
              />
            </div>

            {/* Controls */}
            <div className='text-white flex justify-center items-center gap-5'>
              <CgPlayTrackPrev
                className='w-7 h-7 hover:text-gray-400 transition cursor-pointer'
                onClick={prevSong}
              />
              {!playingSong ? (
                <button
                  className='w-12 h-12 rounded-full bg-white text-black flex justify-center items-center hover:bg-gray-400 transition'
                  onClick={playSong}
                >
                  <IoPlay className='w-5 h-5' />
                </button>
              ) : (
                <button
                  className='w-12 h-12 rounded-full bg-white text-black flex justify-center items-center hover:bg-gray-400 transition'
                  onClick={pauseSong}
                >
                  <MdOutlinePause className='w-5 h-5' />
                </button>
              )}
              <CgPlayTrackNext
                className='w-7 h-7 hover:text-gray-400 transition cursor-pointer'
                onClick={nextSong}
              />
            </div>
          </div>

          {/* Song List (hidden on small devices) */}
          <div className='hidden md:flex w-full md:w-1/2 h-full flex-col gap-8 overflow-auto pb-34 pt-16 px-6 items-center'>
            {songsData.map(song => (
              <Card
                key={song.id}
                name={song.name}
                image={song.image}
                singer={song.singer}
                songIndex={song.id - 1}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className='w-full h-full flex flex-col md:flex-row overflow-auto pb-24 md:pb-7 items-center md:items-start gap-5 pt-16 px-4'>

  <div className='w-full md:pb-[50px]  md:pb-6   flex flex-col gap-4'>
    {songsData.map(song => (
      <Card
        key={song.id}
        name={song.name}
        image={song.image}
        singer={song.singer}
        songIndex={song.id - 1}
      />
    ))}
  </div>

  <div className='w-full pt-10   flex justify-center  mt-4 md:mt-0'>
    <Player />
  </div>

</div>

      )}
    </div>
  );
}

export default Home;
