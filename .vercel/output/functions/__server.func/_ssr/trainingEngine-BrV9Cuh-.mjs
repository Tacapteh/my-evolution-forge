import { f as toISO, u as militarySeptemberProgram } from "./AppShell-yhw2ilih.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/trainingEngine-BrV9Cuh-.js
/**
* Extrait l'objet UserStats à partir de l'état global ForgeState (state.perf)
*/
function getUserStatsFromState(state) {
	const perfs = state?.perf ?? [];
	const getMax = (type, fallback) => {
		const list = perfs.filter((p) => p.type === type).map((p) => p.value);
		return list.length > 0 ? Math.max(...list) : fallback;
	};
	return {
		maxPullups: getMax("pull", 10),
		maxPushups: getMax("push_military", 25),
		maxWallSitSeconds: getMax("chair", 60),
		maxPlankSeconds: getMax("commando", 90),
		vma: getMax("vma", +(getMax("luc", 7) * 1.5 + 4).toFixed(1))
	};
}
/**
* Calcul dynamique des répétitions pour exercices dynamiques (Pompes, Tractions, Squats)
* Formula: Math.round(userMax * intensityPercentage)
*/
function calculateDynamicReps(userMax, intensityPercentage, minReps = 1) {
	return Math.max(minReps, Math.round(Math.max(1, userMax) * intensityPercentage));
}
/**
* Calcul dynamique du temps de maintien pour exercices isométriques (Chaise, Planche, Iso 90°)
* Formula: Math.round(userMaxSeconds * intensityPercentage)
*/
function calculateIsometricDuration(userMaxSeconds, intensityPercentage, minSeconds = 15) {
	return Math.max(minSeconds, Math.round(Math.max(15, userMaxSeconds) * intensityPercentage));
}
/**
* Générateur principal de programme hebdomadaire militaire structuré
* basé sur les MAXI utilisateurs.
*/
function generateWeeklyProgram(userStats) {
	const { maxPullups = 10, maxPushups = 25, maxWallSitSeconds = 60, maxPlankSeconds = 90, vma = 14 } = userStats;
	const pullupVolumeReps = calculateDynamicReps(maxPullups, .75);
	const pullupLSitReps = calculateDynamicReps(maxPullups, .5);
	const pullupIsoSeconds = calculateIsometricDuration(Math.min(maxPlankSeconds, maxPullups * 4), .6);
	const pullupNegReps = calculateDynamicReps(maxPullups, .6);
	const pushupsHeavyReps = calculateDynamicReps(maxPushups, .75);
	const pushupsDeclinedReps = calculateDynamicReps(maxPushups, .7);
	const pushupsTricepsReps = calculateDynamicReps(maxPushups, .6);
	const pushupsDiamondPreActivationReps = calculateDynamicReps(maxPushups, .4);
	const wallSitDuration = calculateIsometricDuration(maxWallSitSeconds, .65);
	const commandoDuration = calculateIsometricDuration(maxPlankSeconds, .6);
	const plankDuration = calculateIsometricDuration(maxPlankSeconds, .65);
	const circuitPushReps = calculateDynamicReps(maxPushups, .6);
	const circuitWallSitDur = calculateIsometricDuration(maxWallSitSeconds, .5);
	const circuitCommandoDur = calculateIsometricDuration(maxPlankSeconds, .5);
	const lucPalierEst = Math.min(12, Math.max(5, Math.round((vma - 4) / 1.5)));
	const schedule = [
		{
			dayName: "Lundi",
			focus: "Natation, Tirage Lourd & Core Dynamique",
			sessions: [
				{
					moment: "MATIN",
					title: "Session Aquatique Continu",
					exercises: [{
						id: "swim-1000m",
						name: "Natation — 1000m Continu & Éducatifs",
						category: "swim",
						type: "cardio",
						sets: 1,
						intensityPercentage: .75,
						restSeconds: 30,
						detail: "Aisance aquatique et capacité respiratoire continu (45 min)",
						instructions: [
							"200m échauffement coulée douce",
							"700m nage libre / brasse régulière",
							"100m récupération souple"
						]
					}]
				},
				{
					moment: "APRÈS-MIDI",
					title: "Session Tirage Haut du Corps",
					exercises: [{
						id: "pullups-volume",
						name: "Tractions Pronation (Séries Droites)",
						category: "pull",
						type: "dynamic",
						targetReps: pullupVolumeReps,
						sets: 4,
						intensityPercentage: .75,
						restSeconds: 90,
						detail: `4 séries × ${pullupVolumeReps} reps (75% Max: ${maxPullups}) • RIR 1-2`,
						instructions: [
							"Échauffement articulaire et mobilité des épaules",
							"Tempo 2010 : 2s descente freinée, 1s montée explosive",
							"Menton au-dessus de la barre à chaque rep",
							"Repos strict : 90s entre les séries"
						]
					}, {
						id: "pullups-supine-iso",
						name: "Tractions Supination — Blocage Iso 90°",
						category: "pull",
						type: "isometric",
						targetDurationSeconds: pullupIsoSeconds,
						sets: 4,
						intensityPercentage: .6,
						restSeconds: 90,
						detail: `4 séries × ${pullupIsoSeconds}s de maintien à 90°`,
						instructions: [
							"Prise supination serrée (paumes vers vous)",
							"Tirer à 90° d'angle de coude et maintenir le blocage",
							"Verrouillage des dorsaux et engagement des biceps",
							"Repos strict : 90s"
						]
					}]
				},
				{
					moment: "SOIR",
					title: "Session Core Dynamique",
					exercises: [{
						id: "commando-lundi",
						name: "Gainage Commando (Passage Coudes ↔ Mains)",
						category: "core",
						type: "dynamic",
						targetDurationSeconds: commandoDuration,
						sets: 3,
						intensityPercentage: .6,
						restSeconds: 60,
						detail: `3 séries × ${commandoDuration}s (60% Max Planche: ${maxPlankSeconds}s)`,
						instructions: [
							"Départ en planche sur les coudes",
							"Passage dynamique alterné sur bras tendus sans balancement du bassin",
							"Verrouillage de la sangle abdominale et des fessiers",
							"Repos strict : 60s"
						]
					}]
				}
			]
		},
		{
			dayName: "Mardi",
			focus: "Poussée Lourde, Triceps & Core Dynamique",
			sessions: [
				{
					moment: "MATIN",
					title: "Session Poussée Lourde",
					exercises: [{
						id: "pushups-military",
						name: "Pompes Militaires (Pectoraux & Triceps)",
						category: "push",
						type: "dynamic",
						targetReps: pushupsHeavyReps,
						sets: 4,
						intensityPercentage: .75,
						restSeconds: 90,
						detail: `4 séries × ${pushupsHeavyReps} reps (75% Max: ${maxPushups}) • RIR 1-2`,
						instructions: [
							"Coudes orientés à 45° par rapport au tronc",
							"Corps parfaitement gainé, poitrine effleurant le sol",
							"Tempo 2010 • Repos strict : 90s"
						]
					}, {
						id: "pushups-declined",
						name: "Pompes Déclinées sur Chaise",
						category: "push",
						type: "dynamic",
						targetReps: pushupsDeclinedReps,
						sets: 4,
						intensityPercentage: .7,
						restSeconds: 90,
						detail: `4 séries × ${pushupsDeclinedReps} reps (70% Max: ${maxPushups})`,
						instructions: [
							"Pieds surélevés sur chaise ou banc",
							"Corps aligné sans creuser le bas du dos",
							"Focus sur le haut des pectoraux et l'avant de l'épaule",
							"Repos strict : 90s"
						]
					}]
				},
				{
					moment: "APRÈS-MIDI",
					title: "Session Triceps & Core",
					exercises: [{
						id: "pushups-sphinx",
						name: "Extensions Triceps Sphinx (au sol)",
						category: "push",
						type: "dynamic",
						targetReps: pushupsTricepsReps,
						sets: 4,
						intensityPercentage: .6,
						restSeconds: 60,
						detail: `4 séries × ${pushupsTricepsReps} reps (60% Max: ${maxPushups})`,
						instructions: [
							"Départ en planche sur avant-bras",
							"Poussée explosive sur les paumes pour tendre les bras",
							"Cible prioritaire : Triceps",
							"Repos strict : 60s"
						]
					}, {
						id: "commando-mardi",
						name: "Gainage Commando (Stabilité du Troncs)",
						category: "core",
						type: "dynamic",
						targetDurationSeconds: commandoDuration,
						sets: 3,
						intensityPercentage: .6,
						restSeconds: 60,
						detail: `3 séries × ${commandoDuration}s`,
						instructions: [
							"Maintien du bassin horizontal",
							"Mouvement fluide de montée et descente sur avant-bras",
							"Repos strict : 60s"
						]
					}]
				},
				{
					moment: "SOIR",
					title: "Footing Récupération",
					exercises: [{
						id: "evening-run-note-tue",
						name: "Footing du Soir (Indépendant)",
						category: "cardio",
						type: "cardio",
						sets: 1,
						intensityPercentage: .65,
						restSeconds: 0,
						detail: "Footing habituel du soir en aisance respiratoire sans surcharge.",
						instructions: ["Allure confortable de course à pied du soir."]
					}]
				}
			]
		},
		{
			dayName: "Mercredi",
			focus: "Natation, Isométrie Bas du corps & Tirage Core",
			sessions: [
				{
					moment: "MATIN",
					title: "Session Aquatique Endurance",
					exercises: [{
						id: "swim-1000m-wed",
						name: "Natation — 1000m Continu & Technique",
						category: "swim",
						type: "cardio",
						sets: 1,
						intensityPercentage: .75,
						restSeconds: 30,
						detail: "Travail d'aisance aquatique et de régularité (45 min)",
						instructions: [
							"Échauffement 200m",
							"700m coulée continue rythmée",
							"100m retour au calme"
						]
					}]
				},
				{
					moment: "APRÈS-MIDI",
					title: "Session Bas du corps & Tirage Core",
					exercises: [{
						id: "wallsit-wed",
						name: "Chaise Isométrique au Mur (90°)",
						category: "legs",
						type: "isometric",
						targetDurationSeconds: wallSitDuration,
						sets: 4,
						intensityPercentage: .65,
						restSeconds: 60,
						detail: `4 séries × ${wallSitDuration}s (65% Max Chaise: ${maxWallSitSeconds}s)`,
						instructions: [
							"Dos plaqué au mur, genoux à 90° exacts",
							"Mains libres sans appui sur les cuisses",
							"Maintien statique continu • Repos strict : 60s"
						]
					}, {
						id: "pullups-lsit",
						name: "Tractions L-Sit / Tuck L-Sit (Tirage + Core)",
						category: "pull",
						type: "dynamic",
						targetReps: pullupLSitReps,
						sets: 4,
						intensityPercentage: .5,
						restSeconds: 90,
						detail: `4 séries × ${pullupLSitReps} reps (50% Max: ${maxPullups})`,
						instructions: [
							"Jambes levées à 90° (ou genoux pliés en Tuck L-Sit au besoin)",
							"Traction complète jusqu'au menton",
							"Gainage abdominal maximal durant le tirage",
							"Repos strict : 90s"
						]
					}]
				},
				{
					moment: "SOIR",
					title: "Footing Récupération",
					exercises: [{
						id: "evening-run-note-wed",
						name: "Footing du Soir (Indépendant)",
						category: "cardio",
						type: "cardio",
						sets: 1,
						intensityPercentage: .65,
						restSeconds: 0,
						detail: "Footing habituel du soir.",
						instructions: ["Allure confortable."]
					}]
				}
			]
		},
		{
			dayName: "Jeudi",
			focus: "Pré-activation, Spécifique Luc Léger & Mobilité",
			sessions: [
				{
					moment: "MATIN",
					title: "Session Pré-activation Poussée",
					exercises: [{
						id: "pushups-diamond-preact",
						name: "Pompes Diamant (Pré-activation Léger)",
						category: "push",
						type: "dynamic",
						targetReps: pushupsDiamondPreActivationReps,
						sets: 3,
						intensityPercentage: .4,
						restSeconds: 60,
						detail: `3 séries × ${pushupsDiamondPreActivationReps} reps (40% Max: ${maxPushups}) • RIR 3-4`,
						instructions: [
							"Pré-activation légère sans fatigue avant le cardio de l'après-midi",
							"Mains jointes sous le sternum",
							"Exécution contrôlée sans échec",
							"Repos strict : 60s"
						]
					}]
				},
				{
					moment: "APRÈS-MIDI",
					title: "Session Spécifique Luc Léger",
					exercises: [{
						id: "luc-leger-session",
						name: "Test / Navettes 20m Luc Léger",
						category: "cardio",
						type: "cardio",
						sets: 1,
						intensityPercentage: .9,
						restSeconds: 120,
						detail: `Séance spécifique Navettes 20m • Cible théorique : Palier ${lucPalierEst} (VMA: ${vma})`,
						instructions: [
							"10 min d'échauffement cardio progressif & mobilité dynamique des chevilles",
							"Navettes de 20m au rythme des bips sonores",
							"Focus relances explosives et blocages pied sur la ligne à 180°",
							"Saisir le score de palier atteint à la fin de la séance"
						]
					}]
				},
				{
					moment: "SOIR",
					title: "Session Mobilité & Étirements",
					exercises: [{
						id: "mobility-thu",
						name: "Mobilité Active & Étirements Doux",
						category: "mobility",
						type: "mobility",
						targetDurationSeconds: 1200,
						sets: 1,
						intensityPercentage: .3,
						restSeconds: 0,
						detail: "20 min d'étirements musculaires et mobilité chevilles/ischios post-Luc Léger",
						instructions: [
							"Étirements doux des mollets, ischio-jambiers et quadriceps",
							"Automassages au rouleau ou manuels",
							"Exercices de respiration ventrale de récupération"
						]
					}]
				}
			]
		},
		{
			dayName: "Vendredi",
			focus: "Tirage Excentrique, Renforcement Bas du Corps (Post-Natation) & Core Statique",
			sessions: [
				{
					moment: "MATIN",
					title: "Session Tirage Excentrique",
					exercises: [{
						id: "pullups-negative",
						name: "Tractions Supination Négatives (5s Excentrique)",
						category: "pull",
						type: "dynamic",
						targetReps: pullupNegReps,
						sets: 4,
						intensityPercentage: .6,
						restSeconds: 90,
						detail: `4 séries × ${pullupNegReps} reps avec freinage 5s (60% Max: ${maxPullups})`,
						instructions: [
							"Prise supination (paumes vers vous)",
							"Montée explosive (saut si besoin) menton au-dessus de la barre",
							"Freiner la descente sur 5 secondes complètes chrono",
							"Repos strict : 90s entre les séries"
						]
					}]
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
							targetReps: calculateDynamicReps(userStats.maxSquat ?? 40, .45, 18),
							sets: 4,
							intensityPercentage: .45,
							restSeconds: 60,
							detail: "3 à 4 séries × 15-20 reps • Poids de corps (15-20 min)",
							instructions: [
								"Pieds largeur d'épaules, cuisses parallèles au sol",
								"Poussée fluide sur les talons et dos droit",
								"3 à 4 séries de 15 à 20 répétitions • Repos : 60s"
							]
						},
						{
							id: "friday-lunges",
							name: "Fentes Avancées au Poids de Corps",
							category: "legs",
							type: "dynamic",
							targetReps: 12,
							sets: 3,
							intensityPercentage: .5,
							restSeconds: 60,
							detail: "3 séries × 10-12 reps par jambe • Poids de corps",
							instructions: [
								"Grand pas en avant, genou arrière effleurant le sol sans toucher brutalement",
								"Buste droit, poussée sur le talon avant pour revenir en position initiale",
								"3 séries de 10 à 12 répétitions par jambe • Repos : 60s"
							]
						},
						{
							id: "friday-calves",
							name: "Extensions Mollets (Debout)",
							category: "legs",
							type: "dynamic",
							targetReps: 22,
							sets: 4,
							intensityPercentage: .6,
							restSeconds: 45,
							detail: "3 à 4 séries × 20-25 reps • Poids de corps",
							instructions: [
								"Montée maximale sur la pointe des pieds avec contraction 1s en haut",
								"Descente freinée jusqu'à étirement du tendon d'Achille",
								"3 à 4 séries de 20 à 25 répétitions • Repos : 45s"
							]
						},
						{
							id: "friday-wallsit",
							name: "Chaise Isométrique au Mur (90°)",
							category: "legs",
							type: "isometric",
							targetDurationSeconds: calculateIsometricDuration(maxWallSitSeconds, .6, 50),
							sets: 3,
							intensityPercentage: .6,
							restSeconds: 60,
							detail: `3 séries × 45 à 60s de maintien (60% Max Chaise: ${maxWallSitSeconds}s)`,
							instructions: [
								"Dos plaqué contre le mur, cuisses à 90° exacts",
								"Maintien statique sans appui des mains sur les cuisses",
								"3 séries de 45 à 60 secondes • Repos strict : 60s"
							]
						},
						{
							id: "plank-friday",
							name: "Gainage Abdominal Planche (Statique)",
							category: "core",
							type: "isometric",
							targetDurationSeconds: plankDuration,
							sets: 4,
							intensityPercentage: .65,
							restSeconds: 60,
							detail: `4 séries × ${plankDuration}s (65% Max Planche: ${maxPlankSeconds}s) • Unique séance statique de la semaine`,
							instructions: [
								"Coudes sous les épaules, corps parfaitement aligné",
								"Maintien statique sans creuser le dos",
								"Repos strict : 60s entre les séries"
							]
						}
					]
				},
				{
					moment: "SOIR",
					title: "Footing Récupération",
					exercises: [{
						id: "evening-run-note-fri",
						name: "Footing du Soir (Indépendant)",
						category: "cardio",
						type: "cardio",
						sets: 1,
						intensityPercentage: .65,
						restSeconds: 0,
						detail: "Footing habituel du soir.",
						instructions: ["Allure confortable."]
					}]
				}
			]
		},
		{
			dayName: "Samedi",
			focus: "Circuit Métabolique Full Body (3 Tours)",
			sessions: [{
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
						intensityPercentage: .6,
						restSeconds: 30,
						detail: `3 tours × ${circuitPushReps} reps (60% Max: ${maxPushups})`,
						instructions: [
							"Premier exercice du circuit métabolique",
							"Execution propre et rythmée",
							"Enchaîner avec la Chaise après 30s de transition"
						]
					},
					{
						id: "circuit-wallsit",
						name: "Chaise Isométrique au Mur (Tour Circuit)",
						category: "legs",
						type: "isometric",
						targetDurationSeconds: circuitWallSitDur,
						sets: 3,
						intensityPercentage: .5,
						restSeconds: 30,
						detail: `3 tours × ${circuitWallSitDur}s (50% Max Chaise: ${maxWallSitSeconds}s)`,
						instructions: [
							"Deuxième exercice du circuit",
							"Dos plaqué à 90°",
							"Enchaîner avec le Gainage Commando après 30s"
						]
					},
					{
						id: "circuit-commando",
						name: "Gainage Commando (Tour Circuit)",
						category: "core",
						type: "dynamic",
						targetDurationSeconds: circuitCommandoDur,
						sets: 3,
						intensityPercentage: .5,
						restSeconds: 90,
						detail: `3 tours × ${circuitCommandoDur}s (50% Max Planche: ${maxPlankSeconds}s)`,
						instructions: [
							"Troisième exercice du circuit",
							"Passage coudes ↔ mains dynamique",
							"Repos complet de 90s après ce 3ème exercice avant de repartir pour le tour suivant (3 tours au total)"
						]
					}
				]
			}, {
				moment: "SOIR",
				title: "Footing Récupération",
				exercises: [{
					id: "evening-run-note-sat",
					name: "Footing du Soir (Indépendant)",
					category: "cardio",
					type: "cardio",
					sets: 1,
					intensityPercentage: .65,
					restSeconds: 0,
					detail: "Footing habituel du soir.",
					instructions: ["Allure très confortable."]
				}]
			}]
		},
		{
			dayName: "Dimanche",
			focus: "Repos Complet & Mobilité Active",
			sessions: [{
				moment: "MATIN",
				title: "Session Récupération & Mobilité",
				exercises: [{
					id: "sunday-mobility",
					name: "Mobilité Douce & Récupération Complète",
					category: "mobility",
					type: "mobility",
					targetDurationSeconds: 1200,
					sets: 1,
					intensityPercentage: .2,
					restSeconds: 0,
					detail: "20 min d'étirements doux et mobilité active sans charge physique lourde",
					instructions: [
						"Mobilité douce des hanches, chevilles et épaules",
						"Pas d'exercice physique lourd ni d'effort intense",
						"Hydratation et régénération musculaire complète"
					]
				}]
			}]
		}
	];
	return {
		generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
		userStats: {
			maxPullups,
			maxPushups,
			maxWallSitSeconds,
			maxPlankSeconds,
			vma
		},
		schedule
	};
}
var ACTIVITY_PRESETS = {
	natation: {
		id: "natation",
		label: "Natation — 1000m continu & éducatifs aquatiques",
		detail: "Travail d'aisance aquatique et endurance respiratoire",
		type: "swim",
		estimatedMinutes: 45,
		xp: 25,
		steps: [
			"Échauffement 200m coulée",
			"800m nage libre / brasse",
			"Récupération 100m"
		],
		swapTags: [
			"cardio",
			"aquatique",
			"endurance"
		]
	},
	course: {
		id: "course",
		label: "Course à pied — Endurance fondamentale",
		detail: "45 min à 75% VMA en aisance respiratoire",
		type: "run",
		estimatedMinutes: 45,
		xp: 25,
		steps: [
			"Échauffement 5 min",
			"40 min course continue",
			"Retour au calme 5 min"
		],
		swapTags: [
			"cardio",
			"course",
			"endurance"
		]
	},
	fractionne: {
		id: "fractionne",
		label: "Course — Fractionné court 30/30",
		detail: "12 répétitions (30s rapide / 30s trotté)",
		type: "run",
		estimatedMinutes: 35,
		xp: 30,
		steps: [
			"10 min footing d'échauffement",
			"12 x (30s VMA / 30s marche)",
			"5 min retour au calme"
		],
		swapTags: [
			"cardio",
			"course",
			"vma"
		]
	},
	tractions: {
		id: "tractions",
		label: "Tractions — Séries adaptatives",
		detail: "Renforcement musculaire du dos et des bras",
		type: "pull",
		estimatedMinutes: 30,
		xp: 20,
		steps: [
			"Échauffement épaules",
			"Séries adaptées à votre max • Repos strict 90s",
			"Étirements"
		],
		swapTags: [
			"tirage",
			"dos",
			"biceps",
			"tirage_poly"
		]
	},
	pompes_militaires: {
		id: "pompes_militaires",
		label: "Pompes Militaires — Renforcement Pectoraux & Triceps",
		detail: "Tempo 2010 (2s descente, 0s pause, 1s montée, 0s pause) • Repos strict : 90s • Consignes : Coudes à 45°, corps gainé, poitrine effleurant le sol",
		type: "pull",
		estimatedMinutes: 25,
		xp: 20,
		steps: [
			"Consignes : Coudes à 45°, corps parfaitement gainé, poitrine sol à chaque rep",
			"Exécution Tempo 2010",
			"Repos strict : 90s entre les séries"
		],
		swapTags: [
			"poussée",
			"pectoraux",
			"triceps",
			"poussée_poly"
		]
	},
	pompes_diamant: {
		id: "pompes_diamant",
		label: "Pompes Diamant — Triceps & Sternum",
		detail: "Tempo 2010 • Repos strict : 90s • Consignes : Mains jointes en diamant sous le sternum, coudes serrés",
		type: "pull",
		estimatedMinutes: 25,
		xp: 20,
		steps: [
			"Consignes : Mains jointes en diamant sous le sternum, coudes serrés le long du corps",
			"Exécution Tempo 2010",
			"Repos strict : 90s"
		],
		swapTags: [
			"poussée",
			"triceps",
			"triceps_heavy",
			"poussée_poly"
		]
	},
	pompes_declinees: {
		id: "pompes_declinees",
		label: "Pompes Déclinées sur chaise — Haut de Poitrine & Épaules",
		detail: "Tempo 2010 • Repos strict : 90s • Consignes : Pieds surélevés sur chaise/banc, corps aligné",
		type: "pull",
		estimatedMinutes: 25,
		xp: 20,
		steps: [
			"Consignes : Pieds surélevés sur chaise, corps aligné sans creuser le dos",
			"Exécution Tempo 2010",
			"Repos strict : 90s"
		],
		swapTags: [
			"poussée",
			"pectoraux_haut",
			"épaules",
			"poussée_poly"
		]
	},
	tractions_lsit: {
		id: "tractions_lsit",
		label: "Tractions L-Sit — Tirage Horizontal & Core",
		detail: "Tirage vertical & gainage L-Sit (Jambes à 90°) • Option Tuck L-Sit (genoux pliés) • Repos strict : 90s",
		type: "pull",
		estimatedMinutes: 25,
		xp: 20,
		steps: [
			"Consignes : Suspendu à la barre, lever les jambes tendues à 90° (parallèles au sol)",
			"Tirer le menton au-dessus de la barre en maintaining le buste et les jambes immobiles",
			"Option régression : Replier les genoux à 90° (Tuck L-Sit) si les jambes tendues sont trop exigeantes",
			"Repos strict : 90s entre les séries"
		],
		swapTags: [
			"tirage",
			"dos",
			"biceps",
			"core",
			"tirage_poly"
		]
	},
	squat_iso: {
		id: "squat_iso",
		label: "Squat Isométrique — Cuisses au mur (90°)",
		detail: "Tempo Isométrie 1000 (maintien statique à 90°) • Repos strict : 60s",
		type: "chair",
		estimatedMinutes: 20,
		xp: 20,
		steps: [
			"Dos plaqué au mur, cuisses parallèles au sol (90°)",
			"Maintien statique continu",
			"Repos strict : 60s"
		],
		swapTags: [
			"cuisses",
			"isométrie",
			"bas_du_corps"
		]
	},
	gainage_commando: {
		id: "gainage_commando",
		label: "Gainage Commando — Planche Coudes ↔ Bras tendus",
		detail: "Passage dynamique coudes à bras tendus • Repos strict : 60s",
		type: "chair",
		estimatedMinutes: 15,
		xp: 20,
		steps: [
			"Départ en planche sur les coudes",
			"Passage dynamique bras tendus alternativement",
			"3 séries de 45s • Repos 60s"
		],
		swapTags: [
			"core",
			"gainage",
			"abdominaux"
		]
	},
	bras_diamant: {
		id: "bras_diamant",
		label: "Pompes Diamant — Triceps (Échec)",
		detail: "Module Bras Explosion [1/4] • Mains en diamant, coudes serrés",
		type: "pull",
		estimatedMinutes: 6,
		xp: 15,
		steps: [
			"Mains jointes en diamant sous le sternum",
			"3 séries à l'échec strict",
			"Repos 60s"
		],
		swapTags: [
			"poussée",
			"triceps",
			"triceps_heavy",
			"poussée_isolation"
		],
		isIsolation: true
	},
	bras_biceps_iso: {
		id: "bras_biceps_iso",
		label: "Tractions Supination — Blocage Iso 90°",
		detail: "Module Bras Explosion [2/4] • Supination serrée (3 × 30s)",
		type: "pull",
		estimatedMinutes: 6,
		xp: 15,
		steps: [
			"Supination serrée",
			"Blocage isométrique à 90° d'angle",
			"3 séries de 30s • Repos 60s"
		],
		swapTags: [
			"tirage",
			"biceps",
			"biceps_iso",
			"tirage_isolation"
		],
		isIsolation: true
	},
	bras_triceps_sol: {
		id: "bras_triceps_sol",
		label: "Extensions Triceps au Sol (Pompes Sphinx)",
		detail: "Module Bras Explosion [3/4] • Coudes posés -> bras tendus (Pompes Sphinx)",
		type: "pull",
		estimatedMinutes: 6,
		xp: 15,
		steps: [
			"Planche sur avant-bras",
			"Poussée sur paumes pour tendre les bras (Pompes Sphinx)",
			"3 séries à l'échec • Repos 60s"
		],
		swapTags: [
			"poussée",
			"triceps",
			"triceps_heavy",
			"poussée_isolation"
		],
		isIsolation: true
	},
	bras_biceps_neg: {
		id: "bras_biceps_neg",
		label: "Tractions Supination Négatives 5s",
		detail: "Module Bras Explosion [4/4] • Contrôle descente 5s (3 × 6-8 reps)",
		type: "pull",
		estimatedMinutes: 6,
		xp: 15,
		steps: [
			"Départ menton au-dessus de la barre",
			"Freinage de la descente sur 5 secondes",
			"3 × 6-8 reps à l'échec • Repos 60s"
		],
		swapTags: [
			"tirage",
			"biceps",
			"biceps_excentrique",
			"tirage_isolation"
		],
		isIsolation: true
	},
	psycho: {
		id: "psycho",
		label: "Psychotechniques — Calcul mental & Logique",
		detail: "Entraînement aux tests d'aptitude militaire",
		type: "psycho",
		estimatedMinutes: 20,
		xp: 15,
		steps: [
			"Série de calcul rapide",
			"Tests de suites numériques",
			"Test d'attention"
		],
		swapTags: ["psycho", "mental"]
	},
	repos: {
		id: "repos",
		label: "Récupération active & Étirements musculaires",
		detail: "Mobilité, relaxation et récupération musculaire",
		type: "stretch",
		estimatedMinutes: 20,
		xp: 15,
		steps: [
			"10 min étirements doux",
			"5 min automassages",
			"5 min exercices de respiration"
		],
		swapTags: ["stretch", "recup"]
	}
};
function extractTargetDistance(task) {
	const str = `${task.label} ${task.detail ?? ""}`;
	const multMatch = str.match(/(\d+)\s*[\timesx×]\s*(\d+)\s*m/i);
	if (multMatch) return {
		targetValue: parseInt(multMatch[1], 10) * parseInt(multMatch[2], 10),
		unit: "m"
	};
	const kmMatch = str.match(/(\d+(?:[\.,]\d+)?)\s*km\b/i);
	if (kmMatch) return {
		targetValue: parseFloat(kmMatch[1].replace(",", ".")),
		unit: "km"
	};
	const metersMatch = str.match(/(\d+)\s*m\b/i);
	if (metersMatch && !str.includes("20m")) {
		const mVal = parseInt(metersMatch[1], 10);
		if (mVal >= 100) return {
			targetValue: mVal,
			unit: "m"
		};
	}
	if (task.type === "swim") return {
		targetValue: 1e3,
		unit: "m"
	};
	if (task.type === "run") return {
		targetValue: 5,
		unit: "km"
	};
	return null;
}
militarySeptemberProgram.weeks;
var DAY_LABELS = [
	"Lun",
	"Mar",
	"Mer",
	"Jeu",
	"Ven",
	"Sam",
	"Dim"
];
function getUserMaxes(state) {
	const perfs = state.perf ?? [];
	const getMax = (type, fallback) => {
		const list = perfs.filter((p) => p.type === type).map((p) => p.value);
		return list.length > 0 ? Math.max(...list) : fallback;
	};
	const userMaxPull = getMax("pull", 6);
	const userMaxPullLSit = getMax("pull_lsit", Math.max(3, Math.round(userMaxPull * .5)));
	const userMaxPullSupineIso = getMax("pull_supine_iso", 30);
	const userMaxPullSupineNeg = getMax("pull_supine_neg", 8);
	const userMaxPushMilitary = getMax("push_military", Math.max(15, Math.round(userMaxPull * 2.5)));
	const userMaxPushDiamond = getMax("push_diamond", Math.max(12, Math.round(userMaxPushMilitary * .8)));
	const userMaxPushDeclined = getMax("push_declined", Math.max(12, Math.round(userMaxPushMilitary * .85)));
	const userMaxTriceps = getMax("push_triceps", Math.max(10, Math.round(userMaxPushMilitary * .7)));
	const userMaxChair = getMax("chair", 60);
	const userMaxSquat = getMax("squat", 30);
	const userMaxLunge = getMax("lunge", 15);
	const userMaxCalves = getMax("calves", 25);
	const userMaxCommando = getMax("commando", 45);
	const userMaxLuc = getMax("luc", 7);
	return {
		userMaxPull,
		userMaxPullLSit,
		userMaxPullSupineIso,
		userMaxPullSupineNeg,
		userMaxPushMilitary,
		userMaxPushDiamond,
		userMaxPushDeclined,
		userMaxTriceps,
		userMaxChair,
		userMaxSquat,
		userMaxLunge,
		userMaxCalves,
		userMaxCommando,
		userMaxLuc,
		userMaxVMA: getMax("vma", +(userMaxLuc * 1.5 + 4).toFixed(1))
	};
}
function createTrainingEngine(state, deps, options = {}) {
	const todayISO = options.todayISO ?? toISO(/* @__PURE__ */ new Date());
	const buildMission = (dateISO) => {
		const weeklyProg = generateWeeklyProgram(getUserStatsFromState(state));
		const dayIndex = ((/* @__PURE__ */ new Date(`${dateISO}T12:00:00`)).getDay() + 6) % 7;
		const dayProg = weeklyProg.schedule[dayIndex] ?? weeklyProg.schedule[0];
		const week = {
			id: "week-1",
			label: "Semaine 1"
		};
		const definition = {
			name: dayProg.dayName,
			title: `${dayProg.dayName} — ${dayProg.focus}`,
			objective: dayProg.focus,
			priority: "Normale"
		};
		const rawTasks = [];
		const momentMap = {
			"MATIN": "morning",
			"APRÈS-MIDI": "afternoon",
			"SOIR": "evening"
		};
		dayProg.sessions.forEach((session) => {
			const moment = momentMap[session.moment] ?? "afternoon";
			session.exercises.forEach((ex) => {
				rawTasks.push({
					id: ex.id,
					label: ex.name,
					detail: ex.detail,
					type: {
						swim: "swim",
						pull: "pull",
						push: "pull",
						legs: "chair",
						core: "chair",
						cardio: "run",
						mobility: "stretch"
					}[ex.category] ?? "custom",
					moment,
					estimatedMinutes: ex.category === "swim" ? 45 : ex.category === "cardio" ? 30 : ex.category === "mobility" ? 20 : 15,
					rest: `${ex.restSeconds}s`,
					steps: ex.instructions,
					xp: ex.category === "swim" ? 35 : ex.category === "cardio" ? 50 : ex.category === "pull" || ex.category === "push" ? 25 : ex.category === "legs" || ex.category === "core" ? 20 : 15
				});
			});
		});
		rawTasks.push({
			id: `psycho-day-${dayIndex}`,
			label: {
				0: "Psychotechniques — Calcul mental",
				1: "Psychotechniques — Logique",
				2: "Psychotechniques — Mémoire",
				3: "Psychotechniques — Suites numériques",
				4: "Psychotechniques — Orientation spatiale",
				5: "Psychotechniques — Test complet chronométré",
				6: "Psychotechniques — Correction des erreurs"
			}[dayIndex] ?? "Psychotechniques",
			detail: "20-30 min d'entraînement aux tests d'aptitude militaire",
			type: "psycho",
			moment: "psychotechniques",
			estimatedMinutes: 20,
			xp: 20,
			steps: [
				"Timer 20 min",
				"Série de tests d'attention",
				"Noter le score"
			]
		});
		const userMaxes = getUserMaxes(state);
		const dayRecord = state.days[dateISO];
		if (dayRecord?.customTasks && Array.isArray(dayRecord.customTasks)) rawTasks.push(...dayRecord.customTasks);
		const checkedMap = dayRecord?.checked ?? {};
		const swapsMap = dayRecord?.swaps ?? {};
		const hasRawSwim = rawTasks.some((t) => t.type === "swim" || t.label && t.label.toLowerCase().includes("natation"));
		const isSwimChecked = Object.keys(checkedMap).some((taskId) => {
			if (!checkedMap[taskId]) return false;
			const t = rawTasks.find((rt) => rt.id === taskId);
			return taskId.includes("swim") || t && t.type === "swim";
		});
		const isSwimSwapped = swapsMap.morning === "natation";
		const hasHealthSwim = (dayRecord?.health?.workouts ?? []).some((w) => w.type && (w.type.toLowerCase().includes("natation") || w.type.toLowerCase().includes("swim")));
		const hasMorningSwim = hasRawSwim || isSwimChecked || isSwimSwapped || hasHealthSwim;
		let tasks = rawTasks.map((task) => {
			return {
				...task,
				estimatedMinutes: task.estimatedMinutes ?? defaultDuration(task.type),
				rest: task.rest ?? defaultRest(task.type),
				steps: task.steps ?? defaultSteps(task)
			};
		});
		let thuRunCount = 0;
		tasks = tasks.map((t) => {
			if (dayIndex === 3 && t.type === "run") {
				thuRunCount++;
				if (thuRunCount > 1) return {
					...t,
					label: "Course en duo — Footing de récupération léger",
					detail: "Footing très doux à allure confortable (Pas de Luc Léger le soir)",
					steps: [
						"Footing très doux 20-30 min",
						"Respiration aisée",
						"Étirements"
					]
				};
			}
			return t;
		});
		if (hasMorningSwim) tasks = tasks.filter((t) => t.type !== "run");
		const swaps = state.days[dateISO]?.swaps ?? {};
		let finalTasks = [];
		const processedMoments = /* @__PURE__ */ new Set();
		for (const t of tasks) {
			let moment = t.moment;
			const lowerLabel = String(t.label || "").toLowerCase();
			if (lowerLabel.includes("duo") || lowerLabel.includes("footing")) {
				moment = "evening";
				t.moment = "evening";
			}
			const swapId = swaps[t.id] ?? swaps[moment];
			if (swapId && ACTIVITY_PRESETS[swapId]) finalTasks.push(resolveSmartSwappedTask(t, dateISO, moment, swapId, userMaxes));
			else finalTasks.push(t);
		}
		for (const mKey of [
			"morning",
			"afternoon",
			"evening",
			"psychotechniques"
		]) {
			const swapId = swaps[mKey];
			if (swapId && ACTIVITY_PRESETS[swapId] && !processedMoments.has(mKey)) {
				processedMoments.add(mKey);
				const preset = ACTIVITY_PRESETS[swapId];
				finalTasks.push({
					id: `swapped-${dateISO}-${mKey}-${swapId}`,
					moment: mKey,
					label: preset.label,
					detail: preset.detail,
					type: preset.type,
					estimatedMinutes: preset.estimatedMinutes,
					xp: preset.xp,
					steps: preset.steps,
					completed: false
				});
			}
		}
		const momentOrder = {
			morning: 1,
			afternoon: 2,
			evening: 3,
			psychotechniques: 4
		};
		finalTasks.sort((a, b) => (momentOrder[a.moment] ?? 5) - (momentOrder[b.moment] ?? 5));
		const day = state.days[dateISO];
		const checked = day?.checked ?? {};
		const taskRealizations = day?.taskRealizations ?? {};
		finalTasks = finalTasks.map((t) => {
			const targetDistInfo = extractTargetDistance(t);
			const realization = taskRealizations[t.id];
			let baseXP = t.xp ?? 35;
			let isPenalized = false;
			let actualDistance = realization?.actual;
			let targetDistance = realization?.target ?? targetDistInfo?.targetValue;
			let unit = realization?.unit ?? targetDistInfo?.unit ?? "km";
			let penaltyText = "";
			let xpAwarded = baseXP;
			if (realization) {
				isPenalized = realization.penalty;
				xpAwarded = realization.xpAwarded;
			} else if (targetDistInfo) {
				targetDistance = targetDistInfo.targetValue;
				unit = targetDistInfo.unit;
			}
			if (isPenalized && targetDistance != null && actualDistance != null) {
				const gap = +(targetDistance - actualDistance).toFixed(1);
				penaltyText = `⚠️ PÉNALITÉ : ${gap > 0 ? gap : 0} ${unit} manquants (XP réduit à ${xpAwarded} XP)`;
			}
			return {
				...t,
				targetDistance,
				actualDistance,
				unit,
				isPenalized,
				penaltyText,
				xp: xpAwarded
			};
		});
		const doneCount = finalTasks.filter((task) => isTaskDone(task, checked)).length;
		const totalCount = finalTasks.length;
		const completionPct = totalCount ? Math.round(doneCount / totalCount * 100) : 0;
		const remainingCount = Math.max(0, totalCount - doneCount);
		const status = doneCount === 0 ? "a_faire" : remainingCount === 0 ? "termine" : "en_cours";
		const psychoTask = finalTasks.find((task) => task.type === "psycho");
		const psychoDone = psychoTask ? isTaskDone(psychoTask, checked) : false;
		return {
			programId: militarySeptemberProgram.id,
			weekId: week.id,
			iso: dateISO,
			dayName: definition.name,
			title: definition.title ?? `${definition.name} - ${definition.objective}`,
			objective: definition.objective,
			priority: definition.priority ?? "Normale",
			tasks: finalTasks,
			doneCount,
			remainingCount,
			totalCount,
			completionPct,
			xp: finalTasks.reduce((sum, task) => sum + (isTaskDone(task, checked) ? task.xp : 0), 0),
			estimatedMinutes: finalTasks.reduce((sum, task) => sum + task.estimatedMinutes, 0),
			status,
			psychotechnique: psychoTask ? {
				label: psychoTask.label,
				detail: psychoTask.detail ?? "20 min",
				durationTarget: psychoTask.estimatedMinutes ?? 20,
				score: day?.psycho?.score,
				done: psychoDone
			} : void 0,
			summary: buildSummary(doneCount, totalCount, remainingCount)
		};
	};
	const buildWeek = (dateISO) => {
		const baseDate = /* @__PURE__ */ new Date(`${dateISO}T12:00:00`);
		const start = new Date(baseDate);
		const dayOffset = (baseDate.getDay() + 6) % 7;
		start.setDate(baseDate.getDate() - dayOffset);
		return Array.from({ length: 7 }, (_, index) => {
			const date = new Date(start);
			date.setDate(start.getDate() + index);
			const iso = toISO(date);
			const mission = buildMission(iso);
			return {
				iso,
				label: DAY_LABELS[index],
				dayNumber: date.getDate(),
				dayName: mission.dayName,
				title: mission.title,
				objective: mission.objective,
				completionPct: mission.completionPct,
				doneCount: mission.doneCount,
				totalCount: mission.totalCount,
				taskCount: mission.totalCount,
				isToday: iso === todayISO,
				sessions: mission.tasks.slice(0, 2).map((task) => task.label)
			};
		});
	};
	const getWeeklyState = (dateISO) => {
		const week = buildWeek(dateISO);
		const completedDays = week.filter((day) => day.doneCount > 0).length;
		const totalDays = week.length;
		const completedTasks = week.reduce((sum, day) => sum + day.doneCount, 0);
		const totalTasks = week.reduce((sum, day) => sum + day.totalCount, 0);
		const xp = week.reduce((sum, day) => sum + buildMission(day.iso).xp, 0);
		return {
			completedDays,
			totalDays,
			completionPct: totalDays ? Math.round(completedDays / totalDays * 100) : 0,
			completedTasks,
			totalTasks,
			xp
		};
	};
	return {
		getTodayProgram: () => buildMission(todayISO),
		getCurrentWeek: (dateISO = todayISO) => buildWeek(dateISO),
		getCurrentDay: (dateISO = todayISO) => buildMission(dateISO),
		getMission: (dateISO) => buildMission(dateISO),
		getProgress: (dateISO = todayISO) => {
			const mission = buildMission(dateISO);
			return {
				iso: mission.iso,
				completionPct: mission.completionPct,
				doneCount: mission.doneCount,
				remainingCount: mission.remainingCount,
				totalCount: mission.totalCount,
				status: mission.status,
				xp: mission.xp
			};
		},
		completeExercise: (taskId, dateISO = todayISO) => {
			deps.toggleTask(dateISO, taskId);
		},
		getWeeklyCompletion: (dateISO = todayISO) => getWeeklyState(dateISO),
		getDailyXP: (dateISO = todayISO) => buildMission(dateISO).xp
	};
}
function defaultDuration(type) {
	switch (type) {
		case "swim": return 45;
		case "pull": return 15;
		case "chair": return 10;
		case "run": return 50;
		case "psycho": return 20;
		case "stretch": return 10;
		case "hydration": return 2;
		default: return 10;
	}
}
function defaultRest(type) {
	switch (type) {
		case "swim": return "30s entre blocs";
		case "pull": return "90s";
		case "chair": return "60s";
		case "run": return "Marche 3 min si besoin";
		case "stretch": return "Respiration lente";
		default: return;
	}
}
function defaultSteps(task) {
	switch (task.type) {
		case "run": return [
			"Échauffement progressif",
			task.label,
			"Retour au calme"
		];
		case "swim": return [
			"Échauffement facile",
			task.label,
			"Retour souple"
		];
		case "pull":
		case "chair": return [
			task.label,
			"Repos indiqué",
			"Dernière série propre"
		];
		case "psycho": return [
			"Timer 20 min",
			task.label,
			"Noter le score"
		];
		default: return [task.label];
	}
}
function resolveSmartSwappedTask(t, dateISO, moment, swapId, userMaxes) {
	const preset = ACTIVITY_PRESETS[swapId];
	if (!preset) return t;
	const originalLabel = String(t.label ?? "").toLowerCase();
	originalLabel.includes("pyramide");
	originalLabel.includes("dégressif") || originalLabel.includes("degressif");
	const isIso = originalLabel.includes("isométrie") || originalLabel.includes("iso") || t.type === "chair";
	const compensationFactor = !!preset.isIsolation ? 1.15 : 1;
	let targetMax = userMaxes.userMaxPull;
	if (swapId === "pompes_militaires") targetMax = userMaxes.userMaxPushMilitary;
	else if (swapId === "pompes_diamant" || swapId === "bras_diamant") targetMax = userMaxes.userMaxPushDiamond;
	else if (swapId === "pompes_declinees") targetMax = userMaxes.userMaxPushDeclined;
	else if (swapId === "bras_triceps_sol") targetMax = userMaxes.userMaxTriceps;
	else if (swapId === "tractions_lsit") targetMax = userMaxes.userMaxPullLSit;
	else if (swapId === "bras_biceps_iso") targetMax = userMaxes.userMaxPullSupineIso;
	else if (swapId === "bras_biceps_neg") targetMax = userMaxes.userMaxPullSupineNeg;
	else if (swapId === "squat_iso") targetMax = userMaxes.userMaxChair;
	else if (swapId === "gainage_commando") targetMax = userMaxes.userMaxCommando;
	let label = preset.label;
	let detail = preset.detail;
	let steps = preset.steps;
	if (isIso || preset.type === "chair") {
		const submaxSecs = Math.max(25, Math.round(targetMax * .7 * compensationFactor));
		label = `${preset.label} — Séries Droites : 4 × ${submaxSecs}s`;
		detail = `4 séries droites (70% Max=${targetMax}s${compensationFactor > 1 ? " + compensation isolation" : ""}) • Repos strict : 60s`;
		steps = [
			...preset.steps,
			`4 séries droites de ${submaxSecs} secondes`,
			"Repos strict : 60s entre les séries"
		];
	} else {
		const submaxReps = Math.max(3, Math.round(targetMax * .65 * compensationFactor));
		label = `${preset.label} — Séries Droites (RIR 1-2) : 4 × ${submaxReps} reps`;
		detail = `4 séries droites (65% Max=${targetMax}${compensationFactor > 1 ? " + compensation isolation" : ""}) • Tempo 2010 • Repos : 90s`;
		steps = [
			...preset.steps,
			`4 séries droites de ${submaxReps} répétitions (RIR 1-2)`,
			"Tempo 2010 • Repos strict : 90s entre les séries"
		];
	}
	return {
		...t,
		id: t.id,
		moment,
		label,
		detail,
		type: preset.type,
		estimatedMinutes: preset.estimatedMinutes,
		xp: preset.xp,
		steps,
		isSwapped: true,
		swapId
	};
}
function buildSummary(doneCount, totalCount, remainingCount) {
	if (remainingCount === 0) return "Mission complète. La journée est bien avancée.";
	if (doneCount === 0) return "La journée commence, concentre-toi sur la première étape.";
	return `${doneCount}/${totalCount} terminés — ${remainingCount} restant${remainingCount > 1 ? "s" : ""}.`;
}
function isTaskDone(task, checked) {
	if (checked[task.id]) return true;
	return ({
		"pullups-volume": ["pull-1", "w1-mon-pull"],
		"pushups-military": ["push-1", "w1-tue-push"],
		"evening-run-note-tue": ["run-2", "w1-tue-run"],
		"commando-mardi": ["w1-tue-core"],
		"pullups-lsit": ["w1-wed-pull"],
		"psycho-day-0": [
			"psycho-1",
			"stretch-1",
			"hydro-1"
		],
		"psycho-day-1": ["psycho-2"],
		"psycho-day-2": ["psycho-3"],
		"psycho-day-3": ["psycho-4"],
		"psycho-day-4": ["psycho-5"],
		"psycho-day-5": ["psycho-6"],
		"psycho-day-6": ["psycho-7"]
	}[task.id] ?? []).some((alias) => checked[alias]);
}
//#endregion
export { createTrainingEngine as t };
