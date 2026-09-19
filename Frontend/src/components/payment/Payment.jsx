import React, { useEffect, useState } from "react";
import "../../css/Payment.css";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { axiosInstance } from "../../utils/axios";
import { fetchUserBookings } from "../../store/Booking/booking-action";
import { STATIC_PAYMENT_DETAILS } from "../../data/staticData";

const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { propertyId } = useParams();
  const [showPaymentGateaway, setShowPaymentGateaway] = useState(false);

  const paymentDetails = location.state?.paymentDetails || STATIC_PAYMENT_DETAILS;
  const {
    checkinDate,
    checkoutDate,
    totalPrice,
    propertyName,
    guests,
    nights,
  } = paymentDetails;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orderData, setOrderData] = useState(null);

  const handleBooking = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.post("/api/v1/rent/booking/create-order", {
        amount: totalPrice,
        propertyId,
        fromDate: checkinDate,
        toDate: checkoutDate,
        guests,
      });

      if (response.data.success) {
        setOrderData(response.data);
      } else {
        setError(response.data.message || "Failed to create order");
      }
    } catch (err) {
      console.error("Error creating order:", err);
      setError(err.response?.data?.message || "Failed to initiate payment");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmPayment = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.post("/api/v1/rent/booking/verify-payment", {
        orderId: orderData?.orderId || "order_" + Date.now(),
        paymentId: "pay_" + Date.now(),
        forceStatus: "success",
        bookingDetails: {
          propertyId,
          price: totalPrice,
          fromDate: checkinDate,
          toDate: checkoutDate,
          guests,
          nights,
        },
      });

      if (response.data.success) {
        toast.success("🎉 Payment Successful! Booking Confirmed!");
        dispatch(fetchUserBookings());
        setTimeout(() => navigate("/user/mybookings"), 1000);
        setOrderData(null);
      } else {
        setError(response.data.message || "Payment verification failed");
      }
    } catch (err) {
      console.error("Error verifying payment:", err);
      setError(err.response?.data?.message || "Failed to complete booking");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelPayment = () => {
    toast.error("Payment Cancelled");
    navigate(`/propertylist/${propertyId}`);
  };
  useEffect(() => {
    if (orderData && !showPaymentGateaway) {
      setShowPaymentGateaway(true);
    }
  }, [orderData]);
  if (showPaymentGateaway && orderData) {
    return (
      <div className="payment-gateway-overlay">
        <div className="payment-gateway-modal">

          <div className="gateway-header">
            <div className="gateway-logo">
              <h2>🏠 HomelyHub</h2>
              <span>Payment Gateway</span>
            </div>
            <div className="secure-badge">
              <span>🔒 Secure Payment</span>
            </div>
          </div>

          <div className="gateway-content">
            <div className="merchant-info">
              <h3>
                Payment to: <strong>HomelyHub</strong>
              </h3>
              <p>
                Order ID: <strong>{orderData.orderId}</strong>
              </p>
            </div>

            <div className="payment-summary">
              <div className="summary-item">
                <span>Property:</span>
                <span>{propertyName}</span>
              </div>
              <div className="summary-item">
                <span>Check-in:</span>
                <span>{checkinDate}</span>
              </div>
              <div className="summary-item">
                <span>Check-out:</span>
                <span>{checkoutDate}</span>
              </div>
              <div className="summary-item">
                <span>Guests:</span>
                <span>{guests}</span>
              </div>
              <div className="summary-item">
                <span>Nights:</span>
                <span>{nights}</span>
              </div>
              <div className="summary-item total-amount">
                <span>
                  <strong>Total Amount:</strong>
                </span>
                <span>
                  <strong>₹{totalPrice.toLocaleString("en-IN")}</strong>
                </span>
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="gateway-actions">
              <button
                onClick={handleCancelPayment}
                className="cancel-btn"
                disabled={loading}
              >
                Cancel Payment
              </button>
              <button
                onClick={handleConfirmPayment}
                className="confirm-btn"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Processing...
                  </>
                ) : (
                  <>
                    <span>🔒</span>
                    Confirm Payment ₹{totalPrice.toLocaleString("en-IN")}
                  </>
                )}
              </button>
            </div>

            <div className="security-info">
              <p>
                <span>🛡️</span>
                Your payment information is encrypted and secure
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="payment-container">
      <div className="payment-header">
        <h1>Complete Your Booking</h1>
        <p>{propertyName}</p>
      </div>

      <div className="payment-content">

        <div className="booking-summary-card">
          <h3>Booking Details</h3>
          <div className="detail-row">
            <span>Check-in:</span>
            <span>{checkinDate}</span>
          </div>
          <div className="detail-row">
            <span>Check-out:</span>
            <span>{checkoutDate}</span>
          </div>
          <div className="detail-row">
            <span>Guests:</span>
            <span>{guests}</span>
          </div>
          <div className="detail-row">
            <span>Nights:</span>
            <span>{nights}</span>
          </div>
          <div className="detail-row total-row">
            <strong>Total Amount:</strong>
            <strong>₹{totalPrice}</strong>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="payment-action">
          <button
            onClick={handleBooking}
            disabled={loading}
            className="book-now-btn"
          >
            {loading ? "Processing..." : `Proceed to Payment ₹${totalPrice}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
