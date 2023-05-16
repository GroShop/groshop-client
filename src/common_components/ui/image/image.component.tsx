/* eslint-disable react-native/no-inline-styles */
import React from "react";
import {StyleSheet} from "react-native";
import FastImage from "react-native-fast-image";

interface ImageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  src: any;
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  width?: string | number;
  height?: string | number;
  resize?: string;
  radius?: number;
  zindex?: number;
  svg?: boolean;
}
const ImageComponent = (props: ImageProps) => {
  const {
    src,
    left,
    right,
    bottom,
    top,
    width,
    height,
    resize,
    radius,
    svg,
    zindex,
  } = props;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isUrl = (source: any) => {
    if (typeof source === "string") return true;
    return false;
  };

  return (
    <>
      {svg ? (
        <props.src
          width={width ? width : "100%"}
          height={height ? height : "100%"}
          styles={{
            marginLeft: left,
            marginRight: right,
            marginTop: top,
            marginBottom: bottom,
            zindex: zindex,
          }}
        />
      ) : (
        <FastImage
          style={[
            styles.image,
            {
              marginRight: right,
              marginLeft: left,
              marginBottom: bottom,
              marginTop: top,
              borderRadius: radius || 0,
              resizeMode: resize ? resize : "contain",
            },
            // @ts-ignore
            height && {height},
            width && {width},
          ]}
          source={
            isUrl(src)
              ? {
                uri: src,
                priority: FastImage.priority.high,
                cache: FastImage.cacheControl.immutable,
              }
              : src
          }
          resizeMode={resize ? resize : FastImage.resizeMode.contain}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  image: {},
});
export default ImageComponent;