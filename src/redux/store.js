import {configureStore} from "@reduxjs/toolkit"
import PlaylistSlice from  "./PlaylistSlice"
import likedSlice from  "./LikedSlice"

// আমাদের অ্যাপ্লিকেশনের জন্য Redux স্টোর কনফিগার করা হচ্ছে
// এখানে দুইটি slice ব্যবহার করা হয়েছে: playlist এবং liked

export const store = configureStore({
  reducer:{
      playlist : PlaylistSlice, // গান সংরক্ষণের জন্য playlist slice
      liked : likedSlice        // পছন্দের গানগুলোর জন্য liked slice
  } 
})
