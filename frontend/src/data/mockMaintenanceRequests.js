// src/data/mockMaintenanceRequests.js
// Mock maintenance requests for the maintenance list
export const mockMaintenanceRequests = [
  {
    id: "REQ-001",
    title: "Leaking faucet in kitchen",
    property: "Sunset Apartments - Unit 2A",
    dateReported: "2024-01-15",
    priority: "Medium",
    status: "In Progress",
    assignedTechnician: "John Smith",
    description:
      "Kitchen faucet has been dripping constantly for the past week. Water pressure seems normal but the drip is getting worse.",
    attachments: ["kitchen-faucet-1.jpg", "kitchen-faucet-2.jpg"],
    activityLog: [
      {
        date: "2024-01-15",
        user: "Sarah Johnson",
        action: "Request submitted",
      },
      {
        date: "2024-01-16",
        user: "Mike Wilson",
        action: "Assigned to John Smith",
      },
      {
        date: "2024-01-17",
        user: "John Smith",
        action: "Started work - ordered replacement parts",
      },
    ],
  },
  {
    id: "REQ-002",
    title: "Broken air conditioning unit",
    property: "Oak Ridge Complex - Unit 5B",
    dateReported: "2024-01-14",
    priority: "High",
    status: "Open",
    assignedTechnician: "Maria Garcia",
    description:
      "AC unit stopped working completely. No cold air coming out and unit makes strange noises when turned on.",
    attachments: ["ac-unit-issue.jpg"],
    activityLog: [
      { date: "2024-01-14", user: "Tom Brown", action: "Request submitted" },
      {
        date: "2024-01-14",
        user: "Mike Wilson",
        action: "Marked as high priority",
      },
      {
        date: "2024-01-15",
        user: "Mike Wilson",
        action: "Assigned to Maria Garcia",
      },
    ],
  },
  {
    id: "REQ-003",
    title: "Clogged bathroom drain",
    property: "Pine Valley Homes - Unit 12C",
    dateReported: "2024-01-13",
    priority: "Low",
    status: "Completed",
    assignedTechnician: "David Lee",
    description:
      "Bathroom sink drain is completely blocked. Water not draining at all.",
    attachments: [],
    activityLog: [
      { date: "2024-01-13", user: "Lisa Chen", action: "Request submitted" },
      {
        date: "2024-01-13",
        user: "Mike Wilson",
        action: "Assigned to David Lee",
      },
      {
        date: "2024-01-14",
        user: "David Lee",
        action: "Completed repair - drain cleared",
      },
    ],
  },
  {
    id: "REQ-004",
    title: "Electrical outlet not working",
    property: "Sunset Apartments - Unit 1B",
    dateReported: "2024-01-12",
    priority: "High",
    status: "In Progress",
    assignedTechnician: "John Smith",
    description:
      "Living room electrical outlet stopped working. No power to any devices plugged in.",
    attachments: ["outlet-issue.jpg"],
    activityLog: [
      { date: "2024-01-12", user: "Robert Kim", action: "Request submitted" },
      {
        date: "2024-01-12",
        user: "Mike Wilson",
        action: "Marked as high priority - electrical issue",
      },
      {
        date: "2024-01-13",
        user: "Mike Wilson",
        action: "Assigned to John Smith",
      },
      {
        date: "2024-01-14",
        user: "John Smith",
        action: "Diagnosed issue - needs electrical panel work",
      },
    ],
  },
  {
    id: "REQ-005",
    title: "Squeaky door hinges",
    property: "Oak Ridge Complex - Unit 3A",
    dateReported: "2024-01-11",
    priority: "Low",
    status: "Open",
    assignedTechnician: "Unassigned",
    description:
      "Front door hinges are very squeaky and need lubrication or replacement.",
    attachments: [],
    activityLog: [
      {
        date: "2024-01-11",
        user: "Jennifer White",
        action: "Request submitted",
      },
    ],
  },
];
