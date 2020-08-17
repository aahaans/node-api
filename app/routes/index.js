const noteRoutes = require('./note_routes');

module.exports = function (app, db) {
    noteRoutes.postdb(app, db);
    noteRoutes.getdb(app, db);
    noteRoutes.getnote(app, db);
    noteRoutes.putnote(app, db);
    noteRoutes.deletenote(app, db);
};
