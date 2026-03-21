import './AsteroidCommon.css';
import DailyBarChart from './DailyBarChart';
import ScatterDiagram from './ScatterDiagram';
import Top10BarChart from './Top10BarChart';
import RiskDonutChart from './RiskDonutChart';

const AsteroidChart = ({dailyCount, asteroids, top10}) => {
  return (
    <div className="row g-4 mb-4">
      <div className="col-md-6">
        <div className="asteroid_chart_panel">
          <h3 className="asteroid_chart_panel-title">
            Daily Asteroid Approaches
          </h3>
          <DailyBarChart data={dailyCount} />
        </div>
      </div>
      <div className="col-md-6">
        <div className="asteroid_chart_panel">
          <h3 className="asteroid_chart_panel-title">
            Risk Assessment
          </h3>
          <RiskDonutChart asteroids={asteroids} />
        </div>
      </div>
      <div className="col-md-6">
        <div className="asteroid_chart_panel">
          <h3 className="asteroid_chart_panel-title">
            Threat Profile - Miss Distance Vs Diameter
          </h3>
          <ScatterDiagram asteroids={asteroids} />
        </div>
      </div>
      <div className="col-md-6">
        <div className="asteroid_chart_panel">
          <h3 className="asteroid_chart_panel-title">
            Top 10 Largest Asteroids
          </h3>
          <Top10BarChart data={top10} />
        </div>
      </div>
    </div>
  );
};

export default AsteroidChart;