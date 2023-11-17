export type Professor = {
  id: string;
  name: string;
  userId: string;
  universityId: string;
  createdAt: string;
  reviews: any[];
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
  reviews: any[];
};

export type UniversityData = {
  universities: University;
  isReviewed: boolean;
};
