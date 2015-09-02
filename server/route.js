/*global module,require*/
var ctrl = require("./controller"),
    util = require("util"),
    handler = require("./handler");

exports = module.exports = function (app, config, logger) {
    handler = handler(config, logger);
    ctrl = ctrl(config, logger);
    app.use(handler.domainMiddleware);
    app.use(handler.init);

    app.get("/api/requests/:id/inspects", ctrl.request.getInspectList);
    app.get("", ctrl.request.index);
    app.get("/:id/inspect", ctrl.request.list);
    app.get("/create", ctrl.request.create);
    app.get("/:id", ctrl.request.response);
    app.post("/:id", ctrl.request.response);
    app.put("/:id", ctrl.request.response);
    app.delete("/:id", ctrl.request.response);

    app.get('*', ctrl.request.notFound);
    app.post('*', ctrl.request.notFound);
    app.put('*', ctrl.request.notFound);
    app.delete('*', ctrl.request.notFound);

    // Error handler
    app.use(handler.errorHandler);
};