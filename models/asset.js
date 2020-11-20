// import mongoose odm module
const mongoose = require('mongoose');

// creating the asset schema
const assetSchema = new mongoose.Schema(
  {
    size: {
      type: Number,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },
    rent: {
      type: String,
      required: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    tenant: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        stat: {
          type: String,
          default: 'Pending',
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
// creating model from schema
const Asset = mongoose.model('Asset', assetSchema);

// export the model
module.exports = Asset;
