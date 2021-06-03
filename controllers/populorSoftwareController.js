const populorSoftware = require("../models/PopulorSoftware");

exports.addPopulorSoftware = async (req, res, next) => {
  if (!req.body.softwareID) {
    res.status(400).json({ success: false, message: "softwareID is required" });
    return;
  }

  const data = new populorSoftware({
    softwareID: req.body.softwareID,
  });
  data.save()
    .then((response) =>
      res.status(201).json({
        success: true,
        data: response,
      })
    )
    .catch((error) => res.status(400).json({ success: false, message: error }));
};

exports.fetchPopulorSoftwares = async (req, res, next) => {
  populorSoftware.find()
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
  populorSoftware.findByIdAndDelete(req.query.id)
    .then(() => res.status(200).json({ success: true, message: 'Populor Software has been deleted' }))
    .catch(err => res.status(400).json({ success: false, message: err }));
};


exports.removeByColoumn = async (req, res, next) => {
  if(!req.query.id){
      res.status(400).json({success: false , message :"ID not found"});
      return ;
  }
  populorSoftware.findOneAndDelete({ softwareID : req.query.id })
  .then(() => res.status(200).json({ success: true , message: 'Populor Software has been deleted' }))
  .catch(err => res.status(400).json({ success:false, message: err }));
};