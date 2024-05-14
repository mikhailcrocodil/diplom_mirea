import { UserModel } from "../user/user.model";

export enum MaterialType {
  INFO = "info",
  FILE = "file",
  TASK = "task",
  TEST = "test",
}

export enum InfoContentType {
  TEXT = "text",
  IMG = "img",
  VIDEO = "video",
}

export interface MaterialModel {
  id: number;
  title: string;
  type: MaterialType;
  description?: null;
}

export interface InfoContent {
  id: number;
  content: string;
  type: InfoContentType;
  title_block?: string;
  title_paragraph?: string;
  img_caption?: string;
  video_url?: string;
}

export interface InfoContentModel {
  material: MaterialModel[];
  content: InfoContent[];
}

export type TTest = {
  id: number;
  duration: number;
  title: string;
  description?: string;
  final_date?: string;
  number_attempts?: number;
  material_id?: number;
  user_id?: number;
};

export type TAnswer = {
  id: number;
  answer_text: string;
};

type TQuestion = {
  id: number;
  question_text: string;
};

export interface QuestionModel {
  answers: TAnswer[];
  question: TQuestion;
}

export interface TestModel {
  test: TTest[];
  questions: QuestionModel[];
}

export type TAnswerAdd = {
  answer_text: string;
  is_correct?: boolean;
};

type TQuestionAdd = {
  question_text: string;
  difficulty?: number;
};

export interface QuestionAddModel {
  answers: TAnswerAdd[];
  question: TQuestionAdd;
}

export type TaskProps = {
  id: number;
  task_title: string;
  img: string;
  final_date?: string;
  task?: string;
};

export type StudentsAnswersProps = {
  id: number;
  score: 2 | 3 | 4 | 5 | null;
  answer_text: string;
  task_id: number;
  is_check: boolean;
  user?: UserModel;
  teacher_comment?: string;
};

export type TeachersAnswersProps = {
  id: number;
  teacher_id: number;
  comment: string;
  student_answer_id: number;
};

export interface TaskModel {
  task: TaskProps;
  studentsAnswer: StudentsAnswersProps[] | null;
  teacherAnswers: TeachersAnswersProps[] | null;
}
