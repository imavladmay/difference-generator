#!/usr/bin/env node

import { Command } from 'commander';

const program = new Command();

program
  .version('9.4.1')
  .description('Compares two configuration files and shows a difference')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format');

program.parse();
