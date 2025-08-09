import { z } from "zod";

export const roleSchema = z.enum([
  "young_professional",
  "sales_team_member", 
  "startup_founder",
  "hr_leadership",
  "diplomat_lawyer_politician"
], {
  required_error: "Veuillez sélectionner un rôle",
  invalid_type_error: "Rôle invalide"
});

export const genderSchema = z.enum([
  "male",
  "female",
  "not_specified"
], {
  required_error: "Veuillez sélectionner un genre",
  invalid_type_error: "Genre invalide"
});

export const ageRangeSchema = z.enum([
  "under_18",
  "18_24",
  "25_34", 
  "35_54",
  "55_plus"
], {
  required_error: "Veuillez sélectionner une tranche d'âge",
  invalid_type_error: "Tranche d'âge invalide"
});

export const difficultyLevelSchema = z.enum([
  "easy",
  "moderate",
  "hard",
  "mastery"
], {
  required_error: "Veuillez sélectionner un niveau de difficulté",
  invalid_type_error: "Niveau de difficulté invalide"
});

export const stepperStateSchema = z.object({
  currentStep: z
    .number()
    .int("Le numéro d'étape doit être un entier")
    .min(1, "L'étape doit être comprise entre 1 et 4")
    .max(4, "L'étape doit être comprise entre 1 et 4")
    .default(1),
  selectedRole: roleSchema.optional(),
  selectedGender: genderSchema.optional(),
  selectedAgeRange: ageRangeSchema.optional(),
  selectedDifficultyLevel: difficultyLevelSchema.optional(),
  isCompleted: z.boolean().default(false),
  completedSteps: z.array(z.number().int().min(1).max(4)).default([])
});

export const onboardingDataSchema = z.object({
  role: roleSchema,
  gender: genderSchema,
  ageRange: ageRangeSchema,
  difficultyLevel: difficultyLevelSchema,
});

export const stepValidationSchemas = {
  1: z.object({
    selectedRole: roleSchema,
  }),
  2: z.object({
    selectedRole: roleSchema,
    selectedGender: genderSchema,
  }),
  3: z.object({
    selectedRole: roleSchema,
    selectedGender: genderSchema,
    selectedAgeRange: ageRangeSchema,
  }),
  4: z.object({
    selectedRole: roleSchema,
    selectedGender: genderSchema,
    selectedAgeRange: ageRangeSchema,
    selectedDifficultyLevel: difficultyLevelSchema,
  }),
} as const;

export type Role = z.infer<typeof roleSchema>;
export type Gender = z.infer<typeof genderSchema>;
export type AgeRange = z.infer<typeof ageRangeSchema>;
export type DifficultyLevel = z.infer<typeof difficultyLevelSchema>;
export type StepperState = z.infer<typeof stepperStateSchema>;
export type OnboardingData = z.infer<typeof onboardingDataSchema>;

export const validateStepperStep = (step: number, data: Partial<StepperState>): boolean => {
  try {
    const schema = stepValidationSchemas[step as keyof typeof stepValidationSchemas];
    if (!schema) return false;
    schema.parse(data);
    return true;
  } catch {
    return false;
  }
};

export const validateOnboardingCompletion = (data: Partial<OnboardingData>): boolean => {
  try {
    onboardingDataSchema.parse(data);
    return true;
  } catch {
    return false;
  }
};

export const roleLabels: Record<Role, string> = {
  young_professional: "Jeune Professionnel",
  sales_team_member: "Membre d'Équipe Commerciale",
  startup_founder: "Fondateur de Startup", 
  hr_leadership: "RH & Leadership",
  diplomat_lawyer_politician: "Diplomate, Avocat, Politicien"
};

export const genderLabels: Record<Gender, string> = {
  male: "Homme",
  female: "Femme",
  not_specified: "Non spécifié"
};

export const ageRangeLabels: Record<AgeRange, string> = {
  under_18: "Moins de 18 ans",
  "18_24": "18-24 ans",
  "25_34": "25-34 ans",
  "35_54": "35-54 ans", 
  "55_plus": "55 ans et plus"
};

export const difficultyLevelLabels: Record<DifficultyLevel, string> = {
  easy: "Facile",
  moderate: "Modéré",
  hard: "Difficile",
  mastery: "Maîtrise"
};