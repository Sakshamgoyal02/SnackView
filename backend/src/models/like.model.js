const mongoose = require ("mongoose");

const likeSchema = new mongoose.Schema({
    like:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        
    }, 
    food:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'food',
        required: true
    }
 },
  {
        timestamps: true
    }
)

const likeModel = mongoose.model('like', likeSchema);
module.exports = likeModel;