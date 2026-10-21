import { z } from "zod";


export const nameRegex = /^[a-zA-Z\s'-]+$/;
export const phoneRegex = /^(\+234|0)[0-9]{10}$/;

export const formSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .regex(nameRegex, "Name should only contain letters, spaces, and hyphens"),
  nee: z.string().regex(nameRegex, "...").optional().or(z.literal("")),
  applicantFullName: z
    .string()
    .min(1, "Your full name is required")
    .regex(nameRegex, "Name should only contain letters, spaces, and hyphens"),
  careTakerName: z
    .string()
    .min(1, "caretaker name is required")
    .regex(nameRegex, "Name should only contain letters, spaces, and hyphens"),
  applicantEmail: z.string().email("invalid email address"),
  applicantPhoneNumber: z
    .string()
    .min(11, "enter a valid phone number")
    .regex(phoneRegex, "Enter a valid Nigerian phone number"),
  careTakerPhoneNumber: z
    .string()
    .min(11, "enter a valid phone number")
    .regex(phoneRegex, "Enter a valid Nigerian phone number"),
  dateOfBirth: z
    .string()
    .min(1, "Date of Birth is required")
    .refine((date) => new Date(date) <= new Date(), {
      message: "Date of birth cannot be in the future",
    }),
  dateOfDeath: z
    .string()
    .min(1, "Date of Death is required")
    .refine((date) => new Date(date) <= new Date(), {
      message: "Date of death cannot be in the future",
    }),
  lga: z
    .string()
    .min(2, "LGA is required")
    .regex(nameRegex, "LGA should only contain letters, spaces and hyphens"),
  burialSite: z
    .string()
    .min(2, "Burial site is required")
    .regex(/^[a-zA-Z0-9\s,.'-]+$/, "Contains invalid characters"),
  stateOfDeath: z.string().min(1, "Select a state"),
  relationship: z.string().min(1, "Select your relationship"),
  biography: z
    .string()
    .min(1, "A short biography is required")
    .optional()
    .or(z.literal("")),
  agreed: z.boolean().refine((v) => v === true, {
    message: "Kindly agree to the terms and privacy policy to continue",
  }),
  deathCert: z.custom<File>(
    (f) => f instanceof File,
    "Death certificate is required",
  ),
  validId: z.custom<File>((f) => f instanceof File, "Valid ID is required"),
  burialPermit: z.custom<File | null>().optional(),
});

export type FormValues = z.infer<typeof formSchema>;
