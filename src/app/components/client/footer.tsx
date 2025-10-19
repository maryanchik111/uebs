import Link from "next/link";

export default function Footer() {
  return (
    <footer className="text-slate-300 py-6 mt-10 px-10 items-center flex flex-col justify-center">

        <div className="container mx-auto px-4 text-center text-sm flex-col items-center flex gap-1">
            <div className="">
                <img src="/logo-white.svg" alt="" className="max-w-[225px]"/>
            </div>
            <p className="text-white">© {new Date().getFullYear()} UEBSchool. Всі права захищені.</p>
            <p><Link href="/privacy" className="text-amber-500">Політика конфіденційності</Link> | <Link href="/terms" className="text-amber-500">Умови використання</Link></p>
        </div>
    </footer>
  );
}