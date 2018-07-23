

var baseLogger = function() {
    this.counter = 0;
    this.log = function (msg) {
        var format = "( " + this.msgType + " Log: " + this.counter++ + " ) ";
        console.log(format + msg)
    }
};

var debugLogger = function() {};
debugLogger.prototype = new baseLogger();
debugLogger.prototype.msgType = "Debug";

var errorLogger = function () {};
errorLogger.prototype = new baseLogger();
errorLogger.prototype.msgType = "Error";

angular.module("customServices", [])
    .service("logService", debugLogger)
    .service("errorLogService", errorLogger)
    .provider("proLogService", function () {
        var debug = true;
        var count = true;
        var counter = 0;

        return {
            messageCountEnabled: function (setting) {
                if(angular.isDefined(setting)) {
                    count = setting;
                    return this;
                } else {
                    return count;
                }
            },
            debugEnabled: function (setting) {
                if(angular.isDefined(setting)) {
                    debug = setting;
                    return this;
                } else {
                    return debug;
                }
            },
            $get: function () {
                return {
                    log: function (msg) {
                        if(debug) {
                            var format = "( Pro Log " + (count ? counter++ + ": )" : ": )");
                            console.log(format + msg);
                        }
                    }
                };

            }
        }
    });
    //Factory
    // .factory("logService", function () {
    //     var counter = 0;
    //
    //     return {
    //         log: function (msg) {
    //             var format = "( Log: " + counter++ + " ) ";
    //             console.log(format + msg)
    //         }
    //     }
    // });

