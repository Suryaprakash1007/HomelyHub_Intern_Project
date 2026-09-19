// get all properties
// get property based on id


import { Property } from "../Models/propertyModel.js";
import { APIFeatures } from "../utils/APIFeatures.js";
import imagekit from "../utils/ImagekitIO.js";


// get all properties

const getProperties = async(req,res)=>{
    try{
      const features = new APIFeatures(Property.find(),req.query)
      .filter()
      .search()
      .paginate();

      const doc = await features.query;

      res.status(200).json({
        status:"success",
        no_of_responses: doc.length,
        data:doc
      })
    }catch(error){
        console.error("Error searching properties: ", error)
        res.status(500).json({
          status: "fail",
          error: error.message,
          stack: error.stack
        })
    }
}

//get property by id
// http://localhost:8080/api/v1/rent/listing/:id
//http://localhost:8080/api/v1/rent/listing/666476848
// req.params.id

const getProperty = async(req,res)=>{
    try{
       const property = await Property.findById(req.params.id);

       res.status(200).json({
        status:"success",
        data: property,
       })

    }catch(error){
      res.status(404).json({
        status:"fail",
        message:error.message
      })
    }
}

// CREATE A PROPERTY - an owner adds his house

// take the details, upload every photo to ImageKit,
// keep only the links, then save the house with the owner's
// id attached.
// This route has protect on it, so req.user already exists.
const createProperty = async (req, res) => {
  try {
    const {
      propertyName,
      description,
      propertyType,
      roomType,
      extraInfo,
      address,
      amenities,
      checkInTime,
      checkOutTime,
      maximumGuest,
      price,
      images,
    } = req.body;
    const uploadedImages = [];

    if (Array.isArray(images) && images.length > 0) {
      for (const image of images) {
        const imageUrl = typeof image === "string" ? image : image?.url;
        if (!imageUrl) continue;

        if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
          uploadedImages.push({
            url: imageUrl,
            public_id: image?.public_id || `img_${Date.now()}`,
          });
        } else {
          try {
            const result = await imagekit.upload({
              file: imageUrl,
              fileName: `property_${Date.now()}.jpg`,
              folder: "property_images",
            });
            uploadedImages.push({ url: result.url, public_id: result.fileId });
          } catch (uploadError) {
            console.error("ImageKit upload error:", uploadError);
            uploadedImages.push({
              url: imageUrl,
              public_id: `img_${Date.now()}`,
            });
          }
        }
      }
    }

    const property = await Property.create({
      propertyName,
      prpertyName: propertyName,
      description,
      propertyType,
      roomType,
      extraInfo,
      address,
      amenities,
      checkInTime,
      checkOutTime,
      maximumGuest: Number(maximumGuest) || 1,
      price: Number(price) || 500,
      images: uploadedImages,
      userId: req.user._id || req.user.id,
    });

    res.status(201).json({ status: "success", data: { data: property } });
  } catch (error) {
    console.error("Error creating property:", error);
    res.status(400).json({ status: "fail", message: error.message });
  }
};

// GET MY PROPERTIES - the owner's own dashboard
// find every house whose userId is me.
const getUsersProperties = async (req, res) => {
  try {
    // again from the token, so a user can only ever see his own
    const userId = req.user._id;
    // find (not findById) because he may own many houses.
    // { userId } is short for { userId: userId }.
    const property = await Property.find({ userId });
    res.status(200).json({
      status: "success",
      data: property,
    });
  } catch (error) {
    res.status(404).json({ status: "fail", message: error.message });
  }
};


export{
    getProperties,
    getProperty,
    createProperty,
    getUsersProperties
}