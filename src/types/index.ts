export interface AdmissionApplication {
  id?: string;
  trackingId: string;
  studentName: string;
  fatherName: string;
  dob: string;
  gender: 'Male' | 'Female' | '';
  classApplying: string;
  parentPhone: string;
  homeAddress: string;
  createdAt: string;
  status: 'pending' | 'verified' | 'approved';
  notes?: string;
}

export interface AcademicProgram {
  id: string;
  name: string;
  urduName?: string;
  gradeRange: string;
  ageRange: string;
  description: string;
  highlights: string[];
  subjects: string[];
  image: string;
  curriculumDetails: string;
  timing: string;
}

export interface Facility {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  features: string[];
  icon: string;
}

export interface FacultyMember {
  id: string;
  name: string;
  role: string;
  department: 'Administration' | 'Islamic Studies' | 'Sciences & Mathematics' | 'Languages & Social Studies' | 'Primary & Early Years';
  qualification: string;
  experience: string;
  image: string;
  bio: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'School Building' | 'Classrooms' | 'Students Activities' | 'Islamic Education' | 'Sports' | 'Annual Functions' | 'Educational Events' | 'Computer Lab' | 'Science Lab';
  image: string;
  caption: string;
  date?: string;
}

export interface Announcement {
  id: string;
  title: string;
  category: 'Admissions' | 'Exams' | 'Events' | 'Holidays' | 'Notices';
  date: string;
  summary: string;
  urgent?: boolean;
  fullDetails?: string;
}

export interface ActivityHighlight {
  id: string;
  title: string;
  urduTitle: string;
  description: string;
  image: string;
  schedule: string;
  impact: string;
  category: string;
}
