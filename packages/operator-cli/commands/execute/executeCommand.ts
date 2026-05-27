import { Command } from 'commander';
import { ExecutionService } from '../services/execution/executionService';
import { OutputFormatter } from '../formatters/outputFormatter';

export const registerExecuteCommand = (program: Command) => {
  program
    .command('execute')
    .argument('<scenario>', 'Scenario name')
    .action(async (scenario: string) => {
      const service = new ExecutionService();
      const result = await service.runScenario(scenario);
      console.log(OutputFormatter.format(result));
    });
};
