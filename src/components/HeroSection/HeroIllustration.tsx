import { BarChart3, Sparkles } from "lucide-react";
import { useTranslation } from 'react-i18next';
import './Heroillustration.css';

export const HeroIllustration = () => {
  const { t } = useTranslation();

  return (
    <div className="illustration-wrapper">
      {/* Chat Bubbles */}
      <div className="card-efficiency">
        <div className="chat-bubble-main">
          <div className="dots-container">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </div>
        <div className="chat-bubble-secondary">
          <div className="lines-container">
            <div className="line line-long"></div>
            <div className="line line-short"></div>
          </div>
        </div>
      </div>

      {/* Laptop with Dashboard */}
      <div className="card-processing">
        <div className="processing-header">
          <div className="window-controls">
            <div className="control-dot control-red"></div>
            <div className="control-dot control-yellow"></div>
            <div className="control-dot control-green"></div>
          </div>
        </div>
        <div className="processing-content">
          <div className="processing-row">
            <div className="icon-box-violet">
              <BarChart3 className="chart-icon" />
            </div>
            <div className="progress-container">
              <div className="progress-bar-bg">
                <div className="progress-bar-fill"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Robot */}
      <div className="robot-container">
        <div className="robot-body">
          {/* Head */}
          <div className="robot-head">
            <div className="robot-eye robot-eye-left"></div>
            <div className="robot-eye robot-eye-right"></div>
            <div className="robot-mouth"></div>
            <div className="robot-antenna"></div>
            <div className="robot-sensor"></div>
          </div>

          {/* Arms */}
          <div className="robot-arm robot-arm-left"></div>
          <div className="robot-arm robot-arm-right"></div>

          {/* Chest */}
          <div className="robot-chest">
            <Sparkles className="sparkles-icon" />
          </div>

          {/* Base */}
          <div className="robot-base"></div>
        </div>
      </div>


    </div>
  );
};