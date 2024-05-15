
export { default } from "next-auth/middleware"

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|auth|favicon.ico|manifest.json|robots.txt|images|cts-logo-192x192.png|cts-logo-106x56.png|$).*)',
  ],
};
