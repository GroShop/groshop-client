/* eslint-disable @typescript-eslint/no-explicit-any */
import {useState} from 'react';
import {
  Alert,
  Dimensions,
  Linking,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';
// import Models from "imports/models.import";
// import ImagePicker from "react-native-image-crop-picker";np
import {useNavigation} from '@react-navigation/native';
import _ from 'lodash';
import axios from 'axios';
// import {setAppRoute} from "./redux.utils";
// import {letters, Mail} from "./constant.utils";

export const {width, height} = Dimensions.get('window');
export const aspectRatio = height / width;
export const getBaseURL = () => {
  // let baseURL = "https://groshop-ecom.onrender.com";
  // let baseURL ="http://localhost:8001";
  let baseURL = 'http://192.168.1.24:8001';
  if (process.env.REACT_APP_NODE_ENV === 'development') {
    baseURL = 'http://localhost:8001';
  } else if (process.env.REACT_APP_NODE_ENV === 'stage') {
    baseURL = 'https://stage.hellaviews.com';
  }
  return baseURL;
};

export const useSetState = (initialState: any) => {
  const [state, setState] = useState(initialState);

  const newSetState = (newState: any) => {
    setState((prevState: any) => ({...prevState, ...newState}));
  };
  return [state, newSetState];
};

export const Width = (value: number) => {
  return (value * width) / 100;
};

export const Height = (value: number) => {
  return (value * height) / 100;
};
export const Ratio = (value: any, isHeight?: boolean) => {
  let ratio;
  let aspectRatio = height / width;
  let scaleFactor = 375;

  if (aspectRatio < 1.8) {
    scaleFactor = 425;
  }

  if (isHeight) {
    if (typeof value === 'string') {
      value = value.replace('%', '');
      ratio = (parseInt(value) * height) / 100;
    } else {
      ratio = (value * height) / scaleFactor;
    }
  } else {
    if (typeof value === 'string') {
      value = value.replace('%', '');
      ratio = (parseInt(value) * width) / 100;
    } else {
      ratio = (value * width) / scaleFactor;
    }
  }
  return ratio;
};
// export const validateEmail = (email: string) => {
//   return Mail.test(email);
// };

// export const validateString = (string: string) => {
//   if (string.match(letters)) {
//     return true;
//   }
//   return false;
// };

export const Success = (message: string, description?: string) => [
  showMessage({
    message: message,
    description: description,
    type: 'success',
    icon: 'auto',
    autoHide: true,
    position: 'top',
  }),
];
export const Failure = (message: string, description?: string) => [
  showMessage({
    message: message,
    description: description,
    type: 'danger',
    icon: 'auto',
    autoHide: true,
    position: 'top',
  }),
];

export const Warning = (message: string, description?: string) => [
  showMessage({
    message: message,
    description: description,
    type: 'warning',
    icon: 'auto',
    autoHide: true,
    position: 'top',
  }),
];
export const Info = (message: string, description?: string) => [
  showMessage({
    message: message,
    description: description,
    type: 'info',
    icon: 'auto',
    autoHide: true,
    position: 'top',
  }),
];

export const isUrlFound = (url: string) => {
  if (/^https:\/\//.test(url)) {
    return true;
  } else if (/^file:\/\//.test(url)) {
    return true;
  } else {
    return false;
  }
};

export const checkPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      console.log('try');
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);
      const readGranted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
      const writeGranted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      const cameraGranted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (!readGranted || !writeGranted || !cameraGranted) {
        // Warning('Permission error!', 'Permissions not granted');
        // Linking.openSettings();
        return false;
      } else {
        return true;
      }
    } catch (err) {
      console.log('Checking permission failed');
      console.log('err', err);
    }
  } else {
    // console.log(Platform.OS)
    return true;
  }
};

export const getFileData = (file: any) => {
  const filePathArray = file.path.split('/');
  const fileName = filePathArray.pop();
  return {name: fileName, uri: file.path, type: file.mime};
};

// export const uploadImage = async (key: string, setState: any) => {
//   try {
//     const res: any = await checkPermission();
//     console.log("uploadImage", res);
//     if (res) {
//       ImagePicker.openPicker({
//         width: 400,
//         height: 400,
//         cropping: true,
//       })
//         .then(async (image: any) => {
//           setState({fileUpload: true});
//           const fileData = getFileData(image);
//           const getUrl: any = await Models.user.uploadMediaApp(fileData);
//           console.log({[key]: getUrl.data[0]});
//           setState({[key]: getUrl.data[0], fileUpload: false});
//         })
//         .catch((err: any) => {
//           if (
//             err.toString().includes("User did not grant library permission")
//           ) {
//             Alert.alert(
//               "",
//               "Livyana requires access to your photos for this feature.You can enable it in settings",
//               [
//                 {
//                   text: "Open settings",
//                   onPress: () => Linking.openSettings(),
//                 },
//                 {
//                   text: "Cancel",
//                   onPress: () => console.log("Cancel Pressed"),
//                   style: "cancel",
//                 },
//               ],
//             );
//           }
//         });
//     } else {
//       Alert.alert(
//         "",
//         "Livyana requires access to your photos for this feature.You can enable it in settings",
//         [
//           {
//             text: "Open settings",
//             onPress: () => Linking.openSettings(),
//           },
//           {
//             text: "Cancel",
//             onPress: () => console.log("Cancel Pressed"),
//             style: "cancel",
//           },
//         ],
//       );
//     }
//   } catch (error) {
//     console.log("error upload", error);
//   }
// };

