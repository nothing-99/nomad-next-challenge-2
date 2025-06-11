import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/session";

const publicOnlyURLs = new Map<string, boolean>([
  ["/", true],
  ["/login", true],
  ["/sms", true],
  ["/create-account", true],
]);

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const isPublicURL = publicOnlyURLs.get(request.nextUrl.pathname);

  if (!session.id && !isPublicURL) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (session.id && isPublicURL) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }
}
export const config: MiddlewareConfig = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
