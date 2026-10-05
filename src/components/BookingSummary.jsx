export default function BookingSummary({
  hotel,
  selectedRoom,
  searchCriteria,
  stayDuration,
  totalCost,
  onGoToPayment,
  onSelectRoom,
}) {
  const canBook = selectedRoom && stayDuration > 0;

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="booking-summary">
      <div className="summary-header">
        <h3 className="summary-title">📋 Booking Summary</h3>
        <p className="summary-hotel-name">{hotel.name}</p>
      </div>

      <div className="summary-body">
        {/* Dates */}
        <div className="summary-section">
          <h4 className="summary-section-label">Stay Details</h4>
          <div className="summary-dates">
            <div className="summary-date">
              <span className="summary-date-label">Check-in</span>
              <span className="summary-date-value">{formatDate(searchCriteria.checkIn)}</span>
            </div>
            <div className="summary-date-arrow">→</div>
            <div className="summary-date">
              <span className="summary-date-label">Check-out</span>
              <span className="summary-date-value">{formatDate(searchCriteria.checkOut)}</span>
            </div>
          </div>
          <div className="summary-row">
            <span>Duration</span>
            <strong>{stayDuration > 0 ? `${stayDuration} Night${stayDuration !== 1 ? "s" : ""}` : "—"}</strong>
          </div>
          <div className="summary-row">
            <span>Guests</span>
            <strong>{searchCriteria.guests} Guest{searchCriteria.guests !== 1 ? "s" : ""}</strong>
          </div>
        </div>

        {/* Selected Room */}
        <div className="summary-section">
          <h4 className="summary-section-label">Room Type</h4>
          {selectedRoom ? (
            <div className="summary-room">
              <span className="summary-room-name">{selectedRoom.type}</span>
              <span className="summary-room-price">₹{selectedRoom.pricePerNight.toLocaleString("en-IN")}/night</span>
            </div>
          ) : (
            <button className="summary-select-room-btn" onClick={onSelectRoom}>
              + Select a Room
            </button>
          )}
        </div>

        {/* Cost Breakdown - useMemo calculated */}
        {canBook && (
          <div className="summary-section summary-cost">
            <h4 className="summary-section-label">Cost Breakdown</h4>
            <div className="summary-row">
              <span>Room × {stayDuration} nights</span>
              <span>₹{totalCost.roomCost?.toLocaleString("en-IN")}</span>
            </div>
            <div className="summary-row">
              <span>Taxes & GST (18%)</span>
              <span>₹{totalCost.taxes?.toLocaleString("en-IN")}</span>
            </div>
            <div className="summary-total">
              <span>Total Amount</span>
              <span>₹{totalCost.total?.toLocaleString("en-IN")}</span>
            </div>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="summary-footer">
        {!selectedRoom && (
          <p className="summary-hint">👆 Select a room to continue</p>
        )}
        {selectedRoom && stayDuration === 0 && (
          <p className="summary-hint">📅 Please select travel dates to continue</p>
        )}
        <button
          className="btn-primary btn-large summary-book-btn"
          onClick={onGoToPayment}
          disabled={!canBook}
        >
          {canBook ? `Proceed to Payment →` : "Complete Details Above"}
        </button>
      </div>
    </div>
  );
}
