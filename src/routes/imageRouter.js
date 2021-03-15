const { Router } = require('express');
const imageRouter = Router();
const cloudinary = require('cloudinary').v2;
const fs = require('fs-extra');
const ProductosCloud = require('../models/ProductosCloud.js');
const hbars = require('express-handlebars');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  apy_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

imageRouter.get('/', async (req, res) => {
  const photos = await ProductosCloud.find();
  const result = photos.map(({ _id,nombre, marca, categoria, descripcion, imageCloudUrl, public_id }) =>
    [_id,nombre, marca, categoria, descripcion, imageCloudUrl, public_id]);
  console.log(result);
  res.render('partials/images', { result });
});

imageRouter.get('/images/add', async (req, res) => {
  const photos = await ProductosCloud.find();
  const result = photos.map(({ _id,nombre, marca, categoria, descripcion, imageCloudUrl, public_id }) =>
    [_id,nombre, marca, categoria, descripcion, imageCloudUrl, public_id]);
  res.render('partials/image_form', { result });
})

imageRouter.post('/images/add', async (req, res) => {
  const { _id,nombre, marca, categoria, descripcion } = req.body;
  const resultImage = await cloudinary.uploader.upload(req.file.path).catch(error => console.log(error));
  console.log("imagen subida a cloudinary ok!!!", resultImage);
  const newPhoto = new ProductosCloud({
    nombre: nombre,
    marca: marca,
    categoria: categoria,
    descripcion: descripcion,
    imageCloudUrl: resultImage.url,
    public_id: resultImage.public_id,
  });

  await newPhoto.save();
  await fs.unlink(req.file.path)
  res.redirect("/");
});

imageRouter.get('/images/delete/:photo_id', async (req, res) => {
  const { photo_id } = req.params;
  console.log('id a eliminar: ', photo_id);
  const deletedPhoto = await ProductosCloud.findByIdAndDelete(photo_id);
  const result = await cloudinary.uploader.destroy(deletedPhoto.public_id);
  console.log("eliminacion =>:", result);
   res.redirect('/images/add');
});

module.exports = imageRouter;