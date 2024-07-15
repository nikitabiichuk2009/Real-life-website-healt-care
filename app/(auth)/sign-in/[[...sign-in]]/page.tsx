"use client";
import { SignIn } from "@clerk/nextjs";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignInPage = () => {
  const router = useRouter();

  return (
    <main className="flex-center flex min-h-screen w-full flex-col gap-6 bg-auth-light bg-cover bg-center bg-no-repeat dark:bg-auth-dark">
      <Button
        onClick={() => router.push("../")}
        className="mb-2 me-2 rounded-lg bg-green-500 px-5 py-2.5 text-lg
        font-semibold text-white hover:bg-green-400"
      >
        Back
      </Button>
      <SignIn
        forceRedirectUrl={process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL}
      />
      <div className="flex flex-col items-center">
        <div className="text-[16px] leading-[18px] font-semibold mt-20 flex justify-between">
          <p className="flex ga-1 text-dark-600 items-center justify-center">
            © {new Date().getFullYear()} CarePulse by{" "}
            <Link
              href={"https://nikita-biichuks-portfolio.vercel.app/"}
              className="ease-in-out duration-300 text-sm transition-colors text-green-400 hover:text-green-500"
            >
              Nikita Biichuk
            </Link>
          </p>
        </div>
        <Link
          href="/privacy-policy"
          className="mt-12 ease-in-out duration-300 text-[20px] text-center transition-colors text-green-400 hover:text-green-500"
        >
          Privacy and policy
        </Link>
      </div>
    </main>
  );
};

export default SignInPage;
