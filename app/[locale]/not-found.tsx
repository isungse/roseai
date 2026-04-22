import { Link } from "@/i18n/navigation";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-screen-xl px-6 py-24 md:px-8 md:py-32">
      <p className="mono cap text-xs font-medium text-brand">404</p>
      <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.035em] md:text-6xl">
        Page not found.
      </h1>
      <p className="mt-6 text-g500">
        <Link href="/" className="underline underline-offset-4 hover:text-ink">
          Return to home
        </Link>
      </p>
    </section>
  );
}
