const  mongoose  = require("mongoose");
const software = require("../models/Software");

exports.createSoftware = async (req, res, next) => {

  let flag = false;
  let iconName = req.files.icon[0].filename;
  let screenshots = new Object();

  if(req.files.screenshots){
    flag = true;
    req.files.screenshots.forEach((data,index,arr)=>{
      screenshots[index] = data.filename;
    });
    // console.log(screenshots);
    // console.log(iconName);
  }
  
  if (!req.body.softwareName) {
   res.status(400).json({success:false, message:"software name is required"});
   return ;
  }
  if (!req.body.softwareVersion) {
    res.status(400).json({ success:false, message: "software version is required" });
    return ;
  }
  if (!req.body.softwareCategory) {
    res.status(400).json({ success:false, message: "software category is required" });
    return ;
  }
  if (!req.body.softwareDescription) {
    res.status(400).json({ success:false, message: "software description is required" });
    return ;
  }
  if (!req.body.softwareRequirement) {
    res.status(400).json({ success:false, message: "software requirements is required" });
    return ;
  }
  if (!req.body.softwareLicense) {
    res.status(400).json({ success:false, message: "software license is required" });
    return ;
  }
  if (!req.body.softwareAuthor) {
    res.status(400).json({ success:false, message: "software author is required" });
    return ;
  }
  
   
  const newSoftware = new software({
    softwareName: req.body.softwareName,
    softwareVersion: req.body.softwareVersion,
    softwareCategory: req.body.softwareCategory,
    softwareDescription: req.body.softwareDescription,
    softwareIcon: iconName,
    softwareRequirement: req.body.softwareRequirement,
    softwareLanguage: req.body.softwareLanguage,
    softwareAvailableLanguage: req.body.softwareAvailableLanguage,
    softwareLicense: req.body.softwareLicense,
    softwareAuthor: req.body.softwareAuthor,
    softwareSHA: req.body.softwareSHA,
    softwareScreenshot: flag ? screenshots: flag,
  });
  // console.log(newSoftware);
  newSoftware.save()
    .then((response) =>
      res.status(200).json({
        success: true,
        data : response,
      })
    )
    .catch((error) => res.status(400).json({ success:false, message: error }));
};



exports.fetchSoftwareByID = async (req, res, next) => {
  
    if(!req.query.id){
        res.status(400).json({success:false, message:"ID not found"});
        return ;
    }
    software.findOne({_id:req.query.id}).populate({
      path : 'softwareCategory',
     
    })
    .then((response) => {
        res.status(200).json({
            success: true,
            data : response,
        });
    })
    .catch((error) => res.status(400).json({success:false, message: "result not found"}));

};



exports.fetchSoftwaresByTitle = async (req, res, next) => {
  
  
  software.find({ softwareName : req.params.title } ).populate({
    path : 'softwareCategory',
   
  })
  .then((response) => {
    res.status(200).json({
        success: true,
        data : response,
    });
  })
  .catch((error) => res.status(400).json({success:false, message: "result not found"}));

};


exports.search = async (req, res, next) => {
  
  software.find({ "softwareName": { $regex: '.*' + req.params.title + '.*' , $options : "i" } } )
  .then((response) => {
    res.status(200).json({
        success: true,
        data : response,
    });
  })
  .catch((error) => res.status(400).json({success:false, message: "result not found"}));

};



exports.fetchSoftwares = async (req, res, next) => {
    // console.log(req);
    software.find()
    .populate({
      path : 'softwareCategory',
    })
    .then((response) => {
      res.status(200).json({
          success: true,
          data : response,
      });
    })
    .catch((error) => res.status(400).json({success:false, message: error }));

};

exports.edit = async (req, res, next) => {
   
    let flag = false;
    let screenshots = new Object();
    let iconName = false;

    if(req.files.screenshots != null){
      flag = true;
      req.files.screenshots.forEach((data,index,arr)=>{
        screenshots[index] = data.filename;
      });
    }
    if(req.files.icon != null){
      iconName = req.files.icon[0].filename;
    }
   
    if(!req.body.id){
        res.status(400).json({success:false, message:"ID not found"});
        return ;
    }
    software.findOne({_id:req.body.id})
    .then((response) => {
        
        response.softwareName = req.body.softwareName ?  req.body.softwareName : response.softwareName; 
        response.softwareVersion = req.body.softwareVersion ? req.body.softwareVersion : response.softwareVersion;
        response.softwareCategory = req.body.softwareCategory ? req.body.softwareCategory : response.softwareCategory;
        response.softwareDescription = req.body.softwareDescription ? req.body.softwareDescription : response.softwareDescription;
        response.softwareIcon = iconName ? iconName : response.softwareIcon;
        response.softwareRequirement = req.body.softwareRequirement ? req.body.softwareRequirement : response.softwareRequirement;
        response.softwarelanguage = req.body.softwarelanguage ? req.body.softwarelanguage : response.softwarelanguage;
        response.softwareAvailableLanguage = req.body.softwareAvailableLanguage ? req.body.softwareAvailableLanguage : response.softwareAvailableLanguage;
        response.softwareLicense = req.body.softwareLicense ? req.body.softwareLicense : response.softwareLicense;
        response.softwareAuthor = req.body.softwareAuthor ? req.body.softwareAuthor: response.softwareAuthor;
        response.softwareSHA = req.body.softwareSHA ? req.body.softwareSHA : response.softwareSHA;
        response.softwareScreenshot = flag ? screenshots : response.softwareScreenshot;
        response.save()
            .then(() => res.status(200).json({ success: true , message: 'software has been updated' }))
            .catch(err => res.status(400).json({ success:false, message: err }))
    })
    .catch((error) => res.status(400).json({success:false, message: error }));

};



exports.remove = async (req, res, next) => {
  if(!req.query.id){
      res.status(400).json({success:false, message:"ID not found"});
      return ;
  }
  software.findByIdAndDelete(req.query.id)
  .then(() => res.status(200).json({ success: true , message: 'Populor Software has been deleted' }))
  .catch(err => res.status(400).json({ success:false, message: err }));
};



exports.fetchSoftwareByCategory = async (req, res, next) => {
  
  
  if(!req.params.categoryId) {
    res.status(400).json({success: false , message: "Category ID not found"})
    return
  } 
  let type = null ;
  if(req.params.limit){
     type = [{ $match: { softwareCategory: mongoose.Types.ObjectId(req.params.categoryId) }},
             { $group: { _id: "$softwareName", 
                          key: {$last : "$_id" },
                          name : {$addToSet : "$softwareName" },
                          version : { $last : "$softwareVersion" },
                          icon : { $last : "$softwareIcon" },
                          desc : { $last : "$softwareDescription" },
                          author : { $last : "$softwareAuthor" },
                         }},
                          
             { $unwind : "$name" },
             { $sort : { _id : -1  } },
             { $limit : parseInt( req.params.limit ) } ]
  
  }else{
    type = [
      { $match: { softwareCategory: mongoose.Types.ObjectId(req.params.categoryId) }},
      { $group: { _id: "$softwareName",
                  key  : {$last : "$_id" },
                  name : {$addToSet : "$softwareName" },
                  version : { $last : "$softwareVersion" },
                  icon : { $last : "$softwareIcon" },
                  desc : { $last : "$softwareDescription" },
                  author : { $last : "$softwareAuthor" },
                } },
      { $unwind : "$name" },
      { $sort : { _id : -1  } } ]
  }
  
  software.aggregate(type)
  .then((response) => {
    // console.log(response);
    res.status(200).json({
        success: true,
        data : response,
    });
  })
  .catch((error) => res.status(400).json({success:false, message: error }));

};