const latestSoftware = require("../models/LatestSoftware");


exports.addLastestSoftware = async (req, res, next) => {
  if (!req.body.softwareID) {
    res.status(400).json({ success: false, message: "softwareID is required" });
    return;
  }

  const data = new latestSoftware({
    softwareID: req.body.softwareID,
  });
  data
    .save()
    .then((response) =>
      res.status(201).json({
        success: true,
        data: response,
      })
    )
    .catch((error) => res.status(400).json({ success: false, message: error }));
};

exports.fetchLastestSoftwares = async (req, res, next) => {
  latestSoftware.find().limit((req.params.limit) ? parseInt(req.params.limit) : null)
    .populate({
      path: 'softwareID',
      populate: {
        path: 'softwareCategory'
      }
    })
    .then((response) => {
      res.status(201).json({
        success: true,
        data: response,
      });
    })
    .catch((error) => res.status(400).json({ success: false, message: error }));
};

exports.fetchLastestSoftwaresById = async (req, res, next) => {
  latestSoftware.find({ softwareID: req.params.id })
    .populate({
      path: 'softwareID',
      populate: {
        path: 'softwareCategory'
      }
    })
    .then((response) => {
      res.status(201).json({
        success: true,
        data: response,
      });
    })
    .catch((error) => res.status(400).json({ success: false, message: error }));
};


exports.remove = async (req, res, next) => {

  if (!req.query.id) {
    res.status(400).json({ success: false, message: "ID not found" });
    return;
  }
  latestSoftware.findByIdAndDelete(req.query.id)
    .then(() => res.status(200).json({ success: true, message: 'Latest Software has been deleted' }))
    .catch(err => res.status(400).json({ success: false, message: err }));
};

exports.removeByColoumn = async (req, res, next) => {
  if (!req.query.id) {
    res.status(401).json({ success: false, message: "ID not found" });
    return;
  }
  latestSoftware.findOneAndDelete({ softwareID: req.query.id })
    .then(() => res.status(200).json({ success: true, message: 'Latest Software has been deleted' }))
    .catch(err => res.status(400).json({ success: false, message: err }));
};