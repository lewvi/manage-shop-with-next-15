import { isEmpty } from "lodash";

export const statusColor: Record<string, string> = {
  default: "#A0A1A3",
  success: "#2EB383",
  error: "#F13637",
  warning: "#F3BB1B",
};

export const getStatusColor = (status: string) => {
  if (status == null || isEmpty(status)) return;

  const lower = status.toLocaleLowerCase();

  if (statusColor[lower]) return statusColor[lower];

  switch (lower) {
    case "active":
      return statusColor["success"];
    case "inactive":
      return statusColor["error"];
    default:
      return statusColor["default"];
  }
};
