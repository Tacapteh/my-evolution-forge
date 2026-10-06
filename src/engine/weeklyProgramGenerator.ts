export interface UserStats {
  maxPullups: number; // ex: 12
  maxPushups: number; // ex: 30
  maxWallSitSeconds: number; // ex: 90
  maxPlankSeconds: number; // ex: 120
  vma: number; // ex: 14.5
}

export type MomentOfDay = "MATIN" | "APRÈS-MIDI" | "SOIR";

export type ExerciseCategory =
  | "cardio"
  | "pull"
  | "push"
  | "legs"
  | "core"
  | "swim"
  | "mobility";

export interface ProgramExercise {
  id: string;
  name: string;
  category: ExerciseCategory;
  type: "dynamic" | "isometric" | "cardio" | "mobility";
  targetReps?: number;
  targetDurationSeconds?: number;
  sets: number;
  intensityPercentage: number;
  restSeconds: number;
  detail: string;
  instructions: string[];
}

export interface MomentSession {
  moment: MomentOfDay;
  title: string;
  exercises: ProgramExercise[];
}

export interface DayProgram {
  dayName:
    | "Lundi"
    | "Mardi"
    | "Mercredi"
    | "Jeudi"
    | "Vendredi"
    | "Samedi"
    | "Dimanche";
  focus: string;
  sessions: MomentSession[];
}

export interface WeeklyProgram {
  generatedAt: string;
  userStats: UserStats;
  schedule: DayProgram[];
}

/**
 * Extrait l'objet UserStats à partir de l'état global ForgeState (state.perf)
 */
export function getUserStatsFromState(state: { perf?: Array<{ type: string; value: number }> }): UserStats {
  const perfs = state?.perf ?? [];
  const getMax = (type: string, fallback: number) => {
    const list = perfs.filter((p) => p.type === type).map((p) => p.value);
    return list.length > 0 ? Math.max(...list) : fallback;
  };

  const userMaxPull = getMax("pull", 10);
  const userMaxPush = getMax("push_military", 25);
  const userMaxChair = getMax("chair", 60);
  const userMaxCommando = getMax("commando", 90);
  const userMaxLuc = getMax("luc", 7.0);
  const vma = getMax("vma", +(userMaxLuc * 1.5 + 4).toFixed(1));

  return {
    maxPullups: userMaxPull,
    maxPushups: userMaxPush,
    maxWallSitSeconds: userMaxChair,
    maxPlankSeconds: userMaxCommando,
    vma,
  };
}

/**
 * Calcul dynamique des répétitions pour exercices dynamiques (Pompes, Tractions, Squats)
 * Formula: Math.round(userMax * intensityPercentage)
 */
export function calculateDynamicReps(
  userMax: number,
  intensityPercentage: number,
  minReps = 1
): number {
  const safeMax = Math.max(1, userMax);
  return Math.max(minReps, Math.round(safeMax * intensityPercentage));
}

/**
 * Calcul dynamique du temps de maintien pour exercices isométriques (Chaise, Planche, Iso 90°)
 * Formula: Math.round(userMaxSeconds * intensityPercentage)
 */
export function calculateIsometricDuration(
  userMaxSeconds: number,
  intensityPercentage: number,
  minSeconds = 15
): number {
  const safeMax = Math.max(15, userMaxSeconds);
  return Math.max(minSeconds, Math.round(safeMax * intensityPercentage));
}

/**
 * Générateur principal de programme hebdomadaire militaire structuré
 * basé sur les MAXI utilisateurs.
 */
