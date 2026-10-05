import { useState, useCallback } from "react";
import RoomSelection from "./RoomSelection";
import BookingSummary from "./BookingSummary";

export default function HotelDetail({
  hotel,
  searchCriteria,
  selectedRoom,
  onSelectRoom,
  stayDuration,
  totalCost,
  onGoToPayment,
  onGoBack,
  updateGuests,
}) {
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");

  const handleImageChange = useCallback((index) => {
    setActiveImage(index);
  }, []);

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "rooms", label: "Rooms" },
    { id: "amenities", label: "Amenities" },
  ];

  return (
    <div className="hotel-detail-page">
      <button className="back-btn" onClick={onGoBack}>
        ← Back to Results
      </button>

      {/* Image Gallery */}
      <div className="detail-gallery">
        <div className="gallery-main">
          <img
            src={hotel.images?.[activeImage] || hotel.image}
            alt={hotel.name}
            className="gallery-main-img"
          />
          <div className="gallery-badge">{hotel.category}</div>
        </div>
        {hotel.images?.length > 1 && (
          <div className="gallery-thumbs">
            {hotel.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${hotel.name} view ${i + 1}`}
                className={`gallery-thumb ${activeImage === i ? "gallery-thumb--active" : ""}`}
                onClick={() => handleImageChange(i)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="detail-layout">
        {/* Main Content */}
        <div className="detail-main">
          {/* Hotel Info Header */}
          <div className="detail-header">
            <div className="detail-title-block">
              <h1 className="detail-name">{hotel.name}</h1>
              <p className="detail-address">
                <span>📍</span> {hotel.address}
              </p>
            </div>
            <div className="detail-rating-block">
              <div className="detail-rating-badge">{hotel.rating} ⭐</div>
              <p className="detail-reviews">{hotel.reviews.toLocaleString()} reviews</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="detail-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`detail-tab ${activeTab === tab.id ? "detail-tab--active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === "overview" && (
            <div className="tab-content">
              <p className="detail-description">{hotel.description}</p>
              <div className="detail-quick-info">
                <div className="quick-info-item">
                  <span>📍</span>
                  <div>
                    <strong>Location</strong>
                    <p>{hotel.location}</p>
                  </div>
                </div>
                <div className="quick-info-item">
                  <span>🏨</span>
                  <div>
                    <strong>Category</strong>
                    <p>{hotel.category}</p>
                  </div>
                </div>
                <div className="quick-info-item">
                  <span>🛏</span>
                  <div>
                    <strong>Rooms Available</strong>
                    <p>{hotel.rooms.filter((r) => r.available).length} Types</p>
                  </div>
                </div>
                <div className="quick-info-item">
                  <span>💰</span>
                  <div>
                    <strong>Starting From</strong>
                    <p>₹{hotel.pricePerNight.toLocaleString("en-IN")}/night</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "rooms" && (
            <div className="tab-content">
              <RoomSelection
                rooms={hotel.rooms}
                selectedRoom={selectedRoom}
                onSelectRoom={onSelectRoom}
                guests={searchCriteria.guests}
                updateGuests={updateGuests}
              />
            </div>
          )}

          {activeTab === "amenities" && (
            <div className="tab-content">
              <div className="amenities-full-list">
                {hotel.amenities.map((amenity) => (
                  <div key={amenity} className="amenity-full-item">
                    <span className="amenity-check">✓</span>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Booking Summary Sidebar */}
        <div className="detail-sidebar">
          <BookingSummary
            hotel={hotel}
            selectedRoom={selectedRoom}
            searchCriteria={searchCriteria}
            stayDuration={stayDuration}
            totalCost={totalCost}
            onGoToPayment={onGoToPayment}
            onSelectRoom={() => setActiveTab("rooms")}
          />
        </div>
      </div>
    </div>
  );
}
