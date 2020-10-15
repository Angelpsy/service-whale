import { StatusesLead } from '@/types/lead';

export const LEAD_STATUSES: StatusesLead[] = [
  StatusesLead.NEW,
  StatusesLead.DISMISSED,
  StatusesLead.IN_PROGRESS,
  StatusesLead.ESTIMATE_SCHEDULED,
  StatusesLead.PENDING_ACCEPTANCE,
  StatusesLead.SERVICE_SCHEDULED,
  StatusesLead.COMPLETED,
  StatusesLead.LOST,
];
