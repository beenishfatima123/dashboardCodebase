import TextTranslation from "./TextTranslation";
import {
  MAX_IMAGE_COUNT,
  MAX_IMAGE_SIZE,
  USER_TYPES,
  MAX_FILE_NAME_LENGTH,
} from "./global";
import { PROPERTY_FEATURES, PROPERTY_SERVICES } from "./propertyConstants";

export const validateInputField = (input) => {
  if (input === "") return false;
  // eslint-disable-next-line
  const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  if (format.test(input)) return false;

  return true;
};
export const validateEmail = (input) => {
  const emailRegex =
    // eslint-disable-next-line
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return input.match(emailRegex);
};
export const validatePassword = (input) => {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

  if (!input.match(passwordRegex)) return false;

  return true;
};

export const getWordCount = (text) => {
  return text.trim().split(/\s+/).length;
};

export const validateInputs = (prop, value) => {
  switch (prop) {
    case "first_name":
      if (value?.length < 3 || value?.length > 50)
        return "First name must be between 3-50 characters";
      else return null;
    case "last_name":
      if (value?.length < 3 || value?.length > 50)
        return "Last name must be between 3-50 characters";
      else return null;
    case "companyName":
      if (value?.length < 3 || value?.length > 30)
        return "company name must be between 3-30 characters";
      else return null;
    case "companyEmail":
      if (!validateEmail(value)) return false;
      else return null;
    case "description":
      if (getWordCount(value) < 10 || getWordCount(value) > 100)
        return "Description must be min. 10 and max. 100 words.";
      else return null;
    case "title":
      if (value?.length < 3 || value?.length > 50)
        return "Title must be between 3-50 characters";
      else return null;
    case "project_title":
      if (value?.length < 3 || value?.length > 50)
        return "Title must be between 3-50 characters";
      else return null;
    case "address":
      if (value?.length < 3 || value?.length > 30)
        return "Address must be between 3-50 characters";
      else return null;

    case "company_name":
      if (value?.length < 3 || value?.length > 50)
        return "Company name must be between 3-50 characters";
      else return null;
    case "company_city":
      if (value?.length < 3 || value?.length > 30)
        return "City name must be 3-30 characters.";
      else return null;
    case "company_areas":
      if (value?.length < 3 || value?.length > 30)
        return "Area name must be 3-30 characters.";
      else return null;
    case "company_description":
      if (getWordCount(value) < 10 || getWordCount(value) > 100)
        return "Description must be min. 10 and max. 100 words.";
      else return null;
    case "no_of_employees":
      if (value < 0) return "Must be positive number.";
      else return null;

    case "image":
      if (
        value.size / 1024 ** 2 > MAX_IMAGE_SIZE ||
        value?.name?.length > MAX_FILE_NAME_LENGTH
      )
        return "Image discarded (size/name issue)";
      else return null;
    case "duration":
      if (value < 12 || value > 1000)
        return "Duration range must be within 12 to 1000";
      else return null;
    case "amount":
      if (value?.length > 17) return "Price too big to handle.";
      if (value < 1) return "Price must be positive number.";
      else return null;
    case "down_payment":
      if (value?.length > 17) return "Down payment too big to handle.";
      if (value < 1) return "Down payment must be positive number.";
      else return null;

    default:
      return null;
  }
};

export const validateAuctionInputs = (prop, value) => {
  switch (prop) {
    case "area":
      if (value?.length < 3 || value?.length >= 100)
        return "area must be at least 3 and maximum 100 characters";
      else return null;
    case "city":
      if (value?.length < 5) return "city must be at least 5 characters";
      else return null;
    case "description":
      if (getWordCount(value) < 10 || getWordCount(value) > 100)
        return "description must be min. 10 and max. 100 words.";
      else return null;
    case "size":
      if (
        value?.length <= 0 ||
        parseInt(value) <= 0 ||
        parseInt(value) >= 100000
      )
        return "Size must be between 0 - 100000";
      else return null;
    case "price":
      if (value?.length <= 0 || parseInt(value) <= 0)
        return "Price must be greater than 0";
      else return null;
    case "sub_unit_share_percentage":
      if (value?.length <= 0 || parseInt(value) <= 0 || parseInt(value) >= 100)
        return "Share Percentage must be between 0 and 100";
      else return null;
    case "totalBidders":
      if (value?.length <= 0 || parseInt(value) <= 0 || parseInt(value) >= 100)
        return "Total Bidders must be between 0 and 100";
      else return null;
    case "total_files":
      if (value?.length <= 0 || parseInt(value) <= 0)
        return "Total Files must be greater than 0";
      else return null;
    default:
      return null;
  }
};

