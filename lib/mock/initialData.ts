import { Campaign, EmailAccount, EmailList } from "./types";

export const initialEmailAccounts: EmailAccount[] = [
  {
    id: "acc-1",
    email: "sakshi@360airo.com",
    provider: "Google Workspace",
    status: "Connected",
    dailyLimit: 500,
    sentToday: 120,
    warmupEnabled: true,
  },
  {
    id: "acc-2",
    email: "hello@globopersona.com",
    provider: "Microsoft 365",
    status: "Connected",
    dailyLimit: 300,
    sentToday: 250,
    warmupEnabled: false,
  },
];

export const initialEmailLists: EmailList[] = [
  {
    id: "list-1",
    name: "Tech Founders 2024",
    description: "List of tech startup founders in the US.",
    createdAt: new Date().toISOString(),
    avgQuality: 92,
    contacts: [
      {
        id: "cont-1",
        firstName: "Alice",
        lastName: "Smith",
        email: "alice@techstartup.com",
        company: "Tech Startup Inc.",
      },
      {
        id: "cont-2",
        firstName: "Bob",
        lastName: "Jones",
        email: "bob@innovate.co",
        company: "Innovate Co.",
      },
    ],
  },
  {
    id: "list-2",
    name: "Marketing Agencies EU",
    description: "Agencies based in Europe.",
    createdAt: new Date().toISOString(),
    avgQuality: 85,
    contacts: [
      {
        id: "cont-3",
        firstName: "Charlie",
        lastName: "Brown",
        email: "charlie@agencymarketing.eu",
        company: "Agency Marketing",
      },
    ],
  },
];

export const initialCampaigns: Campaign[] = [
  {
    id: "camp-1",
    campaignName: "Q3 Founder Outreach",
    subject: "Scaling your engineering team",
    emailAccountId: "acc-1",
    emailListId: "list-1",
    status: "Running",
    createdAt: new Date().toISOString(),
    openRate: 45.2,
    clickRate: 12.5,
    recipients: 2,
    emailsDelivered: 2,
    bounces: 0,
  },
  {
    id: "camp-2",
    campaignName: "Agency Partnership",
    subject: "Partnering with 360Airo",
    emailAccountId: "acc-2",
    emailListId: "list-2",
    status: "Draft",
    createdAt: new Date().toISOString(),
    openRate: 0,
    clickRate: 0,
    recipients: 1,
    emailsDelivered: 0,
    bounces: 0,
  },
];
