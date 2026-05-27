import { Command } from 'commander';
import { CertificationService } from '../../services/certification/certificationService';
import { OutputFormatter } from '../../formatters/outputFormatter';

export const registerCertifyCommand = (program: Command) => {
  program
    .command('certify')
    .argument('<executionId>', 'Execution ID')
    .action(async (executionId: string) => {
      const service = new CertificationService();
      const result = await service.certify(executionId);
      console.log(OutputFormatter.format(result));
    });
};
