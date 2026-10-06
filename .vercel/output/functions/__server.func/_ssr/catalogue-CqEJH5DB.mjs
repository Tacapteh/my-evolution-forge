import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { D as Flame, F as ChevronRight, I as ChevronLeft, R as Check, _ as Plus, f as Sparkles, h as Search, k as Dumbbell, p as Shield, x as LoaderCircle } from "../_libs/lucide-react.mjs";
import { f as toISO, g as useForge, i as PageHeader, o as cn } from "./AppShell-yhw2ilih.mjs";
import { n as Card, t as Button } from "./button-D_zJYbhK.mjs";
import { t as Input } from "./input-D8n0uREm.mjs";
import { t as Badge } from "./badge-BtatB9oZ.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DvextPjj.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogDescription, t as Dialog } from "./dialog-BzB40wt4.mjs";
import { t as Label } from "./label-Viy_17TP.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
import { r as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tabs-Cdn-CkHK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Tabs = Root2;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
	ref,
	className: cn("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className),
	...props
}));
TabsList.displayName = List.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow", className),
	...props
}));
TabsTrigger.displayName = Trigger.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
	ref,
	className: cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
	...props
}));
TabsContent.displayName = Content.displayName;
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/catalogue-CqEJH5DB.js
function getExerciseImageUrl(imagePath) {
	if (!imagePath) return "";
	return `https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${imagePath}`;
}
var DAYS_OF_WEEK = [
	{
		id: 0,
		label: "Lundi"
	},
	{
		id: 1,
		label: "Mardi"
	},
	{
		id: 2,
		label: "Mercredi"
	},
	{
		id: 3,
		label: "Jeudi"
	},
	{
		id: 4,
		label: "Vendredi"
	},
	{
		id: 5,
		label: "Samedi"
	},
	{
		id: 6,
		label: "Dimanche"
	}
];
var MOMENTS = [
	{
		id: "morning",
		label: "Matin",
		icon: "🌅"
	},
	{
		id: "afternoon",
		label: "Après-midi",
		icon: "☀️"
	},
	{
		id: "evening",
		label: "Soir",
		icon: "🌙"
	}
];
function ExerciseDetailModal({ exercise, open, onClose }) {
	const { addCustomTask } = useForge();
	const [activeTab, setActiveTab] = (0, import_react.useState)("detail");
	const [selectedDayIndex, setSelectedDayIndex] = (0, import_react.useState)(0);
	const [moment, setMoment] = (0, import_react.useState)("afternoon");
	const [mode, setMode] = (0, import_react.useState)("reps");
	const [sets, setSets] = (0, import_react.useState)(3);
	const [reps, setReps] = (0, import_react.useState)(12);
	const [durationSeconds, setDurationSeconds] = (0, import_react.useState)(45);
	const [restSeconds, setRestSeconds] = (0, import_react.useState)(60);
	if (!exercise) return null;
	const displayName = exercise.nameFr || exercise.name;
	const primaryMusclesList = exercise.primaryMusclesFr || exercise.primaryMuscles || [];
	const secondaryMusclesList = exercise.secondaryMusclesFr || exercise.secondaryMuscles || [];
	const equipmentLabel = exercise.equipmentFr || exercise.equipment || "Poids du corps";
	const categoryLabel = exercise.categoryFr || exercise.category || "Exercice";
	const getTargetISODate = (dayIdx) => {
		const now = /* @__PURE__ */ new Date();
		const diffDays = dayIdx - (now.getDay() + 6) % 7;
		const targetDate = new Date(now);
		targetDate.setDate(now.getDate() + diffDays);
		return toISO(targetDate);
	};
	const handleAddToWorkout = () => {
		const targetISO = getTargetISODate(selectedDayIndex);
		const detailString = mode === "reps" ? `${sets} séries × ${reps} reps • Repos : ${restSeconds}s` : `${sets} séries × ${durationSeconds}s d'isométrie • Repos : ${restSeconds}s`;
		addCustomTask(targetISO, {
			label: displayName,
			type: (() => {
				const cat = (exercise.category || "").toLowerCase();
				if (cat.includes("cardio")) return "run";
				if (cat.includes("stretch")) return "stretch";
				if (cat.includes("swim")) return "swim";
				return "pull";
			})(),
			detail: detailString,
			moment,
			estimatedMinutes: 15,
			rest: `${restSeconds}s`,
			steps: exercise.instructions.length > 0 ? exercise.instructions : [displayName],
			xp: 25,
			exerciseId: exercise.id
		});
		const dayName = DAYS_OF_WEEK.find((d) => d.id === selectedDayIndex)?.label ?? "Jour";
		const momentName = MOMENTS.find((m) => m.id === moment)?.label ?? "Créneau";
		toast.success("Exercice ajouté à ton programme !", { description: `"${displayName}" ajouté pour ${dayName} (${momentName}).` });
		onClose();
		setActiveTab("detail");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (v) => !v && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-2xl max-h-[90vh] overflow-y-auto border-border/60 bg-card/95 backdrop-blur-xl p-5 md:p-6 space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
				className: "space-y-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 flex-wrap",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "outline",
								className: "border-primary/40 text-primary px-2.5 py-0.5 text-xs font-semibold capitalize",
								children: categoryLabel
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "secondary",
								className: "text-xs font-medium capitalize",
								children: equipmentLabel
							}),
							exercise.levelFr && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								className: "bg-primary/20 text-primary border-none text-[10px] uppercase font-bold",
								children: exercise.levelFr
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: "text-xl md:text-2xl font-bold tracking-tight text-foreground",
						children: displayName
					}),
					exercise.nameFr && exercise.nameFr !== exercise.name && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, {
						className: "text-xs text-muted-foreground",
						children: ["Titre original : ", exercise.name]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				value: activeTab,
				onValueChange: (v) => setActiveTab(v),
				className: "w-full",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						className: "grid w-full grid-cols-2 bg-muted/50 p-1 rounded-xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "detail",
							className: "text-xs font-semibold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dumbbell, { className: "mr-1.5 h-3.5 w-3.5" }), " Fiche Exercice"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "add",
							className: "text-xs font-semibold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1.5 h-3.5 w-3.5" }), " Ajouter à ma Semaine (Workout Builder)"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						value: "detail",
						className: "space-y-4 pt-3",
						children: [
							exercise.images && exercise.images.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
								children: exercise.images.slice(0, 2).map((imgRelative, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative aspect-4/3 rounded-xl border border-border/80 bg-background/80 overflow-hidden group",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: getExerciseImageUrl(imgRelative),
										alt: `${displayName} - Position ${idx === 0 ? "départ" : "arrivée"}`,
										className: "w-full h-full object-cover transition-transform duration-300 group-hover:scale-105",
										loading: "lazy",
										onError: (e) => {
											e.target.style.display = "none";
										}
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute bottom-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded bg-background/80 backdrop-blur text-foreground border border-border/40",
										children: idx === 0 ? "1. Position Départ" : "2. Position Arrivée"
									})]
								}, idx))
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-6 rounded-xl border border-border/60 bg-background/40 text-center text-xs text-muted-foreground space-y-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dumbbell, { className: "h-6 w-6 mx-auto text-primary opacity-70" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold text-foreground",
										children: "Exercice au poids du corps / Calisthenics"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Consultez les consignes ci-dessous pour exécuter le mouvement." })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2 rounded-xl border border-border/60 bg-background/40 p-3.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "h-3.5 w-3.5 text-primary" }), " Muscles Sollicités"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2 pt-1",
									children: [primaryMusclesList.map((muscle) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
										className: "bg-primary text-primary-foreground text-xs font-semibold px-2.5 py-1",
										children: [
											"🎯 ",
											muscle,
											" (Principal)"
										]
									}, muscle)), secondaryMusclesList.map((muscle) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
										variant: "outline",
										className: "text-xs border-border text-muted-foreground px-2.5 py-1",
										children: [muscle, " (Secondaire)"]
									}, muscle))]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
									className: "text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-3.5 w-3.5 text-primary" }), " Consignes d'Exécution Numérotées"]
								}), exercise.instructions && exercise.instructions.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
									className: "space-y-2 text-xs text-foreground/90",
									children: exercise.instructions.map((stepText, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-start gap-2.5 bg-background/60 p-2.5 rounded-lg border border-border/40",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "h-5 w-5 rounded-full bg-primary/20 text-primary text-[11px] font-bold grid place-items-center shrink-0",
											children: idx + 1
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "leading-relaxed pt-0.5",
											children: stepText
										})]
									}, idx))
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground italic",
									children: "Aucune consigne spécifique enregistrée."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								className: "w-full h-11 text-sm font-bold gap-2 mt-2",
								onClick: () => setActiveTab("add"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Ajouter à ma Semaine"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						value: "add",
						className: "space-y-4 pt-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-primary/30 bg-primary/10 p-3.5 text-xs space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold text-primary block",
									children: "Configuration de la Séance"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Personnalise les séries, répétitions et le créneau avant de l'injecter dans ton planning FORGE."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											className: "text-xs font-bold text-foreground",
											children: "Jour de la Semaine"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											value: String(selectedDayIndex),
											onValueChange: (v) => setSelectedDayIndex(parseInt(v, 10)),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
												className: "h-10 text-xs bg-background",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: DAYS_OF_WEEK.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
												value: String(d.id),
												children: [
													d.label,
													" (",
													getTargetISODate(d.id),
													")"
												]
											}, d.id)) })]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											className: "text-xs font-bold text-foreground",
											children: "Créneau de la Journée"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											value: moment,
											onValueChange: (v) => setMoment(v),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
												className: "h-10 text-xs bg-background",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: MOMENTS.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
												value: m.id,
												children: [
													m.icon,
													" ",
													m.label
												]
											}, m.id)) })]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5 sm:col-span-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											className: "text-xs font-bold text-foreground",
											children: "Type d'Objectif"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-2 gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												type: "button",
												variant: mode === "reps" ? "default" : "outline",
												size: "sm",
												className: "text-xs font-semibold h-9",
												onClick: () => setMode("reps"),
												children: "Répétitions (reps)"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												type: "button",
												variant: mode === "duration" ? "default" : "outline",
												size: "sm",
												className: "text-xs font-semibold h-9",
												onClick: () => setMode("duration"),
												children: "Isométrie (secondes)"
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											className: "text-xs font-bold text-foreground",
											children: "Nombre de Séries"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											type: "number",
											min: "1",
											max: "10",
											value: sets,
											onChange: (e) => setSets(parseInt(e.target.value, 10) || 1),
											className: "h-10 text-xs bg-background"
										})]
									}),
									mode === "reps" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											className: "text-xs font-bold text-foreground",
											children: "Répétitions par Série"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											type: "number",
											min: "1",
											max: "100",
											value: reps,
											onChange: (e) => setReps(parseInt(e.target.value, 10) || 1),
											className: "h-10 text-xs bg-background"
										})]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											className: "text-xs font-bold text-foreground",
											children: "Temps de Maintien (secondes)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											type: "number",
											min: "5",
											max: "600",
											value: durationSeconds,
											onChange: (e) => setDurationSeconds(parseInt(e.target.value, 10) || 5),
											className: "h-10 text-xs bg-background"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5 sm:col-span-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											className: "text-xs font-bold text-foreground",
											children: "Temps de Repos entre Séries (secondes)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											type: "number",
											min: "0",
											max: "300",
											step: "15",
											value: restSeconds,
											onChange: (e) => setRestSeconds(parseInt(e.target.value, 10) || 0),
											className: "h-10 text-xs bg-background"
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pt-2 flex items-center justify-end gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									size: "sm",
									onClick: () => setActiveTab("detail"),
									className: "text-xs",
									children: "Retour"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									onClick: handleAddToWorkout,
									className: "text-xs font-bold gap-1.5 px-5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }), " Valider & Injecter au Planning"]
								})]
							})
						]
					})
				]
			})]
		})
	});
}
/**
* Dictionnaire de traduction Français / Anglais pour le catalogue d'exercices FORGE.
*/
var MUSCLE_TRANSLATIONS = {
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
	core: "Sangle Abdominale"
};
var EQUIPMENT_TRANSLATIONS = {
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
	other: "Matériel divers"
};
var CATEGORY_TRANSLATIONS = {
	strength: "Force & Musculation",
	stretching: "Souplesse & Étirements",
	cardio: "Cardio & Endurance",
	plyometrics: "Pliométrie & Explosivité",
	powerlifting: "Powerlifting",
	strongman: "Strongman",
	olympic_weightlifting: "Haltérophilie",
	calisthenics: "Calisthenics & Poids du corps"
};
var LEVEL_TRANSLATIONS = {
	beginner: "Débutant",
	intermediate: "Intermédiaire",
	expert: "Avancé / Expert"
};
var EXERCISE_NAME_TRANSLATIONS = {
	"inverted row": {
		fr: "Tractions Australiennes (Rowing poids du corps)",
		aliases: [
			"Australian pullup",
			"Bodyweight row",
			"Rowing inversé"
		]
	},
	"australian pull-up": {
		fr: "Tractions Australiennes",
		aliases: ["Inverted row", "Bodyweight row"]
	},
	"bodyweight row": {
		fr: "Tractions Australiennes",
		aliases: ["Inverted row"]
	},
	"pull-up": {
		fr: "Tractions Pronation",
		aliases: ["Pullup", "Traction verticale"]
	},
	"chin-up": {
		fr: "Tractions Supination",
		aliases: ["Chinup", "Traction supination"]
	},
	"l-sit pull-up": {
		fr: "Tractions L-Sit",
		aliases: ["Pullup L-sit"]
	},
	"push-up": {
		fr: "Pompes Militaires",
		aliases: ["Pushup", "Pompe classique"]
	},
	"diamond push-up": {
		fr: "Pompes Diamant",
		aliases: ["Triceps pushup"]
	},
	"decline push-up": {
		fr: "Pompes Déclinées",
		aliases: ["Pompe pieds surélevés"]
	},
	"incline push-up": {
		fr: "Pompes Inclinées",
		aliases: ["Pompe mains surélevées"]
	},
	"sphinx push-up": {
		fr: "Extensions Triceps Sphinx (au sol)",
		aliases: ["Triceps extension floor"]
	},
	dip: {
		fr: "Dips aux Barres Parallèles",
		aliases: ["Répulsions barres parallèles"]
	},
	"chest dip": {
		fr: "Dips Pectoraux",
		aliases: ["Dips barres"]
	},
	"triceps dip": {
		fr: "Dips Triceps",
		aliases: ["Dips banc"]
	},
	"wall sit": {
		fr: "Chaise Isométrique au Mur",
		aliases: ["Chaise au mur"]
	},
	plank: {
		fr: "Gainage Abdominal Planche (Statique)",
		aliases: ["Planche coudes"]
	},
	"commando plank": {
		fr: "Gainage Commando (Passage Coudes/Mains)",
		aliases: ["Plank commando"]
	},
	squat: {
		fr: "Squat au Poids du Corps",
		aliases: ["Air squat"]
	},
	"air squat": {
		fr: "Squat au Poids du Corps",
		aliases: ["Squat"]
	},
	lunge: {
		fr: "Fentes Avancées",
		aliases: ["Walking lunge", "Fente avant"]
	},
	burpee: {
		fr: "Burpees",
		aliases: ["Saut burpee"]
	},
	"mountain climber": {
		fr: "Mountain Climbers",
		aliases: ["Grimpeur"]
	},
	"jumping jack": {
		fr: "Jumping Jacks",
		aliases: ["Saut écart"]
	},
	"muscle-up": {
		fr: "Muscle-Up (Tractions + Dips)",
		aliases: ["Muscle up"]
	},
	"pike push-up": {
		fr: "Pompes Pique (Focus Épaules)",
		aliases: ["Pike pushup"]
	},
	"dragon flag": {
		fr: "Dragon Flag (Gainage Bruce Lee)",
		aliases: ["Gainage dragon"]
	},
	"hollow body hold": {
		fr: "Hollow Body (Gainage Banane)",
		aliases: ["Hollow hold"]
	},
	"bench press": {
		fr: "Développé Couché à la Barre",
		aliases: ["Bench press"]
	},
	"dumbbell bench press": {
		fr: "Développé Couché aux Haltères",
		aliases: ["Dumbbell bench"]
	},
	deadlift: {
		fr: "Soulevé de Terre à la Barre",
		aliases: ["Deadlift"]
	},
	"barbell squat": {
		fr: "Squat à la Barre (Back Squat)",
		aliases: ["Back squat"]
	},
	"overhead press": {
		fr: "Développé Militaire Épaules (Overhead Press)",
		aliases: ["Strict press", "Military press"]
	},
	"biceps curl": {
		fr: "Curl Biceps aux Haltères",
		aliases: ["Bicep curl"]
	},
	"triceps pushdown": {
		fr: "Extension Triceps à la Poulie",
		aliases: ["Pushdown triceps"]
	},
	"lat pulldown": {
		fr: "Tirage Vertical à la Poulie (Lat Pulldown)",
		aliases: ["Tirage poitrine"]
	},
	"seated cable row": {
		fr: "Tirage Horizontal à la Poulie (Seated Row)",
		aliases: ["Tirage horizontal"]
	}
};
function translateMuscle(muscle) {
	if (!muscle) return "";
	return MUSCLE_TRANSLATIONS[muscle.toLowerCase().trim()] ?? muscle;
}
function translateEquipment(eq) {
	if (!eq) return "Poids du corps";
	return EQUIPMENT_TRANSLATIONS[eq.toLowerCase().trim()] ?? eq;
}
function translateCategory(cat) {
	if (!cat) return "Exercice";
	return CATEGORY_TRANSLATIONS[cat.toLowerCase().trim()] ?? cat;
}
function translateLevel(lvl) {
	if (!lvl) return "Tous niveaux";
	return LEVEL_TRANSLATIONS[lvl.toLowerCase().trim()] ?? lvl;
}
function translateExerciseName(name) {
	if (!name) return {
		frName: "",
		enName: "",
		aliases: []
	};
	const normalized = name.toLowerCase().trim();
	for (const [key, val] of Object.entries(EXERCISE_NAME_TRANSLATIONS)) if (normalized === key || normalized.includes(key)) return {
		frName: val.fr,
		enName: name,
		aliases: val.aliases
	};
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
		aliases: [name]
	};
}
async function loadUnifiedExerciseCatalog() {
	try {
		const [resPrimary, resSupplement] = await Promise.allSettled([fetch("/data/exercises.json"), fetch("/data/exercises-supplement.json")]);
		let primaryList = [];
		if (resPrimary.status === "fulfilled" && resPrimary.value.ok) primaryList = await resPrimary.value.json();
		let supplementList = [];
		if (resSupplement.status === "fulfilled" && resSupplement.value.ok) supplementList = await resSupplement.value.json();
		const combinedRaw = [...supplementList, ...primaryList];
		const seenMap = /* @__PURE__ */ new Map();
		combinedRaw.forEach((ex) => {
			const normalizedKey = ex.name.toLowerCase().trim().replace(/[^a-z0-9]/g, "");
			if (!seenMap.has(normalizedKey)) seenMap.set(normalizedKey, ex);
		});
		return Array.from(seenMap.values()).map((ex) => {
			const { frName, aliases } = translateExerciseName(ex.name);
			const primaryMusclesFr = (ex.primaryMuscles || []).map(translateMuscle);
			const secondaryMusclesFr = (ex.secondaryMuscles || []).map(translateMuscle);
			const equipmentFr = translateEquipment(ex.equipment);
			const categoryFr = translateCategory(ex.category);
			const levelFr = translateLevel(ex.level);
			const searchKey = [
				frName,
				ex.name,
				...aliases,
				...primaryMusclesFr,
				...ex.primaryMuscles,
				equipmentFr,
				ex.equipment || "",
				categoryFr
			].join(" ").toLowerCase();
			return {
				...ex,
				nameFr: frName,
				primaryMusclesFr,
				secondaryMusclesFr,
				equipmentFr,
				categoryFr,
				levelFr,
				searchKey
			};
		});
	} catch (error) {
		console.error("Erreur lors du chargement du catalogue d'exercices unifié :", error);
		return [];
	}
}
var ITEMS_PER_PAGE = 24;
function ExerciseCatalog() {
	const [exercises, setExercises] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [selectedMuscle, setSelectedMuscle] = (0, import_react.useState)("all");
	const [selectedEquipment, setSelectedEquipment] = (0, import_react.useState)("all");
	const [selectedLevel, setSelectedLevel] = (0, import_react.useState)("all");
	const [currentPage, setCurrentPage] = (0, import_react.useState)(1);
	const [selectedExercise, setSelectedExercise] = (0, import_react.useState)(null);
	const [modalOpen, setModalOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		async function loadData() {
			try {
				setLoading(true);
				setExercises(await loadUnifiedExerciseCatalog());
			} catch (err) {
				setError(err.message || "Erreur de chargement du catalogue");
			} finally {
				setLoading(false);
			}
		}
		loadData();
	}, []);
	const allMusclesFr = (0, import_react.useMemo)(() => {
		const set = /* @__PURE__ */ new Set();
		exercises.forEach((ex) => {
			ex.primaryMusclesFr?.forEach((m) => set.add(m));
		});
		return Array.from(set).sort();
	}, [exercises]);
	const allEquipmentsFr = (0, import_react.useMemo)(() => {
		const set = /* @__PURE__ */ new Set();
		exercises.forEach((ex) => {
			if (ex.equipmentFr) set.add(ex.equipmentFr);
		});
		return Array.from(set).sort();
	}, [exercises]);
	const filtered = (0, import_react.useMemo)(() => {
		const query = searchQuery.toLowerCase().trim();
		return exercises.filter((ex) => {
			if (query && !ex.searchKey.includes(query)) return false;
			if (selectedMuscle !== "all" && !ex.primaryMusclesFr.includes(selectedMuscle)) return false;
			if (selectedEquipment !== "all" && ex.equipmentFr !== selectedEquipment) return false;
			if (selectedLevel !== "all" && ex.level !== selectedLevel) return false;
			return true;
		});
	}, [
		exercises,
		searchQuery,
		selectedMuscle,
		selectedEquipment,
		selectedLevel
	]);
	const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
	const paginatedExercises = (0, import_react.useMemo)(() => {
		const start = (currentPage - 1) * ITEMS_PER_PAGE;
		return filtered.slice(start, start + ITEMS_PER_PAGE);
	}, [filtered, currentPage]);
	(0, import_react.useEffect)(() => {
		setCurrentPage(1);
	}, [
		searchQuery,
		selectedMuscle,
		selectedEquipment,
		selectedLevel
	]);
	const handleOpenDetail = (ex) => {
		setSelectedExercise(ex);
		setModalOpen(true);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-primary/30 bg-primary/10 p-4 md:p-6 space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							variant: "outline",
							className: "border-primary/40 text-primary px-3 py-1 text-xs w-fit",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "mr-1.5 h-3.5 w-3.5" }), " Base Multi-Sources Complète & Traduite en Français"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs font-semibold text-primary",
							children: [
								filtered.length,
								" exercice",
								filtered.length > 1 ? "s" : "",
								" disponible",
								filtered.length > 1 ? "s" : ""
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl md:text-2xl font-bold tracking-tight text-foreground",
						children: "Catalogue d'Exercices (Français & Multi-Sources)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground max-w-2xl",
						children: "Retrouve les tractions australiennes, calisthenics, musculation et préparation militaire. Dédupliqué et traduit en Français."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-4 md:p-5 border-border/80 bg-card/60 backdrop-blur space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "text",
						placeholder: "Rechercher en Français ou Anglais (ex: Tractions australiennes, Pompes, Squat, Bench Press...)",
						value: searchQuery,
						onChange: (e) => setSearchQuery(e.target.value),
						className: "pl-10 h-10 text-xs bg-background"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-[11px] font-bold text-muted-foreground uppercase mb-1 block",
							children: "Groupe Musculaire"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: selectedMuscle,
							onValueChange: setSelectedMuscle,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "h-9 text-xs bg-background",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Tous les muscles" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
								value: "all",
								children: [
									"Tous les muscles (",
									exercises.length,
									")"
								]
							}), allMusclesFr.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: m,
								children: m
							}, m))] })]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-[11px] font-bold text-muted-foreground uppercase mb-1 block",
							children: "Matériel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: selectedEquipment,
							onValueChange: setSelectedEquipment,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "h-9 text-xs bg-background",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Tout matériel" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "all",
								children: "Tout matériel"
							}), allEquipmentsFr.map((eq) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: eq,
								children: eq
							}, eq))] })]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-[11px] font-bold text-muted-foreground uppercase mb-1 block",
							children: "Niveau"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: selectedLevel,
							onValueChange: setSelectedLevel,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "h-9 text-xs bg-background",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Tous niveaux" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "all",
									children: "Tous niveaux"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "beginner",
									children: "Débutant"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "intermediate",
									children: "Intermédiaire"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "expert",
									children: "Avancé / Expert"
								})
							] })]
						})] })
					]
				})]
			}),
			loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "py-20 flex flex-col items-center justify-center space-y-3 text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm font-medium",
					children: "Chargement et fusion des sources d'exercices..."
				})]
			}) : error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-8 text-center rounded-xl border border-destructive/40 bg-destructive/10 text-destructive text-sm font-medium",
				children: ["⚠️ ", error]
			}) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-12 text-center rounded-xl border border-border bg-card/40 text-muted-foreground space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dumbbell, { className: "h-8 w-8 mx-auto opacity-50" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold",
						children: "Aucun exercice ne correspond à ta recherche."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs",
						children: "Essaie de réinitialiser tes filtres ou la barre de recherche."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "sm",
						onClick: () => {
							setSearchQuery("");
							setSelectedMuscle("all");
							setSelectedEquipment("all");
							setSelectedLevel("all");
						},
						className: "text-xs mt-2",
						children: "Réinitialiser les filtres"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4",
					children: paginatedExercises.map((ex) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						onClick: () => handleOpenDetail(ex),
						className: "group border-border/70 bg-card/50 hover:bg-card hover:border-primary/50 transition-all cursor-pointer overflow-hidden flex flex-col justify-between space-y-3 p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative aspect-4/3 rounded-lg bg-background/80 overflow-hidden border border-border/40",
							children: [ex.images && ex.images.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: getExerciseImageUrl(ex.images[0]),
								alt: ex.nameFr,
								className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300",
								loading: "lazy",
								onError: (e) => {
									e.target.style.display = "none";
								}
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "w-full h-full grid place-items-center text-muted-foreground text-xs p-3 text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dumbbell, { className: "h-6 w-6 mb-1 text-primary opacity-80" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] text-muted-foreground",
									children: "Calisthenics / Exercice"
								})]
							}), ex.levelFr && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								className: "absolute top-2 right-2 bg-background/80 backdrop-blur text-[9px] text-foreground font-bold border-none uppercase",
								children: ex.levelFr
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5 flex-1 flex flex-col justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-bold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2",
								children: ex.nameFr
							}), ex.nameFr !== ex.name && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[10px] text-muted-foreground/70 block truncate",
								children: [
									"(",
									ex.name,
									")"
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-1.5 pt-2",
								children: [ex.primaryMusclesFr && ex.primaryMusclesFr.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									variant: "secondary",
									className: "text-[10px] font-semibold px-2 py-0.5",
									children: ["🎯 ", ex.primaryMusclesFr[0]]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "outline",
									className: "text-[10px] border-border text-muted-foreground px-2 py-0.5",
									children: ex.equipmentFr
								})]
							})]
						})]
					}, ex.id))
				}), totalPages > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between pt-4 border-t border-border/60",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs text-muted-foreground",
						children: [
							"Page ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "text-foreground",
								children: currentPage
							}),
							" sur ",
							totalPages,
							" (",
							filtered.length,
							" exercices)"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							disabled: currentPage === 1,
							onClick: () => setCurrentPage((p) => Math.max(1, p - 1)),
							className: "h-8 text-xs gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-3.5 w-3.5" }), " Précédent"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							disabled: currentPage === totalPages,
							onClick: () => setCurrentPage((p) => Math.min(totalPages, p + 1)),
							className: "h-8 text-xs gap-1",
							children: ["Suivant ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3.5 w-3.5" })]
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExerciseDetailModal, {
				exercise: selectedExercise,
				open: modalOpen,
				onClose: () => setModalOpen(false)
			})
		]
	});
}
function CataloguePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Catalogue d'Exercices",
		subtitle: "Consulte les fiches d'exercices et construis tes séances sur-mesure."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "px-4 md:px-8 pb-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExerciseCatalog, {})
	})] });
}
//#endregion
export { CataloguePage as component };
