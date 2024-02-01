import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './store/userSlice'
import cart from './store/cartSlice'

export default configureStore({
    reducer: {
        // createSlice 한 것은 여기에 등록해야 사용가능
        user: user.reducer,
        cart: cart.reducer
    }
})