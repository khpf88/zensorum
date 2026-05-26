export interface PolicyEvaluation {
  policyId: string;
  status: 'pending' | 'passed' | 'failed';
  evaluatedAt: string;
  result: any;
  blockingReason?: string;
  escalationTriggered: boolean;
}

export interface GovernanceDecision {
  decisionId: string;
  patientId: string;
  policyId: string;
  outcome: 'approved' | 'rejected' | 'escalated';
  reason: string;
  timestamp: string;
}

export interface EscalationRecord {
  id: string;
  patientId: string;
  reason: string;
  triggeredAt: string;
  resolved: boolean;
}
