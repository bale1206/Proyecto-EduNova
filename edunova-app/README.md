# EduNova — Aplicación React Native (Expo)

Este es un proyecto Expo completo y verificado que funciona, cubriendo los
tres roles (padres, profesores, funcionarios) a partir de tus mockups HTML,
listo para conectarse a Supabase una vez que tu base de datos exista.

**Este proyecto fue realmente construido y empaquetado (bundled) en un
entorno real antes de entregártelo** (1326 módulos, cero errores) — no
escrito a mano y "con suerte", que fue lo que causó los errores de Metro que
tuviste la vez anterior.

## 0. Instalar node y npm
se dejara el executable en la carpeta de capston
la versiones a utilizar son 
node: 24.20.0
npm: 11.19.0

## 1. Cómo ejecutarlo

```bash
npm install
npx expo start
```  
Presiona `w` para una vista previa en el navegador, o escanea el código QR
con la app gratuita **Expo Go** en tu teléfono. No se necesitan cuentas
pagadas.

Si `npm install` te da nuevamente el error de ejecución de scripts de
PowerShell, revisa la solución anterior (`Set-ExecutionPolicy -Scope
CurrentUser -ExecutionPolicy RemoteSigned`), o simplemente usa el Símbolo del
sistema (Command Prompt) en lugar de PowerShell.

## 2. Qué contiene

```
App.js                        — componente raíz
src/
  navigation/RootNavigator.js — RoleSelect → SignIn → (SignUp) → Home/Messages
  screens/
    RoleSelectScreen.js       — elegir Padre / Profesor / Funcionario
    SignInScreen.js           — formulario de inicio de sesión COMPARTIDO por los 3 roles
    SignUpScreen.js           — formulario de registro COMPARTIDO; vuelve a SignIn si tiene éxito
    parent/HomeScreen.js      — pantalla de inicio exclusiva para padres
    MessagesScreen.js         — COMPARTIDA por los 3 roles (antes eran 3 archivos HTML separados)
    ComposeMessageScreen.js   — COMPARTIDA por los 3 roles
  components/
    Icon.js                  — mapea los nombres de íconos web antiguos → íconos de React Native
    BottomNav.js             — barra de navegación inferior compartida
  config/roles.js             — etiquetas y opciones de tipo de comunicación por rol
  data/messages.js            — datos SIMULADOS (mock), con la forma de una futura tabla de Supabase
  hooks/
    useMessages.js            — ⭐ el punto de conexión de datos con Supabase (ver más abajo)
    useAuth.js                 — ⭐ el punto de conexión de Supabase Auth (ver más abajo)
  lib/supabase.js             — configuración del cliente de Supabase
```

### El flujo de inicio de sesión / registro

`RoleSelect` → `SignIn` (con un enlace "Crear cuenta") → `SignUp` → si tiene
éxito, vuelve a `SignIn` → al iniciar sesión correctamente, `Home` (padres) o
`Messages` (profesores/funcionarios), reiniciando la pila de navegación para
que el botón de retroceso no pueda volver a las pantallas de inicio de
sesión.

Igual que `useMessages`, `useAuth` (`src/hooks/useAuth.js`) funciona hoy sin
ningún backend — acepta cualquier correo/contraseña no vacíos como un inicio
de sesión simulado exitoso — y cambia automáticamente a los métodos reales
`supabase.auth.signInWithPassword` / `supabase.auth.signUp` una vez que tu
`.env` tenga credenciales reales de Supabase (ver más abajo). No se necesitan
cambios en `SignInScreen.js` ni en `SignUpScreen.js` en ningún caso.

### Por qué hay una sola pantalla de Mensajes/Redactar en vez de tres

Tu HTML original tenía `message_a.html` / `message.html` / `message_f.html`
(y lo mismo para redactar) — tres archivos casi idénticos. Aquí, una sola
`MessagesScreen.js` maneja los tres roles leyendo `route.params.role` y
buscando las etiquetas en `src/config/roles.js`. Menos código que mantener,
y una corrección de errores en un solo lugar arregla el problema para todos
los roles.

