import { CookieValueTypes } from 'cookies-next/lib/types';

export interface Options {
  label: string;
  value: string;
}

// goals
export interface singleGoalProps {
  userId: CookieValueTypes;
  minimum_salary_range: number;
  maximum_salary_range: number;
  level: string;
  role: string;
  job_type: string;
  country: string;
  currency: string;
}

export interface goalProps {
  id: string;
  attributes: singleGoalProps;
}

// boards
export interface singleBoardProps {
  userId: CookieValueTypes;
  title: string;
  stages: string[] | number[];
  stage_order: number | string;
}

export interface boardProps {
  id: string;
  attributes: singleBoardProps;
}

export interface fullBoardProps {
  id: string;
  attributes: {
    title: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    userId: string;
    jobs: Jobs;
    stages: Stages;
    stage_order: StageOrder;
    goal: Goal;
  };
}

export interface Goal {
  data: GoalData;
}

export interface GoalData {
  id: number;
  attributes: { [key: string]: string };
}

export interface Jobs {
  data: JobsDatum[];
}

export interface JobsDatum {
  id: number;
  attributes: singleJobProps;
}

export interface StageOrder {
  data: StageOrderData;
}

export interface StageOrderData {
  id: number;
  attributes: DataAttributes;
}

export interface DataAttributes {
  order: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Stages {
  data: StagesDatum[];
}

export interface StagesDatum {
  id: number;
  attributes: DatumAttributes;
}

export interface DatumAttributes {
  title: string;
  job_ids: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  slug: string;
}

export interface ArrangedBoardProps {
  columnOrder: string[];
  columns: Columns;
  tasks: { [key: string]: Task };
}

export interface Columns {
  'stage-1': Stage;
  'stage-2': Stage;
  'stage-3': Stage;
  'stage-4': Stage;
  'stage-5': Stage;
}

export interface Stage {
  id: number;
  slug: string;
  title: string;
  taskIds: string[];
}

export interface Task {
  id: number;
  company_name: string;
  post_url: string;
  level: string;
  role: string;
  stage: string;
  salary: null;
  country: null | string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  slug: string;
  job_type: null | string;
  currency: null | string;
  userId: string;
  boardId: string;
}

// jobs
export interface singleJobProps {
  post_url: string;
  company_name: string;
  level: string;
  role: string;
  slug: string | number;
  stage: string | number;
  userId: CookieValueTypes;
  boardId: string | string[] | undefined | number;
  publishedAt?: Date;
  createdAt?: Date | undefined;
}

export interface jobProps {
  id: string;
  attributes: singleJobProps;
}

export interface singleInterviewProps {
  title: string;
  category: string;
  start?: Date;
  end?: Date | undefined;
  description?: string;
  completed?: boolean;
  userId: CookieValueTypes;
  jobId: string;
  job: string;
  boardId: string | string[] | undefined;
}
export interface interviewProps {
  id: string;
  attributes: singleInterviewProps;
}

export interface interviewAnalyticsProps {
  id: string;
  title: string;
  category: string;
  start?: Date;
  end?: Date | undefined;
  description?: string;
  completed?: boolean;
  userId: CookieValueTypes;
  jobId: string;
  job: {
    data: JobsDatum;
  };
  boardId: string | string[] | undefined;
  type?: string;
}

export type singleTaskProps = Omit<singleInterviewProps, 'category'>;

export interface taskProps {
  id: string;
  attributes: singleTaskProps;
}

export interface taskAnalyticsProps {
  id: string;
  title: string;
  start?: Date;
  end?: Date | undefined;
  description?: string;
  completed?: boolean;
  userId: CookieValueTypes;
  jobId: string;
  job: {
    data: JobsDatum;
  };
  boardId: string | string[] | undefined;
  type?: string;
}

export interface currentStageProps {
  id: number;
  slug: string;
  title: string;
  taskIds: string[];
}
