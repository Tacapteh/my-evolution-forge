/**
 * Dictionnaire de traduction Français / Anglais pour le catalogue d'exercices FORGE.
 */

const MUSCLE_TRANSLATIONS: Record<string, string> = {
  abdominals: "Abdominaux",
  abductors: "Abducteurs",
  adductors: "Adducteurs",
  biceps: "Biceps",
  calves: "Mollets",
  chest: "Pectoraux",
  forearms: "Avant-bras",
  glutes: "Fessiers",
  hamstrings: "Ischio-jambiers",
  lats: "Grand Dorsal",
  "lower back": "Bas du dos",
  "middle back": "Dorsaux / Milieu du dos",
  neck: "Cou / Cervicaux",
  quadriceps: "Quadriceps",
  shoulders: "Épaules / Deltoïdes",
  traps: "Trapèzes",
  triceps: "Triceps",
  back: "Dos",
  core: "Sangle Abdominale",
};

const EQUIPMENT_TRANSLATIONS: Record<string, string> = {
  "body only": "Poids du corps",
  bodyweight: "Poids du corps",
  barbell: "Barre",
  dumbbell: "Haltères",
  cable: "Câble / Poulie",
  machine: "Machine",
  kettlebell: "Kettlebell",
  bands: "Élastique",
  band: "Élastique",
  "exercise ball": "Ballon de gym (Swiss Ball)",
  "medicine ball": "Medicine Ball",
  "foam roll": "Rouleau de massage",
  "pull-up bar": "Barre de tractions",
  e_z_curl_bar: "Barre EZ",
  other: "Matériel divers",
};

const CATEGORY_TRANSLATIONS: Record<string, string> = {
  strength: "Force & Musculation",
  stretching: "Souplesse & Étirements",
  cardio: "🏃 Cardio & Endurance / VMA",
  plyometrics: "⚡ Pliométrie & Explosivité",
  powerlifting: "🏋️ Powerlifting",
  strongman: "🗿 Strongman",
  olympic_weightlifting: "🏋️ Haltérophilie",
  "olympic weightlifting": "🏋️ Haltérophilie",
  calisthenics: "💪 Calisthenics & Poids du corps",
};

const LEVEL_TRANSLATIONS: Record<string, string> = {
  beginner: "Débutant",
  intermediate: "Intermédiaire",
  expert: "Avancé / Expert",
};

// Dictionnaire spécifique pour les noms d'exercices courants
const EXERCISE_NAME_TRANSLATIONS: Record<string, { fr: string; aliases: string[] }> = {
  "inverted row": { fr: "Tractions Australiennes (Rowing poids du corps)", aliases: ["Australian pullup", "Bodyweight row", "Rowing inversé"] },
  "australian pull-up": { fr: "Tractions Australiennes", aliases: ["Inverted row", "Bodyweight row"] },
  "bodyweight row": { fr: "Tractions Australiennes", aliases: ["Inverted row"] },
  "pull-up": { fr: "Tractions Pronation", aliases: ["Pullup", "Traction verticale"] },
  "chin-up": { fr: "Tractions Supination", aliases: ["Chinup", "Traction supination"] },
  "l-sit pull-up": { fr: "Tractions L-Sit", aliases: ["Pullup L-sit"] },
  "push-up": { fr: "Pompes Militaires", aliases: ["Pushup", "Pompe classique"] },
  "diamond push-up": { fr: "Pompes Diamant", aliases: ["Triceps pushup"] },
  "decline push-up": { fr: "Pompes Déclinées", aliases: ["Pompe pieds surélevés"] },
  "incline push-up": { fr: "Pompes Inclinées", aliases: ["Pompe mains surélevées"] },
  "sphinx push-up": { fr: "Extensions Triceps Sphinx (au sol)", aliases: ["Triceps extension floor"] },
  dip: { fr: "Dips aux Barres Parallèles", aliases: ["Répulsions barres parallèles"] },
  "chest dip": { fr: "Dips Pectoraux", aliases: ["Dips barres"] },
  "triceps dip": { fr: "Dips Triceps", aliases: ["Dips banc"] },
  "wall sit": { fr: "Chaise Isométrique au Mur", aliases: ["Chaise au mur"] },
  plank: { fr: "Gainage Abdominal Planche (Statique)", aliases: ["Planche coudes"] },
  "commando plank": { fr: "Gainage Commando (Passage Coudes/Mains)", aliases: ["Plank commando"] },
  squat: { fr: "Squat au Poids du Corps", aliases: ["Air squat"] },
  "air squat": { fr: "Squat au Poids du Corps", aliases: ["Squat"] },
  lunge: { fr: "Fentes Avancées", aliases: ["Walking lunge", "Fente avant"] },
  burpee: { fr: "Burpees", aliases: ["Saut burpee"] },
  "mountain climber": { fr: "Mountain Climbers", aliases: ["Grimpeur"] },
  "jumping jack": { fr: "Jumping Jacks", aliases: ["Saut écart"] },
  "muscle-up": { fr: "Muscle-Up (Tractions + Dips)", aliases: ["Muscle up"] },
  "pike push-up": { fr: "Pompes Pique (Focus Épaules)", aliases: ["Pike pushup"] },
  "dragon flag": { fr: "Dragon Flag (Gainage Bruce Lee)", aliases: ["Gainage dragon"] },
  "hollow body hold": { fr: "Hollow Body (Gainage Banane)", aliases: ["Hollow hold"] },
  "bench press": { fr: "Développé Couché à la Barre", aliases: ["Bench press"] },
  "dumbbell bench press": { fr: "Développé Couché aux Haltères", aliases: ["Dumbbell bench"] },
  deadlift: { fr: "Soulevé de Terre à la Barre", aliases: ["Deadlift"] },
  "barbell squat": { fr: "Squat à la Barre (Back Squat)", aliases: ["Back squat"] },
  "overhead press": { fr: "Développé Militaire Épaules (Overhead Press)", aliases: ["Strict press", "Military press"] },
  "biceps curl": { fr: "Curl Biceps aux Haltères", aliases: ["Bicep curl"] },
  "triceps pushdown": { fr: "Extension Triceps à la Poulie", aliases: ["Pushdown triceps"] },
  "lat pulldown": { fr: "Tirage Vertical à la Poulie (Lat Pulldown)", aliases: ["Tirage poitrine"] },
  "seated cable row": { fr: "Tirage Horizontal à la Poulie (Seated Row)", aliases: ["Tirage horizontal"] },
  // Running, Cardio & VMA
  "running, treadmill": { fr: "Course à Pied / VMA (Tapis / Extérieur)", aliases: ["Running", "Sprint", "VMA", "Course a pied", "Cardio", "Fractionne", "Luc leger"] },
  "jogging, treadmill": { fr: "Jogging sur Tapis de Course", aliases: ["Footing", "Running", "Cardio", "Tapis", "Endurance"] },
  "trail running/walking": { fr: "Trail & Course / Marche en Nature", aliases: ["Trail", "Randonnee", "Running", "Cardio", "Course a pied"] },
  "rope jumping": { fr: "Corde à Sauter", aliases: ["Jump rope", "Cardio", "VMA", "Saut à la corde"] },
  "rowing, stationary": { fr: "Rameur Ergomètre (Concept2)", aliases: ["Rowing machine", "Rameur", "Cardio", "VMA", "Ergometre"] },
  "bicycling, stationary": { fr: "Vélo d'Appartement / Ergomètre", aliases: ["Velo indoor", "Spinning", "Cardio", "Ergometre"] },
  bicycling: { fr: "Cyclisme / Vélo d'Extérieur", aliases: ["Velo de route", "VTT", "Cardio", "Endurance"] },
  "elliptical trainer": { fr: "Vélo Elliptique", aliases: ["Elliptique", "Cardio"] },
  "prowler sprint": { fr: "Sprint Chariot Prowler", aliases: ["Sled push", "Sprint", "VMA"] },
  "recumbent bike": { fr: "Vélo Allongé Ergomètre", aliases: ["Velo assis", "Cardio"] },
  skating: { fr: "Roller / Patinage", aliases: ["Cardio", "Patinage"] },
  stairmaster: { fr: "Stairmaster (Monte-Escalier)", aliases: ["Step machine", "Escalier", "Cardio"] },
  "step mill": { fr: "Escalier Ergomètre (Step Mill)", aliases: ["Stair climber", "Cardio"] },
  "walking, treadmill": { fr: "Marche Active / Inclinée", aliases: ["Marche tapis", "Walking", "Cardio"] },
};

export function translateMuscle(muscle: string): string {
  if (!muscle) return "";
  const normalized = muscle.toLowerCase().trim();
  return MUSCLE_TRANSLATIONS[normalized] ?? muscle;
}

export function translateEquipment(eq: string | null): string {
  if (!eq) return "Poids du corps";
  const normalized = eq.toLowerCase().trim();
  return EQUIPMENT_TRANSLATIONS[normalized] ?? eq;
}

export function translateCategory(cat: string): string {
  if (!cat) return "Exercice";
  const normalized = cat.toLowerCase().trim();
  return CATEGORY_TRANSLATIONS[normalized] ?? cat;
}

export function translateLevel(lvl: string): string {
  if (!lvl) return "Tous niveaux";
  const normalized = lvl.toLowerCase().trim();
  return LEVEL_TRANSLATIONS[normalized] ?? lvl;
}

export function translateExerciseName(name: string): { frName: string; enName: string; aliases: string[] } {
  if (!name) return { frName: "", enName: "", aliases: [] };
  const normalized = name.toLowerCase().trim();

  // Exact or partial dictionary match
  for (const [key, val] of Object.entries(EXERCISE_NAME_TRANSLATIONS)) {
    if (normalized === key || normalized.includes(key)) {
      return {
        frName: val.fr,
        enName: name,
        aliases: val.aliases,
      };
    }
  }

  // Smart regex translations for common exercise terms
  let frName = name;
  frName = frName.replace(/push-up/gi, "Pompes");
  frName = frName.replace(/pushup/gi, "Pompes");
  frName = frName.replace(/pull-up/gi, "Tractions");
  frName = frName.replace(/pullup/gi, "Tractions");
  frName = frName.replace(/chin-up/gi, "Tractions Supination");
  frName = frName.replace(/squat/gi, "Squat");
  frName = frName.replace(/lunge/gi, "Fentes");
  frName = frName.replace(/curl/gi, "Curl");
  frName = frName.replace(/press/gi, "Développé");
  frName = frName.replace(/rowing/gi, "Tirage");
  frName = frName.replace(/row/gi, "Tirage / Rowing");
  frName = frName.replace(/stretch/gi, "Étirement");
  frName = frName.replace(/plank/gi, "Gainage Planche");
  frName = frName.replace(/raise/gi, "Élévations");

  return {
    frName,
    enName: name,
    aliases: [name],
  };
}
