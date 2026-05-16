import { Link } from "@/i18n/navigation";

export default function NotFound() {
  return (
    <section className="px-7 py-16 md:px-10 md:py-20">
      <p className="mono cap text-xs font-medium text-brand">404</p>
      <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.035em] md:text-5xl">
        Page not found.
      </h1>
      <p className="mt-5 text-g500">
        <Link href="/" className="underline underline-offset-4 hover:text-ink">
          Return to home
        </Link>
      </p>
    </section>
  );
}
