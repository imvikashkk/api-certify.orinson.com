import Certificate from "../models/Certificate.js";


export const getCertificateById = async (req, res) => {
    const { cert_id } = req.params;
    try {
      const certificate = await Certificate.find({ certificate_id: cert_id });
      if (!certificate || certificate.length == 0) {
        return res.status(404).json({ message: "Certificate not found." });
      }
      const d = certificate[0];
  
      const data = {
         fullname: d.fullname,
         email: d.email,
         phone_number: phoneNumberPrivacy(d.phone_number),
         gender: d.gender,
         dob: formatDOB(d.dob),
         national_id_card: d.national_id_card,
         national_id_card_number: idCardPrivacy(d.national_id_card_number),
         current_or_last_academic: d.current_or_last_academic,
         current_or_last_college_university: d.current_or_last_college_university,
         passing_year: d.passing_year,
         job_type: d.job_type,
         job_mode: d.job_mode,
         job_role: d.job_role,
         stipend_salary: d.stipend_salary,
         start_date: formatDate(d.start_date),
         end_date: formatDate(d.end_date),
         duration: d.duration
      }
  
      res.status(200).json({ message: "certificate found!", data: data });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  function formatDOB(dateString) {
    const date = new Date(dateString);
  
    // Extract the day, month, and year
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();
  
    return `${day}/${month}/XXXX`;
  }
  
  function formatDate(dateString) {
    const date = new Date(dateString);
  
    // Extract the day, month, and year
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  }
  
  function phoneNumberPrivacy(phoneNumber) {
    const length = phoneNumber.length;
  
    let number = phoneNumber.slice(0, 5); 
    number = number + "X".repeat(length - 8);
    number = number + phoneNumber.slice(-3);
  
    return number;
  }
  
  function idCardPrivacy(number){
    const length = number.length; 
    let num = "X".repeat(length - 4);
    num = num + number.slice(-4)
    return num;
  }