import { useState } from "react";
import { View, Text, TextInput, ScrollView, Pressable, SafeAreaView, Alert } from "react-native";
import Icon from "../components/Icon";
import { useMessages } from "../hooks/useMessages";
import { ROLES } from "../config/roles";

// One screen replaces messagenew_a.html / messagenew.html / messagenew_f.html.
export default function ComposeMessageScreen({ navigation, route }) {
  const role = route.params?.role ?? "parent";
  const roleConfig = ROLES[role];
  const { sendMessage } = useMessages(role);

  const [selectedType, setSelectedType] = useState(roleConfig.commTypes[0].key);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSend() {
    if (!subject.trim() || !body.trim()) {
      Alert.alert("Faltan datos", "Escribe un asunto y un mensaje antes de enviar.");
      return;
    }
    setSending(true);
    const { error } = await sendMessage({
      sender_name: roleConfig.shortLabel,
      subject,
      body,
      type: selectedType,
      created_at: new Date().toISOString(),
      status: "unread",
    });
    setSending(false);
    if (error) {
      Alert.alert("No se pudo enviar", error);
      return;
    }
    Alert.alert("Enviado", "Tu mensaje fue enviado correctamente.", [
      { text: "OK", onPress: () => navigation.goBack() },
    ]);
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 px-5" contentContainerStyle={{ paddingBottom: 40 }}>
        <View className="flex-row items-center justify-between py-3">
          <Pressable onPress={() => navigation.goBack()} className="w-10 h-10 items-center justify-center">
            <Icon name="arrow_back" color="#005cae" />
          </Pressable>
          <View>
            <Text className="text-lg font-bold text-primary text-center">EduNova</Text>
            <Text className="text-xs text-text-muted text-center">Nuevo mensaje • {roleConfig.label}</Text>
          </View>
          <View className="w-9 h-9" />
        </View>

        <Text className="text-xs font-bold text-text uppercase tracking-wide mt-2 mb-2">
          Tipo de comunicación
        </Text>
        <View className="flex-row flex-wrap gap-2 mb-4">
          {roleConfig.commTypes.map((type) => {
            const active = selectedType === type.key;
            return (
              <Pressable
                key={type.key}
                onPress={() => setSelectedType(type.key)}
                className={`px-3.5 py-2 rounded-full border ${
                  active ? "bg-primary border-primary" : "bg-surface border-border"
                }`}
              >
                <Text className={`text-xs font-medium ${active ? "text-white" : "text-text"}`}>
                  {type.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Text className="text-xs font-semibold text-text mb-1.5">Asunto</Text>
        <TextInput
          value={subject}
          onChangeText={setSubject}
          placeholder="Escribe un asunto breve..."
          placeholderTextColor="#5b6472"
          className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-sm text-text mb-4"
        />

        <View className="flex-row items-center justify-between mb-1.5">
          <Text className="text-xs font-semibold text-text">Mensaje</Text>
          <Text className="text-[11px] text-text-muted">{body.length} / 600</Text>
        </View>
        <TextInput
          value={body}
          onChangeText={setBody}
          placeholder="Escribe tu mensaje aquí..."
          placeholderTextColor="#5b6472"
          multiline
          numberOfLines={5}
          maxLength={600}
          textAlignVertical="top"
          className="w-full p-4 rounded-xl bg-surface border border-border text-sm text-text min-h-[120px] mb-4"
        />

        <Pressable className="w-full py-3 rounded-xl border border-dashed border-primary bg-primary-light items-center flex-row justify-center gap-2 mb-5">
          <Icon name="attach_file" color="#005cae" size={18} />
          <Text className="text-primary text-sm font-medium ml-1">Adjuntar archivo (PDF o foto)</Text>
        </Pressable>

        <Pressable
          onPress={handleSend}
          disabled={sending}
          className="w-full py-3.5 rounded-full bg-primary items-center flex-row justify-center gap-2"
        >
          <Icon name="mail" color="#ffffff" size={18} />
          <Text className="text-white font-semibold text-sm ml-1">
            {sending ? "Enviando..." : "Enviar mensaje"}
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
