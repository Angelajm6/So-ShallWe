const mongoose = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const ReactionSchema = new mongoose.Schema(
  {
   
    reactionId: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },
   
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
  
    username: {
      type: String,
      required: true,
    },
  
    createdAt: {
      type: Date,
      default: Date.now,
      // Format the timestamp on query using the dateFormat function
      get: (timestamp) => dateFormat(timestamp),
    },
  },
  {
    // Include getters for the toJSON function and exclude ID from output
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// Create Thought Schema
const ThoughtSchema = new mongoose.Schema(
  {
   
    thoughtText: {
      type: String,
      required: "Thought is Required",
      minlength: 1,
      maxlength: 280,
    },
  
    createdAt: {
      type: Date,
      default: Date.now,
     
      get: (timestamp) => dateFormat(timestamp),
    },

    username: {
      type: String,
      required: true,
    },
  
    reactions: [ReactionSchema],
  },
  {
    // Include virtuals and getters for the toJSON function and exclude ID from output
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Create virtual property for the number of reactions associated with a thought
ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// Create Thought model based on the ThoughtSchema
const Thought = mongoose.model("Thought", ThoughtSchema);


module.exports = Thought;