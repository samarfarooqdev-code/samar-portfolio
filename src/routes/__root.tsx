import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import criticalHeroCss from "../styles/critical-hero.css?inline";
import faviconAsset from "@/assets/samar-dev-favicon.png?inline";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: unknown; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Samar Dev — Creative Developer" },
      {
        name: "description",
        content:
          "Samar Dev builds responsive websites, interactive interfaces, and expressive digital experiences for brands and businesses.",
      },
      { name: "author", content: "Samar Dev" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Samar Dev — Creative Developer" },
      {
        name: "twitter:description",
        content:
          "Design-led websites, interactive interfaces and expressive digital experiences by Samar Dev.",
      },
      { name: "twitter:image", content: "https://samar-dev.vercel.app/og-image.png" },
    ],
    links: [
      { rel: "preload", as: "style", href: appCss },
      { rel: "stylesheet", href: appCss, media: "print" },
      {
        rel: "preload",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
        href: "https://fonts.gstatic.com/s/dmserifdisplay/v17/-nFnOHM81r4j6k0gjAW3mujVU2B2G_Bx0vrx52g.woff2",
      },
      {
        rel: "preload",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
        href: "https://fonts.gstatic.com/s/manrope/v20/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk7PFN_C-bnTe87A.woff2",
      },
      { rel: "icon", href: faviconAsset, type: "image/png" },
      { rel: "shortcut icon", href: faviconAsset, type: "image/png" },
      { rel: "apple-touch-icon", href: faviconAsset },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `@font-face{font-family:Manrope;font-style:normal;font-weight:500;font-display:swap;src:url(https://fonts.gstatic.com/s/manrope/v20/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk7PFN_C-bnTe87A.woff2) format("woff2")}@font-face{font-family:"DM Serif Display";font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/dmserifdisplay/v17/-nFnOHM81r4j6k0gjAW3mujVU2B2G_Bx0vrx52g.woff2) format("woff2")}html,body{margin:0}body{background:#f5f3ee;color:#30302f;font-family:Manrope,system-ui,sans-serif}.hero{isolation:isolate;min-height:760px}.hero-grid{display:grid;align-items:end}.hero-title{font-family:"DM Serif Display",Georgia,serif;font-weight:400;line-height:.86}.avatar-frame{position:relative;aspect-ratio:1}.avatar-frame picture,.avatar-image{display:block;width:100%;height:100%}.avatar-image{object-fit:contain;object-position:center bottom}`,
          }}
        />
        <HeadContent />
        <style dangerouslySetInnerHTML={{ __html: criticalHeroCss }} />
        <link
          rel="preload"
          as="font"
          href="/fonts/anton-portfolio-subset.woff2"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="image"
          href="/samar-hero-320.avif"
          media="(max-width: 767px)"
          type="image/avif"
          imageSrcSet="/samar-hero-320.avif 320w, /samar-hero-480.avif 480w"
          imageSizes="(max-width: 374px) 72vw, 70vw"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="/samar-hero-640.avif"
          media="(min-width: 768px)"
          type="image/avif"
          imageSrcSet="/samar-hero-320.avif 320w, /samar-hero-480.avif 480w, /samar-hero-640.avif 640w, /samar-hero-720.avif 720w, /samar-hero-940.avif 940w"
          imageSizes="(max-width: 1023px) 52vw, (max-width: 1199px) 40svh, min(29vw, 480px)"
          fetchPriority="high"
        />
        <noscript>
          <link rel="stylesheet" href={appCss} />
        </noscript>
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => {
              const href = ${JSON.stringify(appCss)};
              const link = [...document.querySelectorAll('link[rel="stylesheet"][media="print"]')]
                .find((candidate) => candidate.href === new URL(href, document.baseURI).href);
              if (!link) return;
              const apply = () => { link.media = "all"; };
              const loaded = performance.getEntriesByName(link.href).some((entry) => entry.responseEnd > 0);
              if (loaded) apply();
              else {
                link.addEventListener("load", apply, { once: true });
                link.addEventListener("error", apply, { once: true });
              }
            })();`,
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
