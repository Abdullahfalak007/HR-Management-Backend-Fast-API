// File: src/types/types.ts
import { PrismaClient } from "@prisma/client";
import { DefaultSession } from "next-auth";

// -----------------------
// Augment NextAuth types
// -----------------------

// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: string;
      id: string;
    };
  }

  interface User {
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    sub?: string;
    id?: string;
  }
}

export interface Employee {
  id: string;
  name: string;
  employeeId: string;
  department: string;
  designation: string;
  type: string;
  status: string;
  gender?: string;
  maritalStatus?: string;
  avatar?: string;
  createdAt: string;
}

export type EditableEmployee = {
  id: string;
  name: string;
  employeeId: string;
  department: string;
  designation: string;
  type: string;
  status: string;
  avatar?: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dob: string;
    gender: string;
    nationality: string;
    maritalStatus: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  professionalInfo: {
    username: string;
    joiningDate: string;
    workingDays: string;
    officeLocation: string;
  };
  documents: Record<string, any>;
  accountLinks: {
    email: string;
    slackId: string;
    skypeId: string;
    githubId: string;
  };
};

export interface User {
  id: string;
  name?: string;
  email?: string;
  role: string;
  image?: string;
}

export interface UserState {
  me?: User;
  all: User[];
  loading: boolean;
  error?: string;
}

export interface Project {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  status: "IN_PROGRESS" | "COMPLETED";
  assignee: { id: string; name: string; avatar?: string };
}

export interface ProjectState {
  items: Project[];
  loading: boolean;
  error?: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface NotificationState {
  items: Notification[];
  loading: boolean;
  error?: string;
}

export type Leave = {
  id: string;
  employeeId: string;
  reason: string;
  startDate: string;
  endDate: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  updatedAt: string;
  // Add this:
  employee?: {
    id: string;
    name?: string;
    avatar?: string;
    personalInfo?: { email?: string };
    accountLinks?: { email?: string };
  };
};

export interface LeaveState {
  items: Leave[];
  loading: boolean;
  error?: string;
}

export interface Employee {
  id: string;
  name: string;
  employeeId: string;
  department: string;
  designation: string;
  type: string;
  status: string;
  avatar?: string;
  createdAt: string;
  personalInfo?: any;
  professionalInfo?: any;
  documents?: any;
  accountLinks?: any;
}

export interface EmployeeState {
  employees: Employee[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

export interface AuthState {
  user: { id: string; name: string } | null;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  date: string;
  checkIn: string;
  checkOut: string;
  breakTime: string | null;
  workHours: string | null;
  status: "ON_TIME" | "LATE" | "ABSENT";
  employee: {
    id: string;
    name: string;
    avatar?: string;
    department: string;
    designation: string;
    type: string;
  };
}

export interface AttendanceState {
  records: AttendanceRecord[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

export type Emp = {
  id: string;
  name: string;
  avatar?: string;
  employeeId: string;
  department: string;
  designation: string;
  type: string;
  status: string;
};

export type ChartItem = {
  dayName: string;
  ON_TIME: number;
  LATE: number;
  ABSENT: number;
};

export type TooltipPayload = {
  dataKey: string;
  value: number;
  fill: string;
};

export type Row = {
  id: string;
  employee: {
    id: string;
    name: string;
    avatar?: string;
    designation: string;
    type: string;
  };
  checkIn: string;
  checkOut: string;
  status: "ON_TIME" | "LATE" | "ABSENT";
};

export type StatsCardProps = {
  title: string;
  value: number | string;
  icon: string;
  change: number;
  positive?: boolean;
  updatedAt?: Date;
};

export type DocumentSetEmbedded = {
  [key: string]: any;
};

export type AccountLinksEmbedded = {
  email: string;
  slackId: string;
  skypeId: string;
  githubId: string;
};

export type PersonalInfoEmbedded = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  nationality: string;
  maritalStatus: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
};

export type FormState = {
  employee: {
    name: string;
    employeeId: string;
    department: string;
    designation: string;
    type: string;
    status: string;
    avatar: string;
  };
  personalInfo: PersonalInfoEmbedded;
  professionalInfo: ProfessionalInfoEmbedded;
  documents: DocumentSetEmbedded;
  accountLinks: AccountLinksEmbedded;
};

export type ProfessionalInfoEmbedded = {
  username: string;
  joiningDate: string;
  workingDays: string;
  officeLocation: string;
};

export type Theme = "light" | "dark";

export interface CloudinaryWidget {
  open: () => void;
  close: () => void;
  destroy: () => void;
}

export interface CloudinaryWindow {
  createUploadWidget: (
    options: Record<string, unknown>,
    callback: (error: unknown, result: unknown) => void
  ) => CloudinaryWidget;
}

// Extend the global Window interface
declare global {
  interface Window {
    cloudinary: CloudinaryWindow;
  }
}

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export type AttendancePayload = {
  employeeId: string;
  date: string;
  checkIn: string;
  checkOut: string;
  breakTime?: string;
  workHours?: string;
  status: string;
};
