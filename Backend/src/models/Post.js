const mongoose = require('../database/connection');
const aws = require("aws-sdk");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const s3 = new aws.S3();

const postSchema = new mongoose.Schema({
    name: String,
    key: String,
    size: Number,
    url: String,
    create_at: {
        type: Date,
        default: Date.now
    }
})

postSchema.pre("save", function () {
    if (!this.url) {
        this.url = `${process.env.APP_URL}/files/${this.key}`;
    }
});

postSchema.pre("remove", function () {
    if (process.env.STORAGE_TYPE === "s3") {
        return s3
            .deleteObject({
                Bucket: process.env.BUCKET_NAME,
                Key: this.key
            })
            .promise()
            .then(response => {
                console.log(response.status);
            })
            .catch(response => {
                console.log(response.status);
            });
    } else {
        return promisify(fs.unlink)(
            path.resolve(__dirname, "..", "..", "tmp", "uploads", this.key)
        );
    }
});


const post = new mongoose.model('Post', postSchema);

module.exports = post;