const HttpError = require("http-errors");
const validate = require('../configurations/validate');
const JWT = require("jsonwebtoken");
const {JWT_SECRET} = process.env;
const {User} = require('../database');
const {ValidationError} = require('sequelize');
class UserController {

    static async signUp(req, res, next) {
        try {
            await validate(req.body, {
                email: 'required|email',
                first_name: 'required|string',
                last_name: 'required|string',
                password: 'required|string'
            });
            const {
                email,
                first_name,
                last_name,
                password
            } = req.body;

            const newUser = await User.create({
                email,
                first_name,
                last_name,
                password
            }).catch (e => {
                if(e instanceof ValidationError){
                    const errors =  e.errors[0].message;
                    throw new HttpError(400, {
                        stack: 'Input validator',
                        message: {email:{"message":errors, unique:true}},
                    });
                }
                console.error(e);
            })

            return res.status(200).send({
                status: "success",
                message: 'User successfully created',
                newUser
            });

        } catch (e) {
            next(e)
        }
    };

    static async signIn(req, res, next) {
        try {
            await validate(req.body, {
                email: 'required|email',
                password: 'required|string',
            });
            const {
                email,
                password
            } = req.body;

            const userData = await User.findOne({
                where: {
                    email
                }
            }).then( async (user) => {
                if (!user)  next(new HttpError(400, "Invalid user or password"));
                if(!user.dataValues.password || !await user.validPassword(password, user.dataValues.password)) {
                    next(new HttpError(400, "Invalid user or password"))
                }else {
                    return user.toJSON()
                }
            })
            if (!userData) next(new HttpError(400, "Invalid user or password"));

            const token = JWT.sign({id: userData.id}, JWT_SECRET);

            return res.status(200).send({
                status: "success",
                message: 'User successfully login',
                userData,
                token,
            });

        } catch (e) {
            next(e)
        }
    };

    static async destroy(req, res, next) {
        try {
            await validate(req.params, {
                id: 'required|numeric',
            });
            const {id} = req.params;

            const userData = await User.destroy({where: {id}});

            return res.status(200).send({
                status: "success",
                message: 'User successfully deleted',
                userData,
            });

        } catch (e) {
            console.log(e);
            next(e)
        }
    };

    static async list(req, res, next) {
        try {

            const userData = await User.findAll({ attributes: { exclude: ['password'] }});

            return res.status(200).send({
                status: "success",
                message: 'Users list',
                userData,
            });

        } catch (e) {
            console.log(e);
            next(e)
        }
    };

}

module.exports = UserController;
