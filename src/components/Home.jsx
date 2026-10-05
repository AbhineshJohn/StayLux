import SearchBar from "./SearchBar";

export default function Home({ onSearch, searchCriteria, updateGuests }) {
  const features = [
    { icon: "🏆", title: "Best Price Guarantee", desc: "We match any lower price you find" },
    { icon: "🔒", title: "Secure Booking", desc: "Your payments are fully encrypted & safe" },
    { icon: "🎯", title: "Handpicked Hotels", desc: "Curated selection of premium properties" },
    { icon: "🌟", title: "24/7 Support", desc: "Our team is here whenever you need us" },
  ];

  const destinations = [
    { name: "Goa", tagline: "Beach Paradise", emoji: "🏖" },
    { name: "Jaipur", tagline: "Pink City Heritage", emoji: "🏰" },
    { name: "Mumbai", tagline: "City of Dreams", emoji: "🌃" },
    { name: "Kerala", tagline: "God's Own Country", emoji: "🌴" },
    { name: "Shimla", tagline: "Queen of Hills", emoji: "🏔" },
    { name: "Bangalore", tagline: "Silicon Valley", emoji: "💻" },
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="hero-badge">✨ Premium Hotel Booking</div>
          <h1 className="hero-title">
            Find Your Perfect
            <span className="hero-gradient"> Luxury Stay</span>
          </h1>
          <p className="hero-subtitle">
            Discover handpicked hotels across India's most breathtaking destinations.
            From royal palaces to beachside resorts — your dream stay awaits.
          </p>

          {/* Search Bar */}
          <div className="hero-search">
            <SearchBar
              onSearch={onSearch}
              searchCriteria={searchCriteria}
              updateGuests={updateGuests}
            />
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <span className="stat-number">500+</span>
              <span className="stat-label">Hotels</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="stat-number">50+</span>
              <span className="stat-label">Destinations</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="stat-number">1M+</span>
              <span className="stat-label">Happy Guests</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-container">
          <h2 className="section-title">Why Choose StayLux?</h2>
          <p className="section-subtitle">
            We go beyond bookings to deliver an exceptional travel experience
          </p>
          <div className="features-grid">
            {features.map((feat) => (
              <div key={feat.title} className="feature-card">
                <div className="feature-icon">{feat.icon}</div>
                <h3 className="feature-title">{feat.title}</h3>
                <p className="feature-desc">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="destinations-section">
        <div className="section-container">
          <h2 className="section-title">Popular Destinations</h2>
          <p className="section-subtitle">Explore our most-loved locations across India</p>
          <div className="destinations-grid">
            {destinations.map((dest) => (
              <div
                key={dest.name}
                className="destination-card"
                onClick={() => onSearch({ location: dest.name, checkIn: "", checkOut: "", guests: 1 })}
                role="button"
                tabIndex={0}
              >
                <div className="dest-emoji">{dest.emoji}</div>
                <div className="dest-content">
                  <h3 className="dest-name">{dest.name}</h3>
                  <p className="dest-tagline">{dest.tagline}</p>
                </div>
                <div className="dest-arrow">→</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready for Your Next Adventure?</h2>
          <p className="cta-subtitle">
            Join over a million travelers who trust StayLux for their premium stays.
          </p>
          <button
            className="btn-primary btn-large"
            onClick={() => onSearch({ location: "", checkIn: "", checkOut: "", guests: 1 })}
          >
            Explore All Hotels →
          </button>
        </div>
      </section>
    </div>
  );
}
