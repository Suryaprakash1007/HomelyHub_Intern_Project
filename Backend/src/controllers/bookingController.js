import {Property} from "../Models/propertyModel.js";
import {Booking} from "../Models/bookingModel.js";

const createOrder = async (req, res) => {
  
    const {amount,propertyId, fromDate, toDate, guests} = req.body;

    const orderId="order_"+Date.now();
    res.json({
        success:true,
        message:"Order created successfully",
        orderId,
        amount,
        propertyId,
        fromDate,
        toDate,
        guests
    })
}

const verifyPayment = async (req, res) => {
  try {
    const { orderId, bookingDetails, forceStatus, paymentId } = req.body;

    if (forceStatus === "success") {
      const userId = req.user._id || req.user.id;
      const price = bookingDetails.price ?? bookingDetails.totalPrice;
      const fromDate = bookingDetails.fromDate ?? bookingDetails.checkinDate;
      const toDate = bookingDetails.toDate ?? bookingDetails.checkoutDate;
      const numberOfNights = bookingDetails.nights ?? bookingDetails.numberOfNights ?? bookingDetails.numberOfnights;

      const newBooking = await Booking.create({
        property: bookingDetails.propertyId,
        user: userId,
        price,
        fromDate,
        toDate,
        guests: bookingDetails.guests,
        numberOfNights,
        paid: true,
      });

      await Property.findByIdAndUpdate(
        bookingDetails.propertyId,
        {
          $push: {
            currentBookings: {
              bookingId: newBooking._id,
              fromDate,
              toDate,
              userId,
            },
          },
        },
        { returnDocument: "after", runValidators: true }
      );

      res.json({
        success: true,
        message: "Payment verified and booking created successfully",
        paymentId, // now defined
        orderId,
        bookingId: newBooking._id,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Payment verification failed",
        orderId,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({user:req.user._id}).populate("property");
        res.status(200).json({
            data: bookings
        })
    }catch (error) {
        res.status(401).json({
            status: "fail",
            message: error.message
        });
    }
}

const getBookingsDetails = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId).populate("property");
    if (!booking) {
      return res.status(404).json({ status: "fail", message: "Booking not found" });
    }
    res.status(200).json({ data: booking });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};



export {getBookingsDetails,getUserBookings,createOrder,verifyPayment};
