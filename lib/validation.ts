import { z } from "zod";

const formSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Full name must be at least 3 characters.",
    })
    .max(50, {
      message: "Full name must be not more than 50 characters.",
    }),
  email: z.string().email("Invalid email address."),
  phone: z.string().refine(
    (phone) => {
      // Regex pattern for validating phone number
      const phoneRegex = /^\+?[1-9]\d{1,14}$/;
      return phoneRegex.test(phone);
    },
    {
      message: "Invalid phone number.",
    }
  ),
});

export default formSchema;
