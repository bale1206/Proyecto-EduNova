import { View, Text, ScrollView, Pressable, SafeAreaView } from "react-native";
import Icon from "../components/Icon";
import BottomNav from "../components/BottomNav";
import { useMessages } from "../hooks/useMessages";
import { useAuth } from "../hooks/useAuth";
import { ROLES } from "../config/roles";

// One screen replaces message_a.html / message.html / message_f.html —
// only the role param and ROLES config change what's shown.
export default function MessagesScreen({ navigation, route }) {
  const role = route.params?.role ?? "parent";
  const roleConfig = ROLES[role];
  const { messages, loading, reload } = useMessages(role);
  const { signOut } = useAuth();

  const tabs = roleConfig.hasHome
    ? [
        { key: "Home", label: "Inicio", icon: "school" },
        { key: "Messages", label: "Mensajes", icon: "notifications" },
        { key: "RoleSelect", label: "Salir", icon: "logout" },
      ]
    : [
        { key: "Messages", label: "Mensajes", icon: "notifications" },
        { key: "Compose", label: "Nuevo", icon: "add" },
        { key: "RoleSelect", label: "Salir", icon: "logout" },
      ];

  async function handleNavigate(tab) {
    if (tab === "Messages") return reload();
    if (tab === "RoleSelect") {
      await signOut();
      navigation.reset({ index: 0, routes: [{ name: "RoleSelect" }] });
      return;
    }
    navigation.navigate(tab, { role });
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-4 h-16 border-b border-border">
        {roleConfig.hasHome ? (
          <Pressable onPress={() => navigation.goBack()} className="w-10 h-10 items-center justify-center">
            <Icon name="arrow_back" color="#111c2d" />
          </Pressable>
        ) : (
          <View className="w-10 h-10" />
        )}
        <View>
          <Text className="text-lg font-bold text-primary text-center">EduNova</Text>
          <Text className="text-[11px] text-text-muted text-center">{roleConfig.label}</Text>
        </View>
        <View className="w-9 h-9 rounded-full bg-primary-light items-center justify-center">
          <Text className="text-primary font-semibold text-xs">{roleConfig.avatarInitials}</Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-4 pt-3" contentContainerStyle={{ paddingBottom: 110 }}>
        {loading && <Text className="text-text-muted text-sm">Cargando mensajes...</Text>}
        {!loading && messages.length === 0 && (
          <Text className="text-text-muted text-sm">No hay mensajes por ahora.</Text>
        )}

        {messages.map((msg) => (
          <View key={msg.id} className="bg-surface rounded-2xl p-4 border border-border mb-3">
            <View className="flex-row items-center justify-between mb-2">
              <View className="flex-row items-center gap-2">
                <View className="w-9 h-9 rounded-full bg-surface-alt items-center justify-center">
                  <Icon name="verified_user" color="#005cae" size={16} />
                </View>
                <View>
                  <Text className="text-sm font-bold text-text">{msg.sender_name}</Text>
                  <Text className="text-[11px] text-text-muted">{msg.sender_subtitle}</Text>
                </View>
              </View>
              {msg.status === "unread" && (
                <View className="bg-primary-light px-2 py-0.5 rounded-full">
                  <Text className="text-[10px] font-semibold text-primary">Nuevo</Text>
                </View>
              )}
            </View>
            <Text className="text-sm font-bold text-text">{msg.subject}</Text>
            <Text className="text-xs text-text-muted mt-1" numberOfLines={3}>
              {msg.body}
            </Text>
            <View className="flex-row items-center justify-between mt-3 pt-2 border-t border-border">
              <Text className="text-[11px] text-text-muted">{msg.created_at}</Text>
              <Pressable className="bg-secondary-light px-3 py-1.5 rounded-full">
                <Text className="text-xs font-semibold text-secondary">Responder</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>

      <BottomNav tabs={tabs} active="Messages" onNavigate={handleNavigate} />
    </SafeAreaView>
  );
}
