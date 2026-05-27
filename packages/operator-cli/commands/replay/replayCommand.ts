import { Command } from 'commander';
import { ReplayService } from '../../services/replay/replayService';
import { OutputFormatter } from '../../formatters/outputFormatter';

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
