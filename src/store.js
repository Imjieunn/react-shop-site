import { configureStore, createSlice } from '@reduxjs/toolkit'

// useState() 역할
// state 하나를 slice라고 부른다
let user = createSlice({
    name: 'user',
    initialState: 'jieun',
    reducers: {
        // changeName() {
        //     return 'Im jieun'
        // }

        // 기존 state를 이용하고 싶다면,
        changeName(state) {
            return 'Im ' + state
        }
        // 함수 여러개 설정하고 싶으면 , 로 추가하기
        // ,
        // 함수2() {

        // }
    }
})

export let { changeName } = user.actions


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
        user: user.reducer,
        cart: cart.reducer
    }
})