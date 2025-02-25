
export type MaterialType = "IELTS podcast" | "IELTS video" | "IELTS article" | "IELTS practice test";
export type Topic = "Band Scores" | "Immigration" | "Preparation" | "Results" | "Test Day";
export type TestType = "Academic & Academic UKVI" | "General Training" | "Life Skills A1" | "Life Skills A2" | "Life Skills B1";
export type TestSkill = "Listening" | "Reading" | "Writing" | "Speaking";
export type BandScore = "Band 1 to 4" | "Band 5" | "Band 6" | "Band 7" | "Band 8";
export type TestFormat = "On paper" | "On computer";

export interface Filters {
  materialType: MaterialType[];
  topic: Topic[];
  testType: TestType[];
  testSkill: TestSkill[];
  bandScore: BandScore[];
  testFormat: TestFormat[];
}

export interface Material {
  title: string;
  type: "academic" | "speaking" | "practice" | "skills";
  format?: "Computer" | "Paper";
  materialType?: MaterialType;
  topic?: Topic;
  testType?: TestType;
  testSkill?: TestSkill;
  bandScore?: BandScore;
}
