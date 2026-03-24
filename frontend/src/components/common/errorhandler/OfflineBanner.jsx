import useNetworkStatus from "../../../hooks/useNetworkStatus";
import "./OfflineBanner.css";

const OfflineBanner = () => {
  const isOnline = useNetworkStatus();
  if (isOnline) return null;

  return (
    <div className="offline-banner">
      📡 No internet connection some data may be unavailable
    </div>
  );
};

export default OfflineBanner;