export const capitalizeFirstLetter = (string: string = '') => {
  let data = string.toLowerCase();
  if (string.length > 0) {
    return data.charAt(0).toUpperCase() + data.slice(1);
  }
  return data;
};

export const searchArray = (a: string[], search: string) => {
  const regex = new RegExp(search, 'i');
  const result: string[] = [];
  for (let i = 0; i < a.length; i++) {
    let index = a[i].search(regex);
    if (index > -1) {
      result.push(a[i]);
    }
  }
  return result;
};

export const checkURL = (url: string) => {
  if (url.match(/\.(jpeg|jpg|gif|png|JPEG|JPG|GIF|PNG|HEIC|heic)$/) !== null) {
    return 'image';
  } else if (url.match(/\.(mp4|MP4|mov|MOV|HEVC|hevc)$/) !== null) {
    return 'video';
  } else if (url.match(/\.(pdf|docs|xls|xlsx|doc|txt|ppt|pptx)$/) !== null) {
    return 'document';
  }
};

export const modelError = (error: any) => {
  console.log(JSON.stringify(error?.response));
  if (error?.response?.data?.message) {
    return error.response.data.message;
  } else if (error?.message) {
    return error?.message;
  } else if (error.response) {
    return error?.response;
  } else {
    return error;
  }
};

export const calculateTimeToString = (date: string | number | Date) => {
  var datePast = new Date(date);
  var dateNow = new Date();
  // @ts-ignore
  var seconds = Math.floor((dateNow - datePast) / 1000);
  var minutes = Math.floor(seconds / 60);
  var hours = Math.floor(minutes / 60);
  var days = Math.floor(hours / 24);
  var weeks = Math.floor(days / 7);
  var years = Math.floor(days / 365);

  if (seconds < 60) {
    return 'Just now';
  } else if (minutes < 60) {
    return minutes + 'm';
  } else if (hours < 24) {
    return hours + 'h';
  } else if (days < 7) {
    return days + 'd';
  } else if (weeks < 52) {
    return weeks + 'w';
  } else {
    return years + 'y';
  }
};

export const getMediaType = (url: String) => {
  if (
    url.split('.').pop() === 'jpg' ||
    url.split('.').pop() === 'jpeg' ||
    url.split('.').pop() === 'svg' ||
    url.split('.').pop() === 'bmp' ||
    url.split('.').pop() === 'png'
  ) {
    return 'image';
  } else {
    return 'video';
  }
};

export const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
);

export const timeConversion = (timestamp: string) => {
  const date = new Date(timestamp);
  const options: any = {hour: 'numeric', minute: 'numeric', hour12: true};
  const formattedTime = date.toLocaleString('en-US', options);
  return formattedTime;
};

// 08-08-2023
export const isoToDateConversion = (date: string) => {
  const inputDate = new Date(date);
  return `${(inputDate.getMonth() + 1).toString().padStart(2, '0')}-${inputDate
    .getDate()
    .toString()
    .padStart(2, '0')}-${inputDate.getFullYear()}`;
};

// cloudnary
export const imgToUrl = async(image: any) => {
  const data = new FormData();
  data.append('file', {
    uri: image.path,
    type: image.mime,
    name: image.path.substring(image.path.lastIndexOf('/') +1)
  });
  data.append('upload_preset' , 'groshop_upload');
  // data.append('cloud_name', 'denokpulg');
  let url = 'https://api.cloudinary.com/v1_1/denokpulg/image/upload'

 let uri =await axios
    .post(url, data)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log("error",err);
    });
    return uri
};

export const unixTimeToDateConvert = (data: number, year?: boolean) => {
  const milliseconds = data * 1000;
  const date = new Date(milliseconds);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });
  if (year) {
    const year = date.toLocaleString('default', { year: 'numeric' });
    const formattedDate = `${day} ${month} ${year}`;
    return formattedDate;
  } else {
    const formattedDate = `${day} ${month}`;
    return formattedDate;
  }
};

export const isoToDateConvert = (data: string) => {
  const date = new Date(data);
  const options: any = { year: 'numeric', month: 'short', day: 'numeric' };
  const formattedDate = date
    .toLocaleDateString(undefined, options)
    .replace(',', '');
  return formattedDate;
};