// import express
const express = require('express');

// import express router
const router = express.Router();

// import passport to add authentication middleware
const passport = require('passport');

// import assets controller api
const assetApi = require('../../../controllers/api/v1/asset_api');

// route to return all properties
router.get('/', assetApi.getAssets);

// route to return all properties by user
router.get('/assetbyuser/:id', assetApi.getAssetsbyuser);

// route to return all searched properties
router.post('/search', assetApi.searchAssets);

// route to apply on property
router.post(
  '/apply/:id/:asset',
  passport.authenticate('jwt', { session: false }),
  assetApi.applyAsset
);
// export the router
module.exports = router;
