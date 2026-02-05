import { AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { AnimatedList } from "./ui/animated-list";

export default function SmartPrioritization() {
  const priorityItems = [
    {
      icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
      name: "Critical Security Breach",
      description: "Immediate action required",
      time: "2m ago",
      priority: "HIGH",
    },
    {
      icon: <AlertTriangle className="h-5 w-5 text-orange-500" />,
      name: "Suspicious Login Activity",
      description: "Multiple failed attempts detected",
      time: "5m ago",
      priority: "HIGH",
    },
    {
      icon: <Clock className="h-5 w-5 text-yellow-500" />,
      name: "Network Anomaly",
      description: "Unusual traffic patterns",
      time: "8m ago",
      priority: "MEDIUM",
    },
  ];

  return (
    <div className="w-full h-full p-4">
      <AnimatedList className="h-full" delay={2000} infinite>
        {priorityItems.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center space-x-3 p-3 bg-background/60 rounded-lg border border-border/50 backdrop-blur-sm"
          >
            <div className="flex-shrink-0">{item.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-foreground truncate">
                  {item.name}
                </p>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    item.priority === "HIGH"
                      ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                      : item.priority === "MEDIUM"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                        : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                  }`}
                >
                  {item.priority}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {item.description}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{item.time}</p>
            </div>
          </div>
        ))}
      </AnimatedList>
    </div>
  );
}
