const Statistic = require("../models/Statistic");


exports.addImpression = async (req, res, next) => {

  Statistic.find()
    .then((response) => {
      let statLength = Object.keys(response).length;

      if (statLength < 1) {
        //here add new data
        const statistic = new Statistic({
          impressions: 1,
        });
        statistic.save().then((response) =>
          res.status(200).json({
            success: true,
            data: response
          }))
      } else {

        response[0].impressions = (isNaN(response[0].impressions)) ? 1 : response[0].impressions + 1;
        response[0].save().then((response) =>
          res.status(200).json({
            success: true,
            data: response
          }))
      }

    })
    .catch((error) => res.status(400).json({ success: false, message: error }));

};


exports.addClick = async (req, res, next) => {

  Statistic.find()
    .then((response) => {

      let statLength = Object.keys(response).length;

      if (statLength < 1) {
        //here add new data
        const statistic = new Statistic({
          clicks: 1,
        });
        statistic.save().then((response) =>
          res.status(200).json({
            success: true,
            data: response
          }))
      } else {
        response[0].clicks = (isNaN(response[0].clicks)) ? 1 : response[0].clicks + 1;
        response[0].save().then((response) =>
          res.status(200).json({
            success: true,
            data: response
          }))
      }

    })
    .catch((error) => res.status(400).json({ success: false, message: error }));

};

exports.addDownload = async (req, res, next) => {

  Statistic.find()
    .then((response) => {

      let statLength = Object.keys(response).length;

      if (statLength < 1) {
        //here add new data
        const statistic = new Statistic({
          downloads: 1,
        });
        statistic.save().then((response) =>
          res.status(200).json({
            success: true,
            data: response
          }))
      } else {
        response[0].downloads = (isNaN(response[0].downloads)) ? 1 : response[0].downloads + 1;
        response[0].save().then((response) =>
          res.status(200).json({
            success: true,
            data: response
          }))
      }

    })
    .catch((error) => res.status(400).json({ success: false, message: error }));

};
exports.addReview = async (req, res, next) => {

  Statistic.find()
    .then((response) => {

      let statLength = Object.keys(response).length;

      if (statLength < 1) {
        //here add new data
        const statistic = new Statistic({
          reviews: 1,
        });
        statistic.save().then((response) =>
          res.status(200).json({
            success: true,
            data: response
          }))
      } else {
        response[0].reviews = (isNaN(response[0].reviews)) ? 1 : response[0].reviews + 1;
        response[0].save().then((response) =>
          res.status(200).json({
            success: true,
            data: response
          }))
      }

    })
    .catch((error) => res.status(400).json({ success: false, message: error }));
};