export const populatePurposeData = (lang, label) => {
  return [
    label,
    TextTranslation.forRent[lang.langIndex],
    TextTranslation.forSale[lang.langIndex],
    TextTranslation.forInstalment[lang.langIndex],
  ];
};
export const getCountryNameFromInitials = (initials) => {
  switch (initials) {
    case "pk":
      return "Pakistan";
    case "tr":
      return "Turkey";
    case "ae":
      return "UAE";
    default:
      return initials;
  }
};

//FOR DEV LOGS ONLY
export const customLog = (logValue) => {
  console.log(logValue);
};

export const formatCurrency = (num) => {
  if (num > 999 && num < 1000000) {
    return (num / 1000).toFixed(1) + " K"; // convert to K for number from > 1000 < 1 million
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + " M"; // convert to M for number from > 1 million
  } else if (num < 900) {
    return num; // if value < 1000, nothing to do
  }
};

export const getOtherEmail = (users, currentUser) => {
  return users?.filter((user) => user !== currentUser.email)[0];
};

export const getStringUserType = (user_type) => {
  switch (user_type) {
    case 0:
      return "Admin";
    case 1:
      return "User";
    case 2:
      return "Agent";
    case 3:
      return "C.E.O";
    case 4:
      return "Moderator";
  }
};

// const addFeatures = (features, formData) => {
//   formData.append("features.tv_lounge", features?.["tv_lounge"] ? features?.["tv_lounge"] : false)
//   formData.append("features.store_room",features?.["store_room"] ? features?.["store_room"] : false);
//   formData.append("features.laundry_room",features?.["laundry_room"] ? features?.["laundry_room"] : false);
//   formData.append("features.kitchen", features?.["kitchen"] ? features?.["kitchen"] : false);
//   formData.append("features.balcony", features?.["balcony"] ? features?.["balcony"] : false);
//   formData.append("features.garden", features?.["garden"] ? features?.["garden"] : false);
// };

// const addServices = (services, formData) => {
//   formData.append("services.electricity",services?.["electricity"] ? services?.["electricity"] : false);
//   formData.append("services.gas", services?.["gas"] ? services?.["gas"] : false);
//   formData.append("services.water", services?.["water"] ? services?.["water"] : false);
//   formData.append("services.maintenance",services?.["maintenance"] ? services?.["maintenance"] : false);
//   formData.append("services.security",services?.["security"] ? services?.["security"] : false);
//   formData.append("services.sewerage",services?.["sewerage"] ? services?.["sewerage"] : false);
// };

const addFeatures = (features, formData) => {
  if (features?.includes(PROPERTY_FEATURES[0]))
    formData.append(
      "features.tv_lounge",
      features?.includes(PROPERTY_FEATURES[0])
    );
  if (features?.includes(PROPERTY_FEATURES[1]))
    formData.append(
      "features.store_room",
      features?.includes(PROPERTY_FEATURES[1])
    );
  if (features?.includes(PROPERTY_FEATURES[2]))
    formData.append(
      "features.laundry_room",
      features?.includes(PROPERTY_FEATURES[2])
    );
  if (features?.includes(PROPERTY_FEATURES[3]))
    formData.append(
      "features.kitchen",
      features?.includes(PROPERTY_FEATURES[3])
    );
  if (features?.includes(PROPERTY_FEATURES[4]))
    formData.append(
      "features.balcony",
      features?.includes(PROPERTY_FEATURES[4])
    );
  if (features?.includes(PROPERTY_FEATURES[5]))
    formData.append(
      "features.garden",
      features?.includes(PROPERTY_FEATURES[5])
    );
};

