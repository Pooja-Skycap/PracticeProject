import { z } from "zod";
export const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z.preprocess(
    (val) => (typeof val === "string" ? parseInt(val, 10) : val),
    z
      .number()
      .min(10, { message: "Minimum age is 10" })
      .max(80, { message: "Age must be less than 80" })
  ),
  address: z.string().min(1, "Address is required"),
  status: z
    .enum(["active", "inactive"])
    .refine((value) => ["active", "inactive"].includes(value), {
      message: "Status is required",
    }),
});

export type UserFormValues = z.infer<typeof userSchema>;