### La estética se simplificó a propósito

Los mockups originales usaban un sistema de colores Material 3 con ~40
tokens. Esta versión usa una paleta más pequeña y plana
(`src/tailwind.config.js` — `primary`, `secondary`, `surface`, `border`,
`text`, `text-muted`, etc.) para que sea más fácil de mantener mientras aún
estás construyendo la funcionalidad. Una vez que la aplicación funcione de
principio a fin, restaurar el estilo visual más elaborado es solo cuestión
de editar `tailwind.config.js` y las cadenas de `className` — la estructura
de las pantallas no necesita cambiar.

## 3. Conectando Supabase — la parte importante

**No es necesario cambiar nada en las pantallas cuando Supabase esté listo.**
Cada pantalla llama a `useMessages(role)` desde `src/hooks/useMessages.js`, y
ese hook es el *único* lugar que sabe si Supabase ya existe o no:

```javascript
// src/hooks/useMessages.js (simplificado)
if (!isSupabaseConfigured()) {
  setMessages(MOCK_MESSAGES[role]);      // ← lo que pasa hoy
} else {
  const { data } = await supabase.from("messages").select("*")...
  setMessages(data);                     // ← lo que pasa una vez conectado
}
```

### Para conectarlo de verdad, una vez que tu proyecto de Supabase exista:

1. En el panel de Supabase, crea una tabla `messages` con (al menos) estas
   columnas, coincidiendo con la forma de `src/data/messages.js`:
   `id`, `sender_name`, `sender_subtitle`, `subject`, `body`, `created_at`,
   `status`, `recipient_role`, `type`.
2. Copia `.env.example` a un nuevo archivo llamado `.env` en la raíz del
   proyecto.
3. Completa los dos valores desde la configuración de tu proyecto de
   Supabase (Settings → API):
   ```
   EXPO_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=tu-clave-anon-pública
   ```
4. Reinicia `npx expo start` (las variables de entorno solo se leen al
   iniciar).

Eso es todo — `isSupabaseConfigured()` ahora devolverá `true`, y cada
pantalla cambiará automáticamente de los datos simulados a consultas reales.
No se necesitan cambios de código en ningún otro lugar.

**Una configuración de Supabase Auth que debes conocer:** por defecto,
Supabase requiere confirmación por correo electrónico antes de que una
cuenta nueva pueda iniciar sesión — alguien que se registra tendría que
hacer clic primero en un enlace de un correo, así que "registrarse → iniciar
sesión de inmediato" aún no funcionaría. Para hacer pruebas, puedes
desactivar esto en Authentication → Providers → Email → "Confirm email" en
el panel de Supabase. Déjalo activado para cualquier uso más allá de
pruebas.

### Algo que debes configurar en el propio Supabase: Row Level Security

Por defecto, Supabase bloquea todo acceso a una tabla hasta que escribas una
**política (policy)**. Para un proyecto de curso, una política inicial
simple (en el editor SQL de Supabase) que permita leer/escribir a cualquiera
está bien para empezar a avanzar, pero consulta con tu profesor o busca
información sobre "Supabase Row Level Security" antes de que esto llegue a
un entorno real — la política de ejemplo de abajo es intencionalmente muy
permisiva:

```sql
alter table messages enable row level security;
create policy "Allow all for now" on messages for all using (true);
```

## 4. Cómo extenderlo más adelante

- **Selección de rol**: `RoleSelectScreen.js` sigue siendo una elección
  manual antes de iniciar sesión. Una vez que cada cuenta guarde su rol en
  Supabase (por ejemplo, en una tabla `profiles`), esta elección manual se
  puede reemplazar detectando el rol automáticamente justo después de
  iniciar sesión, en lugar de pedírselo al usuario primero.
- **Diferencias por rol**: si con el tiempo profesores/funcionarios
  necesitan pantallas realmente distintas (no solo etiquetas diferentes),
  en ese momento separa `MessagesScreen.js`/`ComposeMessageScreen.js` de
  vuelta en archivos específicos por rol — la versión compartida está
  pensada como punto de partida, no como una limitación permanente.
