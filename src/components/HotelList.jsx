import FilterPanel from "./FilterPanel";
import HotelCard from "./HotelCard";
import SearchBar from "./SearchBar";

export default function HotelList({
  hotels,
  isLoading,
  searchCriteria,
  filters,
  setFilters,
  onSelectHotel,
  onSearch,
  updateGuests,
  stayDuration,
}) {
  const resultText = searchCriteria.location
    ? `Hotels in "${searchCriteria.location}"`
    : "All Available Hotels";

  return (
    <div className="hotel-list-page">
      {/* Compact Search Bar */}
      <div className="list-search-bar">
        <SearchBar
          onSearch={onSearch}
          searchCriteria={searchCriteria}
          updateGuests={updateGuests}
          compact
        />
      </div>

      <div className="hotel-list-container">
        {/* Filter Panel */}
        <FilterPanel filters={filters} setFilters={setFilters} />

        {/* Results Section */}
        <section className="results-section">
          <div className="results-header">
            <div>
              <h2 className="results-title">{resultText}</h2>
              <p className="results-meta">
                {isLoading ? (
                  "Searching for the best deals..."
                ) : (
                  <>
                    <strong>{hotels.length}</strong> propert{hotels.length !== 1 ? "ies" : "y"} found
                    {stayDuration > 0 && (
                      <> · <span className="stay-badge">🌙 {stayDuration} Night Stay</span></>
                    )}
                  </>
                )}
              </p>
            </div>
          </div>

          {isLoading ? (
            <div className="loading-grid">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="skeleton-card">
                  <div className="skeleton-image" />
                  <div className="skeleton-content">
                    <div className="skeleton-line skeleton-line--title" />
                    <div className="skeleton-line skeleton-line--short" />
                    <div className="skeleton-line skeleton-line--medium" />
                  </div>
                </div>
              ))}
            </div>
          ) : hotels.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🏨</div>
              <h3>No Hotels Found</h3>
              <p>Try adjusting your search criteria or filters to find available hotels.</p>
            </div>
          ) : (
            <div className="hotels-grid">
              {hotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} onSelect={onSelectHotel} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
