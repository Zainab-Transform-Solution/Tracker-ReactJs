import React from 'react';
import StatCard from './StatCard';
import HourlyChart from './HourlyChart';
import { Activity, Calendar, Target, Users } from 'lucide-react';

const OverviewTab = ({ analytics, hourlyChartData, isAgent }) => {
  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      {/* Grid container with responsive columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard
          title="Production (Selected)"
          value={analytics.prodCurrent.toLocaleString()}
          subtext={analytics.trendText}
          icon={Activity}
          trend={analytics.trendDir}
          tooltip="Total production volume in range."
          className="min-w-0" // Added to prevent overflow
        />
        <StatCard
          title={`Production (${analytics.prevRange.label})`}
          value={analytics.prodPrevious.toLocaleString()}
          subtext="Vs Previous"
          icon={Calendar}
          trend="neutral"
          tooltip="Comparison period volume."
          className="min-w-0"
        />
        <StatCard
          title="MTD Progress"
          value={`${analytics.goalProgress.toFixed(1)}%`}
          subtext={`Target: ${analytics.effectiveGoal.toLocaleString()}`}
          icon={Target}
          trend="neutral"
          tooltip="% of Monthly Target achieved."
          className="min-w-0"
        />
        <StatCard
          title={isAgent ? "Reporting Compliance" : "Active Agents"}
          value={isAgent ? (analytics.agentComplianceAlerts > 0 ? `${analytics.agentComplianceAlerts} Flags` : 'Perfect') : analytics.agentStats.length}
          subtext={isAgent ? (analytics.agentComplianceAlerts > 0 ? 'Issues Found' : 'No Issues') : "In range"}
          icon={Users}
          trend="neutral"
          alert={isAgent && analytics.agentComplianceAlerts > 0}
          tooltip="Agent Activity count or Compliance status."
          className="min-w-0"
        />
      </div>

      {/* Responsive chart container */}
      <div className="w-full overflow-hidden">
        <HourlyChart data={hourlyChartData} />
      </div>
    </div>
  );
};

export default OverviewTab;