#!/usr/bin/env node
const commandLineArgs = require('command-line-args');
const { makeServer } = require('../lib/Server');

const optionDefinitions = [
  { name: 'output', alias: 'o', type: String, defaultOption: 'uploads' },
];

const options = commandLineArgs(optionDefinitions);
makeServer(options.output || 'uploads');
