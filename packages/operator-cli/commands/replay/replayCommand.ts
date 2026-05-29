import { Command } from 'commander';
import { ReplayService } from '@zensorum/operator-cli/services/replay/replayService.ts';
import { OutputFormatter } from '@zensorum/operator-cli/formatters/outputFormatter.ts';

export const registerReplayCommand = (program: Command) => {
  program
    .command('replay')
    .argument('<executionId>', 'Execution ID')
    .action(async (executionId: string) => {
      const service = new ReplayService();
      const result = await service.runReplay(executionId);
      console.log(OutputFormatter.format(result));
    });
};