const addServices = (services, formData) => {
  if (services?.includes(PROPERTY_SERVICES[0]))
    formData.append(
      "services.electricity",
      services?.includes(PROPERTY_SERVICES[0])
    );
  if (services?.includes(PROPERTY_SERVICES[1]))
    formData.append("services.gas", services?.includes(PROPERTY_SERVICES[1]));
  if (services?.includes(PROPERTY_SERVICES[2]))
    formData.append("services.water", services?.includes(PROPERTY_SERVICES[2]));
  if (services?.includes(PROPERTY_SERVICES[3]))
    formData.append(
      "services.maintenance",
      services?.includes(PROPERTY_SERVICES[3])
    );
  if (services?.includes(PROPERTY_SERVICES[4]))
    formData.append(
      "services.security",
      services?.includes(PROPERTY_SERVICES[4])
    );
  if (services?.includes(PROPERTY_SERVICES[5]))
    formData.append(
      "services.sewerage",
      services?.includes(PROPERTY_SERVICES[5])
    );
};

const addConstructionDetails = (data, formData) => {
  if (data?.heating)
    formData.append("construction_details.heating", data?.heating);
  if (data?.cooling)
    formData.append("construction_details.cooling", data?.cooling);
  if (data?.furnished)
    formData.append("construction_details.furnished", data?.furnished);
  if (data?.flooring)
    formData.append("construction_details.flooring", data?.flooring);
  if (data?.appliances)
    formData.append("construction_details.appliances", data?.appliances);
  if (data?.pool) formData.append("construction_details.pool", data?.pool);
  if (data?.lawn) formData.append("construction_details.lawn", data?.lawn);
  if (data?.garage)
    formData.append("construction_details.garage", data?.garage);
  if (data?.homeType)
    formData.append("construction_details.home_type", data?.homeType);
  if (data?.propertySubtype)
    formData.append(
      "construction_details.property_subtype",
      data?.propertySubtype
    );
  if (data?.materials)
    formData.append("construction_details.materials", data?.materials);
  if (data?.propertyCondition)
    formData.append(
      "construction_details.property_condition",
      data?.propertyCondition
    );
  if (data?.newConstruction)
    formData.append(
      "construction_details.new_construction",
      data?.newConstruction
    );
  if (data?.year_built)
    formData.append("construction_details.year_built", data?.year_built);
};

export const getPostFormData = (data, user) => {
  const listingFormData = new FormData();
  addFeatures(data?.features, listingFormData);
  addServices(data?.services, listingFormData);
  addConstructionDetails(data, listingFormData);
  listingFormData.append("title", data?.title);
  listingFormData.append("purpose", data?.purpose);
  listingFormData.append("type", data?.type);
  listingFormData.append("categories", data?.category);
  listingFormData.append("size", parseFloat(data?.size).toFixed(2));
  listingFormData.append("unit", data?.unit);
  listingFormData.append("price", parseFloat(data?.price).toFixed(2));
  listingFormData.append("currency", data?.currency);
  listingFormData.append("year_built", data?.year_built);
  listingFormData.append("description", data?.description);
  listingFormData.append("bedrooms", data?.bedrooms || 0);
  listingFormData.append("bathrooms", data?.bathrooms || 0);
  listingFormData.append("cars_parking", data?.cars_parking || 0);
  listingFormData.append("country", data?.location?.country);
  listingFormData.append("city", data?.location?.city);
  listingFormData.append("area", data?.location?.area);
  listingFormData.append("block", data?.location?.block);
  listingFormData.append("street", data?.location?.address?.split(",")[0]);
  listingFormData.append("address", data?.location?.address);
  listingFormData.append("lat", data?.location?.lat);
  listingFormData.append("lng", data?.location?.lng);
  listingFormData.append("features", data?.features);
  listingFormData.append("services", data?.services);
  listingFormData.append("user", user);
  listingFormData.append("is_active_listing", true);
  listingFormData.append("image_len", data?.images?.length);
  data?.images?.forEach((file, i) => {
    listingFormData.append("image[" + i + "]", file);
  });
  if (data?.floorPlan?.length > 0) {
    listingFormData.append("floor_image_len", data?.floorPlan?.length);
    data?.floorPlan?.forEach((file, i) => {
      listingFormData.append("floor_image[" + i + "]", file);
    });
  }
  return listingFormData;
};

const addInstallmentPlans = (data, formData) => {
  if (data?.length > 0) {
    formData.append("installments", JSON.stringify(data));
  }
};

