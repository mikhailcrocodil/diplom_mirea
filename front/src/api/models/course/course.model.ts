import { TeacherModel } from "../user/user.model";
import { ModulesModel } from "./modules.model";
import { MaterialModel } from "../material/material.model";

export type TCourse = {
  id: string;
  title: string;
  description: string;
  duration: number;
  teacher_id?: number;
  tutor_id?: number;
};

export interface CourseModel {
  course: TCourse;
  teacher: TeacherModel;
  tutor?: TeacherModel;
}

export type TTheme = {
  id: number;
  title: string;
  materials?: MaterialModel[];
};

export type AdaptiveTestsMinProps = {
  id: number;
  material_id: number;
  title: string;
};

export interface CourseInfoModel {
  course: TCourse[];
  adaptiveTests: AdaptiveTestsMinProps[];
  modules: {
    module: ModulesModel;
    themes: TTheme[];
  };
}

export type AttemptsProps = {
  result: {
    testAttempt: number;
    userAttempted: number;
  };
};

export type Attemptmodel = {
  id: number;
  correct_answers_count?: number;
  total_questions?: number;
  score?: number;
  start_time?: string;
  end_time?: string;
};
