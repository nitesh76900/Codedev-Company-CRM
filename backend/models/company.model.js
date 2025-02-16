const mongoose = require('mongoose');

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
      minlength: [3, 'Company name must be at least 3 characters long'],
    },
    phoneNo: {
      type: String,
      required: [true, 'Phone number is required'],
      unique: [true, "Phone number must be unique"],
      match: [/^\d{10,15}$/, 'Phone number must be between 10 to 15 digits'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: [true, "Email must be unique"],
      trim: true,
      lowercase: true,
    },
    industry: {
      type: String,
      required: [true, 'Industry is required'],
      trim: true,
    },
    image: {
      public_id: { type: String, required: [true, 'Image public_id is required'] },
      url: { type: String, required: [true, 'Image URL is required'] },
    },
    address: {
      country: { type: String, required: [true, 'Country is required'] },
      state: { type: String, required: [true, 'State is required'] },
      city: { type: String, required: [true, 'City is required'] },
      pincode: {
        type: String,
        required: [true, 'Pincode is required'],
        match: [/^\d{4,10}$/, 'Pincode must be between 4 to 10 digits'],
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Owner is required'],
    },
    employees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }],
    verify: {
      type: String,
      enum: ['Pending', 'Verify', 'Rejected'],
      default: 'Pending',
    },
    verifyBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Company = mongoose.model('Company', companySchema);
module.exports = Company;
