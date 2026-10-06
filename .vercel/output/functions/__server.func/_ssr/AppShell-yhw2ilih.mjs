import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { B as CalendarDays, D as Flame, H as BookOpen, S as LayoutDashboard, V as Brain, i as TrendingUp, k as Dumbbell, m as Settings, r as Trophy } from "../_libs/lucide-react.mjs";
import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AppShell-yhw2ilih.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var BADGES = [
	{
		id: "first",
		label: "Première séance",
		description: "Coche ta première tâche"
	},
	{
		id: "streak7",
		label: "7 jours consécutifs",
		description: "Reviens 7 jours de suite"
	},
	{
		id: "streak30",
		label: "30 jours consécutifs",
		description: "Un mois de régularité"
	},
	{
		id: "run10",
		label: "Premier 10 km",
		description: "Course de 10 km enregistrée"
	},
	{
		id: "pull10",
		label: "10 tractions",
		description: "Record à 10 tractions"
	},
	{
		id: "pull15",
		label: "15 tractions",
		description: "Record à 15 tractions"
	},
	{
		id: "goalPull",
		label: "Objectif 17 atteint",
		description: "17 tractions"
	},
	{
		id: "goalChair",
		label: "Chaise 168s",
		description: "Objectif chaise"
	},
	{
		id: "goalLuc",
		label: "Luc Léger atteint",
		description: "Objectif Luc Léger"
	},
	{
		id: "run100",
		label: "100 km courus",
		description: "Total course"
	},
	{
		id: "swim50",
		label: "50 km nagés",
		description: "Total natation"
	}
];
var DEFAULT_TARGET_DATE = "2026-12-01";
var militarySeptemberProgram = {
	id: "military-september",
	name: "Programme militaire — Septembre",
	description: "Programme d'endurance, force et psychotechniques structuré en semaines et jours.",
	objectives: [
		{
			id: "endurance",
			label: "Endurance",
			target: 100,
			unit: "km"
		},
		{
			id: "strength",
			label: "Force",
			target: 17,
			unit: "tractions"
		},
		{
			id: "psychotech",
			label: "Psychotechniques",
			target: 60,
			unit: "jours"
		}
	],
	weeks: [
		{
			id: "week-1",
			label: "Semaine 1",
			days: [
				{
					name: "Lundi",
					objective: "Endurance + force",
					title: "Ouverture du cycle",
					priority: "Normale",
					tasks: [
						{
							id: "w1-mon-swim",
							label: "Natation — 45 min",
							type: "swim",
							moment: "morning",
							detail: "Piscine + échauffement",
							estimatedMinutes: 45,
							xp: 35,
							completed: false
						},
						{
							id: "w1-mon-pull",
							label: "Tractions (Séries Droites RIR 1-2) — 4 × 4 reps",
							type: "pull",
							moment: "morning",
							detail: "4 séries droites • RIR 1-2 • Test RIR sur dernière série",
							estimatedMinutes: 15,
							xp: 25,
							completed: false
						},
						{
							id: "w1-mon-chair",
							label: "Chaise Isométrique — 3 × 45 s",
							type: "chair",
							moment: "morning",
							detail: "Maintien statique à 90°",
							estimatedMinutes: 10,
							xp: 15,
							completed: false
						},
						{
							id: "w1-mon-run",
							label: "Course en duo — footing 5 km",
							type: "run",
							moment: "evening",
							detail: "Allure confortable",
							estimatedMinutes: 40,
							xp: 50,
							completed: false
						},
						{
							id: "w1-mon-psycho",
							label: "Psychotechnique — Calcul mental",
							type: "psycho",
							moment: "psychotechniques",
							detail: "30-45 min",
							estimatedMinutes: 35,
							xp: 20,
							completed: false
						}
					]
				},
				{
					name: "Mardi",
					objective: "Régularité",
					title: "Rythme stable",
					priority: "Haute",
					tasks: [
						{
							id: "w1-tue-core",
							label: "Gainage — 15 min",
							type: "custom",
							moment: "afternoon",
							detail: "Stabilité du tronc",
							estimatedMinutes: 15,
							xp: 15,
							completed: false
						},
						{
							id: "w1-tue-run",
							label: "Course en duo — footing",
							type: "run",
							moment: "evening",
							detail: "Allure facile",
							estimatedMinutes: 35,
							xp: 50,
							completed: false
						},
						{
							id: "w1-tue-psycho",
							label: "Psychotechnique — Logique",
							type: "psycho",
							moment: "psychotechniques",
							detail: "30-45 min",
							estimatedMinutes: 35,
							xp: 20,
							completed: false
						}
					]
				},
				{
					name: "Mercredi",
					objective: "Volume",
					title: "Rythme fluide",
					priority: "Normale",
					tasks: [
						{
							id: "w1-wed-swim",
							label: "Natation — 45 min",
							type: "swim",
							moment: "morning",
							detail: "Échauffement + technique",
							estimatedMinutes: 45,
							xp: 35,
							completed: false
						},
						{
							id: "w1-wed-pull",
							label: "Tractions (Séries Droites RIR 1-2) — 4 × 4 reps",
							type: "pull",
							moment: "morning",
							detail: "4 séries droites • RIR 1-2 • Test RIR sur dernière série",
							estimatedMinutes: 15,
							xp: 25,
							completed: false
						},
						{
							id: "w1-wed-chair",
							label: "Chaise Isométrique — 3 × 45 s",
							type: "chair",
							moment: "morning",
							detail: "Maintien statique à 90°",
							estimatedMinutes: 10,
							xp: 15,
							completed: false
						},
						{
							id: "w1-wed-run",
							label: "Course en duo — footing facile",
							type: "run",
							moment: "evening",
							detail: "Allure douce",
							estimatedMinutes: 35,
							xp: 50,
							completed: false
						},
						{
							id: "w1-wed-psycho",
							label: "Psychotechnique — Mémoire",
							type: "psycho",
							moment: "psychotechniques",
							detail: "30-45 min",
							estimatedMinutes: 35,
							xp: 20,
							completed: false
						}
					]
				},
				{
					name: "Jeudi",
					objective: "Cardio + force",
					title: "Séance équilibrée",
					priority: "Haute",
					tasks: [
						{
							id: "w1-thu-pull",
							label: "Tractions (Pré-activation) — 4 × 3 reps",
							type: "pull",
							moment: "morning",
							detail: "Pré-activation sous-maximale sans échec (RIR 3-4) avant le cardio de l'après-midi",
							estimatedMinutes: 12,
							xp: 20,
							completed: false
						},
						{
							id: "w1-thu-chair",
							label: "Chaise (Pré-activation) — 3 × 30 s",
							type: "chair",
							moment: "morning",
							detail: "Éveil statique léger sans échec",
							estimatedMinutes: 8,
							xp: 10,
							completed: false
						},
						{
							id: "w1-thu-fraction",
							label: "Fractionné spécifique — 8×200 m",
							type: "run",
							moment: "afternoon",
							detail: "Récupération courte",
							estimatedMinutes: 30,
							xp: 50,
							completed: false
						},
						{
							id: "w1-thu-run",
							label: "Course en duo — tranquille",
							type: "run",
							moment: "evening",
							detail: "Récupération",
							estimatedMinutes: 30,
							xp: 50,
							completed: false
						},
						{
							id: "w1-thu-psycho",
							label: "Psychotechnique — Suites numériques",
							type: "psycho",
							moment: "psychotechniques",
							detail: "30-45 min",
							estimatedMinutes: 35,
							xp: 20,
							completed: false
						}
					]
				},
				{
					name: "Vendredi",
					objective: "Récupération active & Renforcement",
					title: "Séance 3 de la semaine",
					priority: "Normale",
					tasks: [
						{
							id: "w1-fri-swim",
							label: "Natation — 45 min",
							type: "swim",
							moment: "morning",
							detail: "Récupération active",
							estimatedMinutes: 45,
							xp: 35,
							completed: false
						},
						{
							id: "w1-fri-pull",
							label: "Tractions (Séries Droites RIR 1-2) — 4 × 4 reps",
							type: "pull",
							moment: "morning",
							detail: "4 séries droites • RIR 1-2 • Test RIR sur dernière série",
							estimatedMinutes: 15,
							xp: 25,
							completed: false
						},
						{
							id: "w1-fri-chair",
							label: "Chaise Isométrique — 3 × 45 s",
							type: "chair",
							moment: "morning",
							detail: "Maintien statique à 90°",
							estimatedMinutes: 10,
							xp: 15,
							completed: false
						},
						{
							id: "w1-fri-psycho",
							label: "Psychotechnique — Orientation spatiale",
							type: "psycho",
							moment: "psychotechniques",
							detail: "30-45 min",
							estimatedMinutes: 35,
							xp: 20,
							completed: false
						}
					]
				},
				{
					name: "Samedi",
					objective: "Endurance",
					title: "Sortie longue",
					priority: "Haute",
					tasks: [
						{
							id: "w1-sat-run",
							label: "Sortie longue — 6 km",
							type: "run",
							moment: "morning",
							detail: "Seul ou en duo",
							estimatedMinutes: 50,
							xp: 50,
							completed: false
						},
						{
							id: "w1-sat-core",
							label: "Gainage — 15 min",
							type: "custom",
							moment: "afternoon",
							detail: "Stabilité du tronc",
							estimatedMinutes: 15,
							xp: 15,
							completed: false
						},
						{
							id: "w1-sat-rest",
							label: "Repos — soir",
							type: "custom",
							moment: "evening",
							detail: "Récupération",
							estimatedMinutes: 0,
							xp: 5,
							completed: false
						},
						{
							id: "w1-sat-psycho",
							label: "Psychotechnique — Test complet chronométré",
							type: "psycho",
							moment: "psychotechniques",
							detail: "30-45 min",
							estimatedMinutes: 40,
							xp: 20,
							completed: false
						}
					]
				},
				{
					name: "Dimanche",
					objective: "Récupération",
					title: "Repos utile",
					priority: "Recuperation",
					tasks: [
						{
							id: "w1-sun-mobility",
							label: "Repos / marche / mobilité",
							type: "custom",
							moment: "morning",
							detail: "Activité douce",
							estimatedMinutes: 30,
							xp: 10,
							completed: false
						},
						{
							id: "w1-sun-rest",
							label: "Repos — soir",
							type: "custom",
							moment: "evening",
							detail: "Complète récupération",
							estimatedMinutes: 0,
							xp: 5,
							completed: false
						},
						{
							id: "w1-sun-psycho",
							label: "Psychotechnique — Correction des erreurs",
							type: "psycho",
							moment: "psychotechniques",
							detail: "30-45 min",
							estimatedMinutes: 35,
							xp: 20,
							completed: false
						}
					]
				}
			]
		},
		{
			id: "week-2",
			label: "Semaine 2",
			days: [
				{
					name: "Lundi",
					objective: "Endurance + force",
					title: "Prise de rythme",
					priority: "Normale",
					tasks: [
						{
							id: "w2-mon-swim",
							label: "Natation — 45 min",
							type: "swim",
							moment: "morning",
							detail: "Piscine + échauffement",
							estimatedMinutes: 45,
							xp: 35,
							completed: false
						},
						{
							id: "w2-mon-pull",
							label: "Tractions (Séries Droites RIR 1-2) — 4 × 5 reps",
							type: "pull",
							moment: "morning",
							detail: "4 séries droites • RIR 1-2 • Repos strict 90s • Test RIR sur dernière série",
							estimatedMinutes: 15,
							xp: 25,
							completed: false
						},
						{
							id: "w2-mon-chair",
							label: "Chaise Isométrique — 3 × 60 s",
							type: "chair",
							moment: "morning",
							detail: "Maintien statique à 90° • Repos 60s",
							estimatedMinutes: 10,
							xp: 15,
							completed: false
						},
						{
							id: "w2-mon-run",
							label: "Course en duo — footing 5 km",
							type: "run",
							moment: "evening",
							detail: "Allure confortable",
							estimatedMinutes: 40,
							xp: 50,
							completed: false
						},
						{
							id: "w2-mon-psycho",
							label: "Psychotechnique — Calcul mental",
							type: "psycho",
							moment: "psychotechniques",
							detail: "30-45 min",
							estimatedMinutes: 35,
							xp: 20,
							completed: false
						}
					]
				},
				{
					name: "Mardi",
					objective: "Régularité",
					title: "Rythme stable",
					priority: "Haute",
					tasks: [
						{
							id: "w2-tue-core",
							label: "Gainage — 15 min",
							type: "custom",
							moment: "afternoon",
							detail: "Stabilité du tronc",
							estimatedMinutes: 15,
							xp: 15,
							completed: false
						},
						{
							id: "w2-tue-run",
							label: "Course en duo — footing",
							type: "run",
							moment: "evening",
							detail: "Allure facile",
							estimatedMinutes: 35,
							xp: 50,
							completed: false
						},
						{
							id: "w2-tue-psycho",
							label: "Psychotechnique — Logique",
							type: "psycho",
							moment: "psychotechniques",
							detail: "30-45 min",
							estimatedMinutes: 35,
							xp: 20,
							completed: false
						}
					]
				},
				{
					name: "Mercredi",
					objective: "Volume",
					title: "Rythme fluide",
					priority: "Normale",
					tasks: [
						{
							id: "w2-wed-swim",
							label: "Natation — 45 min",
							type: "swim",
							moment: "morning",
							detail: "Échauffement + technique",
							estimatedMinutes: 45,
							xp: 35,
							completed: false
						},
						{
							id: "w2-wed-pull",
							label: "Tractions (Séries Droites RIR 1-2) — 4 × 5 reps",
							type: "pull",
							moment: "morning",
							detail: "4 séries droites • RIR 1-2 • Repos strict 90s • Test RIR sur dernière série",
							estimatedMinutes: 15,
							xp: 25,
							completed: false
						},
						{
							id: "w2-wed-chair",
							label: "Chaise Isométrique — 3 × 60 s",
							type: "chair",
							moment: "morning",
							detail: "Maintien statique à 90° • Repos 60s",
							estimatedMinutes: 10,
							xp: 15,
							completed: false
						},
						{
							id: "w2-wed-run",
							label: "Course en duo — footing facile",
							type: "run",
							moment: "evening",
							detail: "Allure douce",
							estimatedMinutes: 35,
							xp: 50,
							completed: false
						},
						{
							id: "w2-wed-psycho",
							label: "Psychotechnique — Mémoire",
							type: "psycho",
							moment: "psychotechniques",
							detail: "30-45 min",
							estimatedMinutes: 35,
							xp: 20,
							completed: false
						}
					]
				},
				{
					name: "Jeudi",
					objective: "Cardio + force",
					title: "Séance équilibrée",
					priority: "Haute",
					tasks: [
						{
							id: "w2-thu-pull",
							label: "Tractions (Pré-activation) — 4 × 3 reps",
							type: "pull",
							moment: "morning",
							detail: "Pré-activation sous-maximale sans échec (RIR 3-4)",
							estimatedMinutes: 12,
							xp: 20,
							completed: false
						},
						{
							id: "w2-thu-chair",
							label: "Chaise (Pré-activation) — 3 × 30 s",
							type: "chair",
							moment: "morning",
							detail: "Éveil statique léger sans échec",
							estimatedMinutes: 8,
							xp: 10,
							completed: false
						},
						{
							id: "w2-thu-fraction",
							label: "Fractionné spécifique — 10×200 m",
							type: "run",
							moment: "afternoon",
							detail: "Récupération courte",
							estimatedMinutes: 30,
							xp: 50,
							completed: false
						},
						{
							id: "w2-thu-run",
							label: "Course en duo — tranquille",
							type: "run",
							moment: "evening",
							detail: "Récupération",
							estimatedMinutes: 30,
							xp: 50,
							completed: false
						},
						{
							id: "w2-thu-psycho",
							label: "Psychotechnique — Suites numériques",
							type: "psycho",
							moment: "psychotechniques",
							detail: "30-45 min",
							estimatedMinutes: 35,
							xp: 20,
							completed: false
						}
					]
				},
				{
					name: "Vendredi",
					objective: "Récupération active & Renforcement",
					title: "Séance 3 de la semaine",
					priority: "Normale",
					tasks: [
						{
							id: "w2-fri-swim",
							label: "Natation — 45 min",
							type: "swim",
							moment: "morning",
							detail: "Récupération active",
							estimatedMinutes: 45,
							xp: 35,
							completed: false
						},
						{
							id: "w2-fri-pull",
							label: "Tractions (Séries Droites RIR 1-2) — 4 × 5 reps",
							type: "pull",
							moment: "morning",
							detail: "4 séries droites • RIR 1-2 • Repos strict 90s • Test RIR sur dernière série",
							estimatedMinutes: 15,
							xp: 25,
							completed: false
						},
						{
							id: "w2-fri-chair",
							label: "Chaise Isométrique — 3 × 60 s",
							type: "chair",
							moment: "morning",
							detail: "Maintien statique à 90° • Repos 60s",
							estimatedMinutes: 10,
							xp: 15,
							completed: false
						},
						{
							id: "w2-fri-psycho",
							label: "Psychotechnique — Orientation spatiale",
							type: "psycho",
							moment: "psychotechniques",
							detail: "30-45 min",
							estimatedMinutes: 35,
							xp: 20,
							completed: false
						}
					]
				},
				{
					name: "Samedi",
					objective: "Endurance",
					title: "Sortie longue",
					priority: "Haute",
					tasks: [
						{
							id: "w2-sat-run",
							label: "Sortie longue — 7 km",
							type: "run",
							moment: "morning",
							detail: "Seul ou en duo",
							estimatedMinutes: 55,
							xp: 50,
							completed: false
						},
						{
							id: "w2-sat-core",
							label: "Gainage — 15 min",
							type: "custom",
							moment: "afternoon",
							detail: "Stabilité du tronc",
							estimatedMinutes: 15,
							xp: 15,
							completed: false
						},
						{
							id: "w2-sat-rest",
							label: "Repos — soir",
							type: "custom",
							moment: "evening",
							detail: "Récupération",
							estimatedMinutes: 0,
							xp: 5,
							completed: false
						},
						{
							id: "w2-sat-psycho",
							label: "Psychotechnique — Test complet chronométré",
							type: "psycho",
							moment: "psychotechniques",
							detail: "30-45 min",
							estimatedMinutes: 40,
							xp: 20,
							completed: false
						}
					]
				},
				{
					name: "Dimanche",
					objective: "Récupération",
					title: "Repos utile",
					priority: "Recuperation",
					tasks: [
						{
							id: "w2-sun-mobility",
							label: "Repos / marche / mobilité",
							type: "custom",
							moment: "morning",
							detail: "Activité douce",
							estimatedMinutes: 30,
							xp: 10,
							completed: false
						},
						{
							id: "w2-sun-rest",
							label: "Repos — soir",
							type: "custom",
							moment: "evening",
							detail: "Complète récupération",
							estimatedMinutes: 0,
							xp: 5,
							completed: false
						},
						{
							id: "w2-sun-psycho",
							label: "Psychotechnique — Correction des erreurs",
							type: "psycho",
							moment: "psychotechniques",
							detail: "30-45 min",
							estimatedMinutes: 35,
							xp: 20,
							completed: false
						}
					]
				}
			]
		},
		{
			id: "week-3",
			label: "Semaine 3",
			days: [
				{
					name: "Lundi",
					objective: "Endurance + force",
					title: "Base solide",
					priority: "Normale",
					tasks: [
						{
							id: "w3-mon-swim",
							label: "Natation — 45 min",
							type: "swim",
							moment: "morning",
							detail: "Piscine + échauffement",
							estimatedMinutes: 45,
							xp: 35,
							completed: false
						},
						{
							id: "w3-mon-pull",
							label: "Tractions (Séries Droites RIR 1-2) — 5 × 4 reps",
							type: "pull",
							moment: "morning",
							detail: "5 séries droites • RIR 1-2 • Repos strict 90s • Test RIR sur dernière série",
							estimatedMinutes: 15,
							xp: 25,
							completed: false
						},
						{
							id: "w3-mon-chair",
							label: "Chaise Isométrique — 3 × 75 s",
							type: "chair",
							moment: "morning",
							detail: "Maintien statique à 90° • Repos 60s",
							estimatedMinutes: 10,
							xp: 15,
							completed: false
						},
						{
							id: "w3-mon-run",
							label: "Course en duo — footing 5 km",
							type: "run",
							moment: "evening",
							detail: "Allure confortable",
							estimatedMinutes: 40,
							xp: 50,
							completed: false
						},
						{
							id: "w3-mon-psycho",
							label: "Psychotechnique — Calcul mental",
							type: "psycho",
							moment: "psychotechniques",
							detail: "30-45 min",
							estimatedMinutes: 35,
							xp: 20,
							completed: false
						}
					]
				},
				{
					name: "Mardi",
					objective: "Régularité",
					title: "Rythme stable",
					priority: "Haute",
					tasks: [
						{
							id: "w3-tue-core",
							label: "Gainage — 15 min",
							type: "custom",
							moment: "afternoon",
							detail: "Stabilité du tronc",
							estimatedMinutes: 15,
							xp: 15,
							completed: false
						},
						{
							id: "w3-tue-run",
							label: "Course en duo — footing",
							type: "run",
							moment: "evening",
							detail: "Allure facile",
							estimatedMinutes: 35,
							xp: 50,
							completed: false
						},
						{
							id: "w3-tue-psycho",
							label: "Psychotechnique — Logique",
							type: "psycho",
							moment: "psychotechniques",
							detail: "30-45 min",
							estimatedMinutes: 35,
							xp: 20,
							completed: false
						}
					]
				},
				{
					name: "Mercredi",
					objective: "Volume",
					title: "Rythme fluide",
					priority: "Normale",
					tasks: [
						{
							id: "w3-wed-swim",
							label: "Natation — 45 min",
							type: "swim",
							moment: "morning",
							detail: "Échauffement + technique",
							estimatedMinutes: 45,
							xp: 35,
							completed: false
						},
						{
							id: "w3-wed-pull",
							label: "Tractions (Séries Droites RIR 1-2) — 5 × 4 reps",
							type: "pull",
							moment: "morning",
							detail: "5 séries droites • RIR 1-2 • Repos strict 90s • Test RIR sur dernière série",
							estimatedMinutes: 15,
							xp: 25,
							completed: false
						},
						{
							id: "w3-wed-chair",
							label: "Chaise Isométrique — 3 × 75 s",
							type: "chair",
							moment: "morning",
							detail: "Maintien statique à 90° • Repos 60s",
							estimatedMinutes: 10,
							xp: 15,
							completed: false
						},
						{
							id: "w3-wed-run",
							label: "Course en duo — footing facile",
							type: "run",
							moment: "evening",
							detail: "Allure douce",
							estimatedMinutes: 35,
							xp: 50,
							completed: false
						},
						{
							id: "w3-wed-psycho",
							label: "Psychotechnique — Mémoire",
							type: "psycho",
							moment: "psychotechniques",
							detail: "30-45 min",
							estimatedMinutes: 35,
							xp: 20,
							completed: false
						}
					]
				},
				{
					name: "Jeudi",
					objective: "Cardio + force",
					title: "Séance équilibrée",
					priority: "Haute",
					tasks: [
						{
							id: "w3-thu-pull",
							label: "Tractions (Pré-activation) — 4 × 3 reps",
							type: "pull",
							moment: "morning",
							detail: "Pré-activation sous-maximale sans échec (RIR 3-4)",
							estimatedMinutes: 12,
							xp: 20,
							completed: false
						},
						{
							id: "w3-thu-chair",
							label: "Chaise (Pré-activation) — 3 × 30 s",
							type: "chair",
							moment: "morning",
							detail: "Éveil statique léger sans échec",
							estimatedMinutes: 8,
							xp: 10,
							completed: false
						},
						{
							id: "w3-thu-fraction",
							label: "Fractionné spécifique — 6×400 m",
							type: "run",
							moment: "afternoon",
							detail: "Récupération courte",
							estimatedMinutes: 30,
							xp: 50,
							completed: false
						},
						{
							id: "w3-thu-run",
							label: "Course en duo — tranquille",
							type: "run",
							moment: "evening",
							detail: "Récupération",
							estimatedMinutes: 30,
							xp: 50,
							completed: false
						},
						{
							id: "w3-thu-psycho",
							label: "Psychotechnique — Suites numériques",
							type: "psycho",
							moment: "psychotechniques",
							detail: "30-45 min",
							estimatedMinutes: 35,
							xp: 20,
							completed: false
						}
					]
				},
				{
					name: "Vendredi",
					objective: "Récupération active & Renforcement",
					title: "Séance 3 de la semaine",
					priority: "Normale",
					tasks: [
						{
							id: "w3-fri-swim",
							label: "Natation — 45 min",
							type: "swim",
							moment: "morning",
							detail: "Récupération active",
							estimatedMinutes: 45,
							xp: 35,
							completed: false
						},
						{
							id: "w3-fri-pull",
							label: "Tractions (Séries Droites RIR 1-2) — 5 × 4 reps",
							type: "pull",
							moment: "morning",
							detail: "5 séries droites • RIR 1-2 • Repos strict 90s • Test RIR sur dernière série",
							estimatedMinutes: 15,
							xp: 25,
							completed: false
						},
						{
							id: "w3-fri-chair",
							label: "Chaise Isométrique — 3 × 75 s",
							type: "chair",
							moment: "morning",
							detail: "Maintien statique à 90° • Repos 60s",
							estimatedMinutes: 10,
							xp: 15,
							completed: false
						},
						{
							id: "w3-fri-psycho",
							label: "Psychotechnique — Orientation spatiale",
							type: "psycho",
							moment: "psychotechniques",
							detail: "30-45 min",
							estimatedMinutes: 35,
							xp: 20,
							completed: false
						}
					]
				},
				{
					name: "Samedi",
					objective: "Endurance",
					title: "Sortie longue",
					priority: "Haute",
					tasks: [
						{
							id: "w3-sat-run",
							label: "Sortie longue — 8 km",
							type: "run",
							moment: "morning",
							detail: "Seul ou en duo",
							estimatedMinutes: 60,
							xp: 50,
							completed: false
						},
						{
							id: "w3-sat-core",
							label: "Gainage — 15 min",
							type: "custom",
							moment: "afternoon",
							detail: "Stabilité du tronc",
							estimatedMinutes: 15,
							xp: 15,
							completed: false
						},
						{
							id: "w3-sat-rest",
							label: "Repos — soir",
							type: "custom",
							moment: "evening",
							detail: "Récupération",
							estimatedMinutes: 0,
							xp: 5,
							completed: false
						},
						{
							id: "w3-sat-psycho",
							label: "Psychotechnique — Test complet chronométré",
							type: "psycho",
							moment: "psychotechniques",
							detail: "30-45 min",
							estimatedMinutes: 40,
							xp: 20,
							completed: false
						}
					]
				},
				{
					name: "Dimanche",
					objective: "Récupération",
					title: "Repos utile",
					priority: "Recuperation",
					tasks: [
						{
							id: "w3-sun-mobility",
							label: "Repos / marche / mobilité",
							type: "custom",
							moment: "morning",
							detail: "Activité douce",
							estimatedMinutes: 30,
							xp: 10,
							completed: false
						},
						{
							id: "w3-sun-rest",
							label: "Repos — soir",
							type: "custom",
							moment: "evening",
							detail: "Complète récupération",
							estimatedMinutes: 0,
							xp: 5,
							completed: false
						},
						{
							id: "w3-sun-psycho",
							label: "Psychotechnique — Correction des erreurs",
							type: "psycho",
							moment: "psychotechniques",
							detail: "30-45 min",
							estimatedMinutes: 35,
							xp: 20,
							completed: false
						}
					]
				}
			]
		},
		{
			id: "week-4",
			label: "Semaine 4",
			days: [
				{
					name: "Lundi",
					objective: "Endurance + force",
					title: "Base solide",
					priority: "Normale",
					tasks: [
						{
							id: "w4-mon-swim",
							label: "Natation — 45 min",
							type: "swim",
							moment: "morning",
							detail: "Piscine + échauffement",
							estimatedMinutes: 45,
							xp: 35,
							completed: false
						},
						{
							id: "w4-mon-pull",
							label: "Tractions (Séries Droites RIR 1-2) — 5 × 5 reps",
							type: "pull",
							moment: "morning",
							detail: "5 séries droites • RIR 1-2 • Repos strict 90s • Test RIR sur dernière série",
							estimatedMinutes: 15,
							xp: 25,
							completed: false
						},
						{
							id: "w4-mon-chair",
							label: "Chaise Isométrique — 3 × 90 s",
							type: "chair",
							moment: "morning",
							detail: "Maintien statique à 90° • Repos 60s",
							estimatedMinutes: 10,
							xp: 15,
							completed: false
						},
						{
							id: "w4-mon-run",
							label: "Course en duo — footing 5 km",
							type: "run",
							moment: "evening",
							detail: "Allure confortable",
							estimatedMinutes: 40,
							xp: 50,
							completed: false
						},
						{
							id: "w4-mon-psycho",
							label: "Psychotechnique — Calcul mental",
							type: "psycho",
							moment: "psychotechniques",
							detail: "30-45 min",
							estimatedMinutes: 35,
							xp: 20,
							completed: false
						}
					]
				},
				{
					name: "Mardi",
					objective: "Régularité",
					title: "Rythme stable",
					priority: "Haute",
					tasks: [
						{
							id: "w4-tue-core",
							label: "Gainage — 15 min",
							type: "custom",
							moment: "afternoon",
							detail: "Stabilité du tronc",
							estimatedMinutes: 15,
							xp: 15,
							completed: false
						},
						{
							id: "w4-tue-run",
							label: "Course en duo — footing",
							type: "run",
							moment: "evening",
							detail: "Allure facile",
							estimatedMinutes: 35,
							xp: 50,
							completed: false
						},
						{
							id: "w4-tue-psycho",
							label: "Psychotechnique — Logique",
							type: "psycho",
							moment: "psychotechniques",
							detail: "30-45 min",
							estimatedMinutes: 35,
							xp: 20,
							completed: false
						}
					]
				},
				{
					name: "Mercredi",
					objective: "Volume",
					title: "Rythme fluide",
					priority: "Normale",
					tasks: [
						{
							id: "w4-wed-swim",
							label: "Natation — 45 min",
							type: "swim",
							moment: "morning",
							detail: "Échauffement + technique",
							estimatedMinutes: 45,
							xp: 35,
							completed: false
						},
						{
							id: "w4-wed-pull",
							label: "Tractions (Séries Droites RIR 1-2) — 5 × 5 reps",
							type: "pull",
							moment: "morning",
							detail: "5 séries droites • RIR 1-2 • Repos strict 90s • Test RIR sur dernière série",
							estimatedMinutes: 15,
							xp: 25,
							completed: false
						},
						{
							id: "w4-wed-chair",
							label: "Chaise Isométrique — 3 × 90 s",
							type: "chair",
							moment: "morning",
							detail: "Maintien statique à 90° • Repos 60s",
							estimatedMinutes: 10,
							xp: 15,
							completed: false
						},
						{
							id: "w4-wed-run",
							label: "Course en duo — footing facile",
							type: "run",
							moment: "evening",
							detail: "Allure douce",
							estimatedMinutes: 35,
							xp: 50,
							completed: false
						},
						{
							id: "w4-wed-psycho",
							label: "Psychotechnique — Mémoire",
							type: "psycho",
							moment: "psychotechniques",
							detail: "30-45 min",
							estimatedMinutes: 35,
							xp: 20,
							completed: false
						}
					]
				},
				{
					name: "Jeudi",
					objective: "Cardio + force",
					title: "Séance équilibrée",
					priority: "Haute",
					tasks: [
						{
							id: "w4-thu-pull",
							label: "Tractions (Pré-activation) — 4 × 3 reps",
							type: "pull",
							moment: "morning",
							detail: "Pré-activation sous-maximale sans échec (RIR 3-4)",
							estimatedMinutes: 12,
							xp: 20,
							completed: false
						},
						{
							id: "w4-thu-chair",
							label: "Chaise (Pré-activation) — 3 × 30 s",
							type: "chair",
							moment: "morning",
							detail: "Éveil statique léger sans échec",
							estimatedMinutes: 8,
							xp: 10,
							completed: false
						},
						{
							id: "w4-thu-fraction",
							label: "Fractionné spécifique — Luc Léger",
							type: "run",
							moment: "afternoon",
							detail: "Spécifique Luc Léger",
							estimatedMinutes: 30,
							xp: 50,
							completed: false
						},
						{
							id: "w4-thu-run",
							label: "Course en duo — tranquille",
							type: "run",
							moment: "evening",
							detail: "Récupération",
							estimatedMinutes: 30,
							xp: 50,
							completed: false
						},
						{
							id: "w4-thu-psycho",
							label: "Psychotechnique — Suites numériques",
							type: "psycho",
							moment: "psychotechniques",
							detail: "30-45 min",
							estimatedMinutes: 35,
							xp: 20,
							completed: false
						}
					]
				},
				{
					name: "Vendredi",
					objective: "Récupération active & Renforcement",
					title: "Séance 3 de la semaine",
					priority: "Normale",
					tasks: [
						{
							id: "w4-fri-swim",
							label: "Natation — 45 min",
							type: "swim",
							moment: "morning",
							detail: "Récupération active",
							estimatedMinutes: 45,
							xp: 35,
							completed: false
						},
						{
							id: "w4-fri-pull",
							label: "Tractions (Séries Droites RIR 1-2) — 5 × 5 reps",
							type: "pull",
							moment: "morning",
							detail: "5 séries droites • RIR 1-2 • Repos strict 90s • Test RIR sur dernière série",
							estimatedMinutes: 15,
							xp: 25,
							completed: false
						},
						{
							id: "w4-fri-chair",
							label: "Chaise Isométrique — 3 × 90 s",
							type: "chair",
							moment: "morning",
							detail: "Maintien statique à 90° • Repos 60s",
							estimatedMinutes: 10,
							xp: 15,
							completed: false
						},
						{
							id: "w4-fri-psycho",
							label: "Psychotechnique — Orientation spatiale",
							type: "psycho",
							moment: "psychotechniques",
							detail: "30-45 min",
							estimatedMinutes: 35,
							xp: 20,
							completed: false
						}
					]
				},
				{
					name: "Samedi",
					objective: "Endurance",
					title: "Sortie longue",
					priority: "Haute",
					tasks: [
						{
							id: "w4-sat-run",
							label: "Sortie longue — 8 km",
							type: "run",
							moment: "morning",
							detail: "Seul ou en duo",
							estimatedMinutes: 60,
							xp: 50,
							completed: false
						},
						{
							id: "w4-sat-core",
							label: "Gainage — 15 min",
							type: "custom",
							moment: "afternoon",
							detail: "Stabilité du tronc",
							estimatedMinutes: 15,
							xp: 15,
							completed: false
						},
						{
							id: "w4-sat-rest",
							label: "Repos — soir",
							type: "custom",
							moment: "evening",
							detail: "Récupération",
							estimatedMinutes: 0,
							xp: 5,
							completed: false
						},
						{
							id: "w4-sat-psycho",
							label: "Psychotechnique — Test complet chronométré",
							type: "psycho",
							moment: "psychotechniques",
							detail: "30-45 min",
							estimatedMinutes: 40,
							xp: 20,
							completed: false
						}
					]
				},
				{
					name: "Dimanche",
					objective: "Récupération",
					title: "Repos utile",
					priority: "Recuperation",
					tasks: [
						{
							id: "w4-sun-mobility",
							label: "Repos / marche / mobilité",
							type: "custom",
							moment: "morning",
							detail: "Activité douce",
							estimatedMinutes: 30,
							xp: 10,
							completed: false
						},
						{
							id: "w4-sun-rest",
							label: "Repos — soir",
							type: "custom",
							moment: "evening",
							detail: "Complète récupération",
							estimatedMinutes: 0,
							xp: 5,
							completed: false
						},
						{
							id: "w4-sun-psycho",
							label: "Psychotechnique — Correction des erreurs",
							type: "psycho",
							moment: "psychotechniques",
							detail: "30-45 min",
							estimatedMinutes: 35,
							xp: 20,
							completed: false
						}
					]
				}
			]
		},
		{
			id: "week-5",
			label: "Semaine 5",
			days: [
				{
					name: "Lundi",
					objective: "Endurance + force",
					title: "Base solide",
					priority: "Normale",
					tasks: [
						{
							id: "w5-mon-swim",
							label: "Natation — 45 min",
							type: "swim",
							moment: "morning",
							detail: "Piscine + échauffement",
							estimatedMinutes: 45,
							xp: 35,
							completed: false
						},
						{
							id: "w5-mon-pull",
							label: "Tractions (Séries Droites RIR 1-2) — 4 × 6 reps",
							type: "pull",
							moment: "morning",
							detail: "4 séries droites • RIR 1-2 • Repos strict 90s • Test RIR sur dernière série",
							estimatedMinutes: 15,
							xp: 25,
							completed: false
						},
						{
							id: "w5-mon-chair",
							label: "Chaise Isométrique — 3 × 105 s",
							type: "chair",
							moment: "morning",
							detail: "Maintien statique à 90° • Repos 60s",
							estimatedMinutes: 10,
							xp: 15,
							completed: false
						},
						{
							id: "w5-mon-run",
							label: "Course en duo — footing 5 km",
							type: "run",
							moment: "evening",
							detail: "Allure confortable",
							estimatedMinutes: 40,
							xp: 50,
							completed: false
						},
						{
							id: "w5-mon-psycho",
							label: "Psychotechnique — Calcul mental",
							type: "psycho",
							moment: "psychotechniques",
							detail: "30-45 min",
							estimatedMinutes: 35,
							xp: 20,
							completed: false
						}
					]
				},
				{
					name: "Mardi",
					objective: "Régularité",
					title: "Rythme stable",
					priority: "Haute",
					tasks: [
						{
							id: "w5-tue-core",
							label: "Gainage — 15 min",
							type: "custom",
							moment: "afternoon",
							detail: "Stabilité du tronc",
							estimatedMinutes: 15,
							xp: 15,
							completed: false
						},
						{
							id: "w5-tue-run",
							label: "Course en duo — footing",
							type: "run",
							moment: "evening",
							detail: "Allure facile",
							estimatedMinutes: 35,
							xp: 50,
							completed: false
						},
						{
							id: "w5-tue-psycho",
							label: "Psychotechnique — Logique",
							type: "psycho",
							moment: "psychotechniques",
							detail: "30-45 min",
							estimatedMinutes: 35,
							xp: 20,
							completed: false
						}
					]
				},
				{
					name: "Mercredi",
					objective: "Volume",
					title: "Rythme fluide",
					priority: "Normale",
					tasks: [
						{
							id: "w5-wed-swim",
							label: "Natation — 45 min",
							type: "swim",
							moment: "morning",
							detail: "Échauffement + technique",
							estimatedMinutes: 45,
							xp: 35,
							completed: false
						},
						{
							id: "w5-wed-pull",
							label: "Tractions (Séries Droites RIR 1-2) — 4 × 6 reps",
							type: "pull",
							moment: "morning",
							detail: "4 séries droites • RIR 1-2 • Repos strict 90s • Test RIR sur dernière série",
							estimatedMinutes: 15,
							xp: 25,
							completed: false
						},
						{
							id: "w5-wed-chair",
							label: "Chaise Isométrique — 3 × 105 s",
							type: "chair",
							moment: "morning",
							detail: "Maintien statique à 90° • Repos 60s",
							estimatedMinutes: 10,
							xp: 15,
							completed: false
						},
						{
							id: "w5-wed-run",
							label: "Course en duo — footing facile",
							type: "run",
							moment: "evening",
							detail: "Allure douce",
							estimatedMinutes: 35,
							xp: 50,
							completed: false
						},
						{
							id: "w5-wed-psycho",
							label: "Psychotechnique — Mémoire",
							type: "psycho",
							moment: "psychotechniques",
							detail: "30-45 min",
							estimatedMinutes: 35,
							xp: 20,
							completed: false
						}
					]
				},
				{
					name: "Jeudi",
					objective: "Cardio + force",
					title: "Séance équilibrée",
					priority: "Haute",
					tasks: [
						{
							id: "w5-thu-pull",
							label: "Tractions (Pré-activation) — 4 × 3 reps",
							type: "pull",
							moment: "morning",
							detail: "Pré-activation sous-maximale sans échec (RIR 3-4)",
							estimatedMinutes: 12,
							xp: 20,
							completed: false
						},
						{
							id: "w5-thu-chair",
							label: "Chaise (Pré-activation) — 3 × 30 s",
							type: "chair",
							moment: "morning",
							detail: "Éveil statique léger sans échec",
							estimatedMinutes: 8,
							xp: 10,
							completed: false
						},
						{
							id: "w5-thu-fraction",
							label: "Fractionné spécifique — Luc Léger",
							type: "run",
							moment: "afternoon",
							detail: "Spécifique Luc Léger",
							estimatedMinutes: 30,
							xp: 50,
							completed: false
						},
						{
							id: "w5-thu-run",
							label: "Course en duo — tranquille",
							type: "run",
							moment: "evening",
							detail: "Récupération",
							estimatedMinutes: 30,
							xp: 50,
							completed: false
						},
						{
							id: "w5-thu-psycho",
							label: "Psychotechnique — Suites numériques",
							type: "psycho",
							moment: "psychotechniques",
							detail: "30-45 min",
							estimatedMinutes: 35,
							xp: 20,
							completed: false
						}
					]
				},
				{
					name: "Vendredi",
					objective: "Récupération active & Renforcement",
					title: "Séance 3 de la semaine",
					priority: "Normale",
					tasks: [
						{
							id: "w5-fri-swim",
							label: "Natation — 45 min",
							type: "swim",
							moment: "morning",
							detail: "Récupération active",
							estimatedMinutes: 45,
							xp: 35,
							completed: false
						},
						{
							id: "w5-fri-pull",
							label: "Tractions (Séries Droites RIR 1-2) — 4 × 6 reps",
							type: "pull",
							moment: "morning",
							detail: "4 séries droites • RIR 1-2 • Repos strict 90s • Test RIR sur dernière série",
							estimatedMinutes: 15,
							xp: 25,
							completed: false
						},
						{
							id: "w5-fri-chair",
							label: "Chaise Isométrique — 3 × 105 s",
							type: "chair",
							moment: "morning",
							detail: "Maintien statique à 90° • Repos 60s",
							estimatedMinutes: 10,
							xp: 15,
							completed: false
						},
						{
							id: "w5-fri-psycho",
							label: "Psychotechnique — Orientation spatiale",
							type: "psycho",
							moment: "psychotechniques",
							detail: "30-45 min",
							estimatedMinutes: 35,
							xp: 20,
							completed: false
						}
					]
				},
				{
					name: "Samedi",
					objective: "Endurance",
					title: "Sortie longue",
					priority: "Haute",
					tasks: [
						{
							id: "w5-sat-run",
							label: "Sortie longue — 9 km",
							type: "run",
							moment: "morning",
							detail: "Seul ou en duo",
							estimatedMinutes: 65,
							xp: 50,
							completed: false
						},
						{
							id: "w5-sat-core",
							label: "Gainage — 15 min",
							type: "custom",
							moment: "afternoon",
							detail: "Stabilité du tronc",
							estimatedMinutes: 15,
							xp: 15,
							completed: false
						},
						{
							id: "w5-sat-rest",
							label: "Repos — soir",
							type: "custom",
							moment: "evening",
							detail: "Récupération",
							estimatedMinutes: 0,
							xp: 5,
							completed: false
						},
						{
							id: "w5-sat-psycho",
							label: "Psychotechnique — Test complet chronométré",
							type: "psycho",
							moment: "psychotechniques",
							detail: "30-45 min",
							estimatedMinutes: 40,
							xp: 20,
							completed: false
						}
					]
				},
				{
					name: "Dimanche",
					objective: "Récupération",
					title: "Repos utile",
					priority: "Recuperation",
					tasks: [
						{
							id: "w5-sun-mobility",
							label: "Repos / marche / mobilité",
							type: "custom",
							moment: "morning",
							detail: "Activité douce",
							estimatedMinutes: 30,
							xp: 10,
							completed: false
						},
						{
							id: "w5-sun-rest",
							label: "Repos — soir",
							type: "custom",
							moment: "evening",
							detail: "Complète récupération",
							estimatedMinutes: 0,
							xp: 5,
							completed: false
						},
						{
							id: "w5-sun-psycho",
							label: "Psychotechnique — Correction des erreurs",
							type: "psycho",
							moment: "psychotechniques",
							detail: "30-45 min",
							estimatedMinutes: 35,
							xp: 20,
							completed: false
						}
					]
				}
			]
		},
		{
			id: "week-6",
			label: "Semaine 6",
			days: [
				{
					name: "Lundi",
					objective: "Endurance + force",
					title: "Base solide",
					priority: "Normale",
					tasks: [
						{
							id: "w6-mon-swim",
							label: "Natation — 45 min",
							type: "swim",
							moment: "morning",
							detail: "Piscine + échauffement",
							estimatedMinutes: 45,
							xp: 35,
							completed: false
						},
						{
							id: "w6-mon-pull",
							label: "Tractions (Séries Droites RIR 1-2) — 5 × 6 reps",
							type: "pull",
							moment: "morning",
							detail: "5 séries droites • RIR 1-2 • Repos strict 90s • Test RIR sur dernière série",
							estimatedMinutes: 15,
							xp: 25,
							completed: false
						},
						{
							id: "w6-mon-chair",
							label: "Chaise Isométrique — 3 × 120 s",
							type: "chair",
							moment: "morning",
							detail: "Maintien statique à 90° • Repos 60s",
							estimatedMinutes: 10,
							xp: 15,
							completed: false
						},
						{
							id: "w6-mon-run",
							label: "Course en duo — footing 5 km",
							type: "run",
							moment: "evening",
							detail: "Allure confortable",
							estimatedMinutes: 40,
							xp: 50,
							completed: false
						},
						{
							id: "w6-mon-psycho",
							label: "Psychotechnique — Calcul mental",
							type: "psycho",
							moment: "psychotechniques",
							detail: "30-45 min",
							estimatedMinutes: 35,
							xp: 20,
							completed: false
						}
					]
				},
				{
					name: "Mardi",
					objective: "Régularité",
					title: "Rythme stable",
					priority: "Haute",
					tasks: [
						{
							id: "w6-tue-core",
							label: "Gainage — 15 min",
							type: "custom",
							moment: "afternoon",
							detail: "Stabilité du tronc",
							estimatedMinutes: 15,
							xp: 15,
							completed: false
						},
						{
							id: "w6-tue-run",
							label: "Course en duo — footing",
							type: "run",
							moment: "evening",
							detail: "Allure facile",
							estimatedMinutes: 35,
							xp: 50,
							completed: false
						},
						{
							id: "w6-tue-psycho",
							label: "Psychotechnique — Logique",
							type: "psycho",
							moment: "psychotechniques",
							detail: "30-45 min",
							estimatedMinutes: 35,
							xp: 20,
							completed: false
						}
					]
				},
				{
					name: "Mercredi",
					objective: "Volume",
					title: "Rythme fluide",
					priority: "Normale",
					tasks: [
						{
							id: "w6-wed-swim",
							label: "Natation — 45 min",
							type: "swim",
							moment: "morning",
							detail: "Échauffement + technique",
							estimatedMinutes: 45,
							xp: 35,
							completed: false
						},
						{
							id: "w6-wed-pull",
							label: "Tractions (Séries Droites RIR 1-2) — 5 × 6 reps",
							type: "pull",
							moment: "morning",
							detail: "5 séries droites • RIR 1-2 • Repos strict 90s • Test RIR sur dernière série",
							estimatedMinutes: 15,
							xp: 25,
							completed: false
						},
						{
							id: "w6-wed-chair",
							label: "Chaise Isométrique — 3 × 120 s",
							type: "chair",
							moment: "morning",
							detail: "Maintien statique à 90° • Repos 60s",
							estimatedMinutes: 10,
							xp: 15,
							completed: false
						},
						{
							id: "w6-wed-run",
							label: "Course en duo — footing facile",
							type: "run",
							moment: "evening",
							detail: "Allure douce",
							estimatedMinutes: 35,
							xp: 50,
							completed: false
						},
						{
							id: "w6-wed-psycho",
							label: "Psychotechnique — Mémoire",
							type: "psycho",
							moment: "psychotechniques",
							detail: "30-45 min",
							estimatedMinutes: 35,
							xp: 20,
							completed: false
						}
					]
				},
				{
					name: "Jeudi",
					objective: "Cardio + force",
					title: "Séance équilibrée",
					priority: "Haute",
					tasks: [
						{
							id: "w6-thu-pull",
							label: "Tractions (Pré-activation) — 4 × 3 reps",
							type: "pull",
							moment: "morning",
							detail: "Pré-activation sous-maximale sans échec (RIR 3-4)",
							estimatedMinutes: 12,
							xp: 20,
							completed: false
						},
						{
							id: "w6-thu-chair",
							label: "Chaise (Pré-activation) — 3 × 30 s",
							type: "chair",
							moment: "morning",
							detail: "Éveil statique léger sans échec",
							estimatedMinutes: 8,
							xp: 10,
							completed: false
						},
						{
							id: "w6-thu-fraction",
							label: "Fractionné spécifique — Luc Léger",
							type: "run",
							moment: "afternoon",
							detail: "Spécifique Luc Léger",
							estimatedMinutes: 30,
							xp: 50,
							completed: false
						},
						{
							id: "w6-thu-run",
							label: "Course en duo — tranquille",
							type: "run",
							moment: "evening",
							detail: "Récupération",
							estimatedMinutes: 30,
							xp: 50,
							completed: false
						},
						{
							id: "w6-thu-psycho",
							label: "Psychotechnique — Suites numériques",
							type: "psycho",
							moment: "psychotechniques",
							detail: "30-45 min",
							estimatedMinutes: 35,
							xp: 20,
							completed: false
						}
					]
				},
				{
					name: "Vendredi",
					objective: "Récupération active & Renforcement",
					title: "Séance 3 de la semaine",
					priority: "Normale",
					tasks: [
						{
							id: "w6-fri-swim",
							label: "Natation — 45 min",
							type: "swim",
							moment: "morning",
							detail: "Récupération active",
							estimatedMinutes: 45,
							xp: 35,
							completed: false
						},
						{
							id: "w6-fri-pull",
							label: "Tractions (Séries Droites RIR 1-2) — 5 × 6 reps",
							type: "pull",
							moment: "morning",
							detail: "5 séries droites • RIR 1-2 • Repos strict 90s • Test RIR sur dernière série",
							estimatedMinutes: 15,
							xp: 25,
							completed: false
						},
						{
							id: "w6-fri-chair",
							label: "Chaise Isométrique — 3 × 120 s",
							type: "chair",
							moment: "morning",
							detail: "Maintien statique à 90° • Repos 60s",
							estimatedMinutes: 10,
							xp: 15,
							completed: false
						},
						{
							id: "w6-fri-psycho",
							label: "Psychotechnique — Orientation spatiale",
							type: "psycho",
							moment: "psychotechniques",
							detail: "30-45 min",
							estimatedMinutes: 35,
							xp: 20,
							completed: false
						}
					]
				},
				{
					name: "Samedi",
					objective: "Endurance",
					title: "Sortie longue",
					priority: "Haute",
					tasks: [
						{
							id: "w6-sat-run",
							label: "Sortie longue — 10 km",
							type: "run",
							moment: "morning",
							detail: "Seul ou en duo",
							estimatedMinutes: 70,
							xp: 50,
							completed: false
						},
						{
							id: "w6-sat-core",
							label: "Gainage — 15 min",
							type: "custom",
							moment: "afternoon",
							detail: "Stabilité du tronc",
							estimatedMinutes: 15,
							xp: 15,
							completed: false
						},
						{
							id: "w6-sat-rest",
							label: "Repos — soir",
							type: "custom",
							moment: "evening",
							detail: "Récupération",
							estimatedMinutes: 0,
							xp: 5,
							completed: false
						},
						{
							id: "w6-sat-psycho",
							label: "Psychotechnique — Test complet chronométré",
							type: "psycho",
							moment: "psychotechniques",
							detail: "30-45 min",
							estimatedMinutes: 40,
							xp: 20,
							completed: false
						}
					]
				},
				{
					name: "Dimanche",
					objective: "Récupération",
					title: "Repos utile",
					priority: "Recuperation",
					tasks: [
						{
							id: "w6-sun-mobility",
							label: "Repos / marche / mobilité",
							type: "custom",
							moment: "morning",
							detail: "Activité douce",
							estimatedMinutes: 30,
							xp: 10,
							completed: false
						},
						{
							id: "w6-sun-rest",
							label: "Repos — soir",
							type: "custom",
							moment: "evening",
							detail: "Complète récupération",
							estimatedMinutes: 0,
							xp: 5,
							completed: false
						},
						{
							id: "w6-sun-psycho",
							label: "Psychotechnique — Correction des erreurs",
							type: "psycho",
							moment: "psychotechniques",
							detail: "30-45 min",
							estimatedMinutes: 35,
							xp: 20,
							completed: false
						}
					]
				}
			]
		},
		{
			id: "week-7",
			label: "Semaine 7",
			days: [
				{
					name: "Lundi",
					objective: "Endurance + force",
					title: "Base solide",
					priority: "Normale",
					tasks: [
						{
							id: "w7-mon-swim",
							label: "Natation — 45 min",
							type: "swim",
							moment: "morning",
							detail: "Piscine + échauffement",
							estimatedMinutes: 45,
							xp: 35,
							completed: false
						},
						{
							id: "w7-mon-pull",
							label: "Tractions (Séries Droites RIR 1-2) — 4 × 7 reps",
							type: "pull",
							moment: "morning",
							detail: "4 séries droites • RIR 1-2 • Repos strict 90s • Test RIR sur dernière série",
							estimatedMinutes: 15,
							xp: 25,
							completed: false
						},
						{
							id: "w7-mon-chair",
							label: "Chaise Isométrique — 3 × 135 s",
							type: "chair",
							moment: "morning",
							detail: "Maintien statique à 90° • Repos 60s",
							estimatedMinutes: 10,
							xp: 15,
							completed: false
						},
						{
							id: "w7-mon-run",
							label: "Course en duo — footing 5 km",
							type: "run",
							moment: "evening",
							detail: "Allure confortable",
							estimatedMinutes: 40,
							xp: 50,
							completed: false
						},
						{
							id: "w7-mon-psycho",
							label: "Psychotechnique — Calcul mental",
							type: "psycho",
							moment: "psychotechniques",
							detail: "30-45 min",
							estimatedMinutes: 35,
							xp: 20,
							completed: false
						}
					]
				},
				{
					name: "Mardi",
					objective: "Régularité",
					title: "Rythme stable",
					priority: "Haute",
					tasks: [
						{
							id: "w7-tue-core",
							label: "Gainage — 15 min",
							type: "custom",
							moment: "afternoon",
							detail: "Stabilité du tronc",
							estimatedMinutes: 15,
							xp: 15,
							completed: false
						},
						{
							id: "w7-tue-run",
							label: "Course en duo — footing",
							type: "run",
							moment: "evening",
							detail: "Allure facile",
							estimatedMinutes: 35,
							xp: 50,
							completed: false
						},
						{
							id: "w7-tue-psycho",
							label: "Psychotechnique — Logique",
							type: "psycho",
							moment: "psychotechniques",
							detail: "30-45 min",
							estimatedMinutes: 35,
							xp: 20,
							completed: false
						}
					]
				},
				{
					name: "Mercredi",
					objective: "Volume",
					title: "Rythme fluide",
					priority: "Normale",
					tasks: [
						{
							id: "w7-wed-swim",
							label: "Natation — 45 min",
							type: "swim",
							moment: "morning",
							detail: "Échauffement + technique",
							estimatedMinutes: 45,
							xp: 35,
							completed: false
						},
						{
							id: "w7-wed-pull",
							label: "Tractions (Séries Droites RIR 1-2) — 4 × 7 reps",
							type: "pull",
							moment: "morning",
							detail: "4 séries droites • RIR 1-2 • Repos strict 90s • Test RIR sur dernière série",
							estimatedMinutes: 15,
							xp: 25,
							completed: false
						},
						{
							id: "w7-wed-chair",
							label: "Chaise Isométrique — 3 × 135 s",
							type: "chair",
							moment: "morning",
							detail: "Maintien statique à 90° • Repos 60s",
							estimatedMinutes: 10,
							xp: 15,
							completed: false
						},
						{
							id: "w7-wed-run",
							label: "Course en duo — footing facile",
							type: "run",
							moment: "evening",
							detail: "Allure douce",
							estimatedMinutes: 35,
							xp: 50,
							completed: false
						},
						{
							id: "w7-wed-psycho",
							label: "Psychotechnique — Mémoire",
							type: "psycho",
							moment: "psychotechniques",
							detail: "30-45 min",
							estimatedMinutes: 35,
							xp: 20,
							completed: false
						}
					]
				},
				{
					name: "Jeudi",
					objective: "Cardio + force",
					title: "Séance équilibrée",
					priority: "Haute",
					tasks: [
						{
							id: "w7-thu-pull",
							label: "Tractions (Pré-activation) — 4 × 3 reps",
							type: "pull",
							moment: "morning",
							detail: "Pré-activation sous-maximale sans échec (RIR 3-4)",
							estimatedMinutes: 12,
							xp: 20,
							completed: false
						},
						{
							id: "w7-thu-chair",
							label: "Chaise (Pré-activation) — 3 × 30 s",
							type: "chair",
							moment: "morning",
							detail: "Éveil statique léger sans échec",
							estimatedMinutes: 8,
							xp: 10,
							completed: false
						},
						{
							id: "w7-thu-fraction",
							label: "Fractionné spécifique — Luc Léger",
							type: "run",
							moment: "afternoon",
							detail: "Spécifique Luc Léger",
							estimatedMinutes: 30,
							xp: 50,
							completed: false
						},
						{
							id: "w7-thu-run",
							label: "Course en duo — tranquille",
							type: "run",
							moment: "evening",
							detail: "Récupération",
							estimatedMinutes: 30,
							xp: 50,
							completed: false
						},
						{
							id: "w7-thu-psycho",
							label: "Psychotechnique — Suites numériques",
							type: "psycho",
							moment: "psychotechniques",
							detail: "30-45 min",
							estimatedMinutes: 35,
							xp: 20,
							completed: false
						}
					]
				},
				{
					name: "Vendredi",
					objective: "Récupération active & Renforcement",
					title: "Séance 3 de la semaine",
					priority: "Normale",
					tasks: [
						{
							id: "w7-fri-swim",
							label: "Natation — 45 min",
							type: "swim",
							moment: "morning",
							detail: "Récupération active",
							estimatedMinutes: 45,
							xp: 35,
							completed: false
						},
						{
							id: "w7-fri-pull",
							label: "Tractions (Séries Droites RIR 1-2) — 4 × 7 reps",
							type: "pull",
							moment: "morning",
							detail: "4 séries droites • RIR 1-2 • Repos strict 90s • Test RIR sur dernière série",
							estimatedMinutes: 15,
							xp: 25,
							completed: false
						},
						{
							id: "w7-fri-chair",
							label: "Chaise Isométrique — 3 × 135 s",
							type: "chair",
							moment: "morning",
							detail: "Maintien statique à 90° • Repos 60s",
							estimatedMinutes: 10,
							xp: 15,
							completed: false
						},
						{
							id: "w7-fri-psycho",
							label: "Psychotechnique — Orientation spatiale",
							type: "psycho",
							moment: "psychotechniques",
							detail: "30-45 min",
							estimatedMinutes: 35,
							xp: 20,
							completed: false
						}
					]
				},
				{
					name: "Samedi",
					objective: "Endurance",
					title: "Sortie longue",
					priority: "Haute",
					tasks: [
						{
							id: "w7-sat-run",
							label: "Sortie longue — 10 km rapide",
							type: "run",
							moment: "morning",
							detail: "Seul ou en duo",
							estimatedMinutes: 75,
							xp: 50,
							completed: false
						},
						{
							id: "w7-sat-core",
							label: "Gainage — 15 min",
							type: "custom",
							moment: "afternoon",
							detail: "Stabilité du tronc",
							estimatedMinutes: 15,
							xp: 15,
							completed: false
						},
						{
							id: "w7-sat-rest",
							label: "Repos — soir",
							type: "custom",
							moment: "evening",
							detail: "Récupération",
							estimatedMinutes: 0,
							xp: 5,
							completed: false
						},
						{
							id: "w7-sat-psycho",
							label: "Psychotechnique — Test complet chronométré",
							type: "psycho",
							moment: "psychotechniques",
							detail: "30-45 min",
							estimatedMinutes: 40,
							xp: 20,
							completed: false
						}
					]
				},
				{
					name: "Dimanche",
					objective: "Récupération",
					title: "Repos utile",
					priority: "Recuperation",
					tasks: [
						{
							id: "w7-sun-mobility",
							label: "Repos / marche / mobilité",
							type: "custom",
							moment: "morning",
							detail: "Activité douce",
							estimatedMinutes: 30,
							xp: 10,
							completed: false
						},
						{
							id: "w7-sun-rest",
							label: "Repos — soir",
							type: "custom",
							moment: "evening",
							detail: "Complète récupération",
							estimatedMinutes: 0,
							xp: 5,
							completed: false
						},
						{
							id: "w7-sun-psycho",
							label: "Psychotechnique — Correction des erreurs",
							type: "psycho",
							moment: "psychotechniques",
							detail: "30-45 min",
							estimatedMinutes: 35,
							xp: 20,
							completed: false
						}
					]
				}
			]
		},
		{
			id: "week-8",
			label: "Semaine 8 — Affûtage",
			days: [
				{
					name: "Lundi",
					objective: "Affûtage & Fraîcheur",
					title: "Volume réduit -40%",
					priority: "Normale",
					tasks: [
						{
							id: "w8-mon-swim",
							label: "Natation — 45 min",
							type: "swim",
							moment: "morning",
							detail: "Piscine + échauffement",
							estimatedMinutes: 45,
							xp: 35,
							completed: false
						},
						{
							id: "w8-mon-pull",
							label: "Tractions (Affûtage -50% vol) — 3 × 4 reps légères",
							type: "pull",
							moment: "morning",
							detail: "Volume réduit pour fraîcheur musculaire • RIR 3-4",
							estimatedMinutes: 10,
							xp: 20,
							completed: false
						},
						{
							id: "w8-mon-chair",
							label: "Chaise (Affûtage -50% vol) — 2 × 45 s max",
							type: "chair",
							moment: "morning",
							detail: "Maintien statique sous-maximal • Repos 60s",
							estimatedMinutes: 6,
							xp: 15,
							completed: false
						},
						{
							id: "w8-mon-run",
							label: "Course en duo — footing 5 km",
							type: "run",
							moment: "evening",
							detail: "Allure confortable",
							estimatedMinutes: 40,
							xp: 50,
							completed: false
						},
						{
							id: "w8-mon-psycho",
							label: "Psychotechnique — Calcul mental",
							type: "psycho",
							moment: "psychotechniques",
							detail: "30-45 min",
							estimatedMinutes: 35,
							xp: 20,
							completed: false
						}
					]
				},
				{
					name: "Mardi",
					objective: "Régularité",
					title: "Rythme léger",
					priority: "Haute",
					tasks: [
						{
							id: "w8-tue-core",
							label: "Gainage — 15 min",
							type: "custom",
							moment: "afternoon",
							detail: "Stabilité du tronc",
							estimatedMinutes: 15,
							xp: 15,
							completed: false
						},
						{
							id: "w8-tue-run",
							label: "Course en duo — footing",
							type: "run",
							moment: "evening",
							detail: "Allure facile",
							estimatedMinutes: 35,
							xp: 50,
							completed: false
						},
						{
							id: "w8-tue-psycho",
							label: "Psychotechnique — Logique",
							type: "psycho",
							moment: "psychotechniques",
							detail: "30-45 min",
							estimatedMinutes: 35,
							xp: 20,
							completed: false
						}
					]
				},
				{
					name: "Mercredi",
					objective: "Volume réduit",
					title: "Mobilité & Légèreté",
					priority: "Normale",
					tasks: [
						{
							id: "w8-wed-swim",
							label: "Natation — 45 min",
							type: "swim",
							moment: "morning",
							detail: "Échauffement + technique",
							estimatedMinutes: 45,
							xp: 35,
							completed: false
						},
						{
							id: "w8-wed-pull",
							label: "Tractions (Affûtage -50% vol) — 3 × 4 reps légères",
							type: "pull",
							moment: "morning",
							detail: "Volume réduit pour fraîcheur musculaire • RIR 3-4",
							estimatedMinutes: 10,
							xp: 20,
							completed: false
						},
						{
							id: "w8-wed-chair",
							label: "Chaise (Affûtage -50% vol) — 2 × 45 s max",
							type: "chair",
							moment: "morning",
							detail: "Maintien statique sous-maximal • Repos 60s",
							estimatedMinutes: 6,
							xp: 15,
							completed: false
						},
						{
							id: "w8-wed-run",
							label: "Course en duo — footing facile",
							type: "run",
							moment: "evening",
							detail: "Allure douce",
							estimatedMinutes: 35,
							xp: 50,
							completed: false
						},
						{
							id: "w8-wed-psycho",
							label: "Psychotechnique — Mémoire",
							type: "psycho",
							moment: "psychotechniques",
							detail: "30-45 min",
							estimatedMinutes: 35,
							xp: 20,
							completed: false
						}
					]
				},
				{
					name: "Jeudi",
					objective: "Cardio & Test Final",
					title: "Test Final Luc Léger",
					priority: "Haute",
					tasks: [
						{
							id: "w8-thu-fraction",
							label: "Fractionné spécifique — Test final Luc Léger",
							type: "run",
							moment: "afternoon",
							detail: "Test final Luc Léger",
							estimatedMinutes: 30,
							xp: 50,
							completed: false
						},
						{
							id: "w8-thu-run",
							label: "Course en duo — tranquille",
							type: "run",
							moment: "evening",
							detail: "Récupération",
							estimatedMinutes: 30,
							xp: 50,
							completed: false
						},
						{
							id: "w8-thu-psycho",
							label: "Psychotechnique — Suites numériques",
							type: "psycho",
							moment: "psychotechniques",
							detail: "30-45 min",
							estimatedMinutes: 35,
							xp: 20,
							completed: false
						}
					]
				},
				{
					name: "Vendredi",
					objective: "Récupération active & Affûtage",
					title: "Dernier rappel léger",
					priority: "Normale",
					tasks: [
						{
							id: "w8-fri-swim",
							label: "Natation — 45 min",
							type: "swim",
							moment: "morning",
							detail: "Récupération active",
							estimatedMinutes: 45,
							xp: 35,
							completed: false
						},
						{
							id: "w8-fri-pull",
							label: "Tractions (Affûtage -50% vol) — 3 × 4 reps légères",
							type: "pull",
							moment: "morning",
							detail: "Volume réduit pour fraîcheur musculaire • RIR 3-4",
							estimatedMinutes: 10,
							xp: 20,
							completed: false
						},
						{
							id: "w8-fri-chair",
							label: "Chaise (Affûtage -50% vol) — 2 × 45 s max",
							type: "chair",
							moment: "morning",
							detail: "Maintien statique sous-maximal • Repos 60s",
							estimatedMinutes: 6,
							xp: 15,
							completed: false
						},
						{
							id: "w8-fri-psycho",
							label: "Psychotechnique — Orientation spatiale",
							type: "psycho",
							moment: "psychotechniques",
							detail: "30-45 min",
							estimatedMinutes: 35,
							xp: 20,
							completed: false
						}
					]
				},
				{
					name: "Samedi",
					objective: "Endurance légère",
					title: "Sortie longue d'affûtage",
					priority: "Haute",
					tasks: [
						{
							id: "w8-sat-run",
							label: "Sortie longue — 6 km facile",
							type: "run",
							moment: "morning",
							detail: "Seul ou en duo",
							estimatedMinutes: 45,
							xp: 50,
							completed: false
						},
						{
							id: "w8-sat-core",
							label: "Gainage — 15 min",
							type: "custom",
							moment: "afternoon",
							detail: "Stabilité du tronc",
							estimatedMinutes: 15,
							xp: 15,
							completed: false
						},
						{
							id: "w8-sat-rest",
							label: "Repos — soir",
							type: "custom",
							moment: "evening",
							detail: "Récupération",
							estimatedMinutes: 0,
							xp: 5,
							completed: false
						},
						{
							id: "w8-sat-psycho",
							label: "Psychotechnique — Test complet chronométré",
							type: "psycho",
							moment: "psychotechniques",
							detail: "30-45 min",
							estimatedMinutes: 40,
							xp: 20,
							completed: false
						}
					]
				},
				{
					name: "Dimanche",
					objective: "Récupération finale",
					title: "Repos complet",
					priority: "Recuperation",
					tasks: [
						{
							id: "w8-sun-mobility",
							label: "Repos / marche / mobilité",
							type: "custom",
							moment: "morning",
							detail: "Activité douce",
							estimatedMinutes: 30,
							xp: 10,
							completed: false
						},
						{
							id: "w8-sun-rest",
							label: "Repos — soir",
							type: "custom",
							moment: "evening",
							detail: "Complète récupération",
							estimatedMinutes: 0,
							xp: 5,
							completed: false
						},
						{
							id: "w8-sun-psycho",
							label: "Psychotechnique — Correction des erreurs",
							type: "psycho",
							moment: "psychotechniques",
							detail: "30-45 min",
							estimatedMinutes: 35,
							xp: 20,
							completed: false
						}
					]
				}
			]
		}
	],
	tests: [{
		id: "luc-test",
		name: "Test Luc Léger",
		description: "Évaluation régulière du seuil anaérobie"
	}],
	tips: ["Hydrate-toi chaque jour", "Respecte le repos entre les blocs"]
};
var TRAINING_START = /* @__PURE__ */ new Date("2026-07-20T12:00:00");
var TRAINING_WEEKS = militarySeptemberProgram.weeks;
var KEY = "forge.state.v1";
var initial = {
	targetDate: DEFAULT_TARGET_DATE,
	userName: "Quentin",
	days: {},
	perf: [],
	badges: [],
	healthToken: "my-super-secret-token",
	updatedAt: (/* @__PURE__ */ new Date("2026-07-20T12:00:00")).toISOString()
};
var ForgeCtx = (0, import_react.createContext)(null);
function ForgeProvider({ children }) {
	const [state, setState] = (0, import_react.useState)(initial);
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	const setLocalState = (s) => {
		setState((prev) => {
			const next = typeof s === "function" ? s(prev) : s;
			const timestamp = next.updatedAt !== prev.updatedAt ? next.updatedAt : (/* @__PURE__ */ new Date()).toISOString();
			return {
				...next,
				updatedAt: timestamp
			};
		});
	};
	(0, import_react.useEffect)(() => {
		try {
			const raw = localStorage.getItem(KEY);
			if (raw) {
				const parsed = JSON.parse(raw);
				setState({
					...initial,
					...parsed,
					days: parsed.days && typeof parsed.days === "object" ? parsed.days : {},
					perf: Array.isArray(parsed.perf) ? parsed.perf : [],
					badges: Array.isArray(parsed.badges) ? parsed.badges : []
				});
			}
		} catch {}
		setHydrated(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!hydrated) return;
		try {
			localStorage.setItem(KEY, JSON.stringify(state));
		} catch {}
	}, [state, hydrated]);
	(0, import_react.useEffect)(() => {
		if (!hydrated) return;
		const token = state.healthToken || "my-super-secret-token";
		const pullState = async () => {
			try {
				const response = await fetch("/api/sync-state", { headers: { "X-Sync-Token": token } });
				if (!response.ok) {
					if (response.status === 404) await fetch("/api/sync-state", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							"X-Sync-Token": token
						},
						body: JSON.stringify(state)
					});
					return;
				}
				if (!(response.headers.get("content-type") || "").includes("application/json")) return;
				const serverState = await response.json();
				if (serverState && serverState.updatedAt) {
					const serverTime = new Date(serverState.updatedAt).getTime();
					const localTime = new Date(state.updatedAt || 0).getTime();
					if (serverTime > localTime) {
						setState({
							...initial,
							...serverState,
							days: serverState.days && typeof serverState.days === "object" ? serverState.days : {},
							perf: Array.isArray(serverState.perf) ? serverState.perf : [],
							badges: Array.isArray(serverState.badges) ? serverState.badges : []
						});
						import("../_libs/sonner.mjs").then((n) => n.n).then(({ toast }) => {
							toast.info("Données synchronisées", { description: "Votre progression a été mise à jour depuis le cloud." });
						});
					} else if (localTime > serverTime) await fetch("/api/sync-state", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							"X-Sync-Token": token
						},
						body: JSON.stringify(state)
					});
				}
			} catch (e) {
				console.error("Cloud sync pull failed:", e);
			}
		};
		pullState();
	}, [hydrated, state.healthToken]);
	(0, import_react.useEffect)(() => {
		if (!hydrated) return;
		const token = state.healthToken || "my-super-secret-token";
		const pushState = async () => {
			try {
				await fetch("/api/sync-state", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"X-Sync-Token": token
					},
					body: JSON.stringify(state)
				});
			} catch (e) {
				console.error("Cloud sync push failed:", e);
			}
		};
		const timeout = setTimeout(pushState, 1500);
		return () => clearTimeout(timeout);
	}, [state, hydrated]);
	(0, import_react.useEffect)(() => {
		if (!hydrated) return;
		const token = state.healthToken || "my-super-secret-token";
		const runSync = async () => {
			try {
				const response = await fetch("/api/sync-health", { headers: { "X-Health-Token": token } });
				if (!response.ok) return;
				if (!(response.headers.get("content-type") || "").includes("application/json")) return;
				const syncItems = await response.json();
				if (!Array.isArray(syncItems) || syncItems.length === 0) return;
				setState((prev) => {
					let updatedState = { ...prev };
					let updatedCount = 0;
					for (const item of syncItems) {
						const date = normalizeDateISO(item.date);
						const currentToday = todayISO();
						const day = updatedState.days[date] ?? { checked: {} };
						const steps = item.health?.steps ?? item.steps ?? item.stepCount ?? day.health?.steps;
						const normalizedWorkoutsList = normalizeWorkouts(item.workouts ?? item.health?.workouts ?? day.health?.workouts ?? []);
						const mergedWorkouts = normalizedWorkoutsList.length > 0 ? normalizedWorkoutsList : day.health?.workouts ?? [];
						let activeCalories = item.health?.activeCalories ?? item.activeCalories ?? item.calories ?? item.moveCalories ?? day.health?.activeCalories;
						if ((activeCalories == null || isNaN(Number(activeCalories))) && mergedWorkouts.length > 0) {
							const sumCal = mergedWorkouts.reduce((acc, w) => acc + (w.calories || 0), 0);
							if (sumCal > 0) activeCalories = sumCal;
						}
						let avgHeartRate = item.health?.avgHeartRate ?? item.avgHeartRate ?? item.heartRate ?? item.averageHeartRate ?? item.meanHeartRate ?? day.health?.avgHeartRate;
						if ((avgHeartRate == null || isNaN(Number(avgHeartRate))) && mergedWorkouts.length > 0) {
							const hrs = mergedWorkouts.map((w) => w.avgHeartRate).filter((hr) => typeof hr === "number" && hr > 0);
							if (hrs.length > 0) avgHeartRate = Math.round(hrs.reduce((a, b) => a + b, 0) / hrs.length);
						}
						const health = {
							...day.health,
							steps: steps != null ? Number(steps) : void 0,
							avgHeartRate: avgHeartRate != null ? Number(avgHeartRate) : void 0,
							activeCalories: activeCalories != null ? Number(activeCalories) : void 0,
							workouts: mergedWorkouts
						};
						const checked = { ...day.checked };
						const tasks = tasksForDate(date);
						const hasSwimming = health.workouts?.some((w) => String(w.type).toLowerCase().includes("natat") || String(w.type).toLowerCase().includes("swim"));
						const hasRunning = health.workouts?.some((w) => String(w.type).toLowerCase().includes("cours") || String(w.type).toLowerCase().includes("run"));
						for (const task of tasks) {
							if (task.type === "swim" && hasSwimming && !checked[task.id]) checked[task.id] = true;
							if (task.type === "run" && hasRunning && !checked[task.id]) checked[task.id] = true;
						}
						const todayDay = updatedState.days[currentToday] ?? { checked: {} };
						updatedState.days = {
							...updatedState.days,
							[date]: {
								...day,
								checked,
								health
							},
							[currentToday]: {
								...todayDay,
								health: {
									...todayDay.health,
									...health
								}
							}
						};
						updatedCount++;
					}
					if (updatedCount > 0) {
						updatedState = {
							...updatedState,
							updatedAt: (/* @__PURE__ */ new Date()).toISOString()
						};
						try {
							localStorage.setItem(KEY, JSON.stringify(updatedState));
						} catch (e) {}
						fetch("/api/sync-state", {
							method: "POST",
							headers: {
								"Content-Type": "application/json",
								"X-Sync-Token": token
							},
							body: JSON.stringify(updatedState)
						}).catch(() => {});
						import("../_libs/sonner.mjs").then((n) => n.n).then(({ toast }) => {
							toast.success("Synchronisation Santé réussie", { description: `${updatedCount} jour(s) synchronisé(s) depuis Raccourcis iOS.` });
						});
					}
					return updatedState;
				});
				await fetch("/api/sync-health", {
					method: "DELETE",
					headers: { "X-Health-Token": token }
				});
			} catch (error) {
				console.error("Health sync error:", error);
			}
		};
		runSync();
		const interval = setInterval(runSync, 4e3);
		window.addEventListener("focus", runSync);
		window.addEventListener("visibilitychange", runSync);
		return () => {
			clearInterval(interval);
			window.removeEventListener("focus", runSync);
			window.removeEventListener("visibilitychange", runSync);
		};
	}, [hydrated, state.healthToken]);
	const value = (0, import_react.useMemo)(() => ({
		state,
		setState: setLocalState,
		hydrated,
		toggleTask: (date, taskId) => setLocalState((prev) => {
			const day = prev.days[date] ?? { checked: {} };
			const checked = {
				...day.checked,
				[taskId]: !day.checked[taskId]
			};
			const completed = tasksForDate(date).every((task) => checked[task.id]);
			const newBadges = new Set(prev.badges);
			if (Object.values(checked).some(Boolean)) newBadges.add("first");
			return {
				...prev,
				activeSession: completed && prev.activeSession?.date === date ? void 0 : prev.activeSession,
				days: {
					...prev.days,
					[date]: {
						...day,
						checked,
						session: {
							...day.session,
							completedAt: completed ? (/* @__PURE__ */ new Date()).toISOString() : void 0
						}
					}
				},
				badges: [...newBadges]
			};
		}),
		startSession: (date) => setLocalState((prev) => {
			const day = prev.days[date] ?? { checked: {} };
			const startedAt = day.session?.startedAt ?? (/* @__PURE__ */ new Date()).toISOString();
			return {
				...prev,
				activeSession: {
					date,
					startedAt
				},
				days: {
					...prev.days,
					[date]: {
						...day,
						session: {
							...day.session,
							startedAt
						}
					}
				}
			};
		}),
		finishSession: (date) => setLocalState((prev) => {
			const day = prev.days[date] ?? { checked: {} };
			const completedAt = (/* @__PURE__ */ new Date()).toISOString();
			return {
				...prev,
				activeSession: prev.activeSession?.date === date ? void 0 : prev.activeSession,
				days: {
					...prev.days,
					[date]: {
						...day,
						session: {
							...day.session,
							completedAt
						}
					}
				}
			};
		}),
		setJournal: (date, journal) => setLocalState((prev) => {
			const day = prev.days[date] ?? { checked: {} };
			return {
				...prev,
				days: {
					...prev.days,
					[date]: {
						...day,
						journal: {
							...day.journal,
							...journal
						}
					}
				}
			};
		}),
		setPsycho: (date, psycho) => setLocalState((prev) => {
			const day = prev.days[date] ?? { checked: {} };
			return {
				...prev,
				days: {
					...prev.days,
					[date]: {
						...day,
						psycho: {
							...day.psycho,
							...psycho
						}
					}
				}
			};
		}),
		setHealth: (date, health) => setLocalState((prev) => {
			const day = prev.days[date] ?? { checked: {} };
			return {
				...prev,
				days: {
					...prev.days,
					[date]: {
						...day,
						health: {
							...day.health,
							...health
						}
					}
				}
			};
		}),
		setMomentSwap: (date, moment, activityId) => setLocalState((prev) => {
			const day = prev.days[date] ?? { checked: {} };
			const swaps = { ...day.swaps };
			if (activityId) swaps[moment] = activityId;
			else delete swaps[moment];
			return {
				...prev,
				days: {
					...prev.days,
					[date]: {
						...day,
						swaps
					}
				}
			};
		}),
		setTaskSwap: (date, taskId, activityId) => setLocalState((prev) => {
			const day = prev.days[date] ?? { checked: {} };
			const swaps = { ...day.swaps };
			if (activityId) swaps[taskId] = activityId;
			else delete swaps[taskId];
			return {
				...prev,
				days: {
					...prev.days,
					[date]: {
						...day,
						swaps
					}
				}
			};
		}),
		setTaskRealization: (date, taskId, realization) => setLocalState((prev) => {
			const day = prev.days[date] ?? { checked: {} };
			const taskRealizations = {
				...day.taskRealizations,
				[taskId]: realization
			};
			const checked = {
				...day.checked,
				[taskId]: true
			};
			return {
				...prev,
				days: {
					...prev.days,
					[date]: {
						...day,
						checked,
						taskRealizations
					}
				}
			};
		}),
		addPerf: (entry) => setLocalState((prev) => {
			const withEntry = [...prev.perf, {
				...entry,
				id: crypto.randomUUID()
			}];
			const badges = new Set(prev.badges);
			if (entry.type === "pull" && entry.value >= 10) badges.add("pull10");
			if (entry.type === "pull" && entry.value >= 15) badges.add("pull15");
			if (entry.type === "pull" && entry.value >= 17) badges.add("goalPull");
			if (entry.type === "chair" && entry.value >= 168) badges.add("goalChair");
			if (entry.type === "run10") badges.add("run10");
			if (entry.type === "luc" && entry.value >= 12) badges.add("goalLuc");
			return {
				...prev,
				perf: withEntry,
				badges: [...badges]
			};
		}),
		removePerf: (id) => setLocalState((prev) => ({
			...prev,
			perf: prev.perf.filter((p) => p.id !== id)
		})),
		reset: () => setLocalState(initial)
	}), [state, hydrated]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ForgeCtx.Provider, {
		value,
		children
	});
}
function useForge() {
	const c = (0, import_react.useContext)(ForgeCtx);
	if (!c) throw new Error("useForge must be inside ForgeProvider");
	return c;
}
function toISO(d) {
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function todayISO() {
	return toISO(/* @__PURE__ */ new Date());
}
function normalizeDateISO(inputDate) {
	if (!inputDate) return todayISO();
	const str = String(inputDate).trim();
	if (/^\d{4}-\d{2}-\d{2}/.test(str)) return str.slice(0, 10);
	const frMatch = str.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);
	if (frMatch) {
		const day = frMatch[1].padStart(2, "0");
		const month = frMatch[2].padStart(2, "0");
		return `${frMatch[3]}-${month}-${day}`;
	}
	const d = new Date(str);
	if (!isNaN(d.getTime())) return toISO(d);
	return todayISO();
}
function normalizeWorkouts(rawWorkouts) {
	if (!rawWorkouts) return [];
	const workoutList = [];
	const addParsedItem = (item) => {
		if (typeof item === "string") {
			const matches = item.match(/\{[^{}]*\}/g);
			if (matches && matches.length > 0) {
				for (const m of matches) try {
					workoutList.push(JSON.parse(m));
				} catch (e) {
					workoutList.push({ type: m });
				}
				return;
			}
			try {
				workoutList.push(JSON.parse(item));
			} catch (e) {
				workoutList.push({ type: item });
			}
		} else if (Array.isArray(item)) for (const sub of item) addParsedItem(sub);
		else if (item && typeof item === "object") workoutList.push(item);
	};
	addParsedItem(rawWorkouts);
	const results = [];
	for (const w of workoutList) {
		if (!w || typeof w !== "object") continue;
		let calories = void 0;
		const rawActiveCal = String(w.activeCalories ?? w.calories ?? w.activeEnergyBurned ?? w.activeEnergy ?? w.energyBurned ?? w.totalEnergyBurned ?? w.workoutCalories ?? w.totalCalories ?? w.active_calories ?? w.active_energy_burned ?? "");
		if (rawActiveCal) {
			const numMatch = rawActiveCal.replace(",", ".").match(/(\d+(?:\.\d+)?)/);
			if (numMatch) {
				const val = Math.round(parseFloat(numMatch[1]));
				if (val > 0) calories = val;
			}
		}
		let avgHeartRate = void 0;
		const rawHR = String(w.avgHeartRate ?? w.heartRate ?? w.averageHeartRate ?? w.meanHeartRate ?? w.bpm ?? w.heartRateAvg ?? w.avg_heart_rate ?? w.heart_rate ?? w.HKQuantityTypeIdentifierHeartRate ?? "");
		if (rawHR) {
			const numMatch = rawHR.replace(",", ".").match(/(\d+(?:\.\d+)?)/);
			if (numMatch) {
				const val = Math.round(parseFloat(numMatch[1]));
				if (val > 0 && val < 250) avgHeartRate = val;
			}
		}
		if (!avgHeartRate) {
			const samples = w.heartRateSamples || w.heartRates || w.samples || w.heart_rate_samples;
			if (Array.isArray(samples)) {
				const arr = samples.map((s) => typeof s === "number" ? s : Number(s?.value ?? s?.bpm ?? s?.quantity ?? 0)).filter((n) => typeof n === "number" && n > 40 && n < 220);
				if (arr.length > 0) avgHeartRate = Math.round(arr.reduce((a, b) => a + b, 0) / arr.length);
			}
		}
		let rawType = String(w.type ?? w.activityType ?? w.workoutActivityType ?? w.name ?? w.workoutType ?? w.title ?? "").trim();
		if (rawType.startsWith("{")) try {
			const parsedType = JSON.parse(rawType);
			if (parsedType && typeof parsedType === "object") {
				if (parsedType.activeCalories && !calories) {
					const numMatch = String(parsedType.activeCalories).replace(",", ".").match(/(\d+(?:\.\d+)?)/);
					if (numMatch) calories = Math.round(parseFloat(numMatch[1]));
				}
				if (parsedType.avgHeartRate && !avgHeartRate) {
					const numMatch = String(parsedType.avgHeartRate).replace(",", ".").match(/(\d+(?:\.\d+)?)/);
					if (numMatch) avgHeartRate = Math.round(parseFloat(numMatch[1]));
				}
				rawType = String(parsedType.type ?? parsedType.name ?? "");
			}
		} catch (e) {}
		if (rawType.includes("kcal")) {
			const kcalMatch = rawType.replace(",", ".").match(/(\d+(?:\.\d+)?)\s*kcal/i);
			if (kcalMatch && !calories) {
				const val = Math.round(parseFloat(kcalMatch[1]));
				if (val > 0) calories = val;
			}
			rawType = "";
		}
		let type = "Natation";
		const lowerType = rawType.toLowerCase();
		if (lowerType.includes("swim") || lowerType.includes("natat") || lowerType.includes("nage") || lowerType.includes("hkworkoutactivitytypeswimming")) type = "Natation";
		else if (lowerType.includes("run") || lowerType.includes("cours") || lowerType.includes("footing") || lowerType.includes("hkworkoutactivitytyperunning")) type = "Course";
		else if (lowerType.includes("walk") || lowerType.includes("march") || lowerType.includes("hkworkoutactivitytypewalking")) type = "Marche";
		else if (lowerType.includes("cycle") || lowerType.includes("velo") || lowerType.includes("bike") || lowerType.includes("hkworkoutactivitytypecycling")) type = "Cyclisme";
		else if (rawType && !rawType.includes("{") && !rawType.includes("kcal")) type = rawType;
		let durationMinutes = void 0;
		const rawDur = Number(w.durationMinutes ?? w.duration ?? w.durationInMinutes ?? w.elapsedTime ?? w.totalDuration ?? 0);
		if (w.durationSec != null && Number(w.durationSec) > 0) durationMinutes = Math.round(Number(w.durationSec) / 60);
		else if (rawDur > 0) durationMinutes = rawDur > 300 ? Math.round(rawDur / 60) : rawDur;
		let distanceKm = void 0;
		let distanceMeters = void 0;
		const parseDistNum = (val) => {
			if (val == null) return void 0;
			const str = String(val).trim().replace(",", ".");
			if (str.includes("kcal")) return void 0;
			const match = str.match(/(\d+(?:\.\d+)?)/);
			if (!match) return void 0;
			const num = parseFloat(match[1]);
			return num > 0 ? num : void 0;
		};
		const dMeters = parseDistNum(w.distanceMeters ?? w.distanceInMeters ?? w.swimmingDistance ?? w.swimmingDistanceMeters ?? w.distanceSwimming ?? w.distanceSwimmingMeters ?? w.HKQuantityTypeIdentifierDistanceSwimming ?? w.HKQuantityTypeIdentifierDistanceSwimmingMeters ?? w.distanceWalkingRunningMeters);
		const dKm = parseDistNum(w.distanceKm ?? w.distanceInKm ?? w.swimmingDistanceKm ?? w.distanceSwimmingKm ?? w.distanceWalkingRunning);
		const dGen = parseDistNum(w.distance ?? w.totalDistance);
		if (dMeters) {
			distanceMeters = dMeters;
			distanceKm = Number((dMeters / 1e3).toFixed(2));
		} else if (dKm) {
			distanceKm = dKm;
			distanceMeters = Math.round(dKm * 1e3);
		} else if (dGen) if (dGen > 50) {
			distanceMeters = dGen;
			distanceKm = Number((dGen / 1e3).toFixed(2));
		} else {
			distanceKm = dGen;
			distanceMeters = Math.round(dGen * 1e3);
		}
		if (!calories) {
			if (type === "Natation") {
				if (distanceMeters && distanceMeters > 0) calories = Math.round(distanceMeters * .25);
				else if (durationMinutes && durationMinutes > 0) calories = Math.round(durationMinutes * 6);
			} else if (type === "Course") {
				if (distanceKm && distanceKm > 0) calories = Math.round(distanceKm * 65);
				else if (durationMinutes && durationMinutes > 0) calories = Math.round(durationMinutes * 10);
			} else if (type === "Marche") {
				if (distanceKm && distanceKm > 0) calories = Math.round(distanceKm * 45);
				else if (durationMinutes && durationMinutes > 0) calories = Math.round(durationMinutes * 4.5);
			} else if (durationMinutes && durationMinutes > 0) calories = Math.round(durationMinutes * 5);
		}
		if (!type) continue;
		results.push({
			type,
			durationMinutes: durationMinutes && durationMinutes > 0 ? durationMinutes : void 0,
			distanceKm,
			distanceMeters,
			calories,
			avgHeartRate
		});
	}
	return results;
}
function dowMon(d) {
	const dow = d.getDay();
	return dow === 0 ? 7 : dow;
}
function tasksForDate(dateISO) {
	const date = /* @__PURE__ */ new Date(`${dateISO}T12:00:00`);
	const dayIndex = (date.getDay() + 6) % 7;
	const diffDays = Math.floor((date.getTime() - TRAINING_START.getTime()) / 864e5);
	const week = TRAINING_WEEKS[Math.max(0, Math.min(TRAINING_WEEKS.length - 1, Math.floor(diffDays / 7)))] ?? TRAINING_WEEKS[0];
	if (!week || !week.days) return [];
	const definition = week.days[dayIndex] ?? week.days[0];
	if (!definition) return [];
	return ((definition.tasks ?? []).length ? definition.tasks ?? [] : (definition.sessions ?? []).flatMap((session) => session?.exercises ?? [])).map((t, idx) => ({
		...t,
		type: t.type,
		estimatedMinutes: t.estimatedMinutes ?? 10,
		xp: t.xp ?? 10
	}));
}
function daysUntil(targetISO) {
	const now = /* @__PURE__ */ new Date();
	now.setHours(0, 0, 0, 0);
	const t = /* @__PURE__ */ new Date(targetISO + "T00:00:00");
	return Math.max(0, Math.round((t.getTime() - now.getTime()) / 864e5));
}
function xpForDate(state, dateISO) {
	const day = state.days[dateISO];
	if (!day) return 0;
	return tasksForDate(dateISO).reduce((sum, t) => sum + (day.checked[t.id] ? t.xp : 0), 0);
}
function totalXP(state) {
	return Object.keys(state.days).reduce((sum, d) => sum + xpForDate(state, d), 0);
}
function computeStreak(state) {
	let streak = 0;
	const now = /* @__PURE__ */ new Date();
	for (let i = 0; i < 365; i++) {
		const d = new Date(now);
		d.setDate(now.getDate() - i);
		const iso = toISO(d);
		const day = state.days[iso];
		if (day && Object.values(day.checked).some(Boolean)) streak++;
		else if (i > 0) break;
		else break;
	}
	streak = 0;
	for (let i = 0; i < 365; i++) {
		const d = new Date(now);
		d.setDate(now.getDate() - i);
		const iso = toISO(d);
		const day = state.days[iso];
		if (day && Object.values(day.checked).some(Boolean)) streak++;
		else break;
	}
	return streak;
}
function unlockBadges(state) {
	const b = new Set(state.badges);
	const streak = computeStreak(state);
	if (streak >= 7) b.add("streak7");
	if (streak >= 30) b.add("streak30");
	if (state.perf.filter((p) => p.type === "run5" || p.type === "run10").reduce((s, p) => s + p.value, 0) >= 100) b.add("run100");
	return [...b];
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function cleanTaskDetail(detail) {
	if (!detail) return "";
	return detail.replace(/\s*•\s*Repos\s*(strict)?\s*(:\s*)?\d+s?/gi, "").replace(/\s*•\s*Repos\s*(strict)?\s*/gi, "").replace(/Repos\s*strict\s*(:\s*)?\d+s?/gi, "").replace(/Repos\s*(:\s*)?\d+s?/gi, "").trim();
}
var NAV = [
	{
		to: "/",
		label: "Dashboard",
		icon: LayoutDashboard,
		primary: true
	},
	{
		to: "/programme",
		label: "Programme",
		icon: CalendarDays,
		primary: true
	},
	{
		to: "/catalogue",
		label: "Catalogue",
		icon: Dumbbell,
		primary: true
	},
	{
		to: "/performances",
		label: "Performances",
		icon: Trophy,
		primary: true
	},
	{
		to: "/progression",
		label: "Progression",
		icon: TrendingUp,
		primary: true
	},
	{
		to: "/journal",
		label: "Journal",
		icon: BookOpen,
		primary: true
	},
	{
		to: "/parametres",
		label: "Paramètres",
		icon: Settings,
		primary: true
	},
	{
		to: "/psychotechniques",
		label: "Psychotechniques",
		icon: Brain,
		primary: false
	}
];
function AppShell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const { state, hydrated } = useForge();
	const streak = hydrated ? computeStreak(state) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen w-full bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "hidden shrink-0 flex-col border-r border-border bg-card/50 backdrop-blur md:flex md:w-60 lg:w-64",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 px-6 py-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-8 w-8 place-items-center rounded-lg bg-primary/15",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "h-4 w-4 text-primary" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-semibold tracking-wide",
							children: "FORGE"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[11px] text-muted-foreground",
							children: "Construis-toi."
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "flex-1 space-y-1 px-3",
						children: NAV.map((item) => {
							const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								className: cn("flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors", active ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "h-4 w-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate",
									children: item.label
								})]
							}, item.to);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-border bg-background/40 px-4 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[11px] uppercase tracking-wider text-muted-foreground",
								children: "Streak"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 flex items-baseline gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-2xl font-semibold text-primary",
									children: streak
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground",
									children: "jours"
								})]
							})]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "min-w-0 flex-1 pb-20 md:pb-0",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur md:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-7",
					children: NAV.filter((item) => item.primary).map((item) => {
						const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							className: cn("flex flex-col items-center justify-center gap-1 py-2 text-[10px] transition-colors", active ? "text-primary font-semibold" : "text-muted-foreground"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "max-w-[50px] truncate text-[9px]",
								children: item.label
							})]
						}, item.to);
					})
				})
			})
		]
	});
}
function PageHeader({ title, subtitle, right }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 px-4 pb-4 pt-6 md:px-8 md:pb-6 md:pt-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "truncate text-2xl font-semibold tracking-tight md:text-3xl",
				children: title
			}), subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: subtitle
			})]
		}), right && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "shrink-0",
			children: right
		})]
	});
}
//#endregion
export { cleanTaskDetail as a, daysUntil as c, normalizeWorkouts as d, toISO as f, useForge as g, unlockBadges as h, PageHeader as i, dowMon as l, totalXP as m, BADGES as n, cn as o, todayISO as p, ForgeProvider as r, computeStreak as s, AppShell as t, militarySeptemberProgram as u };
