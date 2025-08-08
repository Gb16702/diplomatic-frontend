"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, User, UserRound, HelpCircle, Baby, Users, Briefcase, Crown, Zap, Target, TrendingUp, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { useStepperStore, type Role, type Gender, type AgeRange, type DifficultyLevel } from "@/lib/stores/stepper-store";
import {
  YoungProfessionalIcon,
  SalesTeamIcon,
  StartupFounderIcon,
  HRLeadershipIcon,
  DiplomatIcon,
} from "@/components/ui/role-icons";

const roles = [
  {
    id: "young_professional" as Role,
    label: "Young Professional",
    icon: YoungProfessionalIcon,
  },
  {
    id: "sales_team_member" as Role,
    label: "Sales Team Member", 
    icon: SalesTeamIcon,
  },
  {
    id: "startup_founder" as Role,
    label: "Startup Founder",
    icon: StartupFounderIcon,
  },
  {
    id: "hr_leadership" as Role,
    label: "HR & Leadership",
    icon: HRLeadershipIcon,
  },
  {
    id: "diplomat_lawyer_politician" as Role,
    label: "Diplomat, Lawyer, Politician",
    icon: DiplomatIcon,
  },
];

const genders = [
  {
    id: "male" as Gender,
    label: "Male",
    icon: User,
  },
  {
    id: "female" as Gender,
    label: "Female", 
    icon: UserRound,
  },
  {
    id: "not_specified" as Gender,
    label: "Not specified",
    icon: HelpCircle,
  },
];

const ageRanges = [
  {
    id: "under_18" as AgeRange,
    label: "Under 18",
    icon: Baby,
  },
  {
    id: "18_24" as AgeRange,
    label: "18-24",
    icon: User,
  },
  {
    id: "25_34" as AgeRange,
    label: "25-34",
    icon: Briefcase,
  },
  {
    id: "35_54" as AgeRange,
    label: "35-54",
    icon: Users,
  },
  {
    id: "55_plus" as AgeRange,
    label: "55+",
    icon: Crown,
  },
];

