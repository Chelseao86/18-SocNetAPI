// Thought controller
const{User, Thought} = require('../models');

const tController = {
    getThoughts(req,res){ // get all thought posts
        Thought.find()
        .sort({ createdAt: -1 })
        .then((dbThoughtData) => {
            res.json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    getOneThought(req, res){ // get one thought post
        Thought.findOne({ _id: req.params.thoughtId })
        .then((dbThoughtData) => {
          if (!dbThoughtData) {
            return res.status(404).json({ message: 'No thought with this id!' });
          }
          res.json(dbThoughtData);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
    createThought(req, res){ // create a thought post
        Thought.create(req.body)
        .then((dbThoughtData) => {
          return User.findOneAndUpdate(
            { _id: req.body.userId },
            { $push: { thoughts: dbThoughtData._id } },
            { new: true }
          );
        })
        .then((dbUserData) => {
          if (!dbUserData) {
            return res.status(404).json({ message: 'Thought created but no user with this id!' });
          }
  
          res.json({ message: 'Thought successfully created!' });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
    updateThought(req, res){ // update a thought post
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true })
        .then((dbThoughtData) => {
          if (!dbThoughtData) {
            return res.status(404).json({ message: 'No thought with this id!' });
          }
          res.json(dbThoughtData);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
    deleteThought(req, res){ // delete a thought post
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
        .then((dbThoughtData) => {
          if (!dbThoughtData) {
            return res.status(404).json({ message: 'No thought with this id!' });
          }
        });
    },
    
    createReaction(req, res){ // create/add a reaction to a thought
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
          )
            .then((dbThoughtData) => {
              if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thought with this id!' });
              }
              res.json(dbThoughtData);
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json(err);
            });
    },
    deleteReaction(req, res){ // delete a reaction to a thought
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
          )
            .then((dbThoughtData) => {
              if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thought with this id!' });
              }
              res.json(dbThoughtData);
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json(err);
            });
    },
};

module.exports = tController;