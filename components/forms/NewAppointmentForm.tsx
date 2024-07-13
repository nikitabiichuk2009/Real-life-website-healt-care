// "use client";

// export enum FormFieldType {
//   INPUT = "input",
//   CHECKBOX = "checkbox",
//   PHONE_INPUT = "phoneInput",
//   TEXTAREA = "textarea",
//   DATE_PICKER = "datePicker",
//   SELECT = "select",
//   SKELETON = "skeleton",
// }

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { Form } from "@/components/ui/form";
// import CustomFormField from "../CustomFormField";
// import SubmitButton from "../SubmitButton";
// import { useState } from "react";
// import formSchema from "@/lib/validation";
// import { useRouter } from "next/navigation";
// import { useToast } from "../ui/use-toast";
// import { createUser } from "@/lib/actions/patient.actions";
// import Link from "next/link";

// export function NewAppointmentForm() {
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();
//   const { toast } = useToast();

//   // 1. Define your form.
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: "",
//       email: "",
//       phone: "",
//     },
//   });

//   // 2. Define a submit handler.
//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     setIsLoading(true);
//     try {
//       const userData = {
//         name: values.name,
//         email: values.email,
//         phone: values.phone,
//       };

//       const { user, isNew } = await createUser(userData);

//       if (isNew) {
//         toast({
//           title: "Welcome!",
//           description:
//             "You have successfully registered. Welcome aboard! Redirecting...",
//           className: "bg-green-500 text-white border-none",
//         });
//         setTimeout(() => {
//           router.push(`/patients/${user?.$id}/register`);
//         }, 2500);
//       } else {
//         toast({
//           title: "Welcome back!",
//           description:
//             "You have been recognized and logged in successfully. Redirecting...",
//           className: "bg-blue-700 text-white border-none",
//         });
//         setTimeout(() => {
//           router.push(`/patients/${user?.$id}/new-appointment`);
//         }, 2500);
//       }
//     } catch (err) {
//       console.log(err);
//       setIsLoading(false);
//       toast({
//         title: "Error",
//         description:
//           "There was an error registering or recognizing the user. Please try again.",
//         className: "bg-red-500 text-white border-none",
//       });
//     }
//   }

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
//         <section className="mb-12 space-y-4">
//           <h1 className="text-3xl font-semibold">Hi there 👋</h1>
//           <p className="text-dark-700">Request a new appointment in 10 seconds or edit your details: <Link href={"/patients/"}></Link></p>
//         </section>
//         <CustomFormField
//           fieldType={FormFieldType.INPUT}
//           control={form.control}
//           name="name"
//           label="Full name"
//           placeholder="John Doe"
//           iconSrc="/assets/icons/user.svg"
//           iconAlt="user"
//         />
//         <CustomFormField
//           fieldType={FormFieldType.INPUT}
//           control={form.control}
//           name="email"
//           label="Email"
//           placeholder="johndoe@gmail.com"
//           iconSrc="/assets/icons/email.svg"
//           iconAlt="email"
//         />
//         <CustomFormField
//           fieldType={FormFieldType.PHONE_INPUT}
//           control={form.control}
//           name="phone"
//           label="Phone"
//         />
//         <SubmitButton isLoading={isLoading}>Get started</SubmitButton>
//       </form>
//     </Form>
//   );
// }
