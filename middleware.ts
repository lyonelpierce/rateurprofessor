import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/api/search/:path*",
    "/api/profile/:path*",
    "/universidad/:path",
    "/universidad/:path/profesores",
    "/profesor/:path",
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
