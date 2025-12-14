const packageModel = {
  name: "",
  image: [],
  content: "",
  duration: "",
  bestSeason: "",
  accomodation: "",
  grade: "",
  maxAltitude: "",
  itinerary: [],
  includes: [],
  excludes: [],
  fixedDepartures: [],
  tags: [],
}

const itineraryModel = {
  day: "",
  detail: "",
}

const fixedDeparturesModel = {
  date: "",
  bookings: "",
  maxBookings: "",
}

export const getPackageModel = () => {
  return packageModel
}

export const getItineraryModel = () => {
  return itineraryModel
}

export const getFixedDeparturesModel = () => {
  return fixedDeparturesModel
}
