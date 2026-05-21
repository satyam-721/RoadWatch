export type ComplaintStatus =
  | "Submitted"
  | "Under Review"
  | "In Progress"
  | "Resolved"
  | "Rejected";

export interface Complaint {
  id: string;
  roadName: string;
  issueType: string;
  description: string;
  state: string;
  district: string;
  village: string;
  photo?: string;
  lat?: number;
  lng?: number;
  date: string;
  status: ComplaintStatus;
}

const KEY = "meri_sadak_complaints";
const DRAFT = "meri_sadak_draft";
const USER = "meri_sadak_user";

const seed: Complaint[] = [
  {
    id: "MS-2034",
    roadName: "Village Main Road",
    issueType: "Potholes",
    description: "Large potholes near the school entrance making it hard for kids to walk.",
    state: "Uttar Pradesh",
    district: "Varanasi",
    village: "Ramnagar",
    date: "2026-05-02",
    status: "In Progress",
    lat: 25.28,
    lng: 83.02,
  },
  {
    id: "MS-2010",
    roadName: "Market Lane",
    issueType: "Water Logging",
    description: "Water collects after every small rain. Difficult for elders to walk.",
    state: "Bihar",
    district: "Patna",
    village: "Danapur",
    date: "2026-04-18",
    status: "Resolved",
    lat: 25.62,
    lng: 85.05,
  },
  {
    id: "MS-1987",
    roadName: "Panchayat Road",
    issueType: "Broken Road",
    description: "Road broken since last monsoon. Buses cannot enter the village.",
    state: "Rajasthan",
    district: "Jaipur",
    village: "Bagru",
    date: "2026-03-25",
    status: "Under Review",
    lat: 26.81,
    lng: 75.54,
  },
];

function isBrowser() {
  return typeof window !== "undefined";
}

export function getComplaints(): Complaint[] {
  if (!isBrowser()) return seed;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      localStorage.setItem(KEY, JSON.stringify(seed));
      return seed;
    }
    return JSON.parse(raw) as Complaint[];
  } catch {
    return seed;
  }
}

export function addComplaint(c: Complaint) {
  if (!isBrowser()) return;
  const list = getComplaints();
  list.unshift(c);
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function getComplaint(id: string): Complaint | undefined {
  return getComplaints().find((c) => c.id === id);
}

export function newComplaintId() {
  return "MS-" + Math.floor(2100 + Math.random() * 8999);
}

export type Draft = Partial<Complaint> & { photo?: string };

export function getDraft(): Draft {
  if (!isBrowser()) return {};
  try {
    return JSON.parse(localStorage.getItem(DRAFT) || "{}");
  } catch {
    return {};
  }
}

export function setDraft(d: Draft) {
  if (!isBrowser()) return;
  const cur = getDraft();
  localStorage.setItem(DRAFT, JSON.stringify({ ...cur, ...d }));
}

export function clearDraft() {
  if (!isBrowser()) return;
  localStorage.removeItem(DRAFT);
}

export interface User {
  name: string;
  mobile: string;
  state: string;
  district: string;
}

export function getUser(): User {
  if (!isBrowser())
    return { name: "Citizen", mobile: "98XXXXXX21", state: "Uttar Pradesh", district: "Varanasi" };
  try {
    const raw = localStorage.getItem(USER);
    if (raw) return JSON.parse(raw);
  } catch {}
  const u: User = {
    name: "Ramesh Kumar",
    mobile: "98XXXXXX21",
    state: "Uttar Pradesh",
    district: "Varanasi",
  };
  localStorage.setItem(USER, JSON.stringify(u));
  return u;
}

export function setUser(u: User) {
  if (!isBrowser()) return;
  localStorage.setItem(USER, JSON.stringify(u));
}

export const STATES = [
  "Andhra Pradesh",
  "Assam",
  "Bihar",
  "Gujarat",
  "Haryana",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "West Bengal",
];

export const ISSUE_TYPES = [
  "Potholes",
  "Broken Road",
  "Water Logging",
  "Poor Construction",
  "Incomplete Road",
  "Other",
];

export function statusColor(s: ComplaintStatus) {
  switch (s) {
    case "Submitted":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "Under Review":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "In Progress":
      return "bg-indigo-100 text-indigo-800 border-indigo-200";
    case "Resolved":
      return "bg-green-100 text-green-800 border-green-200";
    case "Rejected":
      return "bg-red-100 text-red-800 border-red-200";
  }
}