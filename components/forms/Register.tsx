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
// import { Form, FormControl } from "@/components/ui/form";
// import CustomFormField from "../CustomFormField";
// import SubmitButton from "../SubmitButton";
// import { useState } from "react";
// import { PatientFormValidation } from "@/lib/validation";
// import { useRouter } from "next/navigation";
// import { useToast } from "../ui/use-toast";
// import { registerPatient } from "@/lib/actions/patient.actions";
// import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
// import {
//   Doctors,
//   GenderOptions,
//   IdentificationTypes,
//   PatientFormDefaultValues,
// } from "@/constants";
// import { Label } from "../ui/label";
// import { SelectItem } from "../ui/select";
// import Image from "next/image";
// import FileUploader from "../FileUploader";

// export function RegisterFrom({ user }: { user: User }) {
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();
//   const { toast } = useToast();

//   // 1. Define your form.
//   const form = useForm<z.infer<typeof PatientFormValidation>>({
//     resolver: zodResolver(PatientFormValidation),
//     defaultValues: {
//       ...PatientFormDefaultValues,
//       name: user.name,
//       email: user.email,
//       phone: user.phone,
//     },
//   });

//   // 2. Define a submit handler.
//   async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
//     setIsLoading(true);
//     let formData;
//     if (
//       values.identificationDocument &&
//       values.identificationDocument.length > 0
//     ) {
//       const blobFile = new Blob([values.identificationDocument[0]], {
//         type: values.identificationDocument[0].type,
//       });
//       formData = new FormData();
//       formData.append("blobfFile", blobFile);
//       formData.append("fileName", values.identificationDocument[0].name);
//     }

//     try {
//       const patientData = {
//         ...values,
//         userId: user.$id,
//         birthDate: new Date(values.birthDate),
//         identificationDocument: formData,
//       };
//       // @ts-ignore
//       await registerPatient(patientData);
//       router.push(`/patients/${user?.$id}/new-appointment`);
//     } catch (err) {
//       console.log(err);
//       setIsLoading(false);
//       toast({
//         title: "Error",
//         description: "",
//         className: "bg-red-500 text-white border-none",
//       });
//     }
//   }

//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit, (errors) => {
//           console.log("Validation errors:", errors); // Add this line
//         })}
//         className="flex-1 space-y-12"
//       >
//         <section className="space-y-4">
//           <h1 className="text-3xl font-semibold">Welcome 👋</h1>
//           <p className="text-dark-700">Let us know more about yourself</p>
//         </section>

//         <section className="mb-12 space-y-4">
//           <div className="mb-9 space-y-1">
//             <h2 className="sub-header">Personal Information</h2>
//           </div>
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

//         <div className="flex flex-col gap-6 xl:flex-row xl:justify-between">
//           <CustomFormField
//             fieldType={FormFieldType.INPUT}
//             control={form.control}
//             name="email"
//             label="Email"
//             placeholder="johndoe@gmail.com"
//             iconSrc="/assets/icons/email.svg"
//             iconAlt="email"
//             className="flex-grow"
//           />
//           <CustomFormField
//             fieldType={FormFieldType.PHONE_INPUT}
//             control={form.control}
//             name="phone"
//             label="Phone"
//             className="flex-grow"
//           />
//         </div>

//         <div className="flex flex-col gap-6 xl:flex-row xl:justify-between">
//           <CustomFormField
//             fieldType={FormFieldType.DATE_PICKER}
//             control={form.control}
//             name="birthDate"
//             label="Date of birth"
//             className="flex-grow"
//           />
//           <CustomFormField
//             fieldType={FormFieldType.SKELETON}
//             control={form.control}
//             name="gender"
//             label="Gender"
//             className="flex-grow"
//             renderSkeleton={(field: any) => (
//               <FormControl>
//                 <RadioGroup
//                   className="flex h-11 gap-6 xl:justify-between"
//                   onValueChange={field.onChange}
//                   defaultValue={field.value}
//                 >
//                   {GenderOptions.map((option) => (
//                     <div key={option} className="radio-group">
//                       <RadioGroupItem value={option} id={option} />
//                       <Label className="cursor-pointer" htmlFor={option}>
//                         {option}
//                       </Label>
//                     </div>
//                   ))}
//                 </RadioGroup>
//               </FormControl>
//             )}
//           />
//         </div>

//         <div className="flex flex-col gap-6 xl:flex-row xl:justify-between">
//           <CustomFormField
//             fieldType={FormFieldType.INPUT}
//             control={form.control}
//             name="address"
//             label="Adress"
//             placeholder="14th Street, New York"
//             className="flex-grow"
//           />
//           <CustomFormField
//             fieldType={FormFieldType.INPUT}
//             control={form.control}
//             name="occupation"
//             label="Occupation"
//             placeholder="Software Enginner"
//             className="flex-grow"
//           />
//         </div>

//         <div className="flex flex-col gap-6 xl:flex-row xl:justify-between">
//           <CustomFormField
//             fieldType={FormFieldType.INPUT}
//             control={form.control}
//             name="emergencyContactName"
//             label="Emergency contact name"
//             placeholder="Guardian's name"
//             className="flex-grow"
//           />
//           <CustomFormField
//             fieldType={FormFieldType.PHONE_INPUT}
//             control={form.control}
//             name="emergencyContactNumber"
//             label="Emergency contact number"
//             className="flex-grow"
//           />
//         </div>

