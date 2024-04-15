import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  debug: false,
  publicRoutes: ["/", "/new-ad"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
