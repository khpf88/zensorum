import { CanonicalNormalizer } from './interfaces';

export class DefaultCanonicalNormalizer implements CanonicalNormalizer {
  normalize<T>(dto: T): T {
    if (dto && (dto as any).data) {
      const normalizedData: Record<string, unknown> = {};
      Object.keys((dto as any).data).sort().forEach(key => {
        normalizedData[key] = (dto as any).data[key];
      });
      return { ...dto, data: normalizedData } as T;
    }

    const normalized: any = {};
    Object.keys(dto as object).sort().forEach(key => {
      normalized[key] = (dto as any)[key];
    });
    return normalized as T;
  }
}
