// import express
const express = require('express');

// import express router
const router = express.Router();

// import passport to add authentication middleware
const passport = require('passport');

// import user controller actions
const homeController = require('../controllers/home_controller');

console.log('router is loaded !!');

//adding home route to home action
router.get('/', passport.checkAuthentication, homeController.home);

router.get(
  '/addAssetForm/:id',
  passport.checkAuthentication,
  homeController.propertyForm
);

router.post(
  '/addAsset/:id',
  passport.checkAuthentication,
  homeController.addAsset
);

router.get(
  '/update-status/:id/:userid/:status',
  passport.checkAuthentication,
  homeController.updateStatus
);

// export the router
module.exports = router;
