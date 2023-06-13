export const getCountry = (addressArray) => {
  for (let i = 0; i < addressArray.length; i++) {
    if (addressArray[i].types[0] && "country" === addressArray[i].types[0]) {
      return addressArray[i].long_name;
    }
  }
  return "Pakistan";
};
export const getCity = (addressArray) => {
  let city = "";

  for (let i = 0; i < addressArray.length; i++) {
    if (
      addressArray[i].types[0] &&
      "administrative_area_level_2" === addressArray[i].types[0]
    ) {
      city = addressArray[i].long_name;
      return city;
    }
  }
};
export const getArea = (addressArray) => {
  let area = "";
  for (let i = 0; i < addressArray.length; i++) {
    if (addressArray[i].types[0]) {
      for (let j = 0; j < addressArray[i].types.length; j++) {
        if (
          "sublocality_level_1" === addressArray[i].types[j] ||
          "locality" === addressArray[i].types[j]
        ) {
          area = addressArray[i].long_name;
          return area;
        }
      }
    }
  }
};
export const getBlock = (addressArray) => {
  let block = null;
  addressArray.forEach((address) => {
    address?.types?.forEach((type) => {
      if (type === "sublocality_level_2") {
        block = address.short_name;
      }
    });
  });
  return block;
};
