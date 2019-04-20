#!/usr/bin/env node
const commandLineArgs = require('command-line-args');
const { makeServer } = require('../lib/Server');

const optionDefinitions = [
  { name: 'output', alias: 'o', type: String, defaultOption: 'uploads' },
  { name: 'port', alias: 'p', type: Number, defaultOption: 5555 },
];

const options = commandLineArgs(optionDefinitions);
makeServer({ dir: options.output, port: options.port });
