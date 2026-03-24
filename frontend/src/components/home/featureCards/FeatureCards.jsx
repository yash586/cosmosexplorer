import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { ICONS } from '../../../constants/icons';
import { COLORS } from '../../../constants/colors';
import styles from './FeatureCards.module.css';

/**
 * Feature card data
 * Each card links to a main page of the app
 * @type {Array<{icon, title, subtitle, description, path, color}>}
 */
const FEATURES = [
  {
    icon: ICONS.APOD,
    title: 'APOD',
    subtitle: 'Astronomy Picture of the Day',
    description: 'Every day NASA captures something extraordinary. Travel back in time through 30 years of stunning space imagery.',
    path: '/apod',
    color: COLORS.ACCENT,
  },
  {
    icon: ICONS.NEAR_EARTH,
    title: 'Near Earth',
    subtitle: 'Asteroid Tracker',
    description: 'Track asteroids flying past Earth in real time. See which ones are potentially hazardous.',
    path: '/near-earth',
    color: COLORS.DANGER,
  },
  {
    icon: ICONS.DISCOVER,
    title: 'Discover',
    subtitle: 'NASA Image Library',
    description: 'Search 140,000+ NASA images spanning 60 years of space exploration history.',
    path: '/discover',
    color: COLORS.SAFE,
  },
  {
    icon: ICONS.EARTH_EVENTS,
    title: 'Earth Events',
    subtitle: 'Natural Events on Earth',
    description: 'NASA satellites track wildfires, storms and volcanoes happening right now on Earth.',
    path: '/earth-events',
    color: COLORS.AMBER,
  },
];

/**
 * Feature Cards Section
 * Displays 4 clickable cards linking to main app sections
 * Each card has a hover accent line animation
 * @returns {JSX.Element} Feature cards grid
 */
const FeatureCards = () => {
  const navigate = useNavigate();
  return (
    <section className={styles.featureCards} id="cards">
      <div className="container">
        <div className="row g-4">
          {FEATURES.map((feature) => (
            <div key={feature.path} className="col-md-6 col-lg-3">
              <div
                className={styles.card}
                onClick={() => navigate(feature.path)}
                style={{ '--card-color': feature.color }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && navigate(feature.path)}
                aria-label={`Navigate to ${feature.title}`}
              >
                {/* Icon */}
                <div className={styles.icon}>
                  <FontAwesomeIcon icon={feature.icon} size="2x" />
                </div>

                {/* Title */}
                <h3 className={styles.title}>{feature.title}</h3>

                {/* Subtitle */}
                <p className={styles.subtitle}>{feature.subtitle}</p>

                {/* Description */}
                <p className={styles.description}>{feature.description}</p>

                {/* Arrow */}
                <div className={styles.arrow}>
                  Explore
                  <FontAwesomeIcon icon={faArrowRight} size="sm" />
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;