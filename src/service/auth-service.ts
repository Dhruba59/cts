
interface LoginPayload {
  username: string;
  password: string;
  role: number
}
export async function login(data: LoginPayload) {
  const response = await fetch('https://app-cts-dev-api.azurewebsites.net/api/Auth/login', {
    method: "POST", 
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "ApiKey":"test@123"
    },
    redirect: "follow", 
    referrerPolicy: "no-referrer", 
    body: JSON.stringify(data),
  });

  const responseData = await response.json();
  if (!response.ok) {
    throw new Error(responseData.detail);
  }
  return responseData;
}

interface ForgetPassPayload {
  email: string;
}
export async function forget_password(data: ForgetPassPayload) {
  const response = await fetch('https://app-cts-dev-api.azurewebsites.net/api/Auth/forgot-password', {
    method: "POST", 
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "ApiKey":"test@123"
    },
    redirect: "follow", 
    referrerPolicy: "no-referrer", 
    body: JSON.stringify(data),
  });

  const responseData = await response.json();
  if (!response.ok) {
    throw new Error(responseData.detail);
  }
  return responseData;
}
