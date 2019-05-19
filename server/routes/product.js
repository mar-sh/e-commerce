const express = require('express');

const imageMiddleware = require('../middlewares/image');
const authMiddleware = require('../middlewares/auth');
const controller = require('../controllers/product');

const {
  upload,
  sendUploadToGCS,
} = imageMiddleware;

const {
  userAuthentication,
  productAuthorization,
  adminAuthorization,
} = authMiddleware;

const {
  postCreateProduct,
  getAllProducts,
  getProductById,
  putEditProductById,
  deleteProductById,
} = controller;

const router = express.Router();

router.post('/', userAuthentication, adminAuthorization, upload.single('image'), sendUploadToGCS, postCreateProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.put('/:id', userAuthentication, productAuthorization, upload.single('image'), sendUploadToGCS, putEditProductById);
router.delete('/:id', userAuthentication, productAuthorization, deleteProductById);

module.exports = router;