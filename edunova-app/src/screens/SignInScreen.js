import { useState } from "react";
import { View, Text, TextInput, Pressable, SafeAreaView, Alert } from "react-native";
import { useAuth } from "../hooks/useAuth";
import { ROLES } from "../config/roles";
import Icon from "../components/Icon";

export default function SignInScreen({ navigation, route }) {
  const role = route.params?.role ?? "parent";
  const roleConfig = ROLES[role];
  const { signIn, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignIn() {
    const { error } = await signIn({ email, password });
    if (error) {
      Alert.alert("No se pudo iniciar sesión", error);
      return;
    }
    // Reset the stack so the back button can't return to the sign-in flow.
    navigation.reset({
      index: 0,
      routes: [{ name: roleConfig.hasHome ? "Home" : "Messages", params: { role } }],
    });
  }

  return (
    <SafeAreaView className="flex-1 bg-background px-6 justify-center">
      <Pressable
        onPress={() => navigation.goBack()}
        className="absolute top-14 left-5 w-10 h-10 items-center justify-center"
      >
        <Icon name="arrow_back" color="#111c2d" />
      </Pressable>

      <View className="items-center mb-8">
        <Text className="text-2xl font-bold text-primary">EduNova</Text>
        <Text className="text-text-muted mt-1">{roleConfig.label}</Text>
      </View>

      <Text className="text-xl font-bold text-text mb-1">Iniciar sesión</Text>
      <Text className="text-text-muted text-sm mb-6">Ingresa tus datos para continuar</Text>

      <Text className="text-xs font-semibold text-text mb-1.5">Correo electrónico</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="tu@correo.com"
        placeholderTextColor="#5b6472"
        autoCapitalize="none"
        keyboardType="email-address"
        className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-sm text-text mb-4"
      />

      <Text className="text-xs font-semibold text-text mb-1.5">Contraseña</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="••••••••"
        placeholderTextColor="#5b6472"
        secureTextEntry
        className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-sm text-text mb-6"
      />

      <Pressable
        onPress={handleSignIn}
        disabled={loading}
        className="w-full py-3.5 rounded-full bg-primary items-center mb-4"
      >
        <Text className="text-white font-semibold text-sm">
          {loading ? "Ingresando..." : "Iniciar sesión"}
        </Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate("SignUp", { role })} className="items-center">
        <Text className="text-sm text-text-muted">
          ¿No tienes cuenta? <Text className="text-primary font-semibold">Crear cuenta</Text>
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}
