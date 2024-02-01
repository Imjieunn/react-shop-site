import { createSlice } from "@reduxjs/toolkit"

// useState() 역할
// state 하나를 slice라고 부른다
let user = createSlice({
    name: 'user',
    initialState: { name: 'jieun', age: 23 },
    reducers: {
        // changeName() {
        //     return 'Im jieun'
        // }

        // 기존 state를 이용하고 싶다면,
        changeName(state) {
            state.name = 'zzin'
        },
        increaseAge(state, action) {
            state.age += action.payload
        }
        // 함수 여러개 설정하고 싶으면 , 로 추가하기
        // ,
        // 함수2() {

        // }
    }
})
export let { changeName, increaseAge } = user.actions

export default user