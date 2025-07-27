import React, { useContext, useEffect, useRef, useState } from 'react';
import { songsData } from '../songs';
import musicImg from "../assets/musicanim.webp";
import { CgPlayTrackPrev, CgPlayTrackNext } from "react-icons/cg"; // গান আগের/পরের বোতাম
import { IoPlay } from "react-icons/io5"; // প্লে আইকন
import { MdOutlinePause, MdKeyboardArrowDown } from "react-icons/md"; // পজ আইকন ও অ্যারো
import { datacontext } from '../context/UserContext'; // গান প্লে সংক্রান্ত কনটেক্সট
import Card from '../components/Card';
import Player from '../components/Player';

function Home() {
  // কনটেক্সট থেকে প্রয়োজনীয় ফাংশন ও ডেটা নিচ্ছি
  const {
    audioRef,
    playingSong,
    playSong,
    pauseSong,
    nextSong,
    index,
    prevSong
  } = useContext(datacontext);

  // প্রগ্রেস বার এবং UI এর জন্য লোকাল স্টেট
  const [range, setRange] = useState(0); // প্রগ্রেস রেঞ্জ
  const progress = useRef(null); // প্রগ্রেস বার রেফারেন্স
  const [arrow, setArrow] = useState(false); // মোবাইলে লিস্ট দেখাবে কি না

  // অডিও প্রগ্রেস আপডেট করার জন্য ইফেক্ট
  useEffect(() => {
    const updateProgress = () => {
      const duration = audioRef.current?.duration || 0;
      const currentTime = audioRef.current?.currentTime || 0;
      const progressPercentage = (currentTime / duration) * 100 || 0;
      setRange(progressPercentage);

      // প্রগ্রেস বার স্টাইল আপডেট
      if (progress.current) {
        progress.current.style.width = `${progressPercentage}%`;
      }
    };

    const audio = audioRef.current;
    if (!audio) return;

    // প্রতিবার অডিও টাইম চেঞ্জ হলে আপডেট করা
    audio.addEventListener("timeupdate", updateProgress);
    return () => audio.removeEventListener("timeupdate", updateProgress);
  }, [audioRef]);

  // ইউজার প্রগ্রেস বার টেনে গান স্কিপ করলে সেটার হ্যান্ডলার
  const handleRange = (e) => {
    const newRange = e.target.value;
    setRange(newRange);
    const duration = audioRef.current?.duration || 0;
    audioRef.current.currentTime = (duration * newRange) / 100;
  };

  return (
    <div className={`w-full h-screen bg-black flex flex-col relative overflow-hidden ${arrow ? "rotate-[-90deg]" : ""}`}>

      {/* মোবাইল ভার্সনে উপরে অ্যারো বাটন */}
      <MdKeyboardArrowDown
        className={`absolute text-white top-6 left-[10%] text-3xl md:hidden z-20 cursor-pointer`}
        onClick={() => setArrow(prev => !prev)}
      />

      {/* লার্জ স্ক্রিনে ও মোবাইলে দুই অবস্থার জন্য ভিন্ন UI */}
      {!arrow ? (
        <div className='flex flex-col md:flex-row w-full h-full'>

          {/* এখন যেটা বাজছে সেটা দেখাবে */}
          <div className='w-full md:w-1/2 h-full flex flex-col justify-start items-center gap-6 pt-20 md:pt-32 px-4'>
            <h1 className='text-white font-semibold text-xl'>Now Playing</h1>

            {/* গান এর কভার ইমেজ */}
            <div className='w-4/5 max-w-[250px] h-[250px] rounded-md overflow-hidden relative shadow-lg'>
              <img
                src={songsData[index].image}
                className='w-full h-full object-cover'
                alt={songsData[index].name}
              />
              {/* গান চালু থাকলে অ্যানিমেশন দেখাবে */}
              {playingSong && (
                <div className='w-full h-full bg-black bg-opacity-50 absolute top-0 flex justify-center items-center'>
                  <img src={musicImg} className='w-1/2' alt="Music animation" />
                </div>
              )}
            </div>

            {/* গানের নাম ও শিল্পীর নাম */}
            <div className='text-center'>
              <div className='text-white text-2xl font-bold'>{songsData[index].name}</div>
              <div className='text-gray-400 text-lg'>{songsData[index].singer}</div>
            </div>

            {/* গান চলার প্রগ্রেস বার */}
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

            {/* গান কন্ট্রোল বাটন (প্লে, পজ, পরের/আগের) */}
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

          {/* গান লিস্ট (শুধু বড় স্ক্রিনে দেখা যাবে) */}
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
        // মোবাইল ডিভাইসে গান লিস্ট দেখার অংশ
        <div className='w-full h-full flex flex-col md:flex-row overflow-auto pb-24 md:pb-7 items-center md:items-start gap-5 pt-16 px-4'>
          <div className='w-full flex flex-col gap-4'>
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

          {/* মোবাইলে নিচে মিউজিক কন্ট্রোলার */}
          <div className='w-full pt-10 flex justify-center mt-4 md:mt-0'>
            <Player />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
