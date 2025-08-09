import { z } from "zod";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;

export const signInSchema = z.object({
  email: z
    .string({ required_error: "L'email est requis" })
    .min(1, "L'email ne peut pas être vide")
    .email("Format d'email invalide")
    .regex(emailRegex, "Format d'email invalide")
    .max(254, "L'email ne peut pas dépasser 254 caractères")
    .transform((email) => email.toLowerCase().trim()),
  password: z
    .string({ required_error: "Le mot de passe est requis" })
    .min(1, "Le mot de passe ne peut pas être vide")
    .max(128, "Le mot de passe ne peut pas dépasser 128 caractères"),
  remember_me: z.boolean().default(false),
});

export const signUpSchema = z.object({
  first_name: z
    .string({ required_error: "Le prénom est requis" })
    .min(1, "Le prénom ne peut pas être vide")
    .min(2, "Le prénom doit contenir au moins 2 caractères")
    .max(50, "Le prénom ne peut pas dépasser 50 caractères")
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, "Le prénom ne peut contenir que des lettres, espaces, apostrophes et tirets")
    .transform((name) => name.trim()),
  last_name: z
    .string({ required_error: "Le nom est requis" })
    .min(1, "Le nom ne peut pas être vide")
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(50, "Le nom ne peut pas dépasser 50 caractères")
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, "Le nom ne peut contenir que des lettres, espaces, apostrophes et tirets")
    .transform((name) => name.trim()),
  email: z
    .string({ required_error: "L'email est requis" })
    .min(1, "L'email ne peut pas être vide")
    .email("Format d'email invalide")
    .regex(emailRegex, "Format d'email invalide")
    .max(254, "L'email ne peut pas dépasser 254 caractères")
    .transform((email) => email.toLowerCase().trim()),
  password: z
    .string({ required_error: "Le mot de passe est requis" })
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .max(128, "Le mot de passe ne peut pas dépasser 128 caractères")
    .regex(
      passwordRegex,
      "Le mot de passe doit contenir au moins: 1 minuscule, 1 majuscule, 1 chiffre et 1 caractère spécial"
    ),
  confirm_password: z.string({ required_error: "La confirmation du mot de passe est requise" }),
}).refine((data) => data.password === data.confirm_password, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirm_password"],
});

export const resetPasswordSchema = z.object({
  email: z
    .string({ required_error: "L'email est requis" })
    .min(1, "L'email ne peut pas être vide")
    .email("Format d'email invalide")
    .regex(emailRegex, "Format d'email invalide")
    .transform((email) => email.toLowerCase().trim()),
});

export const newPasswordSchema = z.object({
  password: z
    .string({ required_error: "Le mot de passe est requis" })
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .max(128, "Le mot de passe ne peut pas dépasser 128 caractères")
    .regex(
      passwordRegex,
      "Le mot de passe doit contenir au moins: 1 minuscule, 1 majuscule, 1 chiffre et 1 caractère spécial"
    ),
  confirm_password: z.string({ required_error: "La confirmation du mot de passe est requise" }),
  token: z.string({ required_error: "Token de réinitialisation requis" }),
}).refine((data) => data.password === data.confirm_password, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirm_password"],
});

export type SignInFormData = z.infer<typeof signInSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type NewPasswordFormData = z.infer<typeof newPasswordSchema>;

export const validateEmail = (email: string): boolean => {
  try {
    signInSchema.shape.email.parse(email);
    return true;
  } catch {
    return false;
  }
};

export const validatePassword = (password: string): boolean => {
  try {
    signUpSchema.shape.password.parse(password);
    return true;
  } catch {
    return false;
  }
};

export const updateProfileSchema = z.object({
  first_name: z
    .string()
    .min(2, "Le prénom doit contenir au moins 2 caractères")
    .max(50, "Le prénom ne peut pas dépasser 50 caractères")
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, "Le prénom ne peut contenir que des lettres, espaces, apostrophes et tirets")
    .transform((name) => name.trim())
    .optional(),
  last_name: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(50, "Le nom ne peut pas dépasser 50 caractères")
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, "Le nom ne peut contenir que des lettres, espaces, apostrophes et tirets")
    .transform((name) => name.trim())
    .optional(),
  email: z
    .string()
    .email("Format d'email invalide")
    .regex(emailRegex, "Format d'email invalide")
    .max(254, "L'email ne peut pas dépasser 254 caractères")
    .transform((email) => email.toLowerCase().trim())
    .optional(),
});

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;