const difficultyLevels = [
  {
    id: "easy" as DifficultyLevel,
    label: "Easy",
    icon: Zap,
  },
  {
    id: "moderate" as DifficultyLevel,
    label: "Moderate",
    icon: Target,
  },
  {
    id: "hard" as DifficultyLevel,
    label: "Hard",
    icon: TrendingUp,
  },
  {
    id: "mastery" as DifficultyLevel,
    label: "Mastery",
    icon: Award,
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const {
    currentStep,
    selectedRole,
    selectedGender,
    selectedAgeRange,
    selectedDifficultyLevel,
    setSelectedRole,
    setSelectedGender,
    setSelectedAgeRange,
    setSelectedDifficultyLevel,
    canGoNext,
    canGoPrevious,
    nextStep,
    previousStep,
    completeStep,
  } = useStepperStore();

  // Wait for hydration to avoid SSR mismatch
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Sync URL with current step
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("step", currentStep.toString());
    window.history.replaceState({}, "", url);
  }, [currentStep]);

  const handleRoleSelect = (roleId: Role) => {
    setSelectedRole(roleId);
  };

  const handleGenderSelect = (genderId: Gender) => {
    setSelectedGender(genderId);
  };

  const handleAgeRangeSelect = (ageRangeId: AgeRange) => {
    setSelectedAgeRange(ageRangeId);
  };

  const handleDifficultyLevelSelect = (difficultyLevelId: DifficultyLevel) => {
    setSelectedDifficultyLevel(difficultyLevelId);
  };

  const handleNext = () => {
    console.log('Handle next clicked', { 
      canGoNext: canGoNext(), 
      selectedRole, 
      currentStep,
      isHydrated 
    });
    
    if (canGoNext()) {
      completeStep(currentStep);
      
      // If this is the last step, redirect to main app
      if (currentStep === 4) {
        console.log('Onboarding completed', {
          selectedRole,
          selectedGender,
          selectedAgeRange,
          selectedDifficultyLevel
        });
        router.push("/"); // Redirect to main app
      } else {
        nextStep();
      }
    }
  };

  const handleBack = () => {
    if (canGoPrevious()) {
      previousStep();
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with back button and progress */}
      <div className="w-full px-6 py-4">
        <div className="flex items-center">
          <button
            onClick={handleBack}
            className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-lighter hover:bg-gray-50 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1 flex justify-center">
            <ProgressBar 
              currentStep={currentStep} 
              totalSteps={4} 
              className="w-80"
            />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md mx-auto text-center">
          {/* Logo */}
          <div className="mb-6">
            <img 
              src="/logo/diplomate-emblem.svg" 
              alt="Diplomate" 
              width={48} 
              height={48}
              className="mx-auto"
            />
          </div>

          {/* Step 1: Role Selection */}
          {currentStep === 1 && (
            <>
              {/* Title and subtitle */}
              <h1 className="text-2xl font-bold font-grotesk text-black mb-2">
                Choose your role
              </h1>
              <p className="text-gray-600 mb-8">
                So we can adapt the content to your goals
              </p>

              {/* Role selection */}
              <div className="space-y-3 mb-6">
                {roles.map((role) => {
                  const isSelected = selectedRole === role.id;
                  const Icon = role.icon;
                  
                  return (
                    <button
                      key={role.id}
                      onClick={() => handleRoleSelect(role.id)}
                      className="w-full max-w-lg mx-auto flex items-center gap-4 p-4 rounded-xl border border-black hover:border-gray-600 transition-colors bg-transparent text-left group"
                    >
                      <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon size={20} className="text-white" />
                      </div>
                      
                      <span className="flex-1 font-medium text-black">
                        {role.label}
                      </span>
                      
                      <div className="w-5 h-5 flex-shrink-0">
                        {isSelected ? (
                          <div className="w-5 h-5 bg-green rounded-full flex items-center justify-center">
                            <Check size={12} className="text-background" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 border border-black rounded-full" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Footer text */}
              <p className="text-sm text-gray-500 mb-6">
                You can always change this later under "Profile"
              </p>

              {/* Confirm button */}
              <Button
                onClick={handleNext}
                disabled={!isHydrated || !canGoNext()}
                variant="contained"
                size="default"
                className="w-full max-w-lg mx-auto"
              >
                Confirm role
              </Button>
            </>
          )}

          {/* Step 2: Gender Selection */}
          {currentStep === 2 && (
            <>
              {/* Title and subtitle */}
              <h1 className="text-2xl font-bold font-grotesk text-black mb-2">
                Choose your gender
              </h1>
              <p className="text-gray-600 mb-8">
                So we can get to know you better
              </p>

              {/* Gender selection */}
              <div className="space-y-3 mb-6">
                {genders.map((gender) => {
                  const isSelected = selectedGender === gender.id;
                  const Icon = gender.icon;
                  
                  return (
                    <button
                      key={gender.id}
                      onClick={() => handleGenderSelect(gender.id)}
                      className="w-full max-w-lg mx-auto flex items-center gap-4 p-4 rounded-xl border border-black hover:border-gray-600 transition-colors bg-transparent text-left group"
                    >
                      <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon size={20} className="text-white" />
                      </div>
                      
                      <span className="flex-1 font-medium text-black">
                        {gender.label}
                      </span>
                      
                      <div className="w-5 h-5 flex-shrink-0">
                        {isSelected ? (
                          <div className="w-5 h-5 bg-green rounded-full flex items-center justify-center">
                            <Check size={12} className="text-background" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 border border-black rounded-full" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Footer text */}
              <p className="text-sm text-gray-500 mb-6">
                You can always change this later under "Profile"
              </p>

              {/* Confirm button */}
              <Button
                onClick={handleNext}
                disabled={!isHydrated || !canGoNext()}
                variant="contained"
                size="default"
                className="w-full max-w-lg mx-auto"
              >
                Confirm gender
              </Button>
            </>
          )}

          {/* Step 3: Age Range Selection */}
          {currentStep === 3 && (
            <>
              {/* Title and subtitle */}
              <h1 className="text-2xl font-bold font-grotesk text-black mb-2">
                Confirm your age
              </h1>
              <p className="text-gray-600 mb-8">
                So we can improve our services for you
              </p>

              {/* Age range selection */}
              <div className="space-y-3 mb-6">
                {ageRanges.map((ageRange) => {
                  const isSelected = selectedAgeRange === ageRange.id;
                  const Icon = ageRange.icon;
                  
                  return (
                    <button
                      key={ageRange.id}
                      onClick={() => handleAgeRangeSelect(ageRange.id)}
                      className="w-full max-w-lg mx-auto flex items-center gap-4 p-4 rounded-xl border border-black hover:border-gray-600 transition-colors bg-transparent text-left group"
                    >
                      <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon size={20} className="text-white" />
                      </div>
                      
                      <span className="flex-1 font-medium text-black">
                        {ageRange.label}
                      </span>
                      
                      <div className="w-5 h-5 flex-shrink-0">
                        {isSelected ? (
                          <div className="w-5 h-5 bg-green rounded-full flex items-center justify-center">
                            <Check size={12} className="text-background" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 border border-black rounded-full" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Footer text */}
              <p className="text-sm text-gray-500 mb-6">
                You can always change this later under "Profile"
              </p>

              {/* Confirm button */}
              <Button
                onClick={handleNext}
                disabled={!isHydrated || !canGoNext()}
                variant="contained"
                size="default"
                className="w-full max-w-lg mx-auto"
              >
                Confirm age
              </Button>
            </>
          )}

          {/* Step 4: Difficulty Level Selection */}
          {currentStep === 4 && (
            <>
              {/* Title and subtitle */}
              <h1 className="text-2xl font-bold font-grotesk text-black mb-2">
                Choose difficulty level
              </h1>
              <p className="text-gray-600 mb-8">
                To achieve wisdom in the most optimal format
              </p>

              {/* Difficulty level selection */}
              <div className="space-y-3 mb-6">
                {difficultyLevels.map((difficultyLevel) => {
                  const isSelected = selectedDifficultyLevel === difficultyLevel.id;
                  const Icon = difficultyLevel.icon;
                  
                  return (
                    <button
                      key={difficultyLevel.id}
                      onClick={() => handleDifficultyLevelSelect(difficultyLevel.id)}
                      className="w-full max-w-lg mx-auto flex items-center gap-4 p-4 rounded-xl border border-black hover:border-gray-600 transition-colors bg-transparent text-left group"
                    >
                      <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon size={20} className="text-white" />
                      </div>
                      
                      <span className="flex-1 font-medium text-black">
                        {difficultyLevel.label}
                      </span>
                      
                      <div className="w-5 h-5 flex-shrink-0">
                        {isSelected ? (
                          <div className="w-5 h-5 bg-green rounded-full flex items-center justify-center">
                            <Check size={12} className="text-background" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 border border-black rounded-full" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Footer text */}
              <p className="text-sm text-gray-500 mb-6">
                You can always change this later under "Profile"
              </p>

              {/* Confirm button */}
              <Button
                onClick={handleNext}
                disabled={!isHydrated || !canGoNext()}
                variant="contained"
                size="default"
                className="w-full max-w-lg mx-auto"
              >
                Complete onboarding
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}