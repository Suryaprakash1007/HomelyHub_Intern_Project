import slugify from 'slugify';
import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
    propertyName: {
        type: String,
        required: [true, "Please enter property name"]
    },
    prpertyName: {
        type: String
    },
    description: {
        type: String,
        required: [true, "Please add information about your property"]
    },
    extraInfo: {
        type: String,
        default: "checkin on time. good services."
    },
    propertyType: {
        type: String,
    },
    roomType: {
        type: String,
    },
    maximumGuest: {
        type: Number,
        required: [true, "Please give the maximum no of Guest that can occupy"]
    },
    amenities: [
        {
            name: {
                type: String,
                required: true
            },
            icon: {
                type: String,
                required: true
            }
        }
    ],
    images: {
        type: [
            {
                public_id: {
                    type: String
                },
                url: {
                    type: String,
                    required: true
                }
            }
        ],
        validate: {
            validator: function (arr) {
                return Array.isArray(arr) && arr.length >= 1;
            },
            message: "The property must contain at least 1 image"
        }
    },
    price: {
        type: Number,
        required: [true, "Please enter the price per night value"],
        default: 500
    },
    address: {
        area: String,
        city: String,
        state: String,
        pincode: mongoose.Schema.Types.Mixed
    },
    cuurentBookings: [
        {
            bookingId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Booking"
            },
            fromDate: {
                type: Date
            },
            toDate: {
                type: Date
            },
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        }
    ],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    slug: String,
    checkInTime: { type: String, default: "11:00" },
    checkOutTime: { type: String, default: "13:00" }
});

propertySchema.pre("save", function (next) {
    const nameToSlug = this.propertyName || this.prpertyName || "property";
    this.slug = slugify(nameToSlug, { lower: true });
    
    if (!this.propertyName && this.prpertyName) {
        this.propertyName = this.prpertyName;
    }
    if (!this.prpertyName && this.propertyName) {
        this.prpertyName = this.propertyName;
    }

    if (this.address && this.address.city) {
        this.address.city = String(this.address.city).toLowerCase().trim();
    }
    
    if (typeof next === "function") {
        next();
    }
});

const Property = mongoose.models.Property || mongoose.model("Property", propertySchema);

export { Property };