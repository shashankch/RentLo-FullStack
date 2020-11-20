// import user model
const User = require('../models/user');

const Asset = require('../models/asset');

// home controller action to render home page
module.exports.home = async function (req, res) {
  let assets = await Asset.find({ owner: req.user.id })
    .populate('owner')
    .populate('tenant.id');

  if (assets) {
    return res.render('home', {
      title: 'All Properties',
      assets: assets,
    });
  } else {
    return res.render('home', {
      title: 'All Properties',
    });
  }
};

module.exports.propertyForm = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    return res.render('add_property', {
      title: 'Add Properties',
      profile_user: user,
    });
  });
};

module.exports.addAsset = async function (req, res) {
  try {
    if (req.user.id == req.params.id) {
      Asset.create(
        {
          size: req.body.size,
          location: req.body.location,
          rent: req.body.rent,
          owner: req.params.id,
        },
        (err, asset) => {
          if (err) {
            req.flash('error', err);
            return res.redirect('back');
          }
          return res.redirect('/');
        }
      );
    } else {
      req.flash('error', 'Unauthorized!');
      return res.status(401).send('Unauthorized');
    }
  } catch (err) {
    console.log(err);
    req.flash('error', err);
    return res.redirect('/');
  }
};

module.exports.updateStatus = async function (req, res) {
  try {
    let property = await Asset.findById(req.params.id);
    console.log('prop', property);
    console.log('userid', req.params.userid);
    let arr = property.tenant;
    for (tnt of arr) {
      console.log('tenant id', tnt.id._id);
      if (tnt.id._id == req.params.userid) {
        tnt.stat = req.params.status;
      }
    }

    property.tenant = arr;
    property.save();
    return res.redirect('back');
  } catch (err) {
    console.log(err);
    req.flash('error', err);
    return res.redirect('/');
  }
};
