const mongoose = require("mongoose");
const slugify = require("slugify");

const newsSchema = new mongoose.Schema({
  newsName: {
    type: String,
    required: true,
  },
  newsLink: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^(ftp|http|https):\/\/[^ "]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid URL!`
    }
  },
  newsDate: { 
    type: Date,
    required: true,
  },
  newsImage: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

newsSchema.pre("save", function (next) {
  this.slug = slugify(this.newsName, { lower: true, strict: true });
  next();
});

const News = mongoose.model("News", newsSchema);

module.exports = News;
