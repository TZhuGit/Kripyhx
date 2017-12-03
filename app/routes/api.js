var User = require('../models/user');
var jwt = require('jsonwebtoken');
var secret = 'pubg';

module.exports = function(router) {
    // http://localhost:8080/api/users
    //Enter data into the database use post
    //User Registration Route
    router.post('/users', function(req, res){
        var user = new User();
        user.username = req.body.username;
        user.password = req.body.password;
        user.email = req.body.email;
        if(req.body.username == null || req.body.username == "" || req.body.password == null || req.body.password == "" || req.body.email == null || req.body.email == ""){
            res.json({success: false, message:"Ensure username, email, and password are provided"});
        } else {
            user.save(function(err){
                if(err){
                    res.json({success: false, message:"Username or email already exists"});
                } else{
                    res.json({success: true, message:"User Created"});
                }
            });
        }
    });


    //User login route
    // http://localhost:8080/api/authenticate
    router.post('/authenticate', function(req, res){
        User.findOne({ username: req.body.username}).select('email username password').exec(function(err,user){
            if (err){
                throw err;
            } 
            if (!user){
                res.json({success:false, message: 'Could not authenticate user: username not found'});
            } else if (user) {
                if(req.body.password){
                    var validPassword = user.comparePassword(req.body.password);
                    if(!validPassword){
                        res.json({success: false, message: 'Could not authenticate password'});
                    } else {
                        var token = jwt.sign({
                            username: user.username,
                            email: user.email
                        }, secret, { expiresIn: '24h'});
                        res.json({success: true, message: 'User authenticated', token: token});
                    }
                } else {
                  res.json({success:false, message: 'No password provided'});
                }

            }
        });
    });
    return router;
}