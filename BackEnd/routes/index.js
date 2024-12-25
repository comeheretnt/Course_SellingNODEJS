const courseRoutes = require("./course.routes");
const instructorRoutes = require("./instructor.routes");
const userRoutes = require('./user.routes');

module.exports = (app) => {
    app.use("/api/courses", courseRoutes);
    app.use("/api/instructors", instructorRoutes);
    app.use('/api/users', userRoutes);
}