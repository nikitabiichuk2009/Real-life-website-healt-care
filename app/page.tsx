"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Home() {
  const { userId } = useAuth();
  const router = useRouter();
  const [passkey, SetPasskey] = useState("");
  const [error, setError] = useState("");
  const validatePasskey = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      router.push("/admin-manage-appointments-here");
    } else {
      setError("Invalid passkey. Please try again.");
    }
  };
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Link href="/">
            <Image
              src={"/assets/icons/logo-full.svg"}
              height={1000}
              width={1000}
              className="mb-12 h-10 w-fit"
              alt="logo"
            />
          </Link>

          <section className="mb-20 md:mb-12 space-y-4">
            <h1 className="text-3xl font-semibold">Hi there 👋</h1>
            <p className="text-dark-700 flex flex-col gap-2 lg:flex-row md:gap-1 whitespace-nowrap">
              Get Started with appointments
              {userId && (
                <p className="text-dark-700 whitespace-nowrap">
                  or{" "}
                  <Link
                    href="/my-appointments"
                    className="ease-in-out duration-300 transition-colors text-green-400 hover:text-green-500"
                  >
                    view your appoinments
                  </Link>
                </p>
              )}
            </p>
          </section>
          {userId ? (
            <Link href={`/patients/${userId}/new-appointment`}>
              <Button className="shad-primary-btn w-full">Get Started</Button>
            </Link>
          ) : (
            <Link href="/sign-in">
              <Button className="shad-primary-btn w-full">Sign In</Button>
            </Link>
          )}
          <div className="font-semibold mt-20 flex justify-between items-center">
            <p className="flex gap-1 text-dark-600 text-[14px] lg:text-[16px] lg:leading-[18px] items-center justify-center">
              © {new Date().getFullYear()} CarePulse by{" "}
              <Link
                href={"https://nikita-biichuks-portfolio.vercel.app/"}
                className="ease-in-out duration-300 text-[14px] lg:text-[16px] lg:leading-[18px] transition-colors text-green-400 hover:text-green-500"
              >
                Nikita Biichuk
              </Link>
            </p>
            {userId === process.env.NEXT_PUBLIC_ADMIN_ID && (
              <AlertDialog>
                <AlertDialogTrigger>
                  <Button className="ease-in-out duration-300 transition-colors text-green-400 hover:text-green-500">
                    Admin
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className=" shad-alert-dialog">
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Admin Access Verification
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-dark-700">
                      To access the admin page, please enter the passkey.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <div>
                    <InputOTP
                      maxLength={8}
                      value={passkey}
                      onChange={(value) => SetPasskey(value)}
                    >
                      <InputOTPGroup className="shad-otp">
                        <InputOTPSlot index={0} className="shad-otp-slot" />
                        <InputOTPSlot index={1} className="shad-otp-slot" />
                        <InputOTPSlot index={2} className="shad-otp-slot" />
                        <InputOTPSlot index={3} className="shad-otp-slot" />
                        <InputOTPSlot index={4} className="shad-otp-slot" />
                        <InputOTPSlot index={5} className="shad-otp-slot" />
                        <InputOTPSlot index={6} className="shad-otp-slot" />
                        <InputOTPSlot index={7} className="shad-otp-slot" />
                      </InputOTPGroup>
                    </InputOTP>
                    {error && (
                      <p className="mt-4 flex justify-center text-14-regular text-red-400">
                        {error}
                      </p>
                    )}
                  </div>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="shad-danger-btn border-none">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={(e) => validatePasskey(e)}
                      className="shad-primary-btn"
                    >
                      Enter admin panel
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
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
        className="side-img max-w-[40%] lg:max-w-[50%]"
      />
    </div>
  );
}
