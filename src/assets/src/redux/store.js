import {configureStore} from "@reduxjs/toolkit"
import PlaylistSlice from  "./PlaylistSlice"
import likedSlice from  "./LikedSlice"

export const store = configureStore({
reducer:{
    playlist : PlaylistSlice,
    liked : likedSlice
} 

})