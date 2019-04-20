#!/usr/bin/env node
const commandLineArgs = require('command-line-args');
const { makeServer } = require('../lib/Server');

const optionDefinitions = [
  { name: 'output', alias: 'o', type: String, defaultOption: 'uploads' },
  { name: 'port', alias: 'p', type: Number, defaultOption: 5555 },
  { name: 'width', alias: 'w', type: Number, defaultOption: undefined },
  { name: 'height', alias: 'h', type: Number, defaultOption: undefined },
  { name: 'field', alias: 'f', type: String, defaultOption: 'image' },
];

const options = commandLineArgs(optionDefinitions);
makeServer({
  dir: options.output,
  port: options.port,
  dimensions:
    options.width || options.height
      ? { width: options.width, height: options.height }
      : null,
  field: options.field,
});
