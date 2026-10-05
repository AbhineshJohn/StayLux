import { useState, useCallback } from "react";
import { categories } from "../data/mockData";

const AMENITY_OPTIONS = ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Bar", "Parking", "Beach Access"];

export default function FilterPanel({ filters, setFilters }) {
  const [priceInput, setPriceInput] = useState(filters.priceRange[1]);

  const handleCategoryChange = useCallback(
    (cat) => {
      setFilters((prev) => ({ ...prev, category: cat }));
    },
    [setFilters]
  );

  const handleRatingChange = useCallback(
    (rating) => {
      setFilters((prev) => ({ ...prev, minRating: rating }));
    },
    [setFilters]
  );

  const handlePriceChange = useCallback(
    (value) => {
      setPriceInput(Number(value));
      setFilters((prev) => ({ ...prev, priceRange: [0, Number(value)] }));
    },
    [setFilters]
  );

  const handleAmenityToggle = useCallback(
    (amenity) => {
      setFilters((prev) => {
        const exists = prev.amenities.includes(amenity);
        return {
          ...prev,
          amenities: exists
            ? prev.amenities.filter((a) => a !== amenity)
            : [...prev.amenities, amenity],
        };
      });
    },
    [setFilters]
  );

  const handleReset = useCallback(() => {
    setPriceInput(50000);
    setFilters({ category: "All", priceRange: [0, 50000], minRating: 0, amenities: [] });
  }, [setFilters]);

  return (
    <aside className="filter-panel">
      <div className="filter-header">
        <h3 className="filter-title">🎛 Filters</h3>
        <button className="filter-reset" onClick={handleReset}>
          Reset All
        </button>
      </div>

      {/* Category Filter */}
      <div className="filter-section">
        <h4 className="filter-section-title">Hotel Type</h4>
        <div className="category-chips">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`chip ${filters.category === cat ? "chip--active" : ""}`}
              onClick={() => handleCategoryChange(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="filter-section">
        <h4 className="filter-section-title">
          Max Price: <span className="filter-value">₹{priceInput.toLocaleString("en-IN")}/night</span>
        </h4>
        <input
          type="range"
          className="price-slider"
          min={1000}
          max={50000}
          step={500}
          value={priceInput}
          onChange={(e) => handlePriceChange(e.target.value)}
        />
        <div className="price-range-labels">
          <span>₹1,000</span>
          <span>₹50,000</span>
        </div>
      </div>

      {/* Star Rating Filter */}
      <div className="filter-section">
        <h4 className="filter-section-title">Minimum Rating</h4>
        <div className="rating-options">
          {[0, 3, 4, 4.5].map((rating) => (
            <button
              key={rating}
              className={`rating-option ${filters.minRating === rating ? "rating-option--active" : ""}`}
              onClick={() => handleRatingChange(rating)}
            >
              {rating === 0 ? "Any" : `${rating}+ ⭐`}
            </button>
          ))}
        </div>
      </div>

      {/* Amenities Filter */}
      <div className="filter-section">
        <h4 className="filter-section-title">Amenities</h4>
        <div className="amenity-options">
          {AMENITY_OPTIONS.map((amenity) => (
            <label key={amenity} className="amenity-checkbox">
              <input
                type="checkbox"
                checked={filters.amenities.includes(amenity)}
                onChange={() => handleAmenityToggle(amenity)}
              />
              <span className="amenity-label">{amenity}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
