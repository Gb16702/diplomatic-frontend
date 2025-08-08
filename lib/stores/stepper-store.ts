import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { z } from 'zod';

// Validation schemas
export const roleSchema = z.enum([
  'young_professional',
  'sales_team_member',
  'startup_founder',
  'hr_leadership',
  'diplomat_lawyer_politician'
]);

export const genderSchema = z.enum([
  'male',
  'female',
  'not_specified'
]);

export const ageRangeSchema = z.enum([
  'under_18',
  '18_24',
  '25_34',
  '35_54',
  '55_plus'
]);

export const difficultyLevelSchema = z.enum([
  'easy',
  'moderate',
  'hard',
  'mastery'
]);

export const stepperStateSchema = z.object({
  currentStep: z.number().min(1).max(4).default(1),
  selectedRole: roleSchema.optional(),
  selectedGender: genderSchema.optional(),
  selectedAgeRange: ageRangeSchema.optional(),
  selectedDifficultyLevel: difficultyLevelSchema.optional(),
  isCompleted: z.boolean().default(false),
  completedSteps: z.array(z.number()).default([])
});

export type Role = z.infer<typeof roleSchema>;
export type Gender = z.infer<typeof genderSchema>;
export type AgeRange = z.infer<typeof ageRangeSchema>;
export type DifficultyLevel = z.infer<typeof difficultyLevelSchema>;
export type StepperState = z.infer<typeof stepperStateSchema>;

interface StepperStore extends StepperState {
  // Actions
  setCurrentStep: (step: number) => void;
  setSelectedRole: (role: Role) => void;
  setSelectedGender: (gender: Gender) => void;
  setSelectedAgeRange: (ageRange: AgeRange) => void;
  setSelectedDifficultyLevel: (difficultyLevel: DifficultyLevel) => void;
  nextStep: () => void;
  previousStep: () => void;
  completeStep: (step: number) => void;
  resetStepper: () => void;
  
  // Computed values
  canGoNext: () => boolean;
  canGoPrevious: () => boolean;
  getProgress: () => number;
}

const defaultState: StepperState = {
  currentStep: 1,
  selectedRole: undefined,
  selectedGender: undefined,
  selectedAgeRange: undefined,
  selectedDifficultyLevel: undefined,
  isCompleted: false,
  completedSteps: []
};

export const useStepperStore = create<StepperStore>()(
  persist(
    (set, get) => ({
      ...defaultState,
      
      setCurrentStep: (step: number) => {
        const parsedStep = z.number().min(1).max(4).parse(step);
        set({ currentStep: parsedStep });
      },
      
      setSelectedRole: (role: Role) => {
        const validRole = roleSchema.parse(role);
        set({ selectedRole: validRole });
      },
      
      setSelectedGender: (gender: Gender) => {
        const validGender = genderSchema.parse(gender);
        set({ selectedGender: validGender });
      },
      
      setSelectedAgeRange: (ageRange: AgeRange) => {
        const validAgeRange = ageRangeSchema.parse(ageRange);
        set({ selectedAgeRange: validAgeRange });
      },
      
      setSelectedDifficultyLevel: (difficultyLevel: DifficultyLevel) => {
        const validDifficultyLevel = difficultyLevelSchema.parse(difficultyLevel);
        set({ selectedDifficultyLevel: validDifficultyLevel });
      },
      
      nextStep: () => {
        const { currentStep, canGoNext } = get();
        if (canGoNext()) {
          const nextStep = Math.min(currentStep + 1, 4);
          set({ currentStep: nextStep });
        }
      },
      
      previousStep: () => {
        const { currentStep, canGoPrevious } = get();
        if (canGoPrevious()) {
          const prevStep = Math.max(currentStep - 1, 1);
          set({ currentStep: prevStep });
        }
      },
      
      completeStep: (step: number) => {
        const { completedSteps } = get();
        const validStep = z.number().min(1).max(4).parse(step);
        
        if (!completedSteps.includes(validStep)) {
          const newCompletedSteps = [...completedSteps, validStep].sort();
          const isCompleted = newCompletedSteps.length === 4;
          
          set({ 
            completedSteps: newCompletedSteps,
            isCompleted
          });
        }
      },
      
      resetStepper: () => {
        set(defaultState);
      },
      
      canGoNext: () => {
        const { currentStep, selectedRole, selectedGender, selectedAgeRange, selectedDifficultyLevel } = get();
        
        switch (currentStep) {
          case 1:
            return !!selectedRole;
          case 2:
            return !!selectedGender;
          case 3:
            return !!selectedAgeRange;
          case 4:
            return !!selectedDifficultyLevel;
          default:
            return false;
        }
      },
      
      canGoPrevious: () => {
        const { currentStep } = get();
        return currentStep > 1;
      },
      
      getProgress: () => {
        const { currentStep } = get();
        return (currentStep / 4) * 100;
      },
    }),
    {
      name: 'diplomate-stepper',
      partialize: (state) => ({
        currentStep: state.currentStep,
        selectedRole: state.selectedRole,
        selectedGender: state.selectedGender,
        selectedAgeRange: state.selectedAgeRange,
        selectedDifficultyLevel: state.selectedDifficultyLevel,
        isCompleted: state.isCompleted,
        completedSteps: state.completedSteps,
      }),
    }
  )
);