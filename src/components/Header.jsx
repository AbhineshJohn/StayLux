import { useCallback } from "react";

export default function Header({ currentView, onGoHome, onGoToList, selectedHotel }) {
  const getBreadcrumb = useCallback(() => {
    switch (currentView) {
      case "list":
        return (
          <>
            <span className="breadcrumb-sep">›</span>
            <span className="breadcrumb-item">Search Results</span>
          </>
        );
      case "detail":
        return (
          <>
            <span className="breadcrumb-sep">›</span>
            <button className="breadcrumb-btn" onClick={onGoToList}>
              Search Results
            </button>
            {selectedHotel && (
              <>
                <span className="breadcrumb-sep">›</span>
                <span className="breadcrumb-item">{selectedHotel.name}</span>
              </>
            )}
          </>
        );
      case "payment":
        return (
          <>
            <span className="breadcrumb-sep">›</span>
            <button className="breadcrumb-btn" onClick={onGoToList}>
              Search Results
            </button>
            <span className="breadcrumb-sep">›</span>
            <span className="breadcrumb-item">Payment</span>
          </>
        );
      case "confirmation":
        return (
          <>
            <span className="breadcrumb-sep">›</span>
            <span className="breadcrumb-item">Confirmation</span>
          </>
        );
      default:
        return null;
    }
  }, [currentView, onGoToList, selectedHotel]);

  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-logo" onClick={onGoHome} role="button" tabIndex={0}>
          <div className="logo-icon">🏨</div>
          <div className="logo-text">
            <span className="logo-main">StayLux</span>
            <span className="logo-sub">Premium Hotels</span>
          </div>
        </div>

        <nav className="header-nav">
          <div className="breadcrumb">
            <button className="breadcrumb-home" onClick={onGoHome}>
              Home
            </button>
            {getBreadcrumb()}
          </div>
        </nav>

        <div className="header-actions">
          <button className="header-btn">Sign In</button>
          <button className="btn-primary header-cta">List Your Property</button>
        </div>
      </div>
    </header>
  );
}
