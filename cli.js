#!/usr/bin/env node
const catchText = require('./index');
const urlValidator = require('./http-validacao');

const ARGS = process.argv;

async function processArgs(filePath){
  const results = await catchText(filePath[2]);
  switch(ARGS[3]){
    case 'validate':
      console.log("Parsed and checked links", await urlValidator(results));
      break;
    default:
      console.log("You need to inform a valid option");
      break;
  }
}

processArgs(ARGS);