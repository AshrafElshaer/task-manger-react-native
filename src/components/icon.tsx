import { icons } from "lucide-react-native";
import { NAV_THEME } from "@/lib/constants";
import { useColorScheme } from "@/hooks/useColorScheme";

const Icon = ({
  name,
  color,
  size,
}: {
  name: string;
  color?: string;
  size: number;
}) => {
  const { isDarkColorScheme } = useColorScheme();
  const LucideIcon = icons[name];
  const iconColor =
    color ?? isDarkColorScheme ? NAV_THEME.dark.muted : NAV_THEME.light.muted;

  return <LucideIcon color={iconColor} size={size} />;
};

export default Icon;
