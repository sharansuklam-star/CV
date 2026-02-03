
export interface PersonalDetails {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  address: string;
  linkedin: string;
  photo?: string;
}

export interface WorkExperience {
  id: number;
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: number;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  description:string;
}

export interface Skill {
  id: number;
  name: string;
}

export interface AcademicWriting {
  id: number;
  title: string;
  journal: string;
  year: string;
  doi: string;
}

export interface ConferencePresentation {
  id: number;
  title: string;
  conferenceName: string;
  location: string;
  date: string;
  role: 'presenter' | 'delegate';
}

export interface BookPublishing {
  id: number;
  title: string;
  publisher: string;
  year: string;
  isbn: string;
}

export interface ProgrammeOrganised {
  id: number;
  programmeName: string;
  organisation: string;
  location: string;
  date: string;
  role: string;
}

export interface CVData {
  personalDetails: PersonalDetails;
  summary: string;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  academicWritings: AcademicWriting[];
  conferencePresentations: ConferencePresentation[];
  bookPublishings: BookPublishing[];
  programmesOrganised: ProgrammeOrganised[];
}
