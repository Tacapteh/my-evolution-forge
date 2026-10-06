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
//#region node_modules/.nitro/vite/services/ssr/assets/catalogue-C6y4ZMSs.js
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
		const mappedCategoryType = (() => {
			const cat = (exercise.category || "").toLowerCase();
			if (cat.includes("cardio")) return "run";
			if (cat.includes("stretch")) return "stretch";
			if (cat.includes("swim")) return "swim";
			return "pull";
		})();
		addCustomTask(targetISO, {
			label: exercise.name,
			type: mappedCategoryType,
			detail: detailString,
			moment,
			estimatedMinutes: 15,
			rest: `${restSeconds}s`,
			steps: exercise.instructions.length > 0 ? exercise.instructions : [exercise.name],
			xp: 25,
			exerciseId: exercise.id
		});
		const dayName = DAYS_OF_WEEK.find((d) => d.id === selectedDayIndex)?.label ?? "Jour";
		const momentName = MOMENTS.find((m) => m.id === moment)?.label ?? "Créneau";
		toast.success("Exercice ajouté à ton programme !", { description: `"${exercise.name}" ajouté pour ${dayName} (${momentName}).` });
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
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "outline",
								className: "border-primary/40 text-primary px-2.5 py-0.5 text-xs font-semibold capitalize",
								children: exercise.category || "Exercice"
							}),
							exercise.equipment && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "secondary",
								className: "text-xs font-medium capitalize",
								children: exercise.equipment
							}),
							exercise.level && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								className: "bg-primary/20 text-primary border-none text-[10px] uppercase font-bold",
								children: exercise.level
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: "text-xl md:text-2xl font-bold tracking-tight text-foreground",
						children: exercise.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						className: "text-xs text-muted-foreground",
						children: "Fiche technique et ajout au planning hebdomadaire."
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
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
								children: exercise.images.slice(0, 2).map((imgRelative, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative aspect-4/3 rounded-xl border border-border/80 bg-background/80 overflow-hidden group",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: getExerciseImageUrl(imgRelative),
										alt: `${exercise.name} - Position ${idx === 0 ? "départ" : "arrivée"}`,
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
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2 rounded-xl border border-border/60 bg-background/40 p-3.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "h-3.5 w-3.5 text-primary" }), " Muscles Sollicités"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2 pt-1",
									children: [exercise.primaryMuscles.map((muscle) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
										className: "bg-primary text-primary-foreground text-xs font-semibold px-2.5 py-1",
										children: [
											"🎯 ",
											muscle,
											" (Principal)"
										]
									}, muscle)), exercise.secondaryMuscles.map((muscle) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
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
								}), exercise.instructions.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
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
				const res = await fetch("/data/exercises.json");
				if (!res.ok) throw new Error("Impossible de charger le fichier /data/exercises.json");
				setExercises(await res.json());
			} catch (err) {
				setError(err.message || "Erreur de chargement");
			} finally {
				setLoading(false);
			}
		}
		loadData();
	}, []);
	const allMuscles = (0, import_react.useMemo)(() => {
		const set = /* @__PURE__ */ new Set();
		exercises.forEach((ex) => {
			ex.primaryMuscles?.forEach((m) => set.add(m));
		});
		return Array.from(set).sort();
	}, [exercises]);
	const allEquipments = (0, import_react.useMemo)(() => {
		const set = /* @__PURE__ */ new Set();
		exercises.forEach((ex) => {
			if (ex.equipment) set.add(ex.equipment);
		});
		return Array.from(set).sort();
	}, [exercises]);
	const filtered = (0, import_react.useMemo)(() => {
		return exercises.filter((ex) => {
			if (searchQuery.trim() && !ex.name.toLowerCase().includes(searchQuery.toLowerCase().trim())) return false;
			if (selectedMuscle !== "all" && !ex.primaryMuscles.includes(selectedMuscle)) return false;
			if (selectedEquipment !== "all" && ex.equipment !== selectedEquipment) return false;
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
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							variant: "outline",
							className: "border-primary/40 text-primary px-3 py-1 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "mr-1.5 h-3.5 w-3.5" }), " Base Open-Source +800 Exercices"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs font-semibold text-primary",
							children: [
								filtered.length,
								" exercice",
								filtered.length > 1 ? "s" : "",
								" trouvé",
								filtered.length > 1 ? "s" : ""
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl md:text-2xl font-bold tracking-tight text-foreground",
						children: "Catalogue & Workout Builder"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground max-w-2xl",
						children: "Explore l'ensemble de la bibliothèque d'exercices open-source et injecte n'importe quel mouvement dans ton programme d'entraînement FORGE."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-4 md:p-5 border-border/80 bg-card/60 backdrop-blur space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "text",
						placeholder: "Rechercher un exercice (ex: Bench Press, Pullup, Squat...)",
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
							}), allMuscles.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: m,
								className: "capitalize",
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
							}), allEquipments.map((eq) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: eq,
								className: "capitalize",
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
									children: "Beginner (Débutant)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "intermediate",
									children: "Intermediate (Intermédiaire)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "expert",
									children: "Expert (Avancé)"
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
					children: "Chargement du catalogue d'exercices..."
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
								alt: ex.name,
								className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300",
								loading: "lazy",
								onError: (e) => {
									e.target.style.display = "none";
								}
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-full h-full grid place-items-center text-muted-foreground text-xs",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dumbbell, { className: "h-6 w-6" })
							}), ex.level && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								className: "absolute top-2 right-2 bg-background/80 backdrop-blur text-[9px] text-foreground font-bold border-none uppercase",
								children: ex.level
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5 flex-1 flex flex-col justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-bold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1",
								children: ex.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] text-muted-foreground capitalize block mt-0.5",
								children: ex.category
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-1.5 pt-2",
								children: [ex.primaryMuscles.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									variant: "secondary",
									className: "text-[10px] font-semibold capitalize px-2 py-0.5",
									children: ["🎯 ", ex.primaryMuscles[0]]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "outline",
									className: "text-[10px] border-border text-muted-foreground capitalize px-2 py-0.5",
									children: ex.equipment || "Poids du corps"
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
