> WIP - not ready for production yet.
> Please use another logger if you need a logger in your meteor app

# logger
yet another meteor logger

I am not satisfied with other loggers for meteor.
Hence I am rolling up my own logger.

* Support for multiple transport layers. I am using [winston](https://github.com/winstonjs/winston) because I can reuse existing [transports](https://github.com/winstonjs/winston/blob/master/docs/transports.md). The idea [2] is to delegate log storing and analysis to external services (e.g. loggly, keen.io).
* Clients send log data to server where they are dispatched over different transport layers.
* Structured logs to describe complex events.

Influenced by

[1] [Managing a Meteor application in production]( https://www.loggly.com/blog/managing-a-meteor-application-in-production-three-real-log-management-use-cases/)

[2] [Logging support for Meteor](https://meteorhacks.com/logging-support-for-meteor)
