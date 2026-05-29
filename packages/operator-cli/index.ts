#!/usr/bin/env node
import { Command } from 'commander';
import { registerExecuteCommand } from './commands/execute/executeCommand.ts';
import { registerReplayCommand } from './commands/replay/replayCommand.ts';
import { registerCertifyCommand } from './commands/certify/certifyCommand.ts';
import { registerLedgerCommand } from './commands/ledger/ledgerCommand.ts';

const program = new Command();

program
  .name('zensorum')
  .description('Deterministic Execution Authority Platform CLI')
  .version('0.1.0');

registerExecuteCommand(program);
registerReplayCommand(program);
registerCertifyCommand(program);
registerLedgerCommand(program);

program
  .command('inspect')
  .description('Inspection operations');

program
  .command('drift')
  .description('Drift operations');

program
  .command('trace')
  .description('Trace operations');

program
  .command('diagnostics')
  .description('Deterministic diagnostics');

program.parse();
