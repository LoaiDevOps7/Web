"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  getAllSkills,
  removeSkillFromPersonalInfo,
} from "@/api/kyc";
import { useProfile } from "@/context/ProfileContext";
import { useSilentRefresh } from "@/hooks/useRefresh";

interface Suggestion {
  id: string;
  name: string;
}

interface SkillInputProps {
  onChange: (skills: string[]) => void;
  initialSkills?: string[];
}

const SkillsSection = ({ onChange, initialSkills = [] }: SkillInputProps) => {
  const { profile, setProfile } = useProfile();
  const { refresh, key } = useSilentRefresh();

  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState<Suggestion[]>(
    []
  );
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [skills, setSkills] = useState<string[]>(initialSkills);

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const allSkills = await getAllSkills();
        setSuggestions(allSkills);
      } catch (error) {
        console.error("Failed to load skills", error);
      }
    };
    loadSkills();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.length > 0) {
      const filtered = suggestions.filter((s) => {
        return (
          s.name.toLowerCase().includes(value.toLowerCase()) &&
          !skills.includes(s.name)
        );
      });
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const addSkill = (skill: string) => {
    if (skill.trim() === "" || skills.includes(skill)) return;
    const newSkills = [...skills, skill];
    setSkills(newSkills);
    onChange(newSkills);
    setInputValue("");
    setShowSuggestions(false);
  };

  const removeSkill = async (skill: string) => {
    if (!profile) return;

    try {
      const newSkills = skills.filter((s) => s !== skill);
      setSkills(newSkills);
      onChange(newSkills);
      await removeSkillFromPersonalInfo(profile.id, skill);
      await refresh();
    } catch (error) {
      console.error("Failed to remove skill", error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      addSkill(inputValue.trim());
    }
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    addSkill(suggestion.name);
  };

  return (
    <div key={key} className="bg-white p-4 rounded-md shadow">
      <h1 className="text-xl font-semibold text-center text-lamagreen">
        المهارات
      </h1>
      <div className="flex flex-1 justify-between">
        <div className="relative">
          <Input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="أضف مهارة..."
            className="w-full"
          />
          {showSuggestions && filteredSuggestions.length > 0 && (
            <div className="absolute z-10 w-full bg-white border border-gray-200 mt-1 max-h-40 overflow-y-auto">
              {filteredSuggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="cursor-pointer p-2 hover:bg-gray-100"
                >
                  {suggestion.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="mt-4 flex gap-4 flex-wrap text-xs">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="flex items-center bg-lamagreen text-white px-2 py-1 rounded-full"
          >
            <span>{skill}</span>
            <button onClick={() => removeSkill(skill)} className="ml-1">
              ×
            </button>
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-4 flex-wrap text-xs">
        {Array.isArray(profile?.job?.skills) &&
        profile?.job?.skills.length > 0 ? (
          profile?.job?.skills.map((skill, index) => (
            <p key={index} className="p-3 rounded-md bg-slate-200 shadow">
              {skill.name}
              <button
                onClick={() => removeSkill(skill.name)}
                className="ml-2 text-red-600"
              >
                ×
              </button>
            </p>
          ))
        ) : (
          <p className="text-gray-500">لا توجد مهارات مضافة بعد.</p>
        )}
      </div>
    </div>
  );
};

export default SkillsSection;