export const getProjectFormData = (data, installmentPlans) => {
  const projectFormData = new FormData();
  addInstallmentPlans(installmentPlans, projectFormData);
  projectFormData.append("title", data?.project_title);
  projectFormData.append("company", data?.company);
  projectFormData.append("feature_photo", data?.feature_photo);
  projectFormData.append("description", data?.description);
  projectFormData.append("currency", "PKR");
  projectFormData.append("country", data?.location?.country);
  projectFormData.append("city", data?.location?.city);
  projectFormData.append("address", data?.location?.address);
  projectFormData.append("lat", data?.location?.lat);
  projectFormData.append("lng", data?.location?.lng);
  data?.project_photo?.forEach((file) => {
    projectFormData.append("photos", file);
  });
  return projectFormData;
};

export const updateProjectFormData = (
  data,
  installmentPlans,
  imageIdsToDelete
) => {
  const formData = new FormData();
  if (data?.title) formData.append("title", data?.title);
  if (data?.company) formData.append("company", data?.company?.id);
  if (data?.feature_photo)
    formData.append("feature_photo", data?.feature_photo);
  if (data?.description) formData.append("description", data?.description);
  if (data?.country) formData.append("country", data?.country);
  if (data?.city) formData.append("city", data?.city);
  if (data?.address) formData.append("address", data?.address);
  if (data?.lat) formData.append("lat", data?.lat);
  if (data?.lng) formData.append("lng", data?.lng);

  formData.append("installments", JSON.stringify(installmentPlans));
  if (imageIdsToDelete?.length > 0)
    formData.append(
      "project_photo_to_delete",
      JSON.stringify(imageIdsToDelete)
    );
  if (data?.project_photo) {
    data?.project_photo?.forEach((file) => {
      formData.append("photos", file);
    });
  }
  return formData;
};

export const buildUsersSearchQuery = (data) => {
  let query = "search=";
  if (data?.searchText?.length > 3) query = query + `${data?.searchText}`;
  if (data?.city) query = query + `&city=${data?.city}`;
  if (data?.country) query = query + `&country=${data?.country}`;
  return query;
};
export const buildAgencySearchQuery = (data) => {
  let query = "search=";
  if (data?.area) query = query + `${data?.area}`;
  if (data?.searchText?.length >= 3)
    query = query + `&name=${data?.searchText}`;
  return query;
};
export const buildListingSearchQuery = (data) => {
  let query = "";
  if (data?.searchTitle) query = query + `&title=${data?.searchTitle}`;
  if (data?.searchAgent) query = query + `&agent_name=${data?.searchAgent}`;
  if (data?.searchLocation) query = query + `&search_place=${data?.searchLocation}`;
  return query;
};
export const buildVerificationSearchQuery = (type, data) => {
  let query = `type=${type}`;
  if (data?.searchText?.length >= 3)
    query = query + `&name=${data?.searchText}`;
  if (data?.city) query = query + `&city=${data?.city}`;
  if (data?.area) query = query + `&address=${data?.area}`;
  return query;
};
export const buildPostSearchQuery = (data) => {
  let query = "?search=";
  if (data?.postID?.length > 0) return `?post_id=${data?.postID}`;
  if (data?.searchText?.length >= 3) query = query + `${data?.searchText}`;
  return query;
};
export const currencyFormatInitials = (number, currency) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "PKR",
    maximumFractionDigits: 0,
  }).format(number);
};

export const currencyFormatter = (number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number);
};
export const initialCurrencyFormat = (number, currency) => {
  const x = JSON.parse(sessionStorage.getItem("persist:auth"));
  const location = JSON.parse(x?.currentLocation);
  if (location?.countryCode === "PK") {
    const crore = number / 10000000;
    const lakh = (number % 10000000) / 100000;
    const remainder = number % 100000;
    let formattedNumber = `${currency} `;
    if (crore >= 1) {
      return (formattedNumber += crore + " crore ");
    } else if (lakh >= 1) {
      return (formattedNumber += lakh + " lac ");
    } else if (remainder > 0) {
      return (formattedNumber += remainder);
    } else return formattedNumber;
  } else
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "PKR",
      maximumFractionDigits: 0,
    }).format(number);
};

