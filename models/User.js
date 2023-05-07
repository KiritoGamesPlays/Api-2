import mongoose from "mongoose"
const Schema = mongoose.Schema;

let userSchema = new Schema({
  id: { type: String },
  top: { type: Boolean, default: true },
  verified: { type: Boolean, default: false},
  ruby: {type: Number, default: 0},
  buffer: {type: Buffer, default: null},
  vip: {
    pending: { type: Boolean, default: false },
    status: {type: Boolean, default: false},
    type: { type: String, default: null },
    lifetime: {type: Boolean, default: false},
    time: { type: Number, default: 0 },
    link: { type: String, default: null},
    payID: { type: Number, default: 0},
    date: { type: Number, default: 0}
   },
  conflip: {
    joins: { type: Number, default: 0 },
    wins: { type: Number, default: 0 },
    over: { type: Number, default: 0},
    total: {type: Number, default: 0},
  },
  blacklist: { 
    status: { type: Boolean, default: false },
    reason: { type: String, default: null}
},
staff: { type: Boolean, default: false },
  afk: {
      status: { type: Boolean, default: false },
      message: { type: String, default: null}
},
  profile: {
  layout: { type: String, default: "default"},
  background: { type: String, default: 'https://i.imgur.com/mAuJOud.png'},
  aboutme: {type: String, default: null},
  backgrounds: { type: Array, default: []},
  reps: {
    count: {type: Number, default: 0},
    time: {type: Number, default: 0},
    myReps: {type: Array, default: []},
  },
  daily: {
    count: {type: Number, default: 0},
    time: {type: Number, default: 0},
   },
  marry: {
    status: { type: String },
    parent: { type: String },
    time: { type: Number, default: Date.now() },
  }
  },
  transactions: { type: Array, default: []}
});

const User = mongoose.model("users", userSchema);
export default User;