import { configureStore, createSlice } from '@reduxjs/toolkit'

// useState() 역할
// state 하나를 slice라고 부른다
let 상품명 = createSlice({
    name: 'title',
    initialState: ['White and Black', 'Grey Yordan']
})

let 담은갯수 = createSlice({
    name: 'count',
    initialState: [2, 1]
})

let id = createSlice({
    name: 'id',
    initialState: [0, 1]
})

let cart = createSlice({
    name: 'cart',
    initialState: [
        { id: 0, name: 'White and Black', count: 2 },
        { id: 2, name: 'Grey Yordan', count: 1 }
    ]
})


export default configureStore({
    reducer: {
        // createSlice 한 것은 여기에 등록해야 사용가능
        // 이름(작명) : user.reducer
        // id: id.reducer,
        // 상품명: 상품명.reducer,
        // 담은갯수: 담은갯수.reducer,
        cart: cart.reducer
    }
})