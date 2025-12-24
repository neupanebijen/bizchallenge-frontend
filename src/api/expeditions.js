import axios from "axios"

const apiUrl = "http://localhost:8000/mainRoute"
export const apiImageLink = "http://localhost:8000/uploads/"
// const apiUrl = "/mainRoute"
// export const apiImageLink = "/uploads/"

export const getTeamMember = async (memberId) => {
  if (!memberId) return { success: false, message: "No member ID provided" }
  try {
    const result = await axios({
      method: "post",
      url: `${apiUrl}/getATeamMember`,
      data: { memberId: memberId },
    })
    return result.data
  } catch (e) {
    console.log(e.toString())
    return { success: false, message: "Error fetching team member" }
  }
}

export const getAllPackage = async () => {
  try {
    const result = await axios({
      method: "post",
      url: `${apiUrl}/getAllPackage`,
      data: {},
    })

    return result.data
  } catch (e) {
    console.log(e)
  }
}

export const createPackage = async (data) => {
  try {
    const result = await axios({
      method: "post",
      url: `${apiUrl}/createPackage`,
      data: { data },
    })

    return result.data
  } catch (e) {
    console.log(e)
  }
}

export const removePackage = async (packageId) => {
  try {
    const result = await axios({
      method: "post",
      url: `${apiUrl}/removePackage`,
      data: { packageId: packageId },
    })

    return result.data
  } catch (e) {
    console.log(e)
  }
}

export const getPackage = async (data) => {
  try {
    const result = await axios({
      method: "post",
      url: `${apiUrl}/getPackage`,
      data: { name: data },
    })

    return result.data
  } catch (e) {
    console.log(e)
  }
}

export const updatePackage = async (data) => {
  try {
    const result = await axios({
      method: "post",
      url: `${apiUrl}/editPackage`,
      data: { packageData: data },
    })

    return result.data
  } catch (e) {
    console.log(e)
  }
}

export const getAPage = async (name) => {
  try {
    const result = await axios({
      method: "post",
      url: `${apiUrl}/getAPage`,
      data: { name: name },
    })

    return result.data
  } catch (e) {
    console.log("Error in the getAPage API call: ", e)
  }
}

export const addPackageImage = async (formData, config) => {
  try {
    const result = await axios.post(
      `${apiUrl}/addPackageImage`,
      formData,
      config
    )

    return result.data
  } catch (e) {
    console.log(e)
  }
}

export const updatePage = async (data) => {
  try {
    const result = await axios({
      method: "post",
      url: `${apiUrl}/editPage`,
      data: { pageData: data },
    })

    return result.data
  } catch (e) {
    console.log(e)
  }
}

export const addTeamMember = async (data) => {
  try {
    const result = await axios({
      method: "post",
      url: `${apiUrl}/addTeamMember`,
      data: { memberData: data },
    })

    return result.data
  } catch (e) {
    console.log(e)
  }
}

export const removeTeamMember = async (data) => {
  try {
    const result = await axios({
      method: "post",
      url: `${apiUrl}/removeTeamMember`,
      data: { data: data },
    })

    return result.data
  } catch (e) {
    console.log(e)
  }
}

export const getATeamMember = async (data) => {
  try {
    const result = await axios({
      method: "post",
      url: `${apiUrl}/getATeamMember`,
      data: { memberId: data },
    })
    return result.data
  } catch (e) {
    console.log(e)
    return { success: false, message: "Error fetching team member" }
  }
}

export const getAllTeamMembers = async (data) => {
  try {
    const result = await axios({
      method: "post",
      url: `${apiUrl}/getAllTeamMembers`,
      data: {},
    })

    return result.data
  } catch (e) {
    console.log(e)
  }
}

export const editTeamMember = async (data) => {
  try {
    const result = await axios({
      method: "post",
      url: `${apiUrl}/editTeamMember`,
      data: { memberData: data },
    })

    return result.data
  } catch (e) {
    console.log(e)
  }
}

export const sendMail = async (data, type) => {
  const result = await axios({
    method: "post",
    url: `${apiUrl}/sendMail`,
    data: { data: data, type: type },
  })

  return result.data
}

export const addEvent = async (data) => {
  try {
    const result = await axios({
      method: "post",
      url: `${apiUrl}/addEvent`,
      data: { event: data },
    })

    return { success: true, result: result.data }
  } catch (e) {
    console.log(e)
  }
}

export const getAllEvents = async () => {
  try {
    const result = await axios({
      method: "post",
      url: `${apiUrl}/getAllEvents`,
      data: {},
    })

    return result.data
  } catch (e) {
    console.log(e)
  }
}

export const getEvent = async (data) => {
  try {
    const result = await axios({
      method: "post",
      url: `${apiUrl}/getEvent`,
      data: { eventId: data },
    })

    return result.data
  } catch (e) {
    console.log(e)
  }
}

export const updateEvent = async (data) => {
  try {
    const result = await axios({
      method: "post",
      url: `${apiUrl}/editEvent`,
      data: { event: data },
    })

    return result.data
  } catch (e) {
    console.log(e)
  }
}

export const removeEvent = async (data) => {
  try {
    const result = await axios({
      method: "post",
      url: `${apiUrl}/removeEvent`,
      data: { eventId: data },
    })

    return result.data
  } catch (e) {
    console.log(e)
  }
}

export const sendNewPassword = async (newPassword, code) => {
  try {
    const result = await axios({
      method: "post",
      url: `${apiUrl}/sendNewPassword`,
      data: { newPassword: newPassword, code: code },
    })
    return result.data
  } catch (e) {
    console.log(e)
  }
}

export const getCode = async (newPassword, code) => {
  try {
    const result = await axios({
      method: "post",
      url: `${apiUrl}/getCode`,
      data: {},
    })
    return result.data
  } catch (e) {
    console.log(e)
  }
}

export const loginUser = async (username, password) => {
  try {
    const result = await axios({
      method: "post",
      url: `${apiUrl}/loginUser`,
      data: { username: username, password: password },
    })
    return result.data
  } catch (e) {
    console.log(e)
  }
}
