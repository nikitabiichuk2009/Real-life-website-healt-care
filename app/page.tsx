import { PatientForm } from "@/components/forms/PatientForm";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
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
          <PatientForm />
          <div className="text-[16px] leading-[18px] font-semibold mt-20 flex justify-between">
            <p className="flex gap-1 text-dark-600">
              © {new Date().getFullYear()} CarePulse by{" "}
              <Link
                href={"nikita-biichuks-portfolio.vercel.app"}
                className="ease-in-out duration-300 transition-colors text-green-400 hover:text-green-500"
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