export const getConcatenatedPrice = (price, limit) => {
  let _temp = price;

  if (price?.length > limit) {
    _temp = price?.substring(0, limit) + "..";
  }
  return _temp;
};

export const getUserTypeLabel = (user_type) => {
  if (user_type === USER_TYPES.ADMIN) return "Admin";
  if (user_type === USER_TYPES.USER) return "User";
  if (user_type === USER_TYPES.AGENT) return "Agent";
  if (user_type === USER_TYPES.CEO) return "CEO";
  return "Moderator";
};

export const getConstructionHeading = (index) => {
  switch (index) {
    case 0:
      return "Interior details";
    case 1:
      return "Exterior details";
    case 2:
      return "Type & Style";
    case 3:
      return "Material Information";
    case 4:
      return "Condition";

    default:
      return "Interior details";
  }
};

export const getPastYears = (timePeriod) => {
  var max = new Date().getFullYear();
  var min = max - timePeriod;
  let years = [];

  for (let i = max; i >= min; i--) {
    years.push(i);
  }
  return years;
};

export const getPostUpdateFormData = (data) => {
  // // console.log({ data });
  const listingFormData = new FormData();
  if (data?.construction_details)
    addConstructionDetails(data?.construction_details, listingFormData);

  if (data?.title) listingFormData.append("title", data?.title);
  if (data?.purpose) listingFormData.append("purpose", data?.purpose);
  if (data?.type) listingFormData.append("type", data?.type);
  if (data?.categories) listingFormData.append("categories", data?.categories);
  if (data?.size) listingFormData.append("size", parseFloat(data?.size).toFixed(2));
  if (data?.unit) listingFormData.append("unit", data?.unit);
  if (data?.price) listingFormData.append("price", parseFloat(data?.price).toFixed(2));
  if (data?.currency) listingFormData.append("currency", data?.currency);
  if (data?.description)
    listingFormData.append("description", data?.description);
  if (data?.bedrooms) listingFormData.append("bedrooms", data?.bedrooms);
  if (data?.bathrooms) listingFormData.append("bathrooms", data?.bathrooms);
  if (data?.cars_parking)
    listingFormData.append("cars_parking", data?.cars_parking);
  if (data?.country) listingFormData.append("country", data?.country);
  if (data?.city) listingFormData.append("city", data?.city);
  if (data?.area) listingFormData.append("area", data?.area);
  if (data?.block) listingFormData.append("block", data?.block);
  if (data?.address) listingFormData.append("address", data?.address);
  if (data?.lat) listingFormData.append("lat", data?.lat);
  if (data?.lng) listingFormData.append("lng", data?.lng);

  if (data?.image?.length > 0) {
    listingFormData.append("image_len", data?.image?.length);
    data?.image?.forEach((file, i) => {
      listingFormData.append("image[" + i + "]", file);
    });
  }
  if (data?.floor_image?.length > 0) {
    listingFormData.append("floor_image_len", data?.floor_image?.length);
    data?.floor_image?.forEach((file, i) => {
      listingFormData.append("floor_image[" + i + "]", file);
    });
  }
  if (data?.features) {
    listingFormData.append("features.tv_lounge", data?.features?.tv_lounge);
    listingFormData.append("features.store_room", data?.features?.store_room);
    listingFormData.append(
      "features.laundry_room",
      data?.features?.laundry_room
    );
    listingFormData.append("features.kitchen", data?.features?.kitchen);
    listingFormData.append("features.balcony", data?.features?.balcony);
    listingFormData.append("features.garden", data?.features?.garden);
  }
  if (data?.services) {
    listingFormData.append("services.electricity", data?.services?.electricity);
    listingFormData.append("services.gas", data?.services?.gas);
    listingFormData.append("services.water", data?.services?.water);
    listingFormData.append("services.maintenance", data?.services?.maintenance);
    listingFormData.append("services.security", data?.services?.security);
    listingFormData.append("services.sewerage", data?.services?.sewerage);
  }
  return listingFormData;
};

export const getVerificationData = (type, itemID, data) => {
  const requestData = new FormData();
  requestData.append("type", type);
  if (type === "user" || type === "agent" || type === "ceo") {
    requestData.append("user", itemID);
  } else {
    requestData.append(type, itemID);
  }
  data?.verification_files?.forEach((file) => {
    requestData.append("file", file);
  });
  return requestData;
};

