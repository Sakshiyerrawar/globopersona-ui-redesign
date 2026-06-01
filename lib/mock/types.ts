export type CampaignStatus =
  | "Draft"
  | "Scheduled"
  | "Running"
  | "Paused"
  | "Completed";

export interface Campaign {
  id: string;
  campaignName: string;
  subject: string;
  emailAccountId: string;
  emailListId: string;
  status: CampaignStatus;
  type?: "AI" | "Manual";
  createdAt: string;
  scheduledAt?: string;
  openRate: number;
  clickRate: number;
  recipients: number;
  emailsDelivered: number;
  bounces: number;
}

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
}

export interface EmailList {
  id: string;
  name: string;
  description: string;
  contacts: Contact[];
  createdAt: string;
  avgQuality: number;
}

export type AccountStatus = "Connected" | "Disconnected" | "Verifying";

export interface EmailAccount {
  id: string;
  email: string;
  provider: string;
  status: AccountStatus;
  dailyLimit: number;
  sentToday: number;
  warmupEnabled: boolean;
}

export interface DashboardMetrics {
  totalCampaigns: number;
  totalRecipients: number;
  avgOpenRate: number;
  avgClickRate: number;
  emailsDelivered: number;
  bounceRate: number;
}
