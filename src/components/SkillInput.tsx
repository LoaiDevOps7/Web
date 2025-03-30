"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { getAllSkills } from "@/api/kyc";

interface Suggestion {
  id: string;
  name: string;
}

interface SkillInputProps {
  onChange: (skills: string[]) => void;
  initialSkills?: string[];
}

const SkillInput = ({ onChange, initialSkills = [] }: SkillInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState<Suggestion[]>(
    []
  );
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [skills, setSkills] = useState<string[]>(initialSkills);

  // تحميل المهارات عند تحميل المكون
  useEffect(() => {
    const loadSkills = async () => {
      const allSkills = await getAllSkills();
      setSuggestions(allSkills); // تحديث قائمة الاقتراحات
    };
    loadSkills();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (value.length > 0) {
      const filtered = suggestions.filter((s) => {
        // التأكد من وجود الخاصية name والتحقق من كونها سلسلة نصية
        if (typeof s.name !== "string") return false;
        return (
          s.name.toLowerCase().includes(value.toLowerCase()) &&
          !skills.includes(s.name)
        );
      });
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const addSkill = (skill: string) => {
    if (skill.trim() === "" || skills.includes(skill)) return;
    const newSkills = [...skills, skill];
    setSkills(newSkills);
    onChange(newSkills); // إرسال القائمة المحدثة للوالد
    setInputValue("");
    setShowSuggestions(false);
  };

  const removeSkill = (skill: string) => {
    const newSkills = skills.filter((s) => s !== skill);
    setSkills(newSkills);
    onChange(newSkills);
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
        <ul className="absolute z-10 w-full bg-white border border-gray-200 mt-1 max-h-40 overflow-y-auto">
          {filteredSuggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion)}
              className="cursor-pointer p-2 hover:bg-gray-100"
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-2 flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="flex items-center bg-lamagreen text-white px-2 py-1 rounded-full"
          >
            <span>{skill}</span>
            <button onClick={() => removeSkill(skill)} className="ml-1">
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillInput;