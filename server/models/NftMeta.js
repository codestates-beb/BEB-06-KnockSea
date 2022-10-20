//TODO(v) : NftMeta SChema 작성
//API 서버 따로 만들 것인지?
const mongoose = require("mongoose");

const NftMetaSchema = mongoose.Schema({
  tokenId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  createAt: {
    type: Date,
    defualt: Date.now,
  },
});

module.exports = mongoose.model("NftMeta", NftMetaSchema);
