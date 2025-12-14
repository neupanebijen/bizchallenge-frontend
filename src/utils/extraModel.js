const extraModel = {
  contacts: {
    phoneNumber: "",
    email: "",
    location: "",
    mapLink: "",
    facebookLink: "",
    instagramLink: "",
    twitterLink: "",
    youtubeLink: "",
    whatsappLink: "",
  },
  usefulInformation: [],
  destinations: [],
}

const usefulInformationModel = {
  title: "",
  content: "",
}

export const getExtraModel = () => {
  return extraModel
}

export const getUsefulInformationModel = () => {
  return usefulInformationModel
}
