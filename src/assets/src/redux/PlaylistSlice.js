import { createSlice } from "@reduxjs/toolkit"

// Playlist এর গানগুলো ম্যানেজ করার জন্য slice তৈরি করছি
const PlaylistSlice = createSlice({

    // Slice এর নাম
    name: "playlist",

    // শুরুতে প্লেলিস্ট ফাঁকা থাকবে
    initialState: [],

    // এখানে স্টেট আপডেট করার জন্য রিডিউসারগুলো থাকছে
    reducers: {
        
        // প্লেলিস্টে নতুন গান যোগ করার জন্য ফাংশন
        AddSong: (state, action) => {
            // চেক করছি গানটি আগে থেকেই আছে কিনা প্লেলিস্টে
            let exist = state.find((song) => song.songIndex == action.payload.songIndex)

            if (exist) {
                // যদি গানটি আগে থেকেই থাকে, তাহলে কিছু করার দরকার নেই
                return
            } else {
                // না থাকলে প্লেলিস্টে গানটি যোগ করে দিচ্ছি
                state.push(action.payload)
            }
        },

        // প্লেলিস্ট থেকে গান সরানোর জন্য ফাংশন
        RemoveSong: (state, action) => {
            // এমন গানের লিস্ট রিটার্ন করবো যেগুলোর songIndex আমাদের দেওয়া songIndex এর থেকে আলাদা
            return state.filter((song) => song.songIndex !== action.payload)
        }
    }
})

// এখানে অ্যাকশনগুলো এক্সপোর্ট করছি যাতে কম্পোনেন্ট থেকে ব্যবহার করতে পারি
export const { AddSong, RemoveSong } = PlaylistSlice.actions

// এবং reducer এক্সপোর্ট করছি যাতে store এ যুক্ত করা যায়
export default PlaylistSlice.reducer
