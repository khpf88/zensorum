import { Command } from 'commander';
import { LedgerService } from '../../services/ledger/ledgerService';
import { OutputFormatter } from '../../formatters/outputFormatter';

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