export function generateWeeklyProgram(userStats: UserStats): WeeklyProgram {
  const {
    maxPullups = 10,
    maxPushups = 25,
    maxWallSitSeconds = 60,
    maxPlankSeconds = 90,
    vma = 14.0,
  } = userStats;

  // Calculs dynamiques par type d'exercice et intensité
  // --- Tirage ---
  const pullupVolumeReps = calculateDynamicReps(maxPullups, 0.75); // 75% max (Volume/Force)
  const pullupLSitReps = calculateDynamicReps(maxPullups, 0.50); // 50% max (Tirage + Core)
  const pullupIsoSeconds = calculateIsometricDuration(
    Math.min(maxPlankSeconds, maxPullups * 4),
    0.60
  ); // 60% iso
  const pullupNegReps = calculateDynamicReps(maxPullups, 0.60); // 60% max (Excentrique 5s)

  // --- Poussée ---
  const pushupsHeavyReps = calculateDynamicReps(maxPushups, 0.75); // 75% max (Volume/Force)
  const pushupsDeclinedReps = calculateDynamicReps(maxPushups, 0.70); // 70% max
  const pushupsTricepsReps = calculateDynamicReps(maxPushups, 0.60); // 60% max (Sphinx)
  const pushupsDiamondPreActivationReps = calculateDynamicReps(maxPushups, 0.40); // 40% max (Pré-activation)

  // --- Bas du corps ---
  const wallSitDuration = calculateIsometricDuration(maxWallSitSeconds, 0.65); // 65% max (Chaise)

  // --- Core ---
  const commandoDuration = calculateIsometricDuration(maxPlankSeconds, 0.60); // 60% max (Commando)
  const plankDuration = calculateIsometricDuration(maxPlankSeconds, 0.65); // 65% max (Planche statique)

  // --- Circuit Samedi ---
  const circuitPushReps = calculateDynamicReps(maxPushups, 0.60);
  const circuitWallSitDur = calculateIsometricDuration(maxWallSitSeconds, 0.50);
  const circuitCommandoDur = calculateIsometricDuration(maxPlankSeconds, 0.50);

  // Estimation palier Luc Léger théorique
  const lucPalierEst = Math.min(12, Math.max(5, Math.round((vma - 4) / 1.5)));

  const schedule: DayProgram[] = [
    // ================= LUNDI =================
    {
      dayName: "Lundi",
      focus: "Natation, Tirage Lourd & Core Dynamique",
      sessions: [
        {
          moment: "MATIN",
          title: "Session Aquatique Continu",
          exercises: [
            {
              id: "swim-1000m",
              name: "Natation — 1000m Continu & Éducatifs",
              category: "swim",
              type: "cardio",
              sets: 1,
              intensityPercentage: 0.75,
              restSeconds: 30,
              detail: "Aisance aquatique et capacité respiratoire continu (45 min)",
              instructions: [
                "200m échauffement coulée douce",
                "700m nage libre / brasse régulière",
                "100m récupération souple",
              ],
            },
          ],
        },
        {
          moment: "APRÈS-MIDI",
          title: "Session Tirage Haut du Corps",
          exercises: [
            {
              id: "pullups-volume",
              name: "Tractions Pronation (Séries Droites)",
              category: "pull",
              type: "dynamic",
              targetReps: pullupVolumeReps,
              sets: 4,
              intensityPercentage: 0.75,
              restSeconds: 90,
              detail: `4 séries × ${pullupVolumeReps} reps (75% Max: ${maxPullups}) • RIR 1-2`,
              instructions: [
                "Échauffement articulaire et mobilité des épaules",
                "Tempo 2010 : 2s descente freinée, 1s montée explosive",
                "Menton au-dessus de la barre à chaque rep",
                "Repos strict : 90s entre les séries",
              ],
            },
            {
              id: "pullups-supine-iso",
              name: "Tractions Supination — Blocage Iso 90°",
              category: "pull",
              type: "isometric",
              targetDurationSeconds: pullupIsoSeconds,
              sets: 4,
              intensityPercentage: 0.60,
              restSeconds: 90,
              detail: `4 séries × ${pullupIsoSeconds}s de maintien à 90°`,
              instructions: [
                "Prise supination serrée (paumes vers vous)",
                "Tirer à 90° d'angle de coude et maintenir le blocage",
                "Verrouillage des dorsaux et engagement des biceps",
                "Repos strict : 90s",
              ],
            },
          ],
        },
        {
          moment: "SOIR",
          title: "Session Core Dynamique",
          exercises: [
            {
              id: "commando-lundi",
              name: "Gainage Commando (Passage Coudes ↔ Mains)",
              category: "core",
              type: "dynamic",
              targetDurationSeconds: commandoDuration,
              sets: 3,
              intensityPercentage: 0.60,
              restSeconds: 60,
              detail: `3 séries × ${commandoDuration}s (60% Max Planche: ${maxPlankSeconds}s)`,
              instructions: [
                "Départ en planche sur les coudes",
                "Passage dynamique alterné sur bras tendus sans balancement du bassin",
                "Verrouillage de la sangle abdominale et des fessiers",
                "Repos strict : 60s",
              ],
            },
          ],
        },
      ],
    },

    // ================= MARDI =================
    {
      dayName: "Mardi",
      focus: "Poussée Lourde, Triceps & Core Dynamique",
      sessions: [
        {
          moment: "MATIN",
          title: "Session Poussée Lourde",
          exercises: [
            {
              id: "pushups-military",
              name: "Pompes Militaires (Pectoraux & Triceps)",
              category: "push",
              type: "dynamic",
              targetReps: pushupsHeavyReps,
              sets: 4,
              intensityPercentage: 0.75,
              restSeconds: 90,
              detail: `4 séries × ${pushupsHeavyReps} reps (75% Max: ${maxPushups}) • RIR 1-2`,
              instructions: [
                "Coudes orientés à 45° par rapport au tronc",
                "Corps parfaitement gainé, poitrine effleurant le sol",
                "Tempo 2010 • Repos strict : 90s",
              ],
            },
            {
              id: "pushups-declined",
              name: "Pompes Déclinées sur Chaise",
              category: "push",
              type: "dynamic",
              targetReps: pushupsDeclinedReps,
              sets: 4,
              intensityPercentage: 0.70,
              restSeconds: 90,
              detail: `4 séries × ${pushupsDeclinedReps} reps (70% Max: ${maxPushups})`,
              instructions: [
                "Pieds surélevés sur chaise ou banc",
                "Corps aligné sans creuser le bas du dos",
                "Focus sur le haut des pectoraux et l'avant de l'épaule",
                "Repos strict : 90s",
              ],
            },
          ],
        },
        {
          moment: "APRÈS-MIDI",
          title: "Session Triceps & Core",
          exercises: [
            {
              id: "pushups-sphinx",
              name: "Extensions Triceps Sphinx (au sol)",
              category: "push",
              type: "dynamic",
              targetReps: pushupsTricepsReps,
              sets: 4,
              intensityPercentage: 0.60,
              restSeconds: 60,
              detail: `4 séries × ${pushupsTricepsReps} reps (60% Max: ${maxPushups})`,
              instructions: [
                "Départ en planche sur avant-bras",
                "Poussée explosive sur les paumes pour tendre les bras",
                "Cible prioritaire : Triceps",
                "Repos strict : 60s",
              ],
            },
            {
              id: "commando-mardi",
              name: "Gainage Commando (Stabilité du Troncs)",
              category: "core",
              type: "dynamic",
              targetDurationSeconds: commandoDuration,
              sets: 3,
              intensityPercentage: 0.60,
              restSeconds: 60,
              detail: `3 séries × ${commandoDuration}s`,
              instructions: [
                "Maintien du bassin horizontal",
                "Mouvement fluide de montée et descente sur avant-bras",
                "Repos strict : 60s",
              ],
            },
          ],
        },
        {
          moment: "SOIR",
          title: "Footing Récupération",
          exercises: [
            {
              id: "evening-run-note-tue",
              name: "Footing du Soir (Indépendant)",
              category: "cardio",
              type: "cardio",
              sets: 1,
              intensityPercentage: 0.65,
              restSeconds: 0,
              detail: "Footing habituel du soir en aisance respiratoire sans surcharge.",
              instructions: ["Allure confortable de course à pied du soir."],
            },
          ],
        },
      ],
    },

    // ================= MERCREDI =================
    {
      dayName: "Mercredi",
      focus: "Natation, Isométrie Bas du corps & Tirage Core",
      sessions: [
        {
          moment: "MATIN",
          title: "Session Aquatique Endurance",
          exercises: [
            {
              id: "swim-1000m-wed",
              name: "Natation — 1000m Continu & Technique",
              category: "swim",
              type: "cardio",
              sets: 1,
              intensityPercentage: 0.75,
              restSeconds: 30,
              detail: "Travail d'aisance aquatique et de régularité (45 min)",
              instructions: [
                "Échauffement 200m",
                "700m coulée continue rythmée",
                "100m retour au calme",
              ],
            },
          ],
        },
        {
          moment: "APRÈS-MIDI",
          title: "Session Bas du corps & Tirage Core",
          exercises: [
            {
              id: "wallsit-wed",
              name: "Chaise Isométrique au Mur (90°)",
              category: "legs",
              type: "isometric",
              targetDurationSeconds: wallSitDuration,
              sets: 4,
              intensityPercentage: 0.65,
              restSeconds: 60,
              detail: `4 séries × ${wallSitDuration}s (65% Max Chaise: ${maxWallSitSeconds}s)`,
              instructions: [
                "Dos plaqué au mur, genoux à 90° exacts",
                "Mains libres sans appui sur les cuisses",
                "Maintien statique continu • Repos strict : 60s",
              ],
            },
            {
              id: "pullups-lsit",
              name: "Tractions L-Sit / Tuck L-Sit (Tirage + Core)",
              category: "pull",
              type: "dynamic",
              targetReps: pullupLSitReps,
              sets: 4,
              intensityPercentage: 0.50,
              restSeconds: 90,
              detail: `4 séries × ${pullupLSitReps} reps (50% Max: ${maxPullups})`,
              instructions: [
                "Jambes levées à 90° (ou genoux pliés en Tuck L-Sit au besoin)",
                "Traction complète jusqu'au menton",
                "Gainage abdominal maximal durant le tirage",
                "Repos strict : 90s",
              ],
            },
          ],
        },
        {
          moment: "SOIR",
          title: "Footing Récupération",
          exercises: [
            {
              id: "evening-run-note-wed",
              name: "Footing du Soir (Indépendant)",
              category: "cardio",
              type: "cardio",
              sets: 1,
              intensityPercentage: 0.65,
              restSeconds: 0,
              detail: "Footing habituel du soir.",
              instructions: ["Allure confortable."],
            },
          ],
        },
      ],
    },

    // ================= JEUDI =================
    {
      dayName: "Jeudi",
      focus: "Pré-activation, Spécifique Luc Léger & Mobilité",
      sessions: [
        {
          moment: "MATIN",
          title: "Session Pré-activation Poussée",
          exercises: [
            {
              id: "pushups-diamond-preact",
              name: "Pompes Diamant (Pré-activation Léger)",
              category: "push",
              type: "dynamic",
              targetReps: pushupsDiamondPreActivationReps,
              sets: 3,
              intensityPercentage: 0.40,
              restSeconds: 60,
              detail: `3 séries × ${pushupsDiamondPreActivationReps} reps (40% Max: ${maxPushups}) • RIR 3-4`,
              instructions: [
                "Pré-activation légère sans fatigue avant le cardio de l'après-midi",
                "Mains jointes sous le sternum",
                "Exécution contrôlée sans échec",
                "Repos strict : 60s",
              ],
            },
          ],
        },
        {
          moment: "APRÈS-MIDI",
          title: "Session Spécifique Luc Léger",
          exercises: [
            {
              id: "luc-leger-session",
              name: "Test / Navettes 20m Luc Léger",
              category: "cardio",
              type: "cardio",
              sets: 1,
              intensityPercentage: 0.90,
              restSeconds: 120,
              detail: `Séance spécifique Navettes 20m • Cible théorique : Palier ${lucPalierEst} (VMA: ${vma})`,
              instructions: [
                "10 min d'échauffement cardio progressif & mobilité dynamique des chevilles",
                "Navettes de 20m au rythme des bips sonores",
                "Focus relances explosives et blocages pied sur la ligne à 180°",
                "Saisir le score de palier atteint à la fin de la séance",
              ],
            },
          ],
        },
        {
          moment: "SOIR",
          title: "Session Mobilité & Étirements",
          exercises: [
            {
              id: "mobility-thu",
              name: "Mobilité Active & Étirements Doux",
              category: "mobility",
              type: "mobility",
              targetDurationSeconds: 1200,
              sets: 1,
              intensityPercentage: 0.30,
              restSeconds: 0,
              detail: "20 min d'étirements musculaires et mobilité chevilles/ischios post-Luc Léger",
              instructions: [
                "Étirements doux des mollets, ischio-jambiers et quadriceps",
                "Automassages au rouleau ou manuels",
                "Exercices de respiration ventrale de récupération",
              ],
            },
          ],
        },
      ],
    },

    // ================= VENDREDI =================
    {
      dayName: "Vendredi",
      focus: "Tirage Excentrique, Renforcement Bas du Corps (Post-Natation) & Core Statique",
      sessions: [
        {
          moment: "MATIN",
          title: "Session Tirage Excentrique",
          exercises: [
            {
              id: "pullups-negative",
              name: "Tractions Supination Négatives (5s Excentrique)",
              category: "pull",
              type: "dynamic",
              targetReps: pullupNegReps,
              sets: 4,
              intensityPercentage: 0.60,
              restSeconds: 90,
              detail: `4 séries × ${pullupNegReps} reps avec freinage 5s (60% Max: ${maxPullups})`,
              instructions: [
                "Prise supination (paumes vers vous)",
                "Montée explosive (saut si besoin) menton au-dessus de la barre",
                "Freiner la descente sur 5 secondes complètes chrono",
                "Repos strict : 90s entre les séries",
              ],
            },
          ],
        },
        {
          moment: "APRÈS-MIDI",
          title: "Session Renforcement Bas du Corps (Poids de Corps) & Core",
          exercises: [
            {
              id: "friday-squats",
              name: "Squats au Poids de Corps",
              category: "legs",
              type: "dynamic",
              targetReps: calculateDynamicReps(userStats.maxSquat ?? 40, 0.45, 18),
              sets: 4,
              intensityPercentage: 0.45,
              restSeconds: 60,
              detail: "3 à 4 séries × 15-20 reps • Poids de corps (15-20 min)",
              instructions: [
                "Pieds largeur d'épaules, cuisses parallèles au sol",
                "Poussée fluide sur les talons et dos droit",
                "3 à 4 séries de 15 à 20 répétitions • Repos : 60s",
              ],
            },
            {
              id: "friday-lunges",
              name: "Fentes Avancées au Poids de Corps",
              category: "legs",
              type: "dynamic",
              targetReps: 12,
              sets: 3,
              intensityPercentage: 0.50,
              restSeconds: 60,
              detail: "3 séries × 10-12 reps par jambe • Poids de corps",
              instructions: [
                "Grand pas en avant, genou arrière effleurant le sol sans toucher brutalement",
                "Buste droit, poussée sur le talon avant pour revenir en position initiale",
                "3 séries de 10 à 12 répétitions par jambe • Repos : 60s",
              ],
            },
            {
              id: "friday-calves",
              name: "Extensions Mollets (Debout)",
              category: "legs",
              type: "dynamic",
              targetReps: 22,
              sets: 4,
              intensityPercentage: 0.60,
              restSeconds: 45,
              detail: "3 à 4 séries × 20-25 reps • Poids de corps",
              instructions: [
                "Montée maximale sur la pointe des pieds avec contraction 1s en haut",
                "Descente freinée jusqu'à étirement du tendon d'Achille",
                "3 à 4 séries de 20 à 25 répétitions • Repos : 45s",
              ],
            },
            {
              id: "friday-wallsit",
              name: "Chaise Isométrique au Mur (90°)",
              category: "legs",
              type: "isometric",
              targetDurationSeconds: calculateIsometricDuration(maxWallSitSeconds, 0.60, 50),
              sets: 3,
              intensityPercentage: 0.60,
              restSeconds: 60,
              detail: `3 séries × 45 à 60s de maintien (60% Max Chaise: ${maxWallSitSeconds}s)`,
              instructions: [
                "Dos plaqué contre le mur, cuisses à 90° exacts",
                "Maintien statique sans appui des mains sur les cuisses",
                "3 séries de 45 à 60 secondes • Repos strict : 60s",
              ],
            },
            {
              id: "plank-friday",
              name: "Gainage Abdominal Planche (Statique)",
              category: "core",
              type: "isometric",
              targetDurationSeconds: plankDuration,
              sets: 4,
              intensityPercentage: 0.65,
              restSeconds: 60,
              detail: `4 séries × ${plankDuration}s (65% Max Planche: ${maxPlankSeconds}s) • Unique séance statique de la semaine`,
              instructions: [
                "Coudes sous les épaules, corps parfaitement aligné",
                "Maintien statique sans creuser le dos",
                "Repos strict : 60s entre les séries",
              ],
            },
          ],
        },
        {
          moment: "SOIR",
          title: "Footing Récupération",
          exercises: [
            {
              id: "evening-run-note-fri",
              name: "Footing du Soir (Indépendant)",
              category: "cardio",
              type: "cardio",
              sets: 1,
              intensityPercentage: 0.65,
              restSeconds: 0,
              detail: "Footing habituel du soir.",
              instructions: ["Allure confortable."],
            },
          ],
        },
      ],
    },

    // ================= SAMEDI =================
    {
      dayName: "Samedi",
      focus: "Circuit Métabolique Full Body (3 Tours)",
      sessions: [
        {
          moment: "MATIN",
          title: "Circuit Full Body Métabolique",
          exercises: [
            {
              id: "circuit-pushups",
              name: "Pompes Militaires (Tour Circuit)",
              category: "push",
              type: "dynamic",
              targetReps: circuitPushReps,
              sets: 3,
              intensityPercentage: 0.60,
              restSeconds: 30,
              detail: `3 tours × ${circuitPushReps} reps (60% Max: ${maxPushups})`,
              instructions: [
                "Premier exercice du circuit métabolique",
                "Execution propre et rythmée",
                "Enchaîner avec la Chaise après 30s de transition",
              ],
            },
            {
              id: "circuit-wallsit",
              name: "Chaise Isométrique au Mur (Tour Circuit)",
              category: "legs",
              type: "isometric",
              targetDurationSeconds: circuitWallSitDur,
              sets: 3,
              intensityPercentage: 0.50,
              restSeconds: 30,
              detail: `3 tours × ${circuitWallSitDur}s (50% Max Chaise: ${maxWallSitSeconds}s)`,
              instructions: [
                "Deuxième exercice du circuit",
                "Dos plaqué à 90°",
                "Enchaîner avec le Gainage Commando après 30s",
              ],
            },
            {
              id: "circuit-commando",
              name: "Gainage Commando (Tour Circuit)",
              category: "core",
              type: "dynamic",
              targetDurationSeconds: circuitCommandoDur,
              sets: 3,
              intensityPercentage: 0.50,
              restSeconds: 90,
              detail: `3 tours × ${circuitCommandoDur}s (50% Max Planche: ${maxPlankSeconds}s)`,
              instructions: [
                "Troisième exercice du circuit",
                "Passage coudes ↔ mains dynamique",
                "Repos complet de 90s après ce 3ème exercice avant de repartir pour le tour suivant (3 tours au total)",
              ],
            },
          ],
        },
        {
          moment: "SOIR",
          title: "Footing Récupération",
          exercises: [
            {
              id: "evening-run-note-sat",
              name: "Footing du Soir (Indépendant)",
              category: "cardio",
              type: "cardio",
              sets: 1,
              intensityPercentage: 0.65,
              restSeconds: 0,
              detail: "Footing habituel du soir.",
              instructions: ["Allure très confortable."],
            },
          ],
        },
      ],
    },

    // ================= DIMANCHE =================
    {
      dayName: "Dimanche",
      focus: "Repos Complet & Mobilité Active",
      sessions: [
        {
          moment: "MATIN",
          title: "Session Récupération & Mobilité",
          exercises: [
            {
              id: "sunday-mobility",
              name: "Mobilité Douce & Récupération Complète",
              category: "mobility",
              type: "mobility",
              targetDurationSeconds: 1200,
              sets: 1,
              intensityPercentage: 0.20,
              restSeconds: 0,
              detail: "20 min d'étirements doux et mobilité active sans charge physique lourde",
              instructions: [
                "Mobilité douce des hanches, chevilles et épaules",
                "Pas d'exercice physique lourd ni d'effort intense",
                "Hydratation et régénération musculaire complète",
              ],
            },
          ],
        },
      ],
    },
  ];

  return {
    generatedAt: new Date().toISOString(),
    userStats: {
      maxPullups,
      maxPushups,
      maxWallSitSeconds,
      maxPlankSeconds,
      vma,
    },
    schedule,
  };
}
