const UserModel = require("../model/user");
// const { add_user_schema } = require("../schema/user")
// const createError = require('http-errors')

module.exports = {
  addUserQuery: async (req, res, next) => {
    try {
      const { query, response } = req.body;
      
      const user = new UserModel({
        query: query,
        response: response,
      });
      await user
        .save()
        .then(async () => {
          return res.status(200).json({
            message: "User Query added Successfully",
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
  userQueryUpdate: async (req, res, next) => {
    try {
      const { query, response } = req.body;
      UserModel.updateOne(
        { _id: req.params.id },
        { query: query, response: response }
      )
        .then(() => {
          return res.status(200).json({
            message: "User Query updated Successfully",
            status: 1,
          });
        })
        .catch((err) => {
          return res.status(500).json({
            message: "User  Query not updated",
            status: 0,
          });
        });
    } catch (err) {
      const error = new Error(err);
      next(error);
    }
  },
  deleteUserQuery: async (req, res, next) => {
    try {
      const userId = req.params.id;

      await UserModel.deleteOne({ _id: userId })
        .then(async () => {
          return res.status(200).json({
            message: "User Query is Successfully deleted",
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
  allUserQuery: async (req, res, next) => {
    try {
      await UserModel.find()
        .then(async (data) => {
          return res.status(200).json({
            message: "All User Query is here",
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
              message: "User Query fetched Successfully",
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
