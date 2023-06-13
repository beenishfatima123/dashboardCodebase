export const POST_TABS = [
  "Purpose",
  "Type",
  "Categories",
  "Details",
  "Construction",
  "Location",
  "Images",
  "Features",
  "Services",
  "Preview",
];
export const AUCTION_TABS = [
  "Purpose",
  "Information",
  "Images_subunit",
  "Preview_auction",
];

export const PROPERTY_PURPOSE = ["sell", "rent", "buy"];
export const LISTING_TYPE = [
  "Property",
  "sub unit trading",
  "auction file",
  "bulk files",
];
export const POST_MENU_VARIANTS = {
  open: (height = 1000) => ({
    clipPath: `circle(${height + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(0px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};
export const PROPERTY_TYPES = ["Residence", "Plot", "Commercial"];
export const PROPERTY_CATEGORIES = [
  "House",
  "Guest House",
  "Flat",
  "Hotel Suites",
  "Hostel",
  "Room",
  "Shop",
  "Office",
  "Warehouse",
  "Factory",
  "Building",
  "Foodcourt",
  "Plaza",
  "Land",
  "Commercial",
  "Residential",
  "Agricultural Land",
  "Industrial Land",
  "Plot File",
  "Farmhouse",
];
export const PROPERTY_FEATURES = [
  "TV Lounge",
  "Store Room",
  "Laundry Room",
  "Kitchen",
  "Balcony",
  "Garden",
];
export const PROPERTY_SERVICES = [
  "Electricity",
  "Gas",
  "Water",
  "Maintenance",
  "Security",
  "Sewerage",
];
export const PROPERTY_ATTRIBUTES = {
  TYPE: "type",
  CATEGORY: "category",
  FEATURES: "features",
  SERVICES: "services",
};

export const LISTING_UNIT_FILTERS = [
  { label: "Marla", value: "Marla" },
  { label: "Square Feet", value: "Square Feet" },
  { label: "Kanal", value: "Kanal" },
];
export const CURRENCY_ENUM = [
  { label: "PKR", value: "PKR" },
  { label: "USD", value: "USD" },
  { label: "TRY", value: "TRY" },
];
