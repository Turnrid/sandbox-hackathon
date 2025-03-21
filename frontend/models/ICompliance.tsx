export interface ComplianceSectionProps {
  title: string;
  reports: Report[];
  className?: string;
  deploymentId: string;
}

export interface ComplianceRegulation {
    title: string;
    reports: Report[];
  }
  
  export interface Report {
    id: number;
    date: string;
    hash: string;
    entitiesAudited: number;
    status: 'compliant' | 'non-compliant' | 'warning';
    warningLevel?: number;
  }