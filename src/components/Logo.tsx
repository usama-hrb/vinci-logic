import SVGComponent from "@/public/logo";
import Link from "next/link";
import Image from "next/image";

export function Logo() {
  return (
    <Link href="/" className="text-foreground">
      <LogoImage />
    </Link>
  );
}

export function LogoImage() {
  return (
    <>
      {/* Light mode image */}
      <Image
        className="dark:hidden"
        src="/logo-light.svg"
        alt="Vinci Logic platform interface"
        width={120}
        height={0}
        priority
      />
      {/* Dark mode image */}
      <Image
        className="hidden dark:block"
        src="/logo-dark.svg"
        alt="Vinci Logic platform interface"
        width={120}
        height={0}
        priority
      />
    </>
  );
}
