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

// 이미지 관련 설정
const limits = {
    fieldNameSize: 200,
    fieldSize: 5 * 1024 * 1024,
    fileSize: 15 * 1024 * 1024,
    files: 3
}

const fileFilter = (req, file, cb) => {
    const typeArray = file.mimetype.split('/');
    const fileType = typeArray[1];

    if (fileType === 'jpg' ||
        fileType === 'png' ||
        fileType === 'jpeg' ||
        fileType === 'gif' ||
        fileType === 'webp'
        ) {
            cb(null, true)
        } else {
            return cb( { message: '지원되는 이미지 파일 형식이 아닙니다.' }, false)
        }
}

// 장소추천 이미지 업로드(리사이징 적용)
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
    limits: limits,
    fileFilter: fileFilter,
}
);

// 장소추천 이미지 삭제
const placeImageDelete = async objectArr => {
    const params = {
        Bucket: S3_BUCKET_NAME,
        Delete: {
            Objects: objectArr,
            Quiet: false
        }
    };

    try {
        const result = await s3.deleteObjects(params).promise();
        return result;
    } catch(err) {
        console.log(err);
    }
}

// 육아용품 리뷰 이미지 업로드(리사이징 적용)
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
    limits: limits,
    fileFilter: fileFilter,
});

// 육아용품 리뷰 이미지 삭제
const reviewImageDelete = async objectArr => {
    const params = {
        Bucket: S3_BUCKET_NAME,
        Delete: {
            Objects: objectArr,
            Quiet: false
        }
    };

    try {
        const result = await s3.deleteObjects(params).promise();
        return result;
    } catch(err) {
        console.log(err);
    }
}

exports.placeImageUpload = multer(placeImageUpload);
exports.reviewImageUpload = multer(reviewImageUpload);
exports.reviewImageDelete = reviewImageDelete;
exports.placeImageDelete = placeImageDelete;