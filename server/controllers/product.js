const Product = require('../models/Product');

class ProductController {

  static postCreateProduct(req, res, next) {
    const url = req.file ? req.file.cloudStoragePublicUrl : 'https://storage.googleapis.com/undefined/upload/product-hash-1558172073996.png';
    const sellerId = req.authenticated.id;

    const {
      name,
      stock,
      price,
      description,
    } = req.body;

    const newProduct = new Product({
      name,
      stock,
      price,
      description,
      url,
      sellerId,
    });
    console.log(newProduct)
    newProduct.save()
      .then((product) => {
        res.status(201).json(product);
      })
      .catch((error) => {
        next(error);
      });
  };

  static getAllProducts(req, res, next) {
    const { name } = req.query;
    let queries = {};

    if( name ){   
        name = new RegExp(`${tag}`);
        queries = { $or: [
          { 'name' : { $regex: name , $options: 'ig' } },
        ]};
    };

    Product.find(queries)
      .then((products) => {
        res.status(200).json(products);
      })
      .catch((error) => {
        next(error);
      });
  };

  static getProductById(req, res, next) {
    const { id } = req.params;

    Product.findById(id)
      .then((product) => {
        console.log(product)
        res.status(200).json(product);
      })
      .catch((error) =>{
        next(error);
      });
  };

  static putEditProductById(req, res, next) {
    const { id } = req.params;
    console.log(req.body);
    const {
      name,
      stock,
      price,
      imgUrl,
      description,
    } = req.body;

    const url = req.file ? req.file.cloudStoragePublicUrl : imgUrl;

    const updated = {
      name,
      stock,
      price,
      description,
      url,
    };

    Product.findOneAndUpdate({ _id: id }, updated, { new:true, runValidators: true })
      .then((product) => {
        res.status(200).json(product);
      })
      .catch((error) => {
        next(error);
      });

  };

  static deleteProductById(req, res, next) {
    const { id } = req.params;

    Product.findByIdAndDelete(id)
      .then(() => {
        res.status(204).json();
      })
      .catch((error) => {
        next(error);
      });
  };

};

module.exports = ProductController;