export const getUpdateVerificationData = (data) => {
  const requestData = new FormData();
  if (data?.files_to_delete?.length > 0)
    requestData.append(
      "files_to_delete",
      JSON.stringify([...new Set(data?.files_to_delete)])
    );
  data?.verification_files?.forEach((file) => {
    requestData.append("file", file);
  });
  return requestData;
};

export const getCompanyPostData = (data, userId, insert) => {
  const formData = new FormData();
  data?.company_name && formData.append("company_name", data?.company_name);
  data?.company_email && formData.append("company_email", data?.company_email);
  data?.company_phone && formData.append("company_phone", data?.company_phone);
  data?.company_fax && formData.append("company_fax", data?.company_fax);
  formData.append(
    "no_of_employees",
    !data?.no_of_employees || data?.no_of_employees === ""
      ? 0
      : data?.no_of_employees
  );
  data?.interests && formData.append("interests", data?.interests);
  data?.company_city && formData.append("company_city", data?.company_city);
  data?.company_areas && formData.append("company_areas", data?.company_areas);
  data?.company_address &&
    formData.append("company_address", data?.company_address);
  data?.company_description &&
    formData.append("company_description", data?.company_description);
  data?.company_logo && formData.append("company_logo", data?.company_logo);
  if (insert === true) {
    formData.append("is_company", true);
    formData.append("admin", userId);
  }
  return formData;
};

export const getAuctionUpdateFormData = (data) => {
  const auctionFormData = new FormData();
  if (data?.size) auctionFormData.append("size", data?.size);
  if (data?.unit) auctionFormData.append("unit", data?.unit);
  if (data?.price) auctionFormData.append("price", data?.price);
  if (data?.currency) auctionFormData.append("currency", data?.currency);
  if (data?.country) auctionFormData.append("country", data?.country);
  if (data?.city) auctionFormData.append("city", data?.city);
  if (data?.area) auctionFormData.append("area", data?.area);
  if (data?.total_files)
    auctionFormData.append("total_files", data?.totalFiles);
  if (data?.sub_unit_share_percentage)
    auctionFormData.append("sub_unit_share_percentage", data?.sharePercentage);
  if (data?.sub_unit_value)
    auctionFormData.append("sub_unit_value", data?.price);

  if (data?.photos) {
    auctionFormData.append("len", 1);
    auctionFormData.append("file[" + 0 + "]", data?.photos);
  }

  return auctionFormData;
};

export const validateImageFiles = (files, existingFiles) => {
  // console.log({ files, existingFiles });
  const limit = MAX_IMAGE_COUNT - (existingFiles?.length || 0);

  let filesToSave = files
    ?.filter(
      (file) =>
        file.size / 1024 ** 2 < MAX_IMAGE_SIZE &&
        file?.name?.length < MAX_FILE_NAME_LENGTH
    )
    ?.filter((elem) => {
      let isOriginal = true;
      if (existingFiles?.length > 0) {
        existingFiles?.forEach((imgElem) => {
          if (imgElem?.name === elem?.name && imgElem?.type === elem?.type) {
            isOriginal = false;
          }
        });
      }
      return isOriginal;
    });

  if (filesToSave?.length > limit) filesToSave = filesToSave?.slice(0, limit);

  const discardedForSize = files?.filter(
    (file) => file.size / 1024 ** 2 > MAX_IMAGE_SIZE
  );
  const discardedForName = files?.filter(
    (file) => file?.name?.length > MAX_FILE_NAME_LENGTH
  );
  const discardedForDuplicates = files?.filter((elem) => {
    let isDuplicate = false;
    if (existingFiles?.length > 0) {
      existingFiles?.forEach((imgElem) => {
        if (imgElem?.name === elem?.name && imgElem?.type === elem?.type) {
          isDuplicate = true;
        }
      });
    }
    return isDuplicate;
  });
  const discarded = {
    discardedForSize,
    discardedForName,
    discardedForDuplicates,
    total:
      discardedForSize?.length +
      discardedForName?.length +
      discardedForDuplicates?.length,
  };

  return { filesToSave, discarded };
};
