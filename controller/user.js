const UserModel = require("../model/user");
// const { add_user_schema } = require("../schema/user")
// const createError = require('http-errors')

module.exports = {
  addUser: async (req, res, next) => {
    try {
      const { query, response } = req.body;

      // const result = await add_user_schema.validateAsync(req.body);
      // console.log(result);

      // const userExist = await UserModel.findOne({ email: email })
      // if( userExist ){
      //   console.log(' email is exist ');
      //   throw createError(` ${email} is exists`)
      // }
      
      const user = new UserModel({
        query: query,
        response: response,
      });
      await user
        .save()
        .then(async () => {
          return res.status(200).json({
            message: "User added Successfully",
            status: 1,
          });
        })
        .catch((err) => {
          const error = new Error(err);
          next(error);
        });
    } catch (err) {
      const error = new Error(err);
      next(error);
    }
  },
  userUpdate: async (req, res, next) => {
    try {
      const { query, response } = req.body;
      UserModel.updateOne(
        { _id: req.params.id },
        { query: query, response: response }
      )
        .then(() => {
          return res.status(200).json({
            message: "User updated Successfully",
            status: 1,
          });
        })
        .catch((err) => {
          return res.status(500).json({
            message: "User not updated",
            status: 0,
          });
        });
    } catch (err) {
      const error = new Error(err);
      next(error);
    }
  },
  userDetails: async (req, res, next) => {
    try {
      const userId = req.params.id;

      await UserModel.findOne({ _id: userId })
        .then(async (data) => {
          return res.status(200).json({
            message: "User data fetched Successfully",
            user: data,
            status: 1,
          });
        })
        .catch((err) => {
          const error = new Error(err);
          next(error);
        });
    } catch (err) {
      const error = new Error(err);
      next(error);
    }
  },
  deleteUser: async (req, res, next) => {
    try {
      const userId = req.params.id;

      await UserModel.deleteOne({ _id: userId })
        .then(async () => {
          return res.status(200).json({
            message: "User data is Successfully deleted",
            status: 1,
          });
        })
        .catch((err) => {
          const error = new Error(err);
          next(error);
        });
    } catch (err) {
      const error = new Error(err);
      next(error);
    }
  },
  allUser: async (req, res, next) => {
    try {
      await UserModel.find()
        .then(async (data) => {
          return res.status(200).json({
            message: "All User data is here",
            user: data,
            status: 1,
          });
        })
        .catch((err) => {
          const error = new Error(err);
          next(error);
        });
    } catch (err) {
      const error = new Error(err);
      next(error);
    }
  },
  userQuery: async (req, res, next) => {
    try {
      const userQuery = req.body.userquery; //userqueyr in body of the req

      await UserModel.findOne({ query: userQuery })
        .then(async (data) => {
          if(data){
            return res.status(200).json({
              message: "User data fetched Successfully",
              user: data,
              status: 1,
            });
          }else{
            return res.status(200).json({
              message: "this query doesn't exists",
              user: {"query": "Hi",
              "response": "sorry unable to process",},
              status: 1,
            });
          }
         
        })
        .catch((err) => {
          const error = new Error(err);
          next(error);
        });
    } catch (err) {
      const error = new Error(err);
      next(error);
    }
  },
};
