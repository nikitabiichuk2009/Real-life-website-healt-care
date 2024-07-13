import NoResults from "@/components/NoResults";
import { RegisterFrom } from "@/components/forms/Register";
import { getPatientByClerkId } from "@/lib/actions/patient.actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Register = async ({ params: { id } }: SearchParamProps) => {
  let user;
  try {
    user = await getPatientByClerkId(id);
  } catch (err) {
    console.log(err);
    return (
      <NoResults
        title="Error Loading User"
        description="There was an error loading your data. Please try again."
        buttonTitle="Go Back"
        href="/"
      />
    );
  }

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto lg:pl-12 lg:pr-64">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image
            src={"/assets/icons/logo-full.svg"}
            height={1000}
            width={1000}
            className="mb-12 h-10 w-fit"
            alt="logo"
          />
          <RegisterFrom user={user} />
          <div className="text-[16px] leading-[18px] font-semibold mt-20 flex justify-between items-center">
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
              className="ease-in-out duration-300 text-[20px] text-center transition-colors text-green-400 hover:text-green-500"
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
        src={"/assets/images/register-img.png"}
        height={1000}
        width={1000}
        alt=""
        className="fixed right-0 top-0 h-full hidden object-cover 2xl:block max-w-[390px]"
      />
    </div>
  );
};

export default Register;
