require("dotenv").config();
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3-v2');

const { S3_ACCESS_KEY, S3_SECRET_ACCESS_KEY, S3_BUCKET_REGION, S3_BUCKET_NAME } = process.env;

// s3 관련 설정
const s3 = new aws.S3({
    accessKeyId : S3_ACCESS_KEY,
    secretAccessKey : S3_SECRET_ACCESS_KEY,
    region : S3_BUCKET_REGION,
});

// 장소추천 파일 업로드
const placeImageUpload = multer({
    storage: multerS3({
        s3: s3,
        bucket: `${S3_BUCKET_NAME}/uploadPlaceImage`,
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            cb(
                null,
                Math.floor(Math.random() * 1000).toString() +
                    Date.now() +
                    '.' +
                    file.originalname.split('.').pop()
            );
        },
    }),
    limits: { fileSize: 1000 * 1000 * 10 },
});

// 육아용품 리뷰 파일 업로드
const reviewImageUpload = multer({
    storage: multerS3({
        s3: s3,
        bucket: `${S3_BUCKET_NAME}/uploadReviewImage`,
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            cb(
                null,
                Math.floor(Math.random() * 1000).toString() +
                    Date.now() +
                    '.' +
                    file.originalname.split('.').pop()
            );
        },
    }),
    limits: { fileSize: 1000 * 1000 * 10 },
});

exports.placeImageUpload = multer(placeImageUpload);
exports.reviewImageUpload = multer(reviewImageUpload);