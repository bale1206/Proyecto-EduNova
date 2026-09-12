// Central place for anything that differs by role. When real auth exists,
// the logged-in user's role replaces the RoleSelect screen's manual choice,
// but everything downstream (screens, data layer) stays the same.
export const ROLES = {
  parent: {
    label: "Familia y Apoderados",
    shortLabel: "Padres",
    avatarInitials: "CC",
    hasHome: true,
    commTypes: [
      { key: "medica", label: "Justificación médica" },
      { key: "pedagogica", label: "Consulta pedagógica" },
      { key: "reunion", label: "Solicitar reunión" },
      { key: "admin", label: "Consulta administrativa" },
    ],
  },
  teacher: {
    label: "Portal Docente",
    shortLabel: "Profesores",
    avatarInitials: "MV",
    hasHome: false,
    commTypes: [
      { key: "aviso", label: "Aviso a apoderados" },
      { key: "felicitacion", label: "Felicitación / Observación" },
      { key: "reunion", label: "Citar a reunión" },
      { key: "admin", label: "Consulta a Dirección" },
    ],
  },
  functionary: {
    label: "Portal Funcionarios",
    shortLabel: "Funcionarios",
    avatarInitials: "RS",
    hasHome: false,
    commTypes: [
      { key: "mantenimiento", label: "Reporte de mantenimiento" },
      { key: "salud", label: "Aviso de enfermería" },
      { key: "administrativo", label: "Trámite administrativo" },
      { key: "general", label: "Comunicado general" },
    ],
  },
};
