// Shaped to match what a Supabase `messages` table would plausibly look
// like (id, sender_name, subject, body, created_at, status). Once Supabase
// is connected, `useMessages` (src/hooks/useMessages.js) reads from a real
// table with these same column names instead of this file — the screens
// don't need to change either way.
export const MOCK_MESSAGES = {
  parent: [
    {
      id: "1",
      sender_name: "Prof. Marcela Venegas",
      sender_subtitle: "Profesora Jefe 1° Básico",
      subject: "Material de lectura para el viernes",
      body: 'Estimada familia: solicitamos llevar impreso el cuento "El ratón y el viento" para la actividad de comprensión lectora.',
      created_at: "Hace 2h",
      status: "unread",
    },
    {
      id: "2",
      sender_name: "Inspectoría General",
      sender_subtitle: "Unidad de Asistencia",
      subject: "Justificación médica validada",
      body: "Se ha recibido y validado el certificado médico. Los docentes correspondientes han sido informados.",
      created_at: "Ayer 15:40",
      status: "read",
    },
    {
      id: "3",
      sender_name: "Prof. Carlos Soto",
      sender_subtitle: "Matemáticas",
      subject: "Refuerzo académico sugerido",
      body: "Comparto un set didáctico de geometría para ejercitar de forma voluntaria en casa antes de la evaluación.",
      created_at: "12 Oct",
      status: "read",
    },
  ],
  teacher: [
    {
      id: "1",
      sender_name: "Familia Silva Contreras",
      sender_subtitle: "Apoderado de Mateo Silva",
      subject: "Consulta sobre tarea de matemáticas",
      body: "Buenas tardes profesora, quisiera confirmar la fecha de entrega del trabajo de geometría.",
      created_at: "Hoy 09:20",
      status: "unread",
    },
    {
      id: "2",
      sender_name: "Dirección Académica",
      sender_subtitle: "Comunicado interno",
      subject: "Reunión de profesores jefe",
      body: "Se cita a reunión de coordinación el próximo lunes a las 16:00 hrs en sala de profesores.",
      created_at: "Ayer",
      status: "read",
    },
  ],
  functionary: [
    {
      id: "1",
      sender_name: "Prof. Marcela Venegas",
      sender_subtitle: "1° Básico B",
      subject: "Solicitud de mantención en sala",
      body: "La calefacción de la sala verde no está funcionando correctamente, agradecería una revisión.",
      created_at: "Hoy 08:40",
      status: "unread",
    },
    {
      id: "2",
      sender_name: "Enfermería",
      sender_subtitle: "Reporte diario",
      subject: "Aviso de stock de insumos",
      body: "El stock de alcohol gel para las salas del primer piso está por debajo del mínimo semanal.",
      created_at: "Ayer 17:10",
      status: "read",
    },
  ],
};
