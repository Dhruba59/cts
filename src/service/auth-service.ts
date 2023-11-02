
export async function login(url = "", data = {}) {
  const response = await fetch(url, {
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

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
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
  console.log(response);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.statusText}`);
  }
  return response.json();
}
