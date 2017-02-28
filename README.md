# winston-logger-setup

This is a logger setup using winston and loggly which makes it easier for an application to maintain log files. There are separate log files for warn logs, debug logs, error logs and info logs. Cloud log to www.loggly.com can also be added with correct settings and there is also the plain old console log for console view only.

### Quick jumps
*   [Installation](#installation)
*   [Config](#config)
*   [Usage](#usage)


## Installation

```bashp
npm install winston-logger-setup
          OR
npm install winston-logger-setup --save
```


## Config

The package looks for a config-log.js file in the config folder inside root of the application for configuration settings. If found and if it contains the specified properties that are required for the package, it will use those values, else the default configurations values that are bundled with the package will be used instead.
An example of config-log.js file:
```js
module.exports = {
	logLevels: {
        levels: {
            error: 0,
            warn: 0,
            info: 0,
            debug: 0,
            cnsl: 0
        },
        colors: {
            error: 'red',
            warn: 'yellow',
            info: 'blue',
            debug: 'white',
            cnsl: 'green'
        }
    },
    cloud: {
        inputToken: 'j88m3-sjjhj33-dsfjj33',
        subdomain: 'LogglySubDomain'
    },
    logFolder: '/log/'
};
```

### logLevels
contains two properties - **_levels_** and **_colors_**

**_levels_** refers to the importance of the log, 0 being the most important and 5 being the least. If the importance of log is less, only the log file is updated while the console does not show the log. The level values in the above config example are also the default values bound with the package.

**_colors_** refers to the color of the log shown in the console. Only standard console colors are available. The color values in the above config example are also the default values bound with the package.

### cloud
contains configuration for loggly based cloud log setup. It contains two properties - **_inputToken_** and **_subdomain_**. The default configuration bound with the package does not contain any setting for cloud based log. The setting is obtained from user config file only.

**_inputToken_** is the token provided by loggly associated with an account.

**_subdomain_** is the name of the subdomain used to register an account.

### logFolder
contains path to the log folder respective from the root folder. The logFolder value in the above config example is also the default value bound with the package.


## Usage
Basically, it just needs to be imported in order to be used.
```js
let log = require('winston-logger-setup');

log.cnsl('hello world!!');
log.error('Oh Snap!!');
log.warn('depreciated!!');
log.debug('Response needs modification');
log.info('Response successfully received');
log.cloud('IP:' + ip + ' connected');
```
_log.cnsl_ is just the plain old log for console and doesn't get recorded to any file. _log.cloud_ is for the cloud based log. The rest are for their obvious respective log files.

By default, all logs are of their respective levels i.e. _log.error_ logs as an error level to the _error.log_ file. But, in case we need to register an _info_ level to the _error.log_ file, we can use the following statement.
```js
let log = require('winston-logger-setup');

log.errorLog.info("Oh snap!!");
```

It will be outputted as info log in console but will be recorded in the _error.log_ file.

Similar for the other log levels. Cloud log has info level by default.

#### Author: [Sujan Shrestha](http://twitter.com/shrsujan2007)
#### Contributors: [Sujan Shrestha](https://github.com/shrsujan)
