import { Command } from 'commander';
import { LedgerService } from '@zensorum/operator-cli/services/ledger/ledgerService.ts';
import { OutputFormatter } from '@zensorum/operator-cli/formatters/outputFormatter.ts';

export const registerLedgerCommand = (program: Command) => {
  const ledger = program.command('ledger');
  ledger
    .command('inspect')
    .argument('<executionId>', 'Execution ID')
    .action(async (executionId: string) => {
      const service = new LedgerService();
      const result = await service.inspect(executionId);
      console.log(OutputFormatter.format(result));
    });
};
