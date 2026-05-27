/**
 * Application-Safe DTOs
 */
export interface PatientSummaryDTO {
  id: string;
  name: string;
  status: string;
}

export interface LabResultDTO {
  sampleId: string;
  result: string;
}
