import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[rgb(2, 24, 40)] text-slate-300 py-6 px-10 items-center flex flex-col justify-center" style={{
        background:
          "rgba(2, 24, 40, 1)",
      }}>

        <div className="bg-[rgb(2, 24, 40)] container mx-auto px-4 text-center text-sm flex-col items-center flex gap-1">
            <div className="">
                <img src="/logo-white.svg" alt="" className="max-w-[225px]"/>
            </div>
            <p className="text-white">© {new Date().getFullYear()} UEBSchool. Всі права захищені.</p>
        </div>
    </footer>
  );
}