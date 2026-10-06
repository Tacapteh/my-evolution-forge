import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { C as Info, E as Footprints, G as Armchair, K as Activity, N as CircleCheck, T as Gem, V as Brain, c as Sunset, f as Sparkles, g as RotateCcw, j as Clock, k as Dumbbell, l as Sunrise, o as Timer, p as Shield, u as Sun, v as Play, y as Pencil, z as Calendar } from "../_libs/lucide-react.mjs";
import { f as toISO, g as useForge, i as PageHeader, o as cn, p as todayISO } from "./AppShell-yhw2ilih.mjs";
import { n as Card, t as Button } from "./button-D_zJYbhK.mjs";
import { t as Badge } from "./badge-BtatB9oZ.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogDescription, t as Dialog } from "./dialog-BzB40wt4.mjs";
import { r as toast } from "../_libs/sonner.mjs";
import { t as Progress } from "./progress-BAbHzKg4.mjs";
import { a as ProgramHeader, i as FocusSessionPanel, t as Checkbox } from "./program-components-CxYpUJUC.mjs";
import { t as createTrainingEngine } from "./trainingEngine-BrV9Cuh-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/programme-pZEhCkYq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ExerciseSwapModal({ open, onClose, dateISO, moment, momentLabel, currentTask, userMaxPull, userMaxChair, userMaxPush, onSelectAlternative, onReset }) {
	if (!open) return null;
	const taskLabel = currentTask?.label ?? "";
	const taskType = currentTask?.type ?? "pull";
	const isPyramid = taskLabel.toLowerCase().includes("pyramide");
	const isDegressive = taskLabel.toLowerCase().includes("dégressif") || taskLabel.toLowerCase().includes("degressif");
	const isSubmax = taskLabel.toLowerCase().includes("sous-maximal") || taskLabel.toLowerCase().includes("séries réparties");
	const isIso = taskType === "chair" || taskLabel.toLowerCase().includes("chaise") || taskLabel.toLowerCase().includes("gainage");
	let intentionName = "Séries réparties";
	if (isPyramid) intentionName = "Format Pyramidal (Montée & Descente)";
	else if (isDegressive) intentionName = "Format Dégressif (Épuisement)";
	else if (isIso) intentionName = "Format Isométrique (Maintien continu)";
	else if (isSubmax) intentionName = "Format Séries Réparties (Sous-maximal)";
	const pPushMax = Math.max(12, userMaxPush);
	const peakPush = Math.max(8, Math.round(pPushMax * .4));
	const pyramidPushStr = `${Math.round(peakPush * .2)}-${Math.round(peakPush * .5)}-${Math.round(peakPush * .8)}-${peakPush}-${Math.round(peakPush * .8)}-${Math.round(peakPush * .5)}-${Math.round(peakPush * .2)}`;
	const submaxPushReps = Math.max(6, Math.round(pPushMax * .6));
	const degressivePushStr = `${Math.round(pPushMax * .6)}-${Math.round(pPushMax * .5)}-${Math.round(pPushMax * .4)}-${Math.round(pPushMax * .3)}-${Math.round(pPushMax * .2)}`;
	const chairMax = Math.max(45, userMaxChair);
	const submaxChairSecs = Math.max(30, Math.round(chairMax * .7));
	const pyramidChairStr = `${Math.round(chairMax * .4)}s - ${Math.round(chairMax * .7)}s - ${Math.round(chairMax * .9)}s - ${Math.round(chairMax * .7)}s - ${Math.round(chairMax * .4)}s`;
	const degressiveChairStr = `${Math.round(chairMax * .8)}s - ${Math.round(chairMax * .65)}s - ${Math.round(chairMax * .5)}s - ${Math.round(chairMax * .35)}s`;
	const alternatives = [];
	if (taskType === "pull" || taskType === "custom" || taskLabel.toLowerCase().includes("traction") || taskLabel.toLowerCase().includes("pompe") || taskLabel.toLowerCase().includes("poussée") || taskLabel.toLowerCase().includes("renforcement") || taskLabel.toLowerCase().includes("bras")) if (taskLabel.toLowerCase().includes("pompe") || taskLabel.toLowerCase().includes("poussée") || taskLabel.toLowerCase().includes("triceps")) {
		const structPush = isPyramid ? `Pyramide : ${pyramidPushStr} reps` : isDegressive ? `Dégressif : ${degressivePushStr} reps` : `5 séries × ${submaxPushReps} reps`;
		alternatives.push({
			id: "pompes_militaires",
			title: "Pompes Militaires",
			icon: Shield,
			badge: "Polyarticulaire / Pectoraux & Triceps",
			structure: structPush,
			tempo: "Tempo 2010 (2s descente, 0s pause, 1s montée, 0s pause)",
			rest: "90s",
			formConsignes: "Coudes orientés à 45° par rapport au tronc, corps parfaitement gainé, poitrine effleurant le sol à chaque répétition.",
			detail: `Exercice polyarticulaire de poussée. Basé sur Max Pompes = ${pPushMax}.`
		});
		alternatives.push({
			id: "pompes_diamant",
			title: "Pompes Diamant",
			icon: Gem,
			badge: "Polyarticulaire Heavy / Triceps & Sternum",
			structure: structPush,
			tempo: "Tempo 2010 (2s descente, 0s pause, 1s montée, 0s pause)",
			rest: "90s",
			formConsignes: "Mains jointes en forme de diamant sous le sternum, coudes collés au corps lors de la descente.",
			detail: `Travail ciblé sur les triceps et le sternum. Basé sur Max Pompes = ${pPushMax}.`
		});
		alternatives.push({
			id: "pompes_declinees",
			title: "Pompes Déclinées sur chaise",
			icon: Armchair,
			badge: "Polyarticulaire / Haut de poitrine & Épaules",
			structure: structPush,
			tempo: "Tempo 2010 (2s descente, 0s pause, 1s montée, 0s pause)",
			rest: "90s",
			formConsignes: "Pieds surélevés sur une chaise/banc, mains au sol largeur d'épaules, corps droit sans creuser le bas du dos.",
			detail: `Accentuation de la charge sur le haut des pectoraux. Basé sur Max Pompes = ${pPushMax}.`
		});
		alternatives.push({
			id: "bras_triceps_sol",
			title: "Extensions Triceps au Sol (Smart Swap Inter-Module)",
			icon: Dumbbell,
			badge: "Isolation Triceps / Inter-Module Finisher ↔ Main",
			structure: `5 séries × ${Math.max(4, Math.round(pPushMax * .7))} reps (Compensation Isolation)`,
			tempo: "Tempo 3010 (Contrôle strict de la poussée des triceps)",
			rest: "60s",
			formConsignes: "Planche sur avant-bras, coudes posés au sol, poussée explosive sur les paumes pour tendre complètement les bras.",
			detail: "Mouvement d'isolation remplaçant les pompes polyarticulaires avec compensation de volume (+15%)."
		});
	} else {
		alternatives.push({
			id: "tractions_lsit",
			title: "Tractions L-Sit (Tirage Horizontal / Core)",
			icon: Dumbbell,
			badge: "Polyarticulaire / Dos, Biceps & Abdos",
			structure: isPyramid ? `Pyramide : 1-2-3-4-3-2-1 reps` : `5 séries × ${Math.max(3, Math.round(userMaxPull * .5))} reps`,
			tempo: "Tempo 2010 (2s descente, 0s pause, 1s montée, 0s pause)",
			rest: "90s",
			formConsignes: "Suspendu à la barre, lever les jambes tendues à 90° (parallèles au sol), puis effectuer la traction. Option genoux pliés à 90° (Tuck L-Sit) au besoin.",
			detail: `Combinaison de tirage vertical et de gainage abdominal intense. Basé sur Max Tractions = ${userMaxPull}.`
		});
		alternatives.push({
			id: "bras_biceps_iso",
			title: "Tractions Supination Iso 90° (Smart Swap Inter-Module)",
			icon: Timer,
			badge: "Isolation Biceps / Inter-Module Finisher ↔ Main",
			structure: `5 séries × 20s (Maintien Isométrique)`,
			tempo: "Isométrie 1000 (Blocage strict de l'angle à 90°)",
			rest: "60s",
			formConsignes: "Prise supination serrée (paumes vers vous), tirer jusqu'à 90° et maintenir le blocage.",
			detail: "Mouvement isométrique d'isolation biceps héritant du format du bloc principal."
		});
		alternatives.push({
			id: "bras_biceps_neg",
			title: "Tractions Supination Négatives 5s (Excentrique)",
			icon: RotateCcw,
			badge: "Excentrique Biceps / Inter-Module Finisher ↔ Main",
			structure: `5 séries × 5 reps (Descente freinée 5s)`,
			tempo: "Tempo 5010 (5s descente très lente)",
			rest: "90s",
			formConsignes: "Départ menton au-dessus de la barre, freiner la descente sur 5 secondes complètes.",
			detail: "Travail excentrique lourd ciblant le recrutement des fibres musculaires des biceps."
		});
	}
	if (taskType === "chair" || isIso) {
		const structIso = isPyramid ? `Pyramide : ${pyramidChairStr}` : isDegressive ? `Dégressif : ${degressiveChairStr}` : `4 séries × ${submaxChairSecs}s`;
		alternatives.push({
			id: "gainage_commando",
			title: "Gainage Commando (Coudes ↔ Mains)",
			icon: Shield,
			badge: "Core Dynamique / Abdos & Stabilité",
			structure: `3 séries × ${Math.max(25, Math.round(chairMax * .7))}s`,
			tempo: "Dynamique contrôlé",
			rest: "60s",
			formConsignes: "Départ en planche sur coudes, montée alternative sur bras tendus sans balancement du bassin.",
			detail: "Gainage dynamique du tronc en remplacement de la chaise statique."
		});
		alternatives.push({
			id: "squat_iso",
			title: "Squat Isométrique (Mur)",
			icon: Timer,
			badge: "Isométrie / Quadriceps & Fessiers",
			structure: structIso,
			tempo: "Isométrie 1000 (Maintien statique continu à 90°)",
			rest: "60s",
			formConsignes: "Dos plaqué au mur, cuisses parallèles au sol à 90° exacts, mains libres sans appui sur les cuisses.",
			detail: `Renforcement isométrique pur des membres inférieurs. Basé sur Record = ${chairMax}s.`
		});
	}
	if (taskType === "swim" || taskType === "run") {
		alternatives.push({
			id: "natation",
			title: "Natation — 1000m continu & éducatifs",
			icon: Activity,
			badge: "Aquatique / Cardiorespiratoire",
			structure: "Bloc continu 1000m",
			tempo: "Allure régulée 70-75% VMA",
			rest: "30s entre éducatifs",
			detail: "Endurance respiratoire & aisance aquatique."
		});
		alternatives.push({
			id: "course",
			title: "Course à pied — Endurance Fondamentale",
			icon: Activity,
			badge: "Cardio / Endurance",
			structure: "45 min continu",
			tempo: "Aisance respiratoire (75% VMA)",
			rest: "Marche 2 min au besoin",
			detail: "Base d'endurance fondamentale sans traumatisme."
		});
		alternatives.push({
			id: "fractionne",
			title: "Course — Fractionné court 30/30",
			icon: Activity,
			badge: "Cardio / VMA Spécifique",
			structure: "12 × (30s rapide / 30s trotté)",
			tempo: "100% VMA sur l'effort",
			rest: "30s trotté actif",
			detail: "Développement du VMA et soutien de la vitesse."
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (v) => !v && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-2xl max-h-[90vh] overflow-y-auto border-primary/30 bg-card/95 backdrop-blur-xl p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
					className: "space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center justify-between",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: "outline",
								className: "border-primary/40 text-primary px-3 py-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "mr-1.5 h-3.5 w-3.5" }), " Système Intelligent de Remplacement"]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
							className: "text-2xl font-bold tracking-tight",
							children: [
								"Modifier l'exercice (",
								momentLabel,
								")"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, {
							className: "text-xs text-muted-foreground",
							children: [
								"L'alternative choisie conserve ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-primary font-semibold",
									children: "STRICTEMENT l'intention de la séance"
								}),
								" et s'adapte à ton niveau d'après ton Test Max."
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-primary/30 bg-primary/10 p-4 space-y-2.5 my-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Intention Détectée : ", intentionName] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs text-foreground/90 font-medium",
							children: ["Exercice actuel : ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold",
								children: taskLabel || "Activité programmée"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2 text-[11px] text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["• Max Tractions: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
									className: "text-foreground",
									children: [userMaxPull, " reps"]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["• Max Chaise: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
									className: "text-foreground",
									children: [userMaxChair, "s"]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["• Max Pompes (calculé): ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
									className: "text-foreground",
									children: [pPushMax, " reps"]
								})] })
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3 my-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "text-xs font-bold uppercase tracking-wider text-muted-foreground",
						children: "Alternatives Adaptées (Intention préservée)"
					}), alternatives.map((alt) => {
						const Icon = alt.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							onClick: () => {
								onSelectAlternative(alt.id);
								onClose();
							},
							className: "p-4 border-border/80 bg-background/50 hover:bg-primary/10 hover:border-primary/50 transition-all cursor-pointer group space-y-2.5 relative overflow-hidden",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-9 w-9 rounded-lg bg-primary/15 text-primary grid place-items-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-bold text-sm text-foreground group-hover:text-primary transition-colors",
											children: alt.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-semibold text-muted-foreground block",
											children: alt.badge
										})] })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "secondary",
										className: "text-[10px] font-bold shrink-0",
										children: "Sélectionner"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs pt-2 border-t border-border/40 font-medium",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "bg-card/60 p-2 rounded border border-border/40",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] text-muted-foreground block font-bold uppercase",
												children: "Structure"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-primary font-semibold",
												children: alt.structure
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "bg-card/60 p-2 rounded border border-border/40",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] text-muted-foreground block font-bold uppercase",
												children: "Tempo Exact"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-foreground",
												children: alt.tempo
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "bg-card/60 p-2 rounded border border-border/40",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] text-muted-foreground block font-bold uppercase",
												children: "Repos Strict"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-foreground",
												children: alt.rest
											})]
										})
									]
								}),
								alt.formConsignes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-[11px] bg-muted/30 p-2 rounded border border-border/30 text-muted-foreground italic",
									children: [
										"💡 ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											className: "text-foreground",
											children: "Consignes de forme :"
										}),
										" ",
										alt.formConsignes
									]
								})
							]
						}, alt.id);
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-border/60",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: () => {
							onReset();
							onClose();
						},
						className: "text-xs text-muted-foreground hover:text-foreground gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-3.5 w-3.5" }), " Réinitialiser l'exercice d'origine"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "sm",
						onClick: onClose,
						className: "text-xs",
						children: "Annuler"
					})]
				})
			]
		})
	});
}
var MOMENT_ICONS = {
	morning: Sunrise,
	afternoon: Sun,
	evening: Sunset,
	psychotechniques: Brain
};
var MOMENT_LABELS = {
	morning: "Matin",
	afternoon: "Après-midi",
	evening: "Soir",
	psychotechniques: "Psychotechniques"
};
function ProgrammePage() {
	const { state, hydrated, toggleTask, startSession, addPerf, setMomentSwap, setTaskSwap, setTaskRealization } = useForge();
	const today = todayISO();
	const [viewMode, setViewMode] = (0, import_react.useState)("today");
	const [anchor, setAnchor] = (0, import_react.useState)(() => /* @__PURE__ */ new Date());
	const [focusOpen, setFocusOpen] = (0, import_react.useState)(false);
	const [focusISO, setFocusISO] = (0, import_react.useState)(today);
	const [swapModalState, setSwapModalState] = (0, import_react.useState)({
		open: false,
		dateISO: "",
		moment: ""
	});
	const handleLogDistance = (task, dateISO) => {
		const targetDist = task.targetDistance ?? 5;
		const unit = task.unit ?? "km";
		const promptMsg = `Saisissez la distance réellement effectuée pour "${task.label}" :\nObjectif cible : ${targetDist} ${unit}\n\nDistance réalisée (${unit}) :`;
		const input = window.prompt(promptMsg, String(task.actualDistance ?? targetDist));
		if (input === null) return;
		const actual = parseFloat(input.replace(",", "."));
		if (isNaN(actual) || actual < 0) return;
		const penalty = actual < targetDist;
		const baseXP = task.xp ?? 35;
		const xpAwarded = penalty ? Math.max(5, Math.round(baseXP * (actual / targetDist))) : baseXP;
		setTaskRealization(dateISO, task.id, {
			actual,
			target: targetDist,
			unit,
			penalty,
			xpAwarded
		});
		if (penalty) {
			const gap = +(targetDist - actual).toFixed(1);
			toast.error(`⚠️ Pénalité appliquée pour ${task.label}`, {
				description: `Distance effectuée (${actual} ${unit}) inférieure à la cible (${targetDist} ${unit}). Écart: -${gap} ${unit}. Gain réduit à ${xpAwarded} XP.`,
				duration: 5e3
			});
		} else toast.success(`✅ Objectif distance validé !`, {
			description: `${actual} ${unit} réalisés sur ${targetDist} ${unit} cible. +${xpAwarded} XP enregistrés.`,
			duration: 4e3
		});
	};
	const handleSwapTask = (date, task) => {
		setSwapModalState({
			open: true,
			dateISO: date,
			moment: task.moment,
			task
		});
	};
	const handleSwapMoment = (date, moment) => {
		setSwapModalState({
			open: true,
			dateISO: date,
			moment,
			task: null
		});
	};
	const handleSelectSwap = (swapId) => {
		if (!swapModalState.dateISO) return;
		if (swapModalState.task?.id) setTaskSwap(swapModalState.dateISO, swapModalState.task.id, swapId);
		else if (swapModalState.moment) setMomentSwap(swapModalState.dateISO, swapModalState.moment, swapId);
		toast.success("Exercice remplacé avec succès !", { description: `L'alternative préserve l'intention de la séance et s'adapte à vos Max.` });
	};
	const handleResetSwap = () => {
		if (!swapModalState.dateISO) return;
		if (swapModalState.task?.id) setTaskSwap(swapModalState.dateISO, swapModalState.task.id, "");
		else if (swapModalState.moment) setMomentSwap(swapModalState.dateISO, swapModalState.moment, "");
		toast.info("Exercice d'origine restauré.", { description: `La programmation initiale a été rétablie pour cet exercice.` });
	};
	const engine = (0, import_react.useMemo)(() => createTrainingEngine(state, { toggleTask }, { todayISO: today }), [
		state,
		toggleTask,
		today
	]);
	const week = (0, import_react.useMemo)(() => engine.getCurrentWeek(toISO(anchor)), [anchor, engine]);
	const weekMissions = (0, import_react.useMemo)(() => {
		return (week || []).map((day) => {
			return {
				day,
				mission: engine.getMission(day.iso),
				checked: state.days?.[day.iso]?.checked ?? {}
			};
		});
	}, [
		week,
		engine,
		state.days
	]);
	const todayMission = (0, import_react.useMemo)(() => engine.getMission(today), [engine, today]);
	const todayChecked = state.days?.[today]?.checked ?? {};
	const focusMission = (0, import_react.useMemo)(() => engine.getMission(focusISO), [engine, focusISO]);
	const focusChecked = state.days?.[focusISO]?.checked ?? {};
	const weekProgress = (0, import_react.useMemo)(() => {
		let totalTasks = 0;
		let completedTasks = 0;
		weekMissions.forEach(({ mission }) => {
			totalTasks += mission.totalCount;
			completedTasks += mission.doneCount;
		});
		return totalTasks ? Math.round(completedTasks / totalTasks * 100) : 0;
	}, [weekMissions]);
	if (!hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-background text-foreground flex items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-10 w-10 text-primary animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs font-bold uppercase tracking-widest text-muted-foreground",
				children: "Chargement du planning..."
			})]
		})
	});
	const weekLabel = `${formatShortDate(week[0].iso)} - ${formatShortDate(week[6].iso)}`;
	const handleToggleForISO = (taskId, iso) => {
		const task = engine.getMission(iso).tasks.find((item) => item.id === taskId);
		const wasDone = !!(state.days?.[iso]?.checked ?? {})[taskId];
		toggleTask(iso, taskId);
		if (task && !wasDone) {
			toast.success(`+${task.xp} XP`, {
				description: task.label,
				duration: 2e3
			});
			if (task.label.includes("TEST MAX") || task.type === "pull" || task.type === "chair") setTimeout(() => {
				if (task.type === "pull" || task.label.includes("TRACTIONS")) {
					const currentMax = engine.getUserMaxes?.()?.userMaxPull ?? 6;
					const input = window.prompt(`Validation Tractions (RIR 1-2) — Combien de tractions as-tu réalisées sur la dernière série ?\n(Max actuel : ${currentMax} reps)`, String(currentMax));
					if (input) {
						const val = parseInt(input, 10);
						if (!isNaN(val) && val > currentMax) {
							addPerf({
								type: "pull",
								value: val,
								date: iso
							});
							toast.success(`🎉 Nouveau Max Tractions enregistré : ${val} reps !`, {
								description: "Les cibles et volumes des séances suivantes ont été recalculés automatiquement.",
								duration: 4e3
							});
						}
					}
				} else if (task.type === "chair" || task.label.includes("CHAISE")) {
					const currentMax = engine.getUserMaxes?.()?.userMaxChair ?? 60;
					const input = window.prompt(`Validation Chaise Isométrique — Combien de secondes as-tu tenues sur la dernière série ?\n(Record actuel : ${currentMax}s)`, String(currentMax));
					if (input) {
						const val = parseInt(input, 10);
						if (!isNaN(val) && val > currentMax) {
							addPerf({
								type: "chair",
								value: val,
								date: iso
							});
							toast.success(`🎉 Nouveau Record Chaise enregistré : ${val}s !`, {
								description: "Les cibles et volumes des séances suivantes ont été recalculés automatiquement.",
								duration: 4e3
							});
						}
					}
				} else if (task.label.includes("LUC LÉGER")) {
					const input = window.prompt("Bravo pour ton Test Luc Léger ! Quel Palier as-tu atteint (ex: 8.5) ?", "8.0");
					if (input) {
						const val = parseFloat(input);
						if (!isNaN(val) && val > 0) {
							addPerf({
								type: "luc",
								value: val,
								date: iso
							});
							toast.success(`Nouveau Palier Luc Léger enregistré : Palier ${val} !`, {
								description: "Tes allures de fractionné VMA pour les 2 prochaines semaines ont été recalculées.",
								duration: 4e3
							});
						}
					}
				}
			}, 100);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground pb-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: "Programme",
				subtitle: "Planification d'entraînement militaire adaptatif."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-4 md:px-8 space-y-6 max-w-7xl mx-auto",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 p-1 bg-card border border-border/80 rounded-xl shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setViewMode("today"),
								className: cn("px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2", viewMode === "today" ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:text-foreground"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "h-4 w-4" }), " Aujourd'hui"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setViewMode("week"),
								className: cn("px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2", viewMode === "week" ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:text-foreground"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-4 w-4" }), " Semaine complète"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									variant: "outline",
									className: "border-primary/40 text-primary px-2.5 py-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dumbbell, { className: "mr-1.5 h-3.5 w-3.5" }),
										" Tractions : ",
										Math.max(6, ...state.perf?.filter((p) => p.type === "pull").map((p) => p.value) ?? []),
										" reps"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									variant: "outline",
									className: "border-primary/40 text-primary px-2.5 py-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timer, { className: "mr-1.5 h-3.5 w-3.5" }),
										" Chaise : ",
										Math.max(60, ...state.perf?.filter((p) => p.type === "chair").map((p) => p.value) ?? []),
										"s"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									variant: "outline",
									className: "border-primary/40 text-primary px-2.5 py-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footprints, { className: "mr-1.5 h-3.5 w-3.5" }),
										" Luc Léger : Palier ",
										Math.max(7, ...state.perf?.filter((p) => p.type === "luc").map((p) => p.value) ?? [])
									]
								})
							]
						})]
					}),
					viewMode === "today" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-6 animate-fade-in",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "p-6 md:p-8 border-primary/40 bg-card/60 backdrop-blur-md shadow-glow relative overflow-hidden",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border/60",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-xs font-bold uppercase tracking-widest text-primary",
											children: ["Mission Du Jour — ", todayMission.dayName]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "text-2xl md:text-3xl font-extrabold tracking-tight mt-1",
											children: todayMission.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-muted-foreground mt-1",
											children: todayMission.objective
										})
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-4 shrink-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-right",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-muted-foreground block font-medium",
												children: "Complétion"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-2xl font-black text-primary",
												children: [todayMission.completionPct, "%"]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											size: "lg",
											className: "gap-2 shadow-lg hover:shadow-primary/20",
											onClick: () => {
												startSession(today);
												setFocusISO(today);
												setFocusOpen(true);
											},
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-4 w-4" }), " Lancer la Séance"]
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-6 space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-xs font-semibold text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											"Progression : ",
											todayMission.doneCount,
											" / ",
											todayMission.totalCount,
											" tâches faites"
										] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [todayMission.xp, " XP accumulés"] })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
										value: todayMission.completionPct,
										className: "h-2.5 bg-muted"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-1 md:grid-cols-2 gap-6 mt-8",
									children: [
										"morning",
										"afternoon",
										"evening",
										"psychotechniques"
									].map((momentKey) => {
										const Icon = MOMENT_ICONS[momentKey];
										const label = MOMENT_LABELS[momentKey];
										const tasks = todayMission.tasks.filter((t) => t.moment === momentKey);
										if (tasks.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-xl border border-border/40 bg-muted/10 p-4 space-y-2 opacity-80 hover:opacity-100 transition-opacity",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between text-xs font-bold uppercase tracking-wider text-muted-foreground pb-2 border-b border-border/40",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4 text-muted-foreground/50" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label })]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
													variant: "ghost",
													size: "sm",
													className: "h-6 text-[10px] px-2 text-primary hover:text-primary gap-1",
													onClick: () => handleSwapMoment(today, momentKey),
													title: "Ajouter une activité",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-3 w-3" }), " + Ajouter"]
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[11px] text-muted-foreground/70 italic",
												children: "Aucune activité programmée."
											})]
										}, momentKey);
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-xl border border-border/60 bg-muted/20 p-4 space-y-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between text-xs font-bold uppercase tracking-wider text-muted-foreground pb-2 border-b border-border/40",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label })]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
													variant: "ghost",
													size: "sm",
													className: "h-6 text-[10px] px-2 text-muted-foreground hover:text-primary gap-1",
													onClick: () => handleSwapMoment(today, momentKey),
													title: "Modifier l'activité de ce moment",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-3 w-3" }), " Modifier"]
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
												className: "space-y-2",
												children: tasks.map((task) => {
													const isDone = !!todayChecked[task.id];
													const hasDistTarget = task.targetDistance != null;
													return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
														className: cn("flex flex-col gap-2 p-3 rounded-lg border transition-all", task.isPenalized ? "bg-red-500/10 border-red-500/30 text-foreground" : isDone ? "bg-primary/10 border-primary/30 text-muted-foreground" : "bg-card border-border/60 hover:border-primary/40"),
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "flex items-start justify-between gap-3",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "flex items-start gap-3 flex-1 min-w-0",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
																		id: `today-${task.id}`,
																		checked: isDone,
																		onCheckedChange: () => handleToggleForISO(task.id, today),
																		className: "mt-0.5"
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																		className: "flex-1 min-w-0",
																		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
																			htmlFor: `today-${task.id}`,
																			className: cn("text-sm font-semibold block cursor-pointer select-none", isDone ? "line-through text-muted-foreground/70" : "text-foreground"),
																			children: task.label
																		}), task.detail && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																			className: "text-xs text-muted-foreground mt-0.5 block",
																			children: task.detail
																		})]
																	})]
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "flex items-center gap-2 shrink-0",
																	children: [
																		hasDistTarget && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
																			variant: "outline",
																			size: "sm",
																			className: cn("h-6 text-[10px] px-2 gap-1 border-primary/30", task.isPenalized ? "border-red-500/50 bg-red-500/20 text-red-300 hover:bg-red-500/30" : task.actualDistance != null ? "border-emerald-500/50 bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30" : "text-primary hover:bg-primary/10"),
																			onClick: (e) => {
																				e.stopPropagation();
																				handleLogDistance(task, today);
																			},
																			title: "Saisir la distance réellement effectuée",
																			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footprints, { className: "h-3 w-3" }), task.actualDistance != null ? `${task.actualDistance}/${task.targetDistance} ${task.unit}` : `Cible: ${task.targetDistance} ${task.unit}`]
																		}),
																		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
																			variant: "ghost",
																			size: "icon",
																			className: "h-6 w-6 text-muted-foreground/60 hover:text-primary hover:bg-primary/10",
																			onClick: (e) => {
																				e.stopPropagation();
																				handleSwapTask(today, task);
																			},
																			title: "Modifier cet exercice indépendamment",
																			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-3 w-3" })
																		}),
																		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																			className: cn("text-xs font-bold shrink-0", task.isPenalized ? "text-red-400" : "text-primary"),
																			children: [
																				"+",
																				task.xp,
																				" XP"
																			]
																		})
																	]
																})]
															}),
															task.isPenalized && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "text-[11px] font-bold text-red-400 bg-red-500/15 border border-red-500/30 px-2.5 py-1 rounded-md flex items-center justify-between",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
																	"⚠️ PÉNALITÉ : ",
																	task.actualDistance,
																	"/",
																	task.targetDistance,
																	" ",
																	task.unit,
																	" (",
																	task.penaltyText || "Malus d'XP appliqué",
																	")"
																] })
															}),
															!task.isPenalized && task.actualDistance != null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "text-[11px] font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 rounded-md flex items-center gap-1.5",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5 text-emerald-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
																	"Objectif atteint : ",
																	task.actualDistance,
																	" ",
																	task.unit,
																	" / ",
																	task.targetDistance,
																	" ",
																	task.unit
																] })]
															})
														]
													}, task.id);
												})
											})]
										}, momentKey);
									})
								})
							]
						})
					}),
					viewMode === "week" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6 animate-fade-in",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-border bg-card/40 p-5 backdrop-blur-md shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-bold uppercase tracking-widest text-muted-foreground",
									children: "Progression Hebdomadaire"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-xl font-bold mt-1",
									children: "Complétion de la semaine"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 max-w-md w-full space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Objectif global"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-semibold text-primary",
											children: [weekProgress, "%"]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
										value: weekProgress,
										className: "h-2 bg-muted"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgramHeader, {
									weekLabel,
									onPrevious: () => setAnchor(shiftWeek(anchor, -1)),
									onNext: () => setAnchor(shiftWeek(anchor, 1)),
									onToday: () => setAnchor(/* @__PURE__ */ new Date())
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
								children: weekMissions.map(({ day, mission, checked }) => {
									const isToday = day.iso === today;
									const completed = mission.status === "termine";
									const morningTasks = mission.tasks.filter((t) => t.moment === "morning");
									const afternoonTasks = mission.tasks.filter((t) => t.moment === "afternoon");
									const eveningTasks = mission.tasks.filter((t) => t.moment === "evening");
									const psychoTasks = mission.tasks.filter((t) => t.moment === "psychotechniques");
									const moments = [
										{
											key: "morning",
											tasks: morningTasks
										},
										{
											key: "afternoon",
											tasks: afternoonTasks
										},
										{
											key: "evening",
											tasks: eveningTasks
										},
										{
											key: "psychotechniques",
											tasks: psychoTasks
										}
									];
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
										className: cn("relative flex flex-col justify-between overflow-hidden border transition-all duration-300 shadow-sm hover:shadow-md", isToday ? "border-primary bg-primary/5 shadow-glow" : "border-border bg-card/60 hover:border-primary/30"),
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "p-5 border-b border-border/60",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "flex items-start justify-between",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-2",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
																className: "text-xl font-bold tracking-tight",
																children: day.dayName
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-xs text-muted-foreground tabular-nums",
																children: formatShortDate(day.iso)
															}),
															isToday && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
																variant: "default",
																className: "text-[10px] uppercase font-bold py-0.5 px-2",
																children: "Aujourd'hui"
															})
														]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-xs text-muted-foreground font-medium mt-1",
														children: mission.objective
													})] })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "mt-4 space-y-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex justify-between text-[11px] text-muted-foreground font-medium",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
															mission.doneCount,
															"/",
															mission.totalCount,
															" faits"
														] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [mission.completionPct, "%"] })]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
														value: mission.completionPct,
														className: "h-1.5 bg-muted"
													})]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "p-5 space-y-4 flex-1",
												children: [moments.map(({ key, tasks }) => {
													const Icon = MOMENT_ICONS[key];
													const label = MOMENT_LABELS[key];
													if (tasks.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center justify-between text-[10px] text-muted-foreground/60 py-1 border-b border-border/20 last:border-0",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex items-center gap-1.5 font-semibold uppercase",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3 w-3 text-muted-foreground/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label })]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
															variant: "ghost",
															size: "sm",
															className: "h-5 text-[9px] px-1 text-primary hover:text-primary gap-0.5",
															onClick: () => handleSwapMoment(day.iso, key),
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-2.5 w-2.5" }), " + Ajouter"]
														})]
													}, key);
													return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "space-y-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-muted-foreground",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "flex items-center gap-1.5",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3 w-3 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label })]
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
																variant: "ghost",
																size: "sm",
																className: "h-5 text-[9px] px-1.5 text-muted-foreground hover:text-primary gap-1",
																onClick: () => handleSwapMoment(day.iso, key),
																title: "Modifier l'activité de ce moment",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-2.5 w-2.5" }), " Modifier"]
															})]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
															className: "space-y-1.5",
															children: tasks.map((task) => {
																const isDone = !!checked[task.id];
																const hasDistTarget = task.targetDistance != null;
																return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
																	className: cn("group flex flex-col gap-1.5 rounded-lg px-2.5 py-1.5 border transition-all duration-200", task.isPenalized ? "bg-red-500/10 border-red-500/30 text-foreground" : isDone ? "bg-primary/5 border-transparent text-muted-foreground" : "border-transparent hover:bg-muted/40 hover:border-border/60"),
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																		className: "flex items-start justify-between gap-2",
																		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																			className: "flex items-start gap-2.5 flex-1 min-w-0",
																			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
																				id: `week-${day.iso}-${task.id}`,
																				checked: isDone,
																				onCheckedChange: () => handleToggleForISO(task.id, day.iso),
																				className: "mt-0.5"
																			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																				className: "min-w-0 flex-1",
																				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
																					htmlFor: `week-${day.iso}-${task.id}`,
																					className: cn("text-xs leading-relaxed font-medium block cursor-pointer select-none", isDone ? "line-through text-muted-foreground/70" : "text-foreground"),
																					children: task.label
																				}), task.detail && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																					className: "text-[10px] text-muted-foreground block line-clamp-1",
																					children: task.detail
																				})]
																			})]
																		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																			className: "flex items-center gap-1.5 shrink-0",
																			children: [
																				hasDistTarget && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
																					variant: "outline",
																					size: "sm",
																					className: cn("h-5 text-[9px] px-1.5 gap-0.5 border-primary/30", task.isPenalized ? "border-red-500/50 bg-red-500/20 text-red-300 hover:bg-red-500/30" : task.actualDistance != null ? "border-emerald-500/50 bg-emerald-500/20 text-emerald-300 hover:emerald-500/30" : "text-primary hover:bg-primary/10"),
																					onClick: (e) => {
																						e.stopPropagation();
																						handleLogDistance(task, day.iso);
																					},
																					title: "Saisir la distance réalisée",
																					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footprints, { className: "h-2.5 w-2.5" }), task.actualDistance != null ? `${task.actualDistance}/${task.targetDistance}${task.unit}` : `${task.targetDistance}${task.unit}`]
																				}),
																				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
																					variant: "ghost",
																					size: "icon",
																					className: "h-5 w-5 text-muted-foreground/60 hover:text-primary hover:bg-primary/10",
																					onClick: (e) => {
																						e.stopPropagation();
																						handleSwapTask(day.iso, task);
																					},
																					title: "Modifier cet exercice indépendamment",
																					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-2.5 w-2.5" })
																				}),
																				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																					className: cn("text-[10px] font-bold tabular-nums shrink-0 self-center", task.isPenalized ? "text-red-400" : isDone ? "text-primary/70" : "text-primary"),
																					children: [
																						"+",
																						task.xp,
																						" XP"
																					]
																				})
																			]
																		})]
																	}), task.isPenalized && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																		className: "text-[9px] font-bold text-red-400 bg-red-500/15 border border-red-500/30 px-2 py-0.5 rounded flex items-center justify-between",
																		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
																			"⚠️ Pénalité: ",
																			task.actualDistance,
																			"/",
																			task.targetDistance,
																			" ",
																			task.unit,
																			" (",
																			task.penaltyText || "Malus XP",
																			")"
																		] })
																	})]
																}, task.id);
															})
														})]
													}, key);
												}), mission.totalCount === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "h-full flex flex-col items-center justify-center py-6 text-center text-muted-foreground",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-8 w-8 text-emerald-500/60 mb-2" }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-xs font-semibold",
															children: "Aucun entraînement prévu"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[10px] mt-0.5",
															children: "Profitez de votre repos"
														})
													]
												})]
											}),
											mission.totalCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "px-5 py-4 border-t border-border/40 bg-muted/20 flex items-center justify-between gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "flex items-center gap-3 text-[10px] text-muted-foreground font-semibold",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "flex items-center gap-1",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3 w-3" }),
															" ~",
															mission.estimatedMinutes,
															"m"
														]
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
													variant: "ghost",
													size: "sm",
													className: "h-8 px-3 text-xs gap-1.5 hover:bg-primary/10 hover:text-primary transition-all duration-200",
													onClick: () => {
														startSession(day.iso);
														setFocusISO(day.iso);
														setFocusOpen(true);
													},
													disabled: completed,
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-3 w-3" }), "Focus"]
												})]
											})
										]
									}, day.iso);
								})
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FocusSessionPanel, {
				open: focusOpen,
				mission: focusMission,
				checked: focusChecked,
				onToggle: (taskId) => handleToggleForISO(taskId, focusISO),
				onClose: () => setFocusOpen(false)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExerciseSwapModal, {
				open: swapModalState.open,
				onClose: () => setSwapModalState((prev) => ({
					...prev,
					open: false
				})),
				dateISO: swapModalState.dateISO,
				moment: swapModalState.moment,
				momentLabel: MOMENT_LABELS[swapModalState.moment] ?? swapModalState.moment,
				currentTask: swapModalState.task,
				userMaxPull: Math.max(6, ...state.perf?.filter((p) => p.type === "pull").map((p) => p.value) ?? []),
				userMaxChair: Math.max(60, ...state.perf?.filter((p) => p.type === "chair").map((p) => p.value) ?? []),
				userMaxPush: Math.max(15, ...state.perf?.filter((p) => p.type === "push").map((p) => p.value) ?? []),
				onSelectAlternative: handleSelectSwap,
				onReset: handleResetSwap
			})
		]
	});
}
function shiftWeek(date, amount) {
	const next = new Date(date);
	next.setDate(next.getDate() + amount * 7);
	return next;
}
function formatShortDate(iso) {
	return (/* @__PURE__ */ new Date(`${iso}T12:00:00`)).toLocaleDateString("fr-FR", {
		day: "numeric",
		month: "short"
	});
}
//#endregion
export { ProgrammePage as component };
