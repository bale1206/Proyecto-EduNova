import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Modal,
  SafeAreaView,
} from "react-native";
import Icon from "../../components/Icon";
import BottomNav from "../../components/BottomNav";
import { useMessages } from "../../hooks/useMessages";
import { useAuth } from "../../hooks/useAuth";

const TABS = [
  { key: "Home", label: "Inicio", icon: "school" },
  { key: "Messages", label: "Mensajes", icon: "notifications" },
  { key: "RoleSelect", label: "Salir", icon: "logout" },
];

export default function HomeScreen({ navigation, route }) {
  const role = route.params?.role ?? "parent";
  const { messages, loading } = useMessages(role);
  const { signOut } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const [reason, setReason] = useState("salud");
  const latest = messages[0];

  async function handleNavigate(tab) {
    if (tab === "Home") return;
    if (tab === "RoleSelect") {
      await signOut();
      navigation.reset({ index: 0, routes: [{ name: "RoleSelect" }] });
      return;
    }
    navigation.navigate(tab, { role });
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 px-5" contentContainerStyle={{ paddingBottom: 110 }}>
        {/* Header */}
        <View className="flex-row justify-between items-center h-16">
          <Text className="text-lg font-bold text-primary tracking-tight">EduNova</Text>
          <Pressable className="w-10 h-10 rounded-full items-center justify-center">
            <Icon name="help_outline" color="#005cae" />
          </Pressable>
        </View>

        <Text className="text-2xl font-bold text-text mt-1">Hola, Camila</Text>
        <Text className="text-sm text-text-muted mb-4">
          Familia Silva Contreras • Colegio San Gabriel
        </Text>

        {/* Student card */}
        <View className="bg-surface rounded-2xl p-4 flex-row items-center justify-between border border-border mb-4">
          <View className="flex-row items-center gap-3">
            <View className="w-12 h-12 rounded-full bg-surface-alt items-center justify-center">
              <Text className="text-text-muted font-bold">MS</Text>
            </View>
            <View>
              <Text className="text-base font-bold text-text">Mateo Silva</Text>
              <Text className="text-xs font-semibold text-secondary mt-0.5">
                Presente hoy • 08:15 hrs
              </Text>
            </View>
          </View>
        </View>

        {/* Quick actions */}
        <View className="flex-row gap-3 mb-4">
          <Pressable
            onPress={() => setModalVisible(true)}
            className="flex-1 bg-surface rounded-2xl p-4 h-24 justify-between border border-border"
          >
            <Icon name="assignment_late" color="#005cae" size={22} />
            <Text className="text-sm font-bold text-text">Justificar inasistencia</Text>
          </Pressable>
          <Pressable className="flex-1 bg-surface rounded-2xl p-4 h-24 justify-between border border-border">
            <Icon name="departure_board" color="#006c52" size={22} />
            <Text className="text-sm font-bold text-text">Avisar retiro</Text>
          </Pressable>
        </View>

        {/* Latest message preview */}
        <View className="mb-4">
          <Text className="text-base font-bold text-text mb-2">Comunicaciones recientes</Text>
          {loading && <Text className="text-text-muted text-sm">Cargando...</Text>}
          {!loading && latest && (
            <Pressable
              onPress={() => navigation.navigate("Messages", { role })}
              className="bg-surface rounded-2xl p-4 border border-border border-l-4 border-l-primary"
            >
              <Text className="text-sm font-semibold text-text">{latest.sender_name}</Text>
              <Text className="text-sm font-bold text-text mt-1">{latest.subject}</Text>
              <Text className="text-xs text-text-muted mt-1" numberOfLines={2}>
                {latest.body}
              </Text>
              <Text className="text-primary text-xs font-semibold mt-2">
                Ver todos los mensajes →
              </Text>
            </Pressable>
          )}
        </View>

        {/* Trust note */}
        <View className="bg-surface-alt rounded-2xl p-4 flex-row items-center gap-3">
          <Icon name="shield" color="#005cae" />
          <Text className="flex-1 text-xs text-text-muted">
            Canal seguro entre la familia y el colegio. Las justificaciones se
            procesan automáticamente con Inspectoría.
          </Text>
        </View>
      </ScrollView>

      {/* Justify absence modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View className="flex-1 justify-end bg-black/30">
          <View className="bg-surface rounded-t-3xl p-5 gap-4">
            <View className="flex-row items-center justify-between">
              <Text className="text-lg font-bold text-text">Justificar inasistencia</Text>
              <Pressable onPress={() => setModalVisible(false)}>
                <Icon name="close" color="#5b6472" />
              </Pressable>
            </View>

            <Text className="text-sm text-text-muted">
              Motivo para <Text className="font-bold">Mateo Silva</Text>:
            </Text>

            <View className="flex-row gap-2">
              {[
                { key: "salud", label: "Salud" },
                { key: "familiar", label: "Familiar" },
                { key: "tramite", label: "Trámite" },
              ].map((opt) => {
                const active = reason === opt.key;
                return (
                  <Pressable
                    key={opt.key}
                    onPress={() => setReason(opt.key)}
                    className={`flex-1 py-2 rounded-xl border items-center ${
                      active ? "border-primary bg-primary-light" : "border-border"
                    }`}
                  >
                    <Text className={active ? "text-primary font-bold text-sm" : "text-text-muted text-sm"}>
                      {opt.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <Pressable
              onPress={() => setModalVisible(false)}
              className="w-full py-3 rounded-full bg-primary items-center mt-2"
            >
              <Text className="text-white font-bold">Enviar justificación</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <BottomNav tabs={TABS} active="Home" onNavigate={handleNavigate} />
    </SafeAreaView>
  );
}
