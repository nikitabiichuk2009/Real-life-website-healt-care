import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const { userId } = auth();
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src={"/assets/icons/logo-full.svg"}
            height={1000}
            width={1000}
            className="mb-12 h-10 w-fit"
            alt="logo"
          />
          <section className="mb-12 space-y-4">
            <h1 className="text-3xl font-semibold">Hi there 👋</h1>
            <p className="text-dark-700">Get Started with appointments</p>
          </section>
          {userId ? (
            <Link href={`/patients/${userId}/register`}>
              <Button className="shad-primary-btn w-full">Get Started</Button>
            </Link>
          ) : (
            <Link href="/sign-in">
              <Button className="shad-primary-btn w-full">Sign In</Button>
            </Link>
          )}
          <div className="text-[16px] leading-[18px] font-semibold mt-20 flex justify-between">
            <p className="flex gap-1 text-dark-600 items-center justify-center">
              © {new Date().getFullYear()} CarePulse by{" "}
              <Link
                href={"https://nikita-biichuks-portfolio.vercel.app/"}
                className="ease-in-out duration-300 text-sm transition-colors text-green-400 hover:text-green-500"
              >
                Nikita Biichuk
              </Link>
            </p>
            <Link
              href="/?admin=true"
              className="ease-in-out duration-300 transition-colors text-green-400 hover:text-green-500"
            >
              Admin
            </Link>
          </div>
          <Link
            href="/privacy-policy"
            className="mt-12 ease-in-out duration-300 text-[20px] text-center transition-colors text-green-400 hover:text-green-500"
          >
            Privacy and policy
          </Link>
        </div>
      </section>
      <Image
        src={"/assets/images/onboarding-img.png"}
        height={1000}
        width={1000}
        alt="doctor"
        className="side-img max-w-[50%]"
      />
    </div>
  );
}
