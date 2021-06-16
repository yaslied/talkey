exports.authRouter = (router, app) => {

    const userController = require('../controllers/users');

    router.post('/signUp', userController.createUser);

    router.post('/login', (...args)=>{
        console.log('login');
        app.oauth.grant().apply(null, args);
    });

    return router
}