import { createSlice } from "@reduxjs/toolkit";


const themeSlice= createSlice({
    name:'theme',
    initialState:{isPremium:false},
    reducers:{
        toggle(state){
            state.isPremium=!state.isPremium
        }
    }
})

export const themeActions = themeSlice.actions
export default themeSlice.reducer