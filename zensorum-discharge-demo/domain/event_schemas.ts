// src/domain/event_schemas.ts
import { z } from 'zod';
import { BaseEventSchema } from '../core/types';

/**
 * Domain-specific event schemas for Zensorum Discharge Demo.
 * All schemas extend BaseEventSchema to ensure structural consistency.
 */

export const LabSampleSubmittedRequestedSchema = BaseEventSchema.extend({
  event_type: z.literal('LAB.SAMPLE.SUBMITTED.REQUESTED'),
  payload: z.any(),
});
export const LabSampleSubmittedCompletedSchema = BaseEventSchema.extend({
  event_type: z.literal('LAB.SAMPLE.SUBMITTED.COMPLETED'),
  payload: z.any(),
});
export const LabSampleAnalysisRequestedSchema = BaseEventSchema.extend({
  event_type: z.literal('LAB.SAMPLE.ANALYSIS.REQUESTED'),
  payload: z.any(),
});
export const LabSampleAnalysisCompletedSchema = BaseEventSchema.extend({
  event_type: z.literal('LAB.SAMPLE.ANALYSIS.COMPLETED'),
  payload: z.any(),
});
export const LabResultFinalizedCompletedSchema = BaseEventSchema.extend({
  event_type: z.literal('LAB.RESULT.FINALIZED.COMPLETED'),
  payload: z.any(),
});

export const DischargeInitiatedSchema = BaseEventSchema.extend({
  event_type: z.literal('DISCHARGE.INITIATED'),
  payload: z.object({
    patient_id: z.string().uuid(),
    ward_id: z.string(),
    admission_timestamp: z.string().datetime(),
  }),
});

export const MedRecCompletedSchema = BaseEventSchema.extend({
  event_type: z.literal('MED.REC.COMPLETED'),
  payload: z.object({
    patient_id: z.string().uuid(),
    practitioner_id: z.string(),
    completion_timestamp: z.string().datetime(),
  }),
});

export const MDApprovalRequestedSchema = BaseEventSchema.extend({
  event_type: z.literal('MD.APPROVAL.REQUESTED'),
  payload: z.object({
    patient_id: z.string().uuid(),
    requested_by: z.string(),
  }),
});

export const MDApprovalCompletedSchema = BaseEventSchema.extend({
  event_type: z.literal('MD.APPROVAL.COMPLETED'),
  payload: z.object({
    patient_id: z.string().uuid(),
    approver_id: z.string(),
    approval_timestamp: z.string().datetime(),
  }),
});

export const PharmacyReadinessCompletedSchema = BaseEventSchema.extend({
  event_type: z.literal('PHARMACY.READINESS.COMPLETED'),
  payload: z.object({
    patient_id: z.string().uuid(),
    prescriptions_verified: z.boolean(),
    readiness_timestamp: z.string().datetime(),
  }),
});

export const DischargeFinalizedCompletedSchema = BaseEventSchema.extend({
  event_type: z.literal('DISCHARGE.FINALIZED.COMPLETED'),
  payload: z.object({
    patient_id: z.string().uuid(),
    discharge_summary_id: z.string().uuid(),
    finalized_timestamp: z.string().datetime(),
  }),
});
