import { motion } from "framer-motion"

import ContactForm from "../components/Contacts"
import Footer from "../components/Footer"

const ContactUs = () => {
  // useEffect(() => {
  //   window.open("http://45.115.217.25:81/enquiry?new=1", "_blank")
  // }, [])

  return (
    <motion.div exit={{ zIndex: 1, transition: { duration: 0.41, delay: 1 } }}>
      <ContactForm />
      <Footer />
    </motion.div>
  )
}

export default ContactUs
