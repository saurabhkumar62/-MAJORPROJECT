const mongoose = require("mongoose");
const review = require("./review");
// const { ref } = require("joi");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    filename: String, 
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
 geometry: {
  type: {
    type: String, // Don't do `{ location: { types: String } }`
    enum: ['Point'], // 'location.type' must be 'point'
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  },
 },
//  self can do
//  category: {
//   type: String,
//   enum: ["mountains", "arctic", "farms"]
//  }
});

// listingSchema.postMessage("findOneAndDelete", async (listing) => {
//   if(listing) {
//     await Review.deleteMany({ _id: { $in: listing.reviews}});
//   }
// });

listingSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Review.deleteMany({ _id: { $in: doc.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;