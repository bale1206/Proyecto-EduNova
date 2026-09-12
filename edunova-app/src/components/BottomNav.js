import { View, Text, Pressable } from "react-native";
import Icon from "./Icon";

// tabs: [{ key, label, icon }]. `active` highlights the matching key.
export default function BottomNav({ tabs, active, onNavigate }) {
  return (
    <View className="absolute bottom-0 left-0 right-0 flex-row justify-around items-center px-4 py-2 bg-surface border-t border-border">
      {tabs.map((tab) => {
        const isActive = active === tab.key;
        return (
          <Pressable
            key={tab.key}
            onPress={() => onNavigate?.(tab.key)}
            className={`flex-col items-center justify-center px-4 py-1.5 rounded-full ${
              isActive ? "bg-primary-light" : ""
            }`}
          >
            <Icon name={tab.icon} size={22} color={isActive ? "#005cae" : "#5b6472"} />
            <Text
              className={`text-[11px] mt-0.5 ${
                isActive ? "text-primary font-bold" : "text-text-muted"
              }`}
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
