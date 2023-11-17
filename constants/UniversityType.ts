export type Review = {
  id: string;
  rate: number;
  again: number;
  difficulty: number;
  content: string;
  userId: string;
  professorId: string;
  courseId: string;
  createdAt: string;
  [key: string]: any;
};

export type Professor = {
  id: string;
  name: string;
  userId: string;
  universityId: string;
  createdAt: string;
  university: University;
  reviews: Review[];
};

export type University = {
  id: string;
  name: string;
  category: string;
  location: string;
  regimen: string;
  tipo: string;
  createdAt: string;
  professors: Professor[];
  reviews: Review[];
};

export type UniversityData = {
  universities: University;
  isReviewed: boolean;
};

export type ProfessorData = {
  professors: Professor;
  isReviewed: boolean;
};
