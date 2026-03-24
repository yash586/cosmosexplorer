import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * Reusable Icon component
 * @param {Object} icon - FontAwesome icon from ICONS constants
 * @param {string} size - xs | sm | lg | xl | 2x etc
 * @param {string} color - CSS color or var()
 * @param {string} className - additional classes
 */
const Icon = ({ icon, size, color, className, spin = false }) => {
  return (
    <FontAwesomeIcon
      icon={icon}
      size={size}
      style={color ? { color } : undefined}
      className={className}
      spin={spin}
    />
  );
};

export default Icon;