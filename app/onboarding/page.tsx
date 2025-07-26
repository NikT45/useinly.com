"use client";

import { useState, KeyboardEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, X } from "lucide-react";

interface OnboardingData {
  firstName: string;
  lastName: string;
  goals: string;
  habits: Array<{
    name: string;
    frequency: number;
    trigger: string;
  }>;
}

export default function Onboarding() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    firstName: "",
    lastName: "",
    goals: "",
    habits: [],
  });

  // Current habit being edited
  const [currentHabit, setCurrentHabit] = useState("");
  const [currentFrequency, setCurrentFrequency] = useState(1);
  const [currentTrigger, setCurrentTrigger] = useState("Select trigger");
  
  // Skip functionality
  const [showSkipModal, setShowSkipModal] = useState(false);

  // Check if user has already completed onboarding
  useEffect(() => {
    const checkOnboardingStatus = async () => {
      const supabase = createClient();
      
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase
          .from('profiles')
          .select('has_onboarded')
          .eq('user_id', user.id)
          .single();

        if (error) throw error;
        
        if (data?.has_onboarded) {
          router.push("/home");
        }
      } catch (error) {
        console.error("Error checking onboarding status:", error);
      }
    };

    checkOnboardingStatus();
  }, [router]);

  const triggers = [
    "Stress",
    "Boredom", 
    "Social situations",
    "Anxiety",
    "Loneliness",
    "Excitement",
    "Frustration",
    "Other"
  ];

  const frequencyLabels = {
    1: "Rarely",
    2: "Sometimes", 
    3: "Often",
    4: "Very Often",
    5: "Almost Always"
  };

  const handleNameSubmit = () => {
    if (data.firstName.trim()) {
      setStep(2);
    }
  };

  const handleGoalsSubmit = () => {
    if (data.goals.trim()) {
      setStep(3);
    }
  };

  const handleHabitKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && currentHabit.trim()) {
      addHabit();
    }
  };

  const addHabit = () => {
    if (currentHabit.trim() && currentTrigger !== "Select trigger") {
      const newHabit = {
        name: currentHabit.trim(),
        frequency: currentFrequency,
        trigger: currentTrigger,
      };
      
      setData(prev => ({
        ...prev,
        habits: [...prev.habits, newHabit]
      }));
      
      // Reset current habit form
      setCurrentHabit("");
      setCurrentFrequency(1);
      setCurrentTrigger("Select trigger");
    }
  };

  const removeHabit = (index: number) => {
    setData(prev => ({
      ...prev,
      habits: prev.habits.filter((_, i) => i !== index)
    }));
  };

  const handleFinish = async () => {
    const supabase = createClient();
    
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      // Structure context data
      const contextData = {
        goals: data.goals,
        habits: data.habits
      };

      // Save to profiles table
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: data.firstName,
          last_name: data.lastName || null,
          context: contextData,
          has_onboarded: true
        })
        .eq('user_id', user.id);

      if (error) throw error;
      
      console.log("Onboarding completed and saved:", data);
      router.push("/home");
    } catch (error) {
      console.error("Error saving onboarding data:", error);
      // You might want to show an error message to the user
    }
  };

  const handleSkip = () => {
    setShowSkipModal(true);
  };

  const confirmSkip = async () => {
    const supabase = createClient();
    
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      // Just mark as onboarded without saving other data
      const { error } = await supabase
        .from('profiles')
        .update({ has_onboarded: true })
        .eq('user_id', user.id);

      if (error) throw error;
      
      console.log("Onboarding skipped");
      setShowSkipModal(false);
      router.push("/home");
    } catch (error) {
      console.error("Error updating onboarding status:", error);
      // Still redirect even if there's an error
      setShowSkipModal(false);
      router.push("/home");
    }
  };

  const cancelSkip = () => {
    setShowSkipModal(false);
  };

  const renderStep1 = () => (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-brand-wine">Welcome!</CardTitle>
        <CardDescription className="text-brand-wine">Let's start by getting to know you</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-brand-wine">First Name *</Label>
          <Input
            id="firstName"
            type="text"
            placeholder="Enter your first name"
            value={data.firstName}
            onChange={(e) => setData(prev => ({ ...prev, firstName: e.target.value }))}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-brand-wine">Last Name (optional)</Label>
          <Input
            id="lastName"
            type="text"
            placeholder="Enter your last name"
            value={data.lastName}
            onChange={(e) => setData(prev => ({ ...prev, lastName: e.target.value }))}
          />
        </div>
        <Button 
          onClick={handleNameSubmit} 
          className="w-full bg-brand-berry hover:bg-brand-berry/90 text-white"
          disabled={!data.firstName.trim()}
        >
          Continue
        </Button>
      </CardContent>
    </Card>
  );

  const renderStep2 = () => (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-brand-wine">Your Goals</CardTitle>
        <CardDescription className="text-brand-wine">What do you hope to achieve by using our AI Therapy platform?</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="goals" className="text-brand-wine">Your Goals</Label>
          <textarea
            id="goals"
            className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-brand-wine"
            placeholder="e.g., Reduce anxiety, improve relationships, build confidence..."
            value={data.goals}
            onChange={(e) => setData(prev => ({ ...prev, goals: e.target.value }))}
          />
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => setStep(1)}
            className="text-brand-wine border-brand-berry hover:bg-brand-berry hover:text-white"
          >
            Back
          </Button>
          <Button 
            onClick={handleGoalsSubmit} 
            className="flex-1 bg-brand-berry hover:bg-brand-berry/90 text-white"
            disabled={!data.goals.trim()}
          >
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep3 = () => (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-brand-wine">Habits You Want to Break</CardTitle>
        <CardDescription className="text-brand-wine">Help us understand patterns that you'd like to change</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add new habit */}
        <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
          <div className="space-y-2">
            <Label htmlFor="habit" className="text-brand-wine">Add a habit</Label>
            <Input
              id="habit"
              type="text"
              placeholder="e.g., overthinking, procrastination..."
              value={currentHabit}
              onChange={(e) => setCurrentHabit(e.target.value)}
              onKeyPress={handleHabitKeyPress}
              className="text-brand-wine"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-brand-wine">How often do you do this?</Label>
            <div className="space-y-2">
              <input
                type="range"
                min="1"
                max="5"
                value={currentFrequency}
                onChange={(e) => setCurrentFrequency(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider accent-brand-berry"
              />
              <div className="text-sm text-center text-brand-wine">
                {frequencyLabels[currentFrequency as keyof typeof frequencyLabels]}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-brand-wine">What triggers it most?</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between text-brand-wine border-brand-berry hover:bg-brand-berry hover:text-white">
                  {currentTrigger}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                {triggers.map((trigger) => (
                  <DropdownMenuItem
                    key={trigger}
                    onClick={() => setCurrentTrigger(trigger)}
                    className="text-brand-wine hover:bg-brand-berry hover:text-white"
                  >
                    {trigger}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Button 
            onClick={addHabit}
            disabled={!currentHabit.trim() || currentTrigger === "Select trigger"}
            className="w-full bg-brand-berry hover:bg-brand-berry/90 text-white"
          >
            Add Habit
          </Button>
        </div>

        {/* Display added habits */}
        {data.habits.length > 0 && (
          <div className="space-y-3">
            <Label className="text-brand-wine">Your habits:</Label>
            <div className="space-y-2">
              {data.habits.map((habit, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-brand-wine">{habit.name}</Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeHabit(index)}
                        className="h-6 w-6 p-0 hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="text-xs text-brand-wine">
                      <span className="font-medium">Frequency:</span> {frequencyLabels[habit.frequency as keyof typeof frequencyLabels]} • 
                      <span className="font-medium"> Trigger:</span> {habit.trigger}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => setStep(2)}
            className="text-brand-wine border-brand-berry hover:bg-brand-berry hover:text-white"
          >
            Back
          </Button>
          <Button 
            onClick={handleFinish} 
            className="flex-1 bg-brand-berry hover:bg-brand-berry/90 text-white"
          >
            Complete Onboarding
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="w-full max-w-md mx-auto mb-4">
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-brand-coral h-2 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${(step / 3) * 100}%` }}
              ></div>
            </div>
          </div>
          <div className="text-center text-sm text-brand-wine">
            Step {step} of 3
          </div>
        </div>

        {/* Skip Button */}
        <div className="flex justify-end mb-4">
          <Button 
            variant="ghost" 
            onClick={handleSkip}
            className="text-brand-wine hover:bg-brand-berry hover:text-white"
          >
            Skip
          </Button>
        </div>

        {/* Render current step */}
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}

        {/* Skip Confirmation Modal */}
        {showSkipModal && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={cancelSkip}
          >
            <div 
              className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold text-brand-wine mb-4">
                Are you sure you want to skip?
              </h3>
              <p className="text-brand-wine mb-6">
                This information helps us provide context and personalize the experience for you. 
                Skipping may result in a less tailored experience.
              </p>
              <div className="flex gap-3 justify-end">
                <Button 
                  variant="outline" 
                  onClick={cancelSkip}
                  className="text-brand-wine border-brand-berry hover:bg-brand-berry hover:text-white"
                >
                  Continue Setup
                </Button>
                <Button 
                  onClick={confirmSkip}
                  variant="outline"
                  className="text-gray-600 border-gray-300 hover:bg-gray-100"
                >
                  Skip Anyway
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
