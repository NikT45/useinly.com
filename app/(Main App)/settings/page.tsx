"use client";

import { useState, useEffect, KeyboardEvent } from "react";
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
import { ChevronDown, X, Save } from "lucide-react";

interface UserData {
  firstName: string;
  lastName: string;
  goals: string;
  habits: Array<{
    name: string;
    frequency: number;
    trigger: string;
  }>;
  planTier: string;
}

export default function Settings() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [data, setData] = useState<UserData>({
    firstName: "",
    lastName: "",
    goals: "",
    habits: [],
    planTier: "",
  });

  // Current habit being edited
  const [currentHabit, setCurrentHabit] = useState("");
  const [currentFrequency, setCurrentFrequency] = useState(1);
  const [currentTrigger, setCurrentTrigger] = useState("Select trigger");

  // Delete account modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");

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

  // Load user data
  useEffect(() => {
    const loadUserData = async () => {
      const supabase = createClient();
      
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          router.push("/auth/login");
          return;
        }

        const { data: profile, error } = await supabase
          .from('profiles')
          .select('first_name, last_name, context, plan_tier')
          .eq('user_id', user.id)
          .single();

        if (error) throw error;

        if (profile) {
          setData({
            firstName: profile.first_name || "",
            lastName: profile.last_name || "",
            goals: profile.context?.goals || "",
            habits: profile.context?.habits || [],
            planTier: profile.plan_tier || "",
          });
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, [router]);

  const handleSave = async () => {
    const supabase = createClient();
    setIsSaving(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const contextData = {
        goals: data.goals,
        habits: data.habits
      };

      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: data.firstName,
          last_name: data.lastName || null,
          context: contextData,
        })
        .eq('user_id', user.id);

      if (error) throw error;
      
      console.log("Settings saved successfully");
      // You could add a success toast here
    } catch (error) {
      console.error("Error saving settings:", error);
      // You could add an error toast here
    } finally {
      setIsSaving(false);
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

//   const handleUpgrade = () => {
//     router.push('/pricing');
//   };

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== "DELETE") return;

    const supabase = createClient();
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      // Delete user profile
     const {error} = await supabase.functions.invoke('delete-user', {
      body: {
        user_id: user.id
      }
     });
     if (error) throw error;

      // Sign out and delete auth user (this will handle the auth deletion)
      const { error: signOutError } = await supabase.auth.signOut();
      if (signOutError) throw signOutError;


      router.push("/");
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-brand-wine">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-brand-wine mb-2">Settings</h1>
          <p className="text-brand-wine">Manage your account and preferences</p>
        </div>

        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-brand-wine">Personal Information</CardTitle>
            <CardDescription className="text-brand-wine">Update your basic information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-brand-wine">First Name</Label>
                <Input
                  id="firstName"
                  type="text"
                  value={data.firstName}
                  onChange={(e) => setData(prev => ({ ...prev, firstName: e.target.value }))}
                  className="text-brand-wine"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-brand-wine">Last Name</Label>
                <Input
                  id="lastName"
                  type="text"
                  value={data.lastName}
                  onChange={(e) => setData(prev => ({ ...prev, lastName: e.target.value }))}
                  className="text-brand-wine"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Goals */}
        <Card>
          <CardHeader>
            <CardTitle className="text-brand-wine">Your Goals</CardTitle>
            <CardDescription className="text-brand-wine">What you hope to achieve with AI Therapy</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="goals" className="text-brand-wine">Goals</Label>
              <textarea
                id="goals"
                className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-brand-wine"
                placeholder="e.g., Reduce anxiety, improve relationships, build confidence..."
                value={data.goals}
                onChange={(e) => setData(prev => ({ ...prev, goals: e.target.value }))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Habits */}
        <Card>
          <CardHeader>
            <CardTitle className="text-brand-wine">Habits You Want to Break</CardTitle>
            <CardDescription className="text-brand-wine">Patterns you&apos;d like to change</CardDescription>
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
          </CardContent>
        </Card>

        {/* Account Management */}
        <Card>
          <CardHeader>
            <CardTitle className="text-brand-wine">Account Management</CardTitle>
            <CardDescription className="text-brand-wine">Manage your account settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="outline"
                onClick={() => setShowDeleteModal(true)}
                className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
              >
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button 
            onClick={handleSave}
            disabled={isSaving}
            className="bg-brand-berry hover:bg-brand-berry/90 text-white"
          >
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>

        {/* Delete Account Confirmation Modal */}
        {showDeleteModal && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowDeleteModal(false)}
          >
            <div 
              className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold text-red-600 mb-4">
                Delete Account
              </h3>
              <p className="text-brand-wine mb-4">
                This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
              </p>
              <p className="text-brand-wine mb-4">
                Please type <strong>DELETE</strong> to confirm:
              </p>
              <Input
                type="text"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                placeholder="Type DELETE"
                className="mb-6"
              />
              <div className="flex gap-3 justify-end">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowDeleteModal(false);
                    setDeleteConfirmText("");
                  }}
                  className="text-brand-wine border-brand-berry hover:bg-brand-berry hover:text-white"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleDeleteAccount}
                  disabled={deleteConfirmText !== "DELETE"}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}