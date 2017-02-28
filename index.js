'use strict';

let winston = require('winston');
let path = require('path');
let rootPath = path.resolve('.');
let fs = require('fs');
let config = require('./config');

if(fs.existsSync(rootPath + '/config/config-log.js')){
    let userConfig =  require(rootPath + '/config/config-log.js');
    if(userConfig.logLevels){
        config.logLevels = userConfig.logLevels;
    }
    if(userConfig.logFolder){
        config.logFolder = userConfig.logFolder;
    }
}

(() => {
    let logDir = rootPath + config.logFolder;
    if(!fs.existsSync(logDir)){
        fs.mkdirSync(logDir);
    }

    winston.addColors(config.logLevels.colors);
    winston.cnsl = {};

    let cnsl = new (winston.Logger)({
        levels: config.logLevels.levels,
        transports: [
            new (winston.transports.Console)({colorize: true, prettyPrint: true, depth: 'unlimited'})
        ]
    });
    winston.cnsl.cnslLog = cnsl;
    winston.cnsl.cnsl = cnsl.cnsl;

    let info = new (winston.Logger)({
        levels: config.logLevels.levels,
        transports: [
            new (winston.transports.Console)({colorize: true, prettyPrint: true, depth: 'unlimited'}),
            new (winston.transports.File)({name: 'info-file', filename: logDir + 'info.log', level: 'info', logstash: true})
        ]
    });
    winston.cnsl.infoLog = info;
    winston.cnsl.info = info.info;

    let error = new (winston.Logger)({
        levels: config.logLevels.levels,
        transports: [
            new (winston.transports.Console)({colorize: true, prettyPrint: true, depth: 'unlimited'}),
            new (winston.transports.File)({name: 'error-file', filename: logDir + 'error.log', level: 'error', logstash: true})
        ]
    });
    winston.cnsl.errorLog = error;
    winston.cnsl.error = error.error;

    let warn = new (winston.Logger)({
        levels: config.logLevels.levels,
        transports: [
            new (winston.transports.Console)({colorize: true, prettyPrint: true, depth: 'unlimited'}),
            new (winston.transports.File)({name: 'warn-file', filename: logDir + 'warn.log', level: 'warn', logstash: true})
        ]
    });
    winston.cnsl.warnLog = warn;
    winston.cnsl.warn = warn.warn;

    let debug = new (winston.Logger)({
        levels: config.logLevels.levels,
        transports: [
            new (winston.transports.Console)({colorize: true, prettyPrint: true, depth: 'unlimited'}),
            new (winston.transports.File)({name: 'debug-file', filename: logDir + 'debug.log', level: 'debug', logstash: true})
        ]
    });
    winston.cnsl.debugLog = debug;
    winston.cnsl.debug = debug.debug;

    if(config.cloud){
		require('winston-loggly');
	    let cloud = new (winston.Logger)({
	        levels: config.logLevels.levels,
	        transports: [
	            new (winston.transports.Loggly)({inputToken: config.cloud.inputToken, subdomain: config.cloud.subdomain, json: true})
	        ]
	    });
	    winston.cnsl.cloudLog = cloud;
	    winston.cnsl.cloud = cloud.info;
    }
})();

module.exports = winston.cnsl;