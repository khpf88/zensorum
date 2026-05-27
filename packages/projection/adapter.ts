import { PatientSummaryDTO, LabResultDTO } from '@zensorum/application-contracts/types/dto';
import { ExecutionTrace } from '@zensorum/application-contracts/trace/trace';

/**
 * DomainProjectionAdapter: Transforms domain/execution outputs into UI-safe DTOs/Traces.
 */
export interface DomainProjectionAdapter {
  toPatientSummary(domainData: any): PatientSummaryDTO;
  toLabResult(domainData: any): LabResultDTO;
  toExecutionTrace(runtimeTrace: any): ExecutionTrace;
}
