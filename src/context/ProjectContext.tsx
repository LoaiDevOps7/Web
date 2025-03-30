"use client";

import { getAllProjects } from "@/api/project";
import { Project } from "@/types/Project";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface ProjectContextProps {
  projects: Project[] | null;
}

const ProjectContext = createContext<ProjectContextProps>({
  projects: null,
});

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Project[] | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await getAllProjects();
      setProjects(data);
    };

    fetchProjects();
  }, []);

  return (
    <ProjectContext.Provider value={{ projects }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectContext);

export default ProjectContext;
