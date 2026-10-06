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

const INSTRUCTION_RULES: Array<[RegExp, string]> = [
  [/lie down on the floor and secure your feet\.?/gi, "Allongez-vous au sol et calez vos pieds."],
  [/your legs should be bent at the knees\.?/gi, "Vos jambes doivent être fléchies au niveau des genoux."],
  [/place your hands behind or to the side of your head\.?/gi, "Placez vos mains derrière ou sur les côtés de votre tête."],
  [/you will begin with your back on the ground\.?/gi, "Commencez le dos bien à plat sur le sol."],
  [/this will be your starting position\.?/gi, "C'est votre position de départ."],
  [/this is your starting position\.?/gi, "C'est votre position de départ."],
  [/flex your hips and spine to raise your torso toward your knees\.?/gi, "Contractez vos abdominaux et fléchissez le buste vers vos genoux."],
  [/at the top of the contraction your torso should be perpendicular to the ground\.?/gi, "Au sommet de la contraction, votre buste doit être redressé."],
  [/reverse the motion, going only ¾ of the way down\.?/gi, "Inversez le mouvement en ne descendant qu aux trois quarts."],
  [/repeat for the recommended amount of repetitions\.?/gi, "Répétez selon le nombre de répétitions recommandé."],
  [/repeat for the prescribed amount of repetitions\.?/gi, "Répétez selon le nombre de répétitions prescrit."],
  [/repeat for the desired amount of repetitions\.?/gi, "Répétez selon le nombre de répétitions souhaité."],
  [/repeat the movement for the prescribed amount of repetitions\.?/gi, "Répétez le mouvement selon le nombre de répétitions prescrit."],
  [/lie on your back, with one leg extended straight out\.?/gi, "Allongez-vous sur le dos, une jambe tendue au sol."],
  [/with the other leg, bend the hip and knee to 90 degrees\.?/gi, "Avec l'autre jambe, fléchissez la hanche et le genou à 90 degrés."],
  [/you may brace your leg with your hands if necessary\.?/gi, "Vous pouvez maintenir votre jambe avec vos mains si nécessaire."],
  [/extend your leg straight into the air, pausing briefly at the top\.?/gi, "Tendez votre jambe vers le haut en marquant une courte pause au sommet."],
  [/return the leg to the starting position\.?/gi, "Ramenez la jambe en position de départ."],
  [/repeat for 10-20 repetitions, and then switch to the other leg\.?/gi, "Répétez 10 à 20 fois, puis changez de jambe."],
  [/repeat with the other leg\.?/gi, "Répétez avec l'autre jambe."],
  [/select a light resistance and sit down on the ab machine/gi, "Sélectionnez une charge légère et asseyez-vous sur la machine à abdos"],
  [/placing your feet under the pads provided and grabbing the top handles\.?/gi, "placez vos pieds sous les boudins et saisissez les poignées."],
  [/your arms should be bent at a 90 degree angle as you rest the triceps on the pads provided\.?/gi, "Vos bras doivent être pliés à 90° avec les triceps appuyés sur les coussinets."],
  [/at the same time, begin to lift the legs up as you crunch your upper torso\.?/gi, "En même temps, commencez à lever les jambes tout en enroulant le haut du buste."],
  [/breathe out as you perform this movement\.?/gi, "Expirez lors de l'exécution du mouvement."],
  [/tip: be sure to use a slow and controlled motion\.?/gi, "Conseil : Veillez à effectuer un mouvement lent et contrôlé."],
  [/concentrate on using your abs to move the weight while relaxing your legs and feet\.?/gi, "Concentrez-vous sur le recrutement des abdominaux pour déplacer la charge sans forcer avec les jambes."],
  [/after a second pause, slowly return to the starting position as you breathe in\.?/gi, "Après une seconde de pause, revenez lentement en position de départ en inspirant."],
  [/hold the ab roller with both hands and kneel on the floor\.?/gi, "Tenez la roue abdominale à deux mains et mettez-vous à genoux au sol."],
  [/now place the ab roller on the floor in front of you so that you are on all your hands and knees \(as in a kneeling push up position\)\.?/gi, "Posez la roue au sol devant vous en appui sur les genoux."],
  [/slowly roll the ab roller straight forward, stretching your body into a straight position\.?/gi, "Faites rouler lentement la roue vers l'avant en étirant le corps droit."],
  [/tip: go down as far as you can without touching the floor with your body\. breathe in during this portion of the movement\.?/gi, "Conseil : Descendez aussi bas que possible sans toucher le sol avec le corps. Inspirez pendant la descente."],
  [/after a pause at the stretched position, start pulling yourself back to the starting position as you breathe out\.?/gi, "Après une pause en position étirée, ramenez la roue vers vous pour revenir en position de départ en expirant."],
  [/tip: go slowly and keep your abs tight at all times\.?/gi, "Conseil : Allez-y lentement et gardez les abdominaux gainés en permanence."],
  [/starting position/gi, "position de départ"],
  [/lie on your back/gi, "allongez-vous sur le dos"],
  [/lie down on/gi, "allongez-vous sur"],
  [/lie face down/gi, "allongez-vous à plat ventre"],
  [/lie on a flat bench/gi, "allongez-vous sur un banc plat"],
  [/lie on an incline bench/gi, "allongez-vous sur un banc incliné"],
  [/stand with your feet/gi, "tenez-vous debout, les pieds"],
  [/shoulder[- ]width apart/gi, "écartés de la largeur des épaules"],
  [/hip[- ]width apart/gi, "écartés de la largeur des hanches"],
  [/place your hands/gi, "placez vos mains"],
  [/bend your knees/gi, "fléchissez les genoux"],
  [/bend the knees/gi, "fléchissez les genoux"],
  [/slowly lower/gi, "abaissez lentement"],
  [/slowly raise/gi, "levez lentement"],
  [/slowly return/gi, "revenez lentement"],
  [/breathe out/gi, "expirez"],
  [/breathe in/gi, "inspirez"],
  [/upper body/gi, "haut du corps"],
  [/lower body/gi, "bas du corps"],
  [/at the top of the/gi, "en haut du"],
  [/at the bottom of the/gi, "en bas du"],
  [/pause for a second/gi, "marquez une pause d'une seconde"],
  [/repeat for/gi, "Répétez pour"],
  [/repetitions/gi, "répétitions"],
  [/tip:/gi, "Conseil :"],
  [/note:/gi, "Remarque :"],
];

export function translateInstructions(instructions: string[]): string[] {
  if (!instructions || !Array.isArray(instructions)) return [];
  return instructions.map((step) => {
    let res = step.trim();
    for (const [pat, rep] of INSTRUCTION_RULES) {
      res = res.replace(pat, rep);
    }
    return res;
  });
}
