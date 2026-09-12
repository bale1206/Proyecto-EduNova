import { MaterialIcons } from "@expo/vector-icons";

// The original HTML mockups used Google's "Material Symbols" web font.
// React Native doesn't have that exact set, so each name maps to the
// closest @expo/vector-icons MaterialIcons name (ships with Expo already,
// no extra install needed). Browse alternatives at https://icons.expo.fyi
const ICON_MAP = {
  arrow_back: "arrow-back",
  help_outline: "help-outline",
  verified_user: "verified-user",
  unfold_more: "unfold-more",
  assignment_late: "assignment-late",
  departure_board: "directions-bus",
  campaign: "campaign",
  done_all: "done-all",
  calendar_month: "calendar-today",
  calendar_today: "calendar-today",
  chevron_right: "chevron-right",
  restaurant: "restaurant",
  shield: "shield",
  medical_information: "medical-information",
  close: "close",
  cloud_upload: "cloud-upload",
  school: "school",
  notifications: "notifications",
  support_agent: "support-agent",
  check_circle: "check-circle",
  attach_file: "attach-file",
  mail: "mail",
  add: "add",
  logout: "logout",
  person: "person",
};

export default function Icon({ name, size = 20, color = "#111c2d", style }) {
  const mapped = ICON_MAP[name] || "help-outline";
  return <MaterialIcons name={mapped} size={size} color={color} style={style} />;
}
