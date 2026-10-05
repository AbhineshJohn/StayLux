export default function RoomSelection({ rooms, selectedRoom, onSelectRoom, guests, updateGuests }) {
  return (
    <div className="room-selection">
      {/* Guest Count Adjuster */}
      <div className="room-guest-bar">
        <span className="room-guest-label">👥 Number of Guests:</span>
        <div className="guest-counter">
          <button
            className="guest-btn"
            onClick={() => updateGuests(guests - 1)}
            disabled={guests <= 1}
            aria-label="Decrease guests"
          >
            −
          </button>
          <span className="guest-count">{guests}</span>
          <button
            className="guest-btn"
            onClick={() => updateGuests(guests + 1)}
            disabled={guests >= 10}
            aria-label="Increase guests"
          >
            +
          </button>
        </div>
      </div>

      <div className="rooms-list">
        {rooms.map((room) => {
          const isSelected = selectedRoom?.id === room.id;
          const isCompatible = room.capacity >= guests;
          return (
            <div
              key={room.id}
              className={`room-card ${isSelected ? "room-card--selected" : ""} ${!room.available ? "room-card--unavailable" : ""}`}
            >
              <div className="room-card-image-wrapper">
                <img
                  src={room.image}
                  alt={room.type}
                  className="room-card-image"
                  loading="lazy"
                />
                {!room.available && <div className="room-unavailable-overlay">Fully Booked</div>}
                {isSelected && <div className="room-selected-badge">✓ Selected</div>}
              </div>

              <div className="room-card-content">
                <div className="room-card-header">
                  <h4 className="room-type">{room.type}</h4>
                  <div className="room-price">
                    <span className="room-price-amount">₹{room.pricePerNight.toLocaleString("en-IN")}</span>
                    <span className="room-price-label">/night</span>
                  </div>
                </div>

                <div className="room-meta">
                  <span className="room-meta-item">📐 {room.size}</span>
                  <span className="room-meta-item">👥 Up to {room.capacity} guests</span>
                </div>

                {!isCompatible && room.available && (
                  <p className="room-warning">⚠️ Room capacity ({room.capacity}) is less than guest count ({guests})</p>
                )}

                <div className="room-amenities-list">
                  {room.amenities.map((a) => (
                    <span key={a} className="room-amenity">{a}</span>
                  ))}
                </div>

                {room.available ? (
                  <button
                    className={`room-select-btn ${isSelected ? "room-select-btn--selected" : ""}`}
                    onClick={() => onSelectRoom(room)}
                  >
                    {isSelected ? "✓ Room Selected" : "Select This Room"}
                  </button>
                ) : (
                  <button className="room-select-btn room-select-btn--disabled" disabled>
                    Fully Booked
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
