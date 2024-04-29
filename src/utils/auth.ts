import { login } from '@/service/auth-service';
import { cookies } from 'next/headers'

export async function loginAndSaveToken(credentials:any){
    const res = await login(credentials);
    // add token to cookies
    cookies().set('accessToken', res.data.token.accessToken, { secure: true });
    cookies().set('refreshToken', res.data.token.refreshToken, { secure: true });
    
    // remove token from cookies
    return res;
}

export  function getAccessToken(){

    const cookieStore = cookies()
    const cookie = cookieStore.get('accessToken')  
    return cookie;
}

export  function getRfreshToken(){

    const cookieStore = cookies()
    const cookie = cookieStore.get('refreshToken')  
    return cookie;
}