import { nanoid } from "nanoid";

// 生成游客token
export const CreateToken = () => {
    let token = localStorage.getItem('user_token');
    if (!token) {
        token = nanoid();
        localStorage.setItem('user_token', token)
    }
    return token
}