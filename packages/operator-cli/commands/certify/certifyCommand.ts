import { Command } from 'commander';
import { CertificationService } from '@zensorum/operator-cli/services/certification/certificationService.ts';
import { OutputFormatter } from '@zensorum/operator-cli/formatters/outputFormatter.ts';

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
