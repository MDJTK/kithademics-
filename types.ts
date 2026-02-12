
export interface Lesson {
  id: string;
  title: string;
  duration: string;
  isCompleted: boolean;
  videoUrl: string;
  thumbnail?: string;
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  description: string;
  thumbnail: string;
  category: string;
  progress: number;
  lessons: Lesson[];
  price: string;
  isLocked: boolean;
}

export interface UserProgress {
  totalCourses: number;
  completedLessons: number;
  studyTimeHours: number;
  streak: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}
