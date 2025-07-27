import { createSlice } from "@reduxjs/toolkit"

// এখানে createSlice দিয়ে আমাদের Liked গানগুলো ম্যানেজ করার জন্য Slice তৈরি করা হচ্ছে
const LikedSlice = createSlice({

    // এই Slice-এর নাম
    name: "playlist",

    // প্রাথমিক (initial) স্টেট — শুরুতে কোনো গান নেই
    initialState: [],

    // এখানে reducers লিখেছি — কীভাবে স্টেট আপডেট হবে
    reducers: {
        
        // গান পছন্দের লিস্টে যোগ করার জন্য ফাংশন
        AddLiked: (state, action) => {

            // প্রথমে চেক করছি গানটি এরই মধ্যে লিস্টে আছে কিনা
            let exist = state.find((song) => song.songIndex == action.payload.songIndex)

            if (exist) {
                // যদি গানটি থাকে, তাহলে আর কিছু না করে ফিরে যাচ্ছি
                return
            } else {
                // যদি গানটি না থাকে, তাহলে লিস্টে নতুন গানটি যোগ করছি
                state.push(action.payload)
            }
        },

        // পছন্দের লিস্ট থেকে গান মুছে ফেলার জন্য ফাংশন
        RemoveLiked: (state, action) => {
            // songIndex মিলে গেলে সেই গানটি বাদ দিয়ে নতুন লিস্ট রিটার্ন করছি
            return state.filter((song) => (song.songIndex !== action.payload))
        }
    }
})

// এখান থেকে action গুলো এক্সপোর্ট করা হচ্ছে
export const { AddLiked, RemoveLiked } = LikedSlice.actions

// reducer এক্সপোর্ট করা হচ্ছে যেন store-এ ব্যবহার করা যায়
export default LikedSlice.reducer
