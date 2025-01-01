const courseRoutes = require("./course.routes");
const instructorRoutes = require("./instructor.routes");
const userRoutes = require('./user.routes');
const paymentRoutes = require('./payment.routes');
const contactRoutes = require('./contact.routes');
const categoryRoutes = require('./categories.routes');

module.exports = (app) => {
    app.use("/api/courses", courseRoutes);
    app.use("/api/instructors", instructorRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/payments', paymentRoutes);
    app.use('/api/contacts', contactRoutes);
    app.use('/api/categories', categoryRoutes);
}