import Link from "next/link";

export default function footer() {
  return (
    <footer className="bg-gray-50">
      <div className="container mx-auto justify-center py-12">
        <div className="py-5">
          <div className="flex justify-center gap-6">
            <Link href={"/"}>Instagram</Link>
            <Link href={"/"}>Mastodon</Link>
          </div>
        </div>
        <p className="py-5 text-center text-gray-400">
          Copyright ©2025 All rights reserved
        </p>
        <p className=" text-center text-gray-400">
          Contact | Privacy | Legal notice
        </p>
      </div>
    </footer>
  );
}
