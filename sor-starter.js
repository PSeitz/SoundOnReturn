#!/usr/bin/env node
var argv = require('yargs')
    .usage('Loads the config.\nUsage: $0')
    .example('$0 -c', 'config.json')
    .demand('config')
    .alias('c', 'config')
    .describe('c', 'Path to configuration')
    .argv;

var SoundOnReturn = require("./soundOnReturn.js");

// var config = require('./sorconfig.json');
var config = require('./'+argv.config);


new SoundOnReturn(config);