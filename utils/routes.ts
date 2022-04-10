export interface AuthProps {
  LOGIN: string;
  SIGNUP: string;
}

export interface DashProps {
  ANALYTICS: string;
  GOALS: string;
  JOBS: string;
  BOARDS: string;
  CONTACTS: string;
}

export const DASHBOARD_ROUTES: DashProps = {
  ANALYTICS: '/analytics',
  GOALS: '/goals',
  BOARDS: '/boards',
  JOBS: '/browse-jobs',
  CONTACTS: '/contacts',
};

export const AUTH_ROUTES: AuthProps = {
  LOGIN: '/login',
  SIGNUP: '/signup',
};
