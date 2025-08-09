"use client";

import { useQueryStates, parseAsInteger } from "nuqs";
import { useMemo } from "react";
import { 
  roleSchema, 
  genderSchema, 
  ageRangeSchema, 
  difficultyLevelSchema,
  validateStepperStep,
  validateOnboardingCompletion,
  type Role,
  type Gender,
  type AgeRange,
  type DifficultyLevel,
  type OnboardingData
} from "@/lib/validations/stepper";

const createZodParser = <T>(schema: any, fallback?: T) => ({
  parse: (value: string): T | null => {
    try {
      return schema.parse(value);
    } catch {
      return fallback ?? null;
    }
  },
  serialize: (value: T | null): string => String(value ?? "")
});

const roleParser = createZodParser(roleSchema);
const genderParser = createZodParser(genderSchema);
const ageRangeParser = createZodParser(ageRangeSchema);
const difficultyLevelParser = createZodParser(difficultyLevelSchema);

const stepperParsers = {
  step: parseAsInteger.withDefault(1),
  role: roleParser,
  gender: genderParser,
  ageRange: ageRangeParser,
  difficultyLevel: difficultyLevelParser,
} as const;

const stepperUrlKeys = {
  step: "s",
  role: "r", 
  gender: "g",
  ageRange: "a",
  difficultyLevel: "d",
} as const;

export function useStepper() {
  const [state, setState] = useQueryStates(stepperParsers, {
    urlKeys: stepperUrlKeys,
    shallow: false,
    history: "push",
  });

  const actions = useMemo(() => ({
    nextStep: () => {
      const nextStep = Math.min(state.step + 1, 4);
      setState({ step: nextStep });
    },

    previousStep: () => {
      const prevStep = Math.max(state.step - 1, 1);
      setState({ step: prevStep });
    },

    setCurrentStep: (step: number) => {
      if (step >= 1 && step <= 4) {
        setState({ step });
      }
    },

    setSelectedRole: (role: Role) => {
      setState({ role });
    },

    setSelectedGender: (gender: Gender) => {
      setState({ gender });
    },

    setSelectedAgeRange: (ageRange: AgeRange) => {
      setState({ ageRange });
    },

    setSelectedDifficultyLevel: (difficultyLevel: DifficultyLevel) => {
      setState({ difficultyLevel });
    },

    resetStepper: () => {
      setState({
        step: 1,
        role: null,
        gender: null,
        ageRange: null,
        difficultyLevel: null,
      });
    },

    completeOnboarding: () => {
      console.log("Onboarding completed", state);
    },
  }), [state, setState]);

  const computed = useMemo(() => ({
    canGoNext: (): boolean => {
      switch (state.step) {
        case 1:
          return !!state.role;
        case 2:
          return !!state.gender;
        case 3:
          return !!state.ageRange;
        case 4:
          return !!state.difficultyLevel;
        default:
          return false;
      }
    },

    canGoPrevious: (): boolean => state.step > 1,

    getProgress: (): number => (state.step / 4) * 100,

    isCompleted: (): boolean => 
      state.step === 4 && 
      !!state.role && 
      !!state.gender && 
      !!state.ageRange && 
      !!state.difficultyLevel,

    getStepperData: () => ({
      role: state.role,
      gender: state.gender,
      ageRange: state.ageRange,
      difficultyLevel: state.difficultyLevel,
    }),
  }), [state]);

  return {
    currentStep: state.step,
    selectedRole: state.role,
    selectedGender: state.gender,
    selectedAgeRange: state.ageRange,
    selectedDifficultyLevel: state.difficultyLevel,
    ...actions,
    ...computed,
  };
}