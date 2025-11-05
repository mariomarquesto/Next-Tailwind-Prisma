// middleware.js
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // No hace falta código adicional aquí.
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // true si hay sesión
    },
  }
);

// Rutas que requieren autenticación
export const config = {
  matcher: [
    "/dashboard/:path*", // ejemplo
    "/admin/:path*",     // ejemplo
  ],
};
