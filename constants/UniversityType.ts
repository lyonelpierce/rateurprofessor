export type University = {
  id: string;
  name: string;
  category: string;
  location: string;
  regimen: string;
  tipo: string;
  createdAt: string;
  professors: any[];
  reviews: any[];
};

export type UniversityData = {
  universities: University;
  isReviewed: boolean;
};
