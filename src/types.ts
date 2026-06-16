/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  title: string;
  category: string;
  tag: string;
  shortDesc: string;
  longDesc: string;
  stats: { label: string; value: string }[];
  impactGoal: string;
  iconName: string; // Used to pick correct Lucide icon
}

export interface Testimonial {
  id: string;
  quote: string;
  stars: number;
  author: string;
  role: string;
  projectTag?: string;
}

export interface Partner {
  name: string;
  logoText: string;
  type: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
}

export interface ImpactStat {
  num: string;
  label: string;
  description: string;
}

export interface ContactInquiry {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface Donation {
  projectId: string;
  amount: number;
  donorName: string;
  donorEmail: string;
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

export interface ParticipationRegistration {
  fullName: string;
  email: string;
  phone: string;
  role: string;
  message: string;
}
