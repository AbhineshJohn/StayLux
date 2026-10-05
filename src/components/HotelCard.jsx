export default function HotelCard({ hotel, onSelect }) {
  const ratingColor = hotel.rating >= 4.7 ? "#10b981" : hotel.rating >= 4.4 ? "#f59e0b" : "#6366f1";

  return (
    <article className="hotel-card" onClick={() => onSelect(hotel)}>
      <div className="hotel-card-image-wrapper">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="hotel-card-image"
          loading="lazy"
        />
        <div className="hotel-card-badge">{hotel.category}</div>
        <div className="hotel-card-overlay" />
      </div>

      <div className="hotel-card-content">
        <div className="hotel-card-header">
          <div>
            <h3 className="hotel-card-name">{hotel.name}</h3>
            <p className="hotel-card-location">
              <span>📍</span> {hotel.location} · {hotel.address.split(",")[0]}
            </p>
          </div>
          <div className="hotel-card-rating" style={{ backgroundColor: ratingColor }}>
            <span className="rating-score">{hotel.rating}</span>
            <span className="rating-star">⭐</span>
          </div>
        </div>

        <p className="hotel-card-reviews">{hotel.reviews.toLocaleString()} reviews</p>

        <div className="hotel-card-amenities">
          {hotel.amenities.slice(0, 4).map((a) => (
            <span key={a} className="amenity-tag">{a}</span>
          ))}
          {hotel.amenities.length > 4 && (
            <span className="amenity-tag amenity-tag--more">+{hotel.amenities.length - 4} more</span>
          )}
        </div>

        <div className="hotel-card-footer">
          <div className="hotel-card-price">
            <span className="price-amount">₹{hotel.pricePerNight.toLocaleString("en-IN")}</span>
            <span className="price-label">/night</span>
          </div>
          <button
            className="btn-primary hotel-card-btn"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(hotel);
            }}
          >
            View Details →
          </button>
        </div>
      </div>
    </article>
  );
}
