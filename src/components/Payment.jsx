import { useState, useCallback } from "react";

export default function Payment({
  hotel,
  room,
  searchCriteria,
  stayDuration,
  totalCost,
  customerInfo,
  setCustomerInfo,
  onConfirmBooking,
  onGoBack,
}) {
  const [errors, setErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardInfo, setCardInfo] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const handleCustomerChange = useCallback(
    (field, value) => {
      setCustomerInfo((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: "" }));
    },
    [setCustomerInfo]
  );

  const handleCardChange = useCallback((field, value) => {
    setCardInfo((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  }, []);

  const validate = useCallback(() => {
    const newErrors = {};
    if (!customerInfo.name.trim()) newErrors.name = "Full name is required";
    if (!customerInfo.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Valid email address is required";
    if (!customerInfo.phone.match(/^\d{10}$/))
      newErrors.phone = "Valid 10-digit phone number is required";
    if (paymentMethod === "card") {
      if (!cardInfo.number.replace(/\s/g, "").match(/^\d{16}$/))
        newErrors.cardNumber = "Valid 16-digit card number is required";
      if (!cardInfo.name.trim()) newErrors.cardName = "Cardholder name is required";
      if (!cardInfo.expiry.match(/^\d{2}\/\d{2}$/))
        newErrors.expiry = "Expiry in MM/YY format is required";
      if (!cardInfo.cvv.match(/^\d{3,4}$/))
        newErrors.cvv = "Valid CVV is required";
    }
    return newErrors;
  }, [customerInfo, cardInfo, paymentMethod]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const validationErrors = validate();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
      setIsProcessing(true);
      // Simulate payment processing
      await new Promise((res) => setTimeout(res, 1800));
      setIsProcessing(false);
      onConfirmBooking();
    },
    [validate, onConfirmBooking]
  );

  const formatCardNumber = (value) => {
    const v = value.replace(/\D/g, "").slice(0, 16);
    return v.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="payment-page">
      <button className="back-btn" onClick={onGoBack}>
        ← Back to Hotel Details
      </button>

      <div className="payment-layout">
        {/* Payment Form */}
        <div className="payment-form-section">
          <h2 className="payment-title">Complete Your Booking</h2>

          <form className="payment-form" onSubmit={handleSubmit} noValidate>
            {/* Guest Information */}
            <div className="form-group-card">
              <h3 className="form-group-title">👤 Guest Information</h3>
              <div className="form-grid">
                <div className="form-field">
                  <label className="form-label" htmlFor="guestName">Full Name *</label>
                  <input
                    id="guestName"
                    type="text"
                    className={`form-input ${errors.name ? "form-input--error" : ""}`}
                    placeholder="Enter your full name"
                    value={customerInfo.name}
                    onChange={(e) => handleCustomerChange("name", e.target.value)}
                  />
                  {errors.name && <span className="form-error">{errors.name}</span>}
                </div>

                <div className="form-field">
                  <label className="form-label" htmlFor="guestEmail">Email Address *</label>
                  <input
                    id="guestEmail"
                    type="email"
                    className={`form-input ${errors.email ? "form-input--error" : ""}`}
                    placeholder="your@email.com"
                    value={customerInfo.email}
                    onChange={(e) => handleCustomerChange("email", e.target.value)}
                  />
                  {errors.email && <span className="form-error">{errors.email}</span>}
                </div>

                <div className="form-field">
                  <label className="form-label" htmlFor="guestPhone">Phone Number *</label>
                  <input
                    id="guestPhone"
                    type="tel"
                    className={`form-input ${errors.phone ? "form-input--error" : ""}`}
                    placeholder="10-digit mobile number"
                    value={customerInfo.phone}
                    onChange={(e) => handleCustomerChange("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                  />
                  {errors.phone && <span className="form-error">{errors.phone}</span>}
                </div>

                <div className="form-field form-field--full">
                  <label className="form-label" htmlFor="specialRequests">Special Requests (optional)</label>
                  <textarea
                    id="specialRequests"
                    className="form-input form-textarea"
                    placeholder="Early check-in, dietary requirements, accessibility needs..."
                    value={customerInfo.specialRequests}
                    onChange={(e) => handleCustomerChange("specialRequests", e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="form-group-card">
              <h3 className="form-group-title">💳 Payment Method</h3>

              <div className="payment-methods">
                {[
                  { id: "card", label: "Credit / Debit Card", icon: "💳" },
                  { id: "upi", label: "UPI", icon: "📱" },
                  { id: "netbanking", label: "Net Banking", icon: "🏦" },
                ].map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    className={`payment-method-btn ${paymentMethod === method.id ? "payment-method-btn--active" : ""}`}
                    onClick={() => setPaymentMethod(method.id)}
                  >
                    <span>{method.icon}</span>
                    <span>{method.label}</span>
                  </button>
                ))}
              </div>

              {paymentMethod === "card" && (
                <div className="form-grid card-form">
                  <div className="form-field form-field--full">
                    <label className="form-label" htmlFor="cardNumber">Card Number *</label>
                    <input
                      id="cardNumber"
                      type="text"
                      className={`form-input ${errors.cardNumber ? "form-input--error" : ""}`}
                      placeholder="1234 5678 9012 3456"
                      value={cardInfo.number}
                      onChange={(e) => handleCardChange("number", formatCardNumber(e.target.value))}
                      maxLength={19}
                    />
                    {errors.cardNumber && <span className="form-error">{errors.cardNumber}</span>}
                  </div>

                  <div className="form-field form-field--full">
                    <label className="form-label" htmlFor="cardName">Cardholder Name *</label>
                    <input
                      id="cardName"
                      type="text"
                      className={`form-input ${errors.cardName ? "form-input--error" : ""}`}
                      placeholder="Name on card"
                      value={cardInfo.name}
                      onChange={(e) => handleCardChange("name", e.target.value)}
                    />
                    {errors.cardName && <span className="form-error">{errors.cardName}</span>}
                  </div>

                  <div className="form-field">
                    <label className="form-label" htmlFor="cardExpiry">Expiry Date *</label>
                    <input
                      id="cardExpiry"
                      type="text"
                      className={`form-input ${errors.expiry ? "form-input--error" : ""}`}
                      placeholder="MM/YY"
                      value={cardInfo.expiry}
                      onChange={(e) => {
                        let v = e.target.value.replace(/\D/g, "").slice(0, 4);
                        if (v.length > 2) v = v.slice(0, 2) + "/" + v.slice(2);
                        handleCardChange("expiry", v);
                      }}
                      maxLength={5}
                    />
                    {errors.expiry && <span className="form-error">{errors.expiry}</span>}
                  </div>

                  <div className="form-field">
                    <label className="form-label" htmlFor="cardCvv">CVV *</label>
                    <input
                      id="cardCvv"
                      type="password"
                      className={`form-input ${errors.cvv ? "form-input--error" : ""}`}
                      placeholder="•••"
                      value={cardInfo.cvv}
                      onChange={(e) => handleCardChange("cvv", e.target.value.replace(/\D/g, "").slice(0, 4))}
                      maxLength={4}
                    />
                    {errors.cvv && <span className="form-error">{errors.cvv}</span>}
                  </div>
                </div>
              )}

              {paymentMethod === "upi" && (
                <div className="form-field">
                  <label className="form-label" htmlFor="upiId">UPI ID</label>
                  <input
                    id="upiId"
                    type="text"
                    className="form-input"
                    placeholder="yourname@upi"
                  />
                </div>
              )}

              {paymentMethod === "netbanking" && (
                <div className="form-field">
                  <label className="form-label" htmlFor="bank">Select Bank</label>
                  <select id="bank" className="form-input">
                    <option>State Bank of India</option>
                    <option>HDFC Bank</option>
                    <option>ICICI Bank</option>
                    <option>Axis Bank</option>
                    <option>Kotak Mahindra Bank</option>
                  </select>
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn-primary btn-large payment-submit-btn"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <span className="processing-text">
                  <span className="spinner" /> Processing Payment...
                </span>
              ) : (
                `Pay ₹${totalCost.total?.toLocaleString("en-IN")} & Confirm Booking`
              )}
            </button>

            <p className="payment-secure-note">
              🔒 Your payment is secured with 256-bit SSL encryption
            </p>
          </form>
        </div>

        {/* Order Summary Panel */}
        <div className="payment-summary-panel">
          <div className="order-summary">
            <h3 className="order-summary-title">Order Summary</h3>

            <img
              src={hotel.image}
              alt={hotel.name}
              className="order-hotel-img"
            />
            <h4 className="order-hotel-name">{hotel.name}</h4>
            <p className="order-hotel-location">📍 {hotel.location}</p>

            <div className="order-details">
              <div className="order-row">
                <span>🛏 Room</span>
                <strong>{room?.type}</strong>
              </div>
              <div className="order-row">
                <span>📅 Check-in</span>
                <strong>{formatDate(searchCriteria.checkIn)}</strong>
              </div>
              <div className="order-row">
                <span>📅 Check-out</span>
                <strong>{formatDate(searchCriteria.checkOut)}</strong>
              </div>
              <div className="order-row">
                <span>🌙 Duration</span>
                <strong>{stayDuration} Night{stayDuration !== 1 ? "s" : ""}</strong>
              </div>
              <div className="order-row">
                <span>👥 Guests</span>
                <strong>{searchCriteria.guests}</strong>
              </div>
            </div>

            <div className="order-cost">
              <div className="order-cost-row">
                <span>Room Cost</span>
                <span>₹{totalCost.roomCost?.toLocaleString("en-IN")}</span>
              </div>
              <div className="order-cost-row">
                <span>GST (18%)</span>
                <span>₹{totalCost.taxes?.toLocaleString("en-IN")}</span>
              </div>
              <div className="order-cost-total">
                <span>Total</span>
                <span>₹{totalCost.total?.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <div className="order-perks">
              <p>✓ Free cancellation before check-in</p>
              <p>✓ Instant confirmation</p>
              <p>✓ 24/7 customer support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
