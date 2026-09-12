import { View, Text, Pressable, SafeAreaView, Image } from "react-native";
import { ROLES } from "../config/roles";

// Picks which role's Sign In screen to show. Once Supabase is connected
// and each account stores its role (e.g. in a `profiles` table), this
// manual choice can be replaced by auto-detecting the role right after
// login instead of asking the user to pick it first.
export default function RoleSelectScreen({ navigation }) {
  function selectRole(roleKey) {
    navigation.navigate("SignIn", { role: roleKey });
  }

  return (
    <SafeAreaView className="flex-1 bg-background justify-center px-6">
      <View className="items-center mb-10">
        <Text className="text-3xl font-bold text-primary tracking-tight">EduNova</Text>
        <Text className="text-text-muted mt-1">Selecciona tu perfil para continuar</Text>
      </View>

      {Object.entries(ROLES).map(([key, role]) => (
        <Pressable
          key={key}
          onPress={() => selectRole(key)}
          className="bg-surface border border-border rounded-2xl p-4 mb-3 flex-row items-center justify-between"
        >
          <View>
            <Text className="text-base font-bold text-text">{role.shortLabel}</Text>
            <Text className="text-text-muted text-xs mt-0.5">{role.label}</Text>
          </View>
          <View className="w-10 h-10 rounded-full bg-primary-light items-center justify-center">
            <Text className="text-primary font-bold">{role.avatarInitials}</Text>
          </View>
        </Pressable>
      ))}

      <Text className="text-text-muted text-xs text-center mt-6">
        Selecciona tu perfil para acceder a la pantalla de inicio de sesión.
      </Text>
    </SafeAreaView>
  );
}
