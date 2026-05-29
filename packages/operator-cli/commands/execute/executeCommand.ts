import { Command } from 'commander';
import { readFileSync } from 'fs';
import { ExecutionService } from '@zensorum/operator-cli/services/execution/executionService.ts';
import { OutputFormatter } from '@zensorum/operator-cli/formatters/outputFormatter.ts';
import { ZensorumScenario } from '@zensorum/application-contracts';
import { ErrorFormatter } from '@zensorum/operator-cli/diagnostics/errorFormatter.ts';
import { FailureType } from '@zensorum/operator-cli/contracts/failure.ts';

export const registerExecuteCommand = (program: Command) => {
  program
    .command('execute')
    .description('Executes a Zensorum scenario based on a structured definition.')
    .option('-f, --file <path>', 'Path to a JSON file containing the Zensorum scenario.')
    .option('-j, --json <scenarioJson>', 'Inline JSON string of the Zensorum scenario.')
    .action(async (options: { file?: string; json?: string }) => {
      const service = new ExecutionService();
      let scenario: ZensorumScenario;

      try {
        if (options.file && options.json) {
          console.log(OutputFormatter.format(ErrorFormatter.format(
            'execute', FailureType.SCHEMA_VALIDATION_FAILURE,
            'Cannot specify both --file and --json options.', {}
          )));
          return;
        }

        if (options.file) {
          const fileContent = readFileSync(options.file, 'utf-8');
          scenario = JSON.parse(fileContent);
        } else if (options.json) {
          scenario = JSON.parse(options.json);
        } else {
          console.log(OutputFormatter.format(ErrorFormatter.format(
            'execute', FailureType.SCHEMA_VALIDATION_FAILURE,
            'Either --file or --json option must be provided.', {}
          )));
          return;
        }

        const result = await service.executeScenario(scenario);
        console.log(OutputFormatter.format(result));

      } catch (e) {
        if (e instanceof Error) {
            console.log(OutputFormatter.format(ErrorFormatter.format(
                'execute', FailureType.SCHEMA_VALIDATION_FAILURE, e.message, {}
            )));
        } else {
            console.log(OutputFormatter.format(ErrorFormatter.format(
                'execute', FailureType.UNKNOWN_DETERMINISTIC_FAILURE, 'An unknown error occurred during scenario parsing.', {}
            )));
        }
      }
    });
};