//         <section className="mb-12 space-y-4">
//           <div className="mb-9 space-y-1">
//             <h2 className="sub-header">Medical Information</h2>
//           </div>
//         </section>

//         <CustomFormField
//           fieldType={FormFieldType.SELECT}
//           control={form.control}
//           name="primaryPhysician"
//           label="Primary care physician"
//           placeholder="Select a physician"
//         >
//           {Doctors.map((doctor) => (
//             <SelectItem
//               key={doctor.name}
//               value={doctor.name}
//               className="cursor-pointer"
//             >
//               <div className="flex cursor-pointer items-center gap-2">
//                 <Image
//                   src={doctor.image}
//                   width={32}
//                   height={32}
//                   alt={doctor.name}
//                   className="rounded-full border border-dark-500"
//                 />
//                 <p>{doctor.name}</p>
//               </div>
//             </SelectItem>
//           ))}
//         </CustomFormField>

//         <div className="flex flex-col gap-6 xl:flex-row xl:justify-between">
//           <CustomFormField
//             fieldType={FormFieldType.INPUT}
//             control={form.control}
//             name="insuranceProvider"
//             label="Insurance provider"
//             placeholder="BlueCross BlueShield"
//             className="flex-grow"
//           />
//           <CustomFormField
//             fieldType={FormFieldType.INPUT}
//             control={form.control}
//             name="insurancePolicyNumber"
//             label="Insuracne policy number"
//             placeholder="ABC123456789"
//             className="flex-grow"
//           />
//         </div>

//         <div className="flex flex-col gap-6 xl:flex-row xl:justify-between">
//           <CustomFormField
//             fieldType={FormFieldType.TEXTAREA}
//             control={form.control}
//             name="allergies"
//             label="Allergies (if any)"
//             placeholder="Peanuts, Penicillin, Pollen"
//             className="flex-grow"
//           />
//           <CustomFormField
//             fieldType={FormFieldType.TEXTAREA}
//             control={form.control}
//             name="currentMedication"
//             label="Current medications (if any)"
//             placeholder="Ibuprofen 200mg, Levothyroxine 50mcg"
//             className="flex-grow"
//           />
//         </div>
//         <div className="flex flex-col gap-6 xl:flex-row xl:justify-between">
//           <CustomFormField
//             fieldType={FormFieldType.TEXTAREA}
//             control={form.control}
//             name="allergies"
//             label="Allergies (if any)"
//             placeholder="Peanuts, Penicillin, Pollen"
//             className="flex-grow"
//           />
//           <CustomFormField
//             fieldType={FormFieldType.TEXTAREA}
//             control={form.control}
//             name="currentMedication"
//             label="Current medications (if any)"
//             placeholder="Ibuprofen 200mg, Levothyroxine 50mcg"
//             className="flex-grow"
//           />
//         </div>
//         <div className="flex flex-col gap-6 xl:flex-row xl:justify-between">
//           <CustomFormField
//             fieldType={FormFieldType.TEXTAREA}
//             control={form.control}
//             name="familyMedicalHistory"
//             label="Family medical History (if relevant)"
//             placeholder="Mother had breast cancer"
//             className="flex-grow"
//           />
//           <CustomFormField
//             fieldType={FormFieldType.TEXTAREA}
//             control={form.control}
//             name="pastMedicalHistory"
//             label="Past medical history"
//             placeholder="Asthma diagnosis in childhood"
//             className="flex-grow"
//           />
//         </div>

//         <section className="mb-12 space-y-4">
//           <div className="mb-9 space-y-1">
//             <h2 className="sub-header">Identification and Verfication</h2>
//           </div>
//         </section>
//         <CustomFormField
//           fieldType={FormFieldType.SELECT}
//           control={form.control}
//           name="identificationType"
//           label="Identification type"
//           placeholder="Select an identification type"
//         >
//           {IdentificationTypes.map((type) => (
//             <SelectItem key={type} value={type} className="cursor-pointer">
//               {type}
//             </SelectItem>
//           ))}
//         </CustomFormField>
//         <CustomFormField
//           fieldType={FormFieldType.INPUT}
//           control={form.control}
//           name="identificationNumber"
//           label="Identification Number"
//           placeholder="1234567"
//         />
//         <CustomFormField
//           fieldType={FormFieldType.SKELETON}
//           control={form.control}
//           name="identificationDocument"
//           label="Scanned Copy of Identification Document"
//           className="flex-grow"
//           renderSkeleton={(field: any) => (
//             <FormControl>
//               <FileUploader files={field.value} onChange={field.onChange} />
//             </FormControl>
//           )}
//         />
//         <section className="mb-12 space-y-4">
//           <div className="mb-9 space-y-1">
//             <h2 className="sub-header">Consent and Privacy</h2>
//           </div>
//         </section>
//         <CustomFormField
//           fieldType={FormFieldType.CHECKBOX}
//           control={form.control}
//           name="treatmentConsent"
//           label="I consent to receive treatment for my health condition."
//         />
//         <CustomFormField
//           fieldType={FormFieldType.CHECKBOX}
//           control={form.control}
//           name="disclosureConsent"
//           label="I consent to the use and disclosure of my health information for treatment purposes."
//         />
//         <CustomFormField
//           fieldType={FormFieldType.CHECKBOX}
//           control={form.control}
//           name="privacyConsent"
//           label="I acknowledge that I have reviewed and agree to the privacy policy"
//         />
//         <SubmitButton isLoading={isLoading}>Submit and continue</SubmitButton>
//       </form>
//     </Form>
//   );
// }
