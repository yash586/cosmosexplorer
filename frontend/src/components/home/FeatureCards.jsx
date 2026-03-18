import { useNavigate } from 'react-router-dom';
import './FeatureCards.css';

const features = [
  {
    icon:        '📷',
    title:       'APOD',
    subtitle:    'Astronomy Picture of the Day',
    description: 'Every day NASA captures something extraordinary. Travel back in time through 30 years of stunning space imagery.',
    path:        '/apod',
    color:       '#00B4FF',
  },
  {
    icon:        '☄️',
    title:       'Near Earth',
    subtitle:    'Asteroid Tracker',
    description: 'Track asteroids flying past Earth in real time. See which ones are potentially hazardous.',
    path:        '/near-earth',
    color:       '#FF4444',
  },
  {
    icon:        '🔭',
    title:       'Discover',
    subtitle:    'NASA Image Library',
    description: 'Search 140,000+ NASA images spanning 60 years of space exploration history.',
    path:        '/discover',
    color:       '#00D4AA',
  },
  {
    icon:        '🌍',
    title:       'Earth Events',
    subtitle:    'Natural Events on Earth',
    description: 'NASA satellites track wildfires, storms and volcanoes happening right now on Earth.',
    path:        '/earth-events',
    color:       '#FFB347',
  },
];

const FeatureCards = () => {
  const navigate = useNavigate();

  return (
    <section className="feature-cards" id='cards'>
      <div className="container">
        <div className="row g-4">
          {features.map((feature) => (
            <div key={feature.path} className="col-md-6 col-lg-3">
              <div
                className="feature-card"
                onClick={() => navigate(feature.path)}
                style={{ '--card-color': feature.color }}
              >
                {/* Icon */}
                <div className="feature-card_icon">
                  {feature.icon}
                </div>

                {/* Content */}
                <h3 className="feature-card_title">
                  {feature.title}
                </h3>
                <p className="feature-card_subtitle">
                  {feature.subtitle}
                </p>
                <p className="feature-card_description">
                  {feature.description}
                </p>

                {/* Arrow */}
                <div className="feature-card_arrow">
                  Explore →
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