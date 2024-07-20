export type Contribution = {
  date: string;
  count: number;
  color: string;
  intensity: number;
};
export type Year = {
  year: number;
  total: number;
  range: string;
  contributions: Contribution[];
};
