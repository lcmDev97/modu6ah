require("dotenv").config();
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3-transform');
// const multerS3 = require('multer-s3-v2');
const sharp = require('sharp');

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
        shouldTransform: true,
        transforms: [
            {
                id: 'resized',
                key: function (req, file, cb) {
                    cb(
                        null,
                        Math.floor(Math.random() * 1000).toString() +
                            Date.now() +
                            '.' +
                            file.originalname.split('.').pop()
                    );
                },
                transform: function (req, file, cb) {
                    cb(null, sharp().resize(300, 300).withMetadata());
                },
            },
        ],
    }),
    // limits: { fileSize: 20 * 1024 * 1024 },
});

// 육아용품 리뷰 파일 업로드
const reviewImageUpload = multer({
    storage: multerS3({
        s3: s3,
        bucket: `${S3_BUCKET_NAME}/uploadReviewImage`,
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        shouldTransform: true,
        transforms: [
            {
                id: 'resized',
                key: function (req, file, cb) {
                    cb(
                        null,
                        Math.floor(Math.random() * 1000).toString() +
                            Date.now() +
                            '.' +
                            file.originalname.split('.').pop()
                    );
                },
                transform: function (req, file, cb) {
                    cb(null, sharp().resize(300, 300).withMetadata());
                },
            },
        ],
    }),
    // limits: { fileSize: 20 * 1024 * 1024 },
});

// const reviewImageUpload = multer({
//     storage: multerS3({
//         s3: s3,
//         bucket: `${S3_BUCKET_NAME}/uploadReviewImage`,
//         acl: 'public-read',
//         contentType: multerS3.AUTO_CONTENT_TYPE,
//         key: function (req, file, cb) {
//             cb(
//                 null,
//                 Math.floor(Math.random() * 1000).toString() +
//                     Date.now() +
//                     '.' +
//                     file.originalname.split('.').pop()
//             );
//         },
//     }),
//     limits: { fileSize: 20 * 1024 * 1024 },
// });

exports.placeImageUpload = multer(placeImageUpload);
exports.reviewImageUpload = multer(reviewImageUpload);