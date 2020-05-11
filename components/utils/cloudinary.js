import * as cloudinary from "cloudinary-core";

export const cloudinaryConfig = {
  cloudName: "dgomvljnu",
  defaultBuyerImageId: "eean5f9ncjklwrbwn3dl",
  defaultItemImage: "eean5f9ncjklwrbwn3dl"
};

let cl = cloudinary.Cloudinary.new({ cloud_name: cloudinaryConfig.cloudName });

export default cl;
