import { SEO } from "@/components/SEO";

const NotFound = () => {
  return (
    <>
      {/*
        noindex matters here: the prerenderer emits this page as dist/404.html,
        and Vercel serves it for any unmatched path. Without it, every mistyped
        URL becomes an indexable near-duplicate.
      */}
      <SEO
        title="Page Not Found"
        description="That page doesn't exist. Head back to the Saltarelli Web Studio homepage."
        noindex
      />
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">404</h1>
          <p className="mb-4 text-xl text-gray-600">Oops! Page not found</p>
          <a href="/" className="text-blue-500 underline hover:text-blue-700">
            Return to Home
          </a>
        </div>
      </div>
    </>
  );
};

export default NotFound;
