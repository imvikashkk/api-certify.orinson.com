import mongoose from "mongoose";

const CertificateSchema = new mongoose.Schema(
  {
    certificate_id: {
      type: String,
      required: true,
      unique: true,
    },
    prefix_certificate_id: {
      type: String,
      required: true,
    },
    suffix_certificate_id: {
      type: Number,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    phone_number:  {
      type: String,
      required: true,
      validate: {
        validator: function(v) {
          // Validate that the phone number starts with + and has between 10 and 15 digits
          return /^\+\d{10,15}$/.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`
      }
    },
    national_id_card: {
      type: String,
      required: true,
    },
    national_id_card_number: {
      type: String,
      required: true,
    },
    current_or_last_academic: {
      type: String,
      required: true,
    },
    current_or_last_college_university: {
      type: String,
      required: true,
    },
    passing_year: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^\d{4}$/.test(v);
        },
        message: (props) =>
          `${props.value} is not a valid year! It should be exactly 4 digits (0-9).`,
      },
    },
    job_role: {
      type: String,
      required: true,
    },
    job_type: {
      type: String,
      enum: ["Trainee", "Internship", "Part-Time", "Full-Time", "Freelance"],
      required: true,
    },
    job_mode: {
      type: String,
      enum: ["Remote", "On-Site", "Hybrid"],
      required: true,
    },
    stipend_salary:{
       type: String
    },
    start_date: {
      type: Date,
      required: true
    },
    end_date: {
      type: Date,
      required: true
    },
    duration: {
      type: String,
      required: true,
    },
    payment_method: {
      type: String,
      required: true,
    },
    payment_transaction_code: {
      type: String,
      unique: true,
      required: true
    },
    payment_price: {
      type: String,
      required: true,
    },
    payment_currency: {
      type: String,
      required: true,
    },
    certificate_granted_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isDismissed: {
      type: Boolean,
      default: false,
    },
    dismissedReason: {
      type: String,
      validate: {
        validator: function (v) {
          // Validate dismissedReason only if isDismissed is true
          return !this.isDismissed || (v && v.trim().length > 0);
        },
        message: (props) =>
          `Dismissed reason is required when isDismissed is true.`,
      },
    },
  },
  { timestamps: true }
);

const Certificate = mongoose.model("Certificate", CertificateSchema);
export default Certificate;
