// "use client";

// import { useContext, useEffect, useState } from "react";
// import { Input } from "@/components/ui/input";
// import { getAllSkills } from "@/api/kyc";
// import { Skill } from "@/types/Profile";
// import { useSilentRefresh } from "@/hooks/useRefresh";
// import { ProfileContext } from "@/context/ProfileContext";
// import {UserContext} from "@/context/UserContext";

// interface Suggestion {
//   id: string;
//   name: string;
// }

// interface SkillInputProps {
//   onChange: (skills: Skill[]) => void;
//   initialSkills?: Skill[];
// }

// const SkillInput = ({ onChange, initialSkills = [] }: SkillInputProps) => {
//  const { profile, setProfile } = useContext(ProfileContext);
//  const { user } = useContext(UserContext) || {};
//  const { refresh, key } = useSilentRefresh();
//   const [inputValue, setInputValue] = useState("");
//   const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
//   const [filteredSuggestions, setFilteredSuggestions] = useState<Suggestion[]>(
//     []
//   );
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [skills, setSkills] = useState<Skill[]>(initialSkills || []);
//   const [isSaving, setIsSaving] = useState(false);

//   // تحميل المهارات عند تحميل المكون
//   useEffect(() => {
//     const loadSkills = async () => {
//       try {
//         const allSkills = await getAllSkills();
//         setSuggestions(allSkills);
//       } catch (error) {
//         console.error("Failed to load skills", error);
//       }
//     };
//     loadSkills();
//   }, []);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setInputValue(value);
//     if (value.length > 0) {
//       const filtered = suggestions.filter((s) => {
//         if (typeof s.name !== "string") return false;
//         return (
//           s.name.toLowerCase().includes(value.toLowerCase()) &&
//           !skills.some((skill) => skill.name === s.name)
//         );
//       });
//       setFilteredSuggestions(filtered);
//       setShowSuggestions(true);
//     } else {
//       setFilteredSuggestions([]);
//       setShowSuggestions(false);
//     }
//   };

//   const addSkill = async (skill: string) => {
//     if (skill.trim() === "" || skills.some(s  => s.name === skill)) return;
//     setIsSaving(true);
//     try {
//       const newSkills = [...skills, { name: skill }];
//       setSkills(newSkills);
//       onChange(newSkills);
//       setInputValue("");
//       setShowSuggestions(false);
//       await refresh();
//     } catch (error) {
//       console.error("Failed to add skill", error);
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const removeSkill = async (skill: string) => {
//     if (!user) return;

//     setIsSaving(true);
//     try {
//       const newSkills = skills.filter((s) => s.name !== skill);
//       setSkills(newSkills);
//       onChange(newSkills);
//       await refresh();
//     } catch (error) {
//       console.error("Failed to remove skill", error);
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter" && inputValue.trim() !== "") {
//       addSkill(inputValue.trim());
//     }
//   };

//   const handleSuggestionClick = (suggestion: Suggestion) => {
//     addSkill(suggestion.name);
//   };

//   return (
//     <div key={key} className="relative">
//       <Input
//         type="text"
//         value={inputValue}
//         onChange={handleInputChange}
//         onKeyDown={handleKeyDown}
//         placeholder="أضف مهارة..."
//         className="w-full"
//       />
//       {showSuggestions && filteredSuggestions.length > 0 && (
//         <ul className="absolute z-10 w-full bg-white border border-gray-200 mt-1 max-h-40 overflow-y-auto">
//           {filteredSuggestions.map((suggestion) => (
//             <li
//               key={suggestion.id}
//               onClick={() => handleSuggestionClick(suggestion)}
//               className="cursor-pointer p-2 hover:bg-gray-100"
//             >
//               {suggestion.name}
//             </li>
//           ))}
//         </ul>
//       )}
//       <div className="mt-2 flex flex-wrap gap-2">
//         {skills.map((skill, index) => (
//           <div
//             key={index}
//             className="flex items-center bg-lamagreen text-white px-2 py-1 rounded-full"
//           >
//             <span>{skill.name}</span>
//             <button
//               onClick={() => removeSkill(skill.name)}
//               disabled={isSaving}
//               className="ml-1"
//             >
//               x
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SkillInput;