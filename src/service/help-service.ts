interface HelpQueryPayload {
  email: string;
  subject: string;
  query: string;
}

export async function helpQuery(data: HelpQueryPayload) {
  const response = await fetch('https://app-cts-dev-api.azurewebsites.net/api/Help/submit', {
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