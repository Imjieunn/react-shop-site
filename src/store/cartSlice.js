import { createSlice } from "@reduxjs/toolkit"

let cart = createSlice({
    name: 'cart',
    initialState: [
        { id: 0, name: 'White and Black', count: 2 },
        { id: 2, name: 'Grey Yordan', count: 1 }
    ],
    reducers: {
        increaseCount(state, i) {
            state[i.payload].count += 1
        },
        addCart(state, item) {
            // 기존 state에 새로운 array(item) 추가
            state.push(item.payload)
        },
        deleteCart(state, idx) {
            state.splice(idx.payload, 1)
        }
    }
})
export let { increaseCount, addCart, deleteCart } = cart.actions

export default cart