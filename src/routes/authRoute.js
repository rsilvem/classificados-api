
const controller = require('../controllers/authController')

module.exports = (router, app) => {
    router.post("/register", controller.registerUser);
    router.post("/login", app.oauth.grant(), controller.login);

    return router;
};