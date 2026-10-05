import { useRef, useState, useCallback } from "react";
import { popularLocations } from "../data/mockData";

export default function SearchBar({ onSearch, searchCriteria, updateGuests, compact = false }) {
  // useRef: Focus the search input on mount / on demand
  const locationInputRef = useRef(null);

  const [localCriteria, setLocalCriteria] = useState({
    location: searchCriteria.location || "",
    checkIn: searchCriteria.checkIn || "",
    checkOut: searchCriteria.checkOut || "",
    guests: searchCriteria.guests || 1,
  });
  const [showSuggestions, setShowSuggestions] = useState(false);

  // useRef: demonstrate DOM focus
  const focusLocationInput = useCallback(() => {
    locationInputRef.current?.focus();
  }, []);

  const handleLocationChange = useCallback((value) => {
    setLocalCriteria((prev) => ({ ...prev, location: value }));
    setShowSuggestions(value.length > 0);
  }, []);

  const handleSelectSuggestion = useCallback((loc) => {
    setLocalCriteria((prev) => ({ ...prev, location: loc }));
    setShowSuggestions(false);
    locationInputRef.current?.focus();
  }, []);

  const handleGuestChange = useCallback(
    (delta) => {
      const newCount = Math.max(1, Math.min(10, localCriteria.guests + delta));
      setLocalCriteria((prev) => ({ ...prev, guests: newCount }));
      updateGuests(newCount);
    },
    [localCriteria.guests, updateGuests]
  );

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      onSearch(localCriteria);
    },
    [localCriteria, onSearch]
  );

  const filteredLocations = popularLocations.filter((loc) =>
    loc.toLowerCase().includes(localCriteria.location.toLowerCase())
  );

  const today = new Date().toISOString().split("T")[0];

  return (
    <form
      className={`search-bar ${compact ? "search-bar--compact" : ""}`}
      onSubmit={handleSearch}
    >
      {/* Location */}
      <div className="search-field search-field--location">
        <label className="search-label">
          <span className="search-label-icon">📍</span> Destination
        </label>
        <div className="search-input-wrapper">
          <input
            ref={locationInputRef}
            type="text"
            className="search-input"
            placeholder="Where are you going?"
            value={localCriteria.location}
            onChange={(e) => handleLocationChange(e.target.value)}
            onFocus={() => setShowSuggestions(localCriteria.location.length > 0 || true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          />
          {showSuggestions && filteredLocations.length > 0 && (
            <ul className="suggestions-list">
              {filteredLocations.map((loc) => (
                <li
                  key={loc}
                  className="suggestion-item"
                  onMouseDown={() => handleSelectSuggestion(loc)}
                >
                  <span>📍</span> {loc}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="search-divider" />

      {/* Check-in */}
      <div className="search-field">
        <label className="search-label">
          <span className="search-label-icon">📅</span> Check-in
        </label>
        <input
          type="date"
          className="search-input"
          min={today}
          value={localCriteria.checkIn}
          onChange={(e) =>
            setLocalCriteria((prev) => ({ ...prev, checkIn: e.target.value }))
          }
        />
      </div>

      <div className="search-divider" />

      {/* Check-out */}
      <div className="search-field">
        <label className="search-label">
          <span className="search-label-icon">📅</span> Check-out
        </label>
        <input
          type="date"
          className="search-input"
          min={localCriteria.checkIn || today}
          value={localCriteria.checkOut}
          onChange={(e) =>
            setLocalCriteria((prev) => ({ ...prev, checkOut: e.target.value }))
          }
        />
      </div>

      <div className="search-divider" />

      {/* Guests */}
      <div className="search-field">
        <label className="search-label">
          <span className="search-label-icon">👥</span> Guests
        </label>
        <div className="guest-counter">
          <button
            type="button"
            className="guest-btn"
            onClick={() => handleGuestChange(-1)}
            aria-label="Decrease guests"
          >
            −
          </button>
          <span className="guest-count">{localCriteria.guests}</span>
          <button
            type="button"
            className="guest-btn"
            onClick={() => handleGuestChange(1)}
            aria-label="Increase guests"
          >
            +
          </button>
        </div>
      </div>

      {/* Search Button */}
      <button type="submit" className="search-btn" onClick={focusLocationInput}>
        <span>🔍</span>
        <span>{compact ? "Search" : "Search Hotels"}</span>
      </button>
    </form>
  );
}
