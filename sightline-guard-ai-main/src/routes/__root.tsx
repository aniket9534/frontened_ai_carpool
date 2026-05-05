import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-gradient">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Signal lost</h2>
        <p className="mt-2 text-sm text-muted-foreground">The page you're looking for is off-grid.</p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[var(--electric)] to-[var(--neon)] text-background px-5 py-2 text-sm font-medium">
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Sentinel.AI" },
      { name: "description", content: "AI-powered mobility compliance infrastructure" },
      { name: "theme-color", content: "#0b1220" },
      { property: "og:title", content: "Sentinel.AI" },
      { name: "twitter:title", content: "Sentinel.AI" },
      { property: "og:description", content: "AI-powered mobility compliance infrastructure" },
      { name: "twitter:description", content: "AI-powered mobility compliance infrastructure" },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/52aa8eef-5905-4cd9-ba59-501533406f73/id-preview-11f474be--6f6adf74-4c17-4770-b54d-b6c600172942.lovable.app-1777956962587.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/52aa8eef-5905-4cd9-ba59-501533406f73/id-preview-11f474be--6f6adf74-4c17-4770-b54d-b6c600172942.lovable.app-1777956962587.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  shellComponent: RootShell,
  component: () => <Outlet />,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
