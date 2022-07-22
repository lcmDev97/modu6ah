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
});

// 장소추천 이미지 삭제
const placeImageDelete = (imageUrl) => {
    if (imageUrl === 'https://changminbucket.s3.ap-northeast-2.amazonaws.com/basicProfile.png')
        return;
    const filename = imageUrl.split('/')[4];
    s3.deleteObject(
        {
            Bucket: `${S3_BUCKET_NAME}/uploadPlaceImage`,
            Key: filename,
        },
        function (err, data) {}
    );
};

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
// const reviewImageDelete = async objectArr => {
//     const params = {
//         Bucket: `${S3_BUCKET_NAME}/uploadReviewImage`,
//         Delete: {
//             Objects: objectArr,
//             Quiet: false
//         }
//     };

//     try {
//         const result = await s3.deleteObjects(params).promise();
//         return result;
//     } catch(err) {
//         console.log(err);
//     }
// }

// const reviewImageDelete = (imageUrl) => {
//     if (imageUrl) {
//         s3.deleteObject(
//             {
//                 Bucket: `${S3_BUCKET_NAME}/uploadReviewImage`,
//                 Key: filename,
//             },
//             function (err, data) {}
//         );
//     }

// };

// const deleteImg = (url) => {
//     if (url) {
//         s3.deleteObject(
//             {
//                 Bucket: process.env.AWS_S3_BUCKET,
//                 Key: url,
//             },
//             function (err, data) {}
//         )
//         s3.deleteObject(
//             {
//                 Bucket: process.env.AWS_S3_BUCKET_W384,
//                 Key: url,
//             },
//             function (err, data) {}
//         )
//         s3.deleteObject(
//             {
//                 Bucket: process.env.AWS_S3_BUCKET_W758,
//                 Key: url,
//             },
//             function (err, data) {}
//         )
//     }
// }

// const deleteCourseImg = (url) => {
//     if (url) {
//         // const filename = url.split('/')[4]
//         s3.deleteObject(
//             {
//                 Bucket: process.env.AWS_S3_BUCKET3,
//                 Key: url,
//             },
//             function (err, data) {}
//         )
//     }

exports.placeImageUpload = multer(placeImageUpload);
// exports.reviewImageUpload = multer(reviewImageUpload);
exports.reviewImageDelete = reviewImageDelete;
exports.placeImageDelete = placeImageDelete;