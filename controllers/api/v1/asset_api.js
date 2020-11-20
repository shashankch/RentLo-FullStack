const Asset = require('../../../models/asset');
const User = require('../../../models/user');

module.exports.getAssets = async (req, res) => {
  try {
    let assets = await Asset.find({})
      .sort('createdAt')
      .populate('owner', 'name email')
      .populate('tenant', 'name email');

    return res.status(200).json({
      message: 'list of properties',
      assets: assets,
    });
  } catch (error) {
    // send error response on req fail
    console.log('***', err);
    return res.json(500, {
      message: 'Internal Server Error',
    });
  }
};

module.exports.searchAssets = async (req, res) => {
  try {
    let locationLo =
      req.body.location[0].toLowerCase() + req.body.location.substring(1);
    let locationUp =
      req.body.location[0].toUpperCase() + req.body.location.substring(1);
    let lo = req.body.location.toLowerCase();
    let up = req.body.location.toUpperCase();

    let assets = await Asset.find({
      size: req.body.size,
      location: { $in: [lo, up, locationLo, locationUp] },
      rent: { $lte: req.body.rent },
    })
      .sort('createdAt')
      .populate('owner', 'name email')
      .populate('tenant', 'name email');

    return res.status(200).json({
      message: 'Fileterd list of properties',
      assets: assets,
    });
  } catch (error) {
    // send error response on req fail
    console.log('***', err);
    return res.json(500, {
      message: 'Internal Server Error',
    });
  }
};

module.exports.applyAsset = async (req, res) => {
  try {
    let user = await User.findById(req.params.id).exec();
    let property = await Asset.findById(req.params.asset).exec();
    if (user && property) {
      console.log('user.assets', user.assets);
      let exists = user.assets.filter((asset) => asset == req.params.asset);
      console.log('exists@@@@@##', exists);
      if (exists.length != 0) {
        return res.json(200, {
          message: 'Already Applied',
        });
      }

      user.assets.push(property);
      user.save();
      property.tenant.push({ id: user, status: 'Pending' });
      property.save();

      return res.json(200, {
        message: 'Applied Successfully',
      });
    } else {
      return res.json(500, {
        message: 'Not Found!',
      });
    }
  } catch (error) {
    // send error response on req fail
    console.log('***', err);
    return res.json(500, {
      message: 'Internal Server Error',
    });
  }
};

module.exports.getAssetsbyuser = async (req, res) => {
  try {
    let user = await User.findById(req.params.id).exec();
    user = await user
      .populate('assets')
      .populate({
        path: 'assets',
        populate: {
          path: 'owner',
        },
      })
      .execPopulate();
    console.log('user###', user);
    if (user.assets) {
      return res.json(200, {
        message: 'success',
        assets: user.assets,
      });
    } else {
      return res.json(500, {
        message: 'not found',
      });
    }
  } catch (error) {
    // send error response on req fail
    console.log('***', err);
    return res.json(500, {
      message: 'Internal Server Error',
    });
  }
};
