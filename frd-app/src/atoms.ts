import { atom } from "recoil"

type LoginState = {
    isLogin: boolean | null
}

export const loginState = atom<LoginState>({
    key: "loginState",
    default: {
        isLogin: null
    }
})