import { Cloudinary } from "@cloudinary/url-gen";
import React from "react";
import { View } from "react-native";

function UserVideos() {
  const cld = new Cloudinary({
    cloud: {
      cloudName: ncapp,
    },
  });
  return <View></View>;
}

export default UserVideos;
