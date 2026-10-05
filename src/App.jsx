import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import HotelList from "./components/HotelList";
import HotelDetail from "./components/HotelDetail";
import Payment from "./components/Payment";
import { hotelsData } from "./data/mockData";
import "./App.css";

// App Views / Pages
const VIEWS = {
  HOME: "home",
  LIST: "list",
  DETAIL: "detail",
  PAYMENT: "payment",
  CONFIRMATION: "confirmation",
};

export default function App() {
  // ------------------------------------------------------------------
  // useState: Core Application State
  // ------------------------------------------------------------------
  const [currentView, setCurrentView] = useState(VIEWS.HOME);
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Search criteria
  const [searchCriteria, setSearchCriteria] = useState({
    location: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
  });

  // Filters
  const [filters, setFilters] = useState({
    category: "All",
    priceRange: [0, 50000],
    minRating: 0,
    amenities: [],
  });

  // Booking flow state
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    specialRequests: "",
  });
  const [bookingConfirmation, setBookingConfirmation] = useState(null);

  // ------------------------------------------------------------------
  // useEffect: Load hotel data when application starts
  // ------------------------------------------------------------------
  useEffect(() => {
    setIsLoading(true);
    // Simulate an API fetch
    const timer = setTimeout(() => {
      setHotels(hotelsData);
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // ------------------------------------------------------------------
  // useEffect: Update hotel availability when search criteria change
  // ------------------------------------------------------------------
  useEffect(() => {
    if (searchCriteria.location || searchCriteria.checkIn || searchCriteria.checkOut) {
      setIsLoading(true);
      // Simulate fetching fresh data based on date/location availability
      const timer = setTimeout(() => {
        setHotels([...hotelsData]); // In a real app, fetch fresh data here
        setIsLoading(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [searchCriteria.location, searchCriteria.checkIn, searchCriteria.checkOut]);

  // ------------------------------------------------------------------
  // useMemo: Efficiently calculate filtered hotels
  // ------------------------------------------------------------------
  const filteredHotels = useMemo(() => {
    return hotels.filter((hotel) => {
      const locationMatch =
        !searchCriteria.location ||
        hotel.location.toLowerCase().includes(searchCriteria.location.toLowerCase()) ||
        hotel.name.toLowerCase().includes(searchCriteria.location.toLowerCase());
      const categoryMatch = filters.category === "All" || hotel.category === filters.category;
      const priceMatch =
        hotel.pricePerNight >= filters.priceRange[0] && hotel.pricePerNight <= filters.priceRange[1];
      const ratingMatch = hotel.rating >= filters.minRating;
      const amenityMatch =
        filters.amenities.length === 0 ||
        filters.amenities.every((a) => hotel.amenities.includes(a));
      return locationMatch && categoryMatch && priceMatch && ratingMatch && amenityMatch;
    });
  }, [hotels, searchCriteria.location, filters]);

  // ------------------------------------------------------------------
  // useMemo: Calculate total stay duration
  // ------------------------------------------------------------------
  const stayDuration = useMemo(() => {
    if (!searchCriteria.checkIn || !searchCriteria.checkOut) return 0;
    const checkIn = new Date(searchCriteria.checkIn);
    const checkOut = new Date(searchCriteria.checkOut);
    const diff = checkOut - checkIn;
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }, [searchCriteria.checkIn, searchCriteria.checkOut]);

  // ------------------------------------------------------------------
  // useMemo: Calculate total booking cost
  // ------------------------------------------------------------------
  const totalCost = useMemo(() => {
    if (!selectedRoom || stayDuration === 0) return 0;
    const roomCost = selectedRoom.pricePerNight * stayDuration;
    const taxes = Math.round(roomCost * 0.18); // 18% GST
    return { roomCost, taxes, total: roomCost + taxes };
  }, [selectedRoom, stayDuration]);

  // ------------------------------------------------------------------
  // useCallback: Reusable memoized handler functions
  // ------------------------------------------------------------------
  const handleSearch = useCallback((criteria) => {
    setSearchCriteria((prev) => ({ ...prev, ...criteria }));
    setCurrentView(VIEWS.LIST);
  }, []);

  const selectHotel = useCallback((hotel) => {
    setSelectedHotel(hotel);
    setSelectedRoom(null);
    setCurrentView(VIEWS.DETAIL);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const selectRoom = useCallback((room) => {
    setSelectedRoom(room);
  }, []);

  const updateGuests = useCallback((count) => {
    setSearchCriteria((prev) => ({ ...prev, guests: Math.max(1, Math.min(10, count)) }));
  }, []);

  const confirmBooking = useCallback(() => {
    const confirmation = {
      id: `BK${Date.now()}`,
      hotel: selectedHotel,
      room: selectedRoom,
      checkIn: searchCriteria.checkIn,
      checkOut: searchCriteria.checkOut,
      guests: searchCriteria.guests,
      duration: stayDuration,
      cost: totalCost,
      customer: customerInfo,
      bookedAt: new Date().toISOString(),
    };
    setBookingConfirmation(confirmation);
    setCurrentView(VIEWS.CONFIRMATION);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedHotel, selectedRoom, searchCriteria, stayDuration, totalCost, customerInfo]);

  const handleGoHome = useCallback(() => {
    setCurrentView(VIEWS.HOME);
    setSelectedHotel(null);
    setSelectedRoom(null);
    setBookingConfirmation(null);
    setSearchCriteria({ location: "", checkIn: "", checkOut: "", guests: 1 });
    setFilters({ category: "All", priceRange: [0, 50000], minRating: 0, amenities: [] });
  }, []);

  const handleGoToPayment = useCallback(() => {
    setCurrentView(VIEWS.PAYMENT);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleGoToList = useCallback(() => {
    setCurrentView(VIEWS.LIST);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleGoToDetail = useCallback(() => {
    setCurrentView(VIEWS.DETAIL);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // ------------------------------------------------------------------
  // Render
  // ------------------------------------------------------------------
  return (
    <div className="app-container">
      <Header
        currentView={currentView}
        onGoHome={handleGoHome}
        onGoToList={handleGoToList}
        selectedHotel={selectedHotel}
      />

      <main className="main-content">
        {currentView === VIEWS.HOME && (
          <Home onSearch={handleSearch} searchCriteria={searchCriteria} updateGuests={updateGuests} />
        )}

        {currentView === VIEWS.LIST && (
          <HotelList
            hotels={filteredHotels}
            isLoading={isLoading}
            searchCriteria={searchCriteria}
            filters={filters}
            setFilters={setFilters}
            onSelectHotel={selectHotel}
            onSearch={handleSearch}
            updateGuests={updateGuests}
            stayDuration={stayDuration}
          />
        )}

        {currentView === VIEWS.DETAIL && selectedHotel && (
          <HotelDetail
            hotel={selectedHotel}
            searchCriteria={searchCriteria}
            selectedRoom={selectedRoom}
            onSelectRoom={selectRoom}
            stayDuration={stayDuration}
            totalCost={totalCost}
            onGoToPayment={handleGoToPayment}
            onGoBack={handleGoToList}
            updateGuests={updateGuests}
          />
        )}

        {currentView === VIEWS.PAYMENT && (
          <Payment
            hotel={selectedHotel}
            room={selectedRoom}
            searchCriteria={searchCriteria}
            stayDuration={stayDuration}
            totalCost={totalCost}
            customerInfo={customerInfo}
            setCustomerInfo={setCustomerInfo}
            onConfirmBooking={confirmBooking}
            onGoBack={handleGoToDetail}
          />
        )}

        {currentView === VIEWS.CONFIRMATION && bookingConfirmation && (
          <ConfirmationPage booking={bookingConfirmation} onGoHome={handleGoHome} />
        )}
      </main>

      <Footer />
    </div>
  );
}

// ------------------------------------------------------------------
// Inline Confirmation Page Component
// ------------------------------------------------------------------
function ConfirmationPage({ booking, onGoHome }) {
  return (
    <div className="confirmation-page">
      <div className="confirmation-card">
        <div className="confirmation-icon">✓</div>
        <h1>Booking Confirmed!</h1>
        <p className="confirmation-subtitle">Your reservation is all set. Have a wonderful stay!</p>

        <div className="confirmation-id">
          <span>Booking ID</span>
          <strong>{booking.id}</strong>
        </div>

        <div className="confirmation-details">
          <div className="conf-detail-row">
            <span>🏨 Hotel</span>
            <strong>{booking.hotel.name}</strong>
          </div>
          <div className="conf-detail-row">
            <span>🛏 Room</span>
            <strong>{booking.room.type}</strong>
          </div>
          <div className="conf-detail-row">
            <span>📍 Location</span>
            <strong>{booking.hotel.location}</strong>
          </div>
          <div className="conf-detail-row">
            <span>📅 Check-in</span>
            <strong>{new Date(booking.checkIn).toLocaleDateString("en-IN", { dateStyle: "long" })}</strong>
          </div>
          <div className="conf-detail-row">
            <span>📅 Check-out</span>
            <strong>{new Date(booking.checkOut).toLocaleDateString("en-IN", { dateStyle: "long" })}</strong>
          </div>
          <div className="conf-detail-row">
            <span>🌙 Duration</span>
            <strong>{booking.duration} Night{booking.duration !== 1 ? "s" : ""}</strong>
          </div>
          <div className="conf-detail-row">
            <span>👥 Guests</span>
            <strong>{booking.guests} Guest{booking.guests !== 1 ? "s" : ""}</strong>
          </div>
          <div className="conf-detail-row total-row">
            <span>💰 Total Paid</span>
            <strong>₹{booking.cost.total.toLocaleString("en-IN")}</strong>
          </div>
        </div>

        <p className="confirmation-email">
          A confirmation has been sent to <strong>{booking.customer.email}</strong>
        </p>

        <button className="btn-primary btn-large" onClick={onGoHome}>
          Book Another Stay
        </button>
      </div>
    </div>
  );
}
