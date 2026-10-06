import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { A as Droplet, D as Flame, E as Footprints, F as ChevronRight, I as ChevronLeft, K as Activity, M as Circle, N as CircleCheck, U as Award, V as Brain, W as ArrowRight, _ as Plus, d as StretchHorizontal, f as Sparkles, k as Dumbbell, n as Waves, o as Timer, r as Trophy, s as Target, w as Heart } from "../_libs/lucide-react.mjs";
import { c as daysUntil, d as normalizeWorkouts, f as toISO, g as useForge, i as PageHeader, m as totalXP, o as cn, p as todayISO, s as computeStreak } from "./AppShell-yhw2ilih.mjs";
import { n as Card, t as Button } from "./button-D_zJYbhK.mjs";
import { t as Badge } from "./badge-BtatB9oZ.mjs";
import { r as toast } from "../_libs/sonner.mjs";
import { t as Progress } from "./progress-BAbHzKg4.mjs";
import { i as FocusSessionPanel, r as DayMissionCard, t as Checkbox } from "./program-components-CxYpUJUC.mjs";
import { t as createTrainingEngine } from "./trainingEngine-BrV9Cuh-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CKgnHBPu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function levelFromXP(xp) {
	const level = Math.floor(Math.sqrt(Math.max(0, xp) / 50)) + 1;
	const currentThreshold = 50 * Math.pow(level - 1, 2);
	const nextThreshold = 50 * Math.pow(level, 2);
	const into = xp - currentThreshold;
	const span = nextThreshold - currentThreshold;
	return {
		level,
		into,
		span,
		pct: Math.min(100, into / span * 100),
		nextThreshold
	};
}
function SectionTitle({ children, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-end justify-between gap-3 mb-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[11px] uppercase tracking-[0.14em] text-muted-foreground",
			children
		}), action]
	});
}
function StatCard({ icon, label, value, suffix, accent, progress, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: cn("card-forge p-5", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 text-muted-foreground text-[11px] uppercase tracking-[0.14em]",
				children: [icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("h-6 w-6 grid place-items-center rounded-md", accent ? "bg-primary/15 text-primary" : "bg-muted"),
					children: icon
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "truncate",
					children: label
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex items-baseline gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("text-3xl font-semibold tracking-tight tabular-nums", accent && "text-primary"),
					children: value
				}), suffix && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs text-muted-foreground",
					children: suffix
				})]
			}),
			typeof progress === "number" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
				value: progress,
				className: "h-1.5 mt-3"
			})
		]
	});
}
function XPCard({ totalXP, xpToday }) {
	const { level, into, span, pct } = levelFromXP(totalXP);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "card-forge p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 text-muted-foreground text-[11px] uppercase tracking-[0.14em]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "h-6 w-6 grid place-items-center rounded-md bg-primary/15 text-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" })
				}), "Niveau"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex items-baseline justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-3xl font-semibold tracking-tight text-primary tabular-nums",
					children: ["Niv. ", level]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-xs text-primary tabular-nums",
					children: [
						"+",
						xpToday,
						" XP"
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
					value: pct,
					className: "h-1.5"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-1.5 text-[11px] text-muted-foreground tabular-nums",
					children: [
						into,
						" / ",
						span,
						" XP · ",
						totalXP,
						" total"
					]
				})]
			})
		]
	});
}
function StreakCard({ streak, daysLeft }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "card-forge p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 text-muted-foreground text-[11px] uppercase tracking-[0.14em]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "h-6 w-6 grid place-items-center rounded-md bg-primary/15 text-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "h-4 w-4" })
				}), "Régularité"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex items-baseline gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-3xl font-semibold tracking-tight text-primary tabular-nums",
					children: streak
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs text-muted-foreground",
					children: "jours consécutifs"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 text-[11px] text-muted-foreground",
				children: [
					"J–",
					daysLeft,
					" avant les tests"
				]
			})
		]
	});
}
function ObjectiveCard({ label, current, target, unit, icon }) {
	const pct = Math.min(100, current / target * 100);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-background/40 p-3.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between mb-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 min-w-0",
					children: [icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-primary shrink-0",
						children: icon
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-medium truncate",
						children: label
					})]
				}), current >= target && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "h-3.5 w-3.5 text-primary shrink-0" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-baseline justify-between text-xs text-muted-foreground tabular-nums mb-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					current,
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "opacity-60",
						children: [
							"/ ",
							target,
							" ",
							unit
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [Math.round(pct), "%"] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
				value: pct,
				className: "h-1.5"
			})
		]
	});
}
var ICONS = {
	swim: Waves,
	pull: Dumbbell,
	chair: Timer,
	run: Footprints,
	psycho: Brain,
	stretch: StretchHorizontal,
	hydration: Droplet,
	custom: Circle
};
function DailyChecklist({ tasks, checked, onToggle }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "space-y-1.5",
		children: tasks.map((t) => {
			const isDone = !!checked[t.id];
			const Icon = ICONS[t.type] ?? Circle;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: cn("group flex items-center gap-3 rounded-lg px-3 py-2.5 border transition-all", isDone ? "bg-primary/10 border-primary/25" : "border-transparent hover:bg-muted/60 hover:border-border"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
						checked: isDone,
						onCheckedChange: () => onToggle(t.id)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("h-7 w-7 grid place-items-center rounded-md shrink-0 transition-colors", isDone ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3.5 w-3.5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("text-sm truncate transition-colors", isDone && "line-through text-muted-foreground"),
							children: t.label
						}), t.detail && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[11px] text-muted-foreground truncate",
							children: t.detail
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: cn("text-[11px] shrink-0 font-medium tabular-nums transition-colors", isDone ? "text-primary" : "text-muted-foreground"),
						children: [
							"+",
							t.xp,
							" XP"
						]
					})
				]
			}, t.id);
		})
	});
}
function Dashboard() {
	const { state, hydrated, toggleTask, startSession, setHealth } = useForge();
	const iso = todayISO();
	const [healthISO, setHealthISO] = (0, import_react.useState)(iso);
	const shiftHealthDate = (days) => {
		const d = /* @__PURE__ */ new Date(`${healthISO}T12:00:00`);
		d.setDate(d.getDate() + days);
		const nextISO = toISO(d);
		if (nextISO <= iso) setHealthISO(nextISO);
	};
	const engine = (0, import_react.useMemo)(() => createTrainingEngine(state, { toggleTask }, { todayISO: iso }), [
		iso,
		state,
		toggleTask
	]);
	const mission = engine.getTodayProgram();
	const tasks = mission.tasks;
	const checked = state.days[iso]?.checked ?? {};
	const done = mission.doneCount;
	const xpToday = engine.getDailyXP(iso);
	const streak = hydrated ? computeStreak(state) : 0;
	const dLeft = daysUntil(state.targetDate);
	const total = totalXP(state);
	const rawHealth = state.days[healthISO]?.health;
	const latestHealthFromState = Object.values(state.days || {}).map((d) => d?.health).filter((h) => h && (h.steps != null || h.avgHeartRate != null || h.activeCalories != null || h.exerciseMinutes != null || h.workouts && h.workouts.length > 0)).pop();
	const healthData = rawHealth && (rawHealth.steps != null || rawHealth.avgHeartRate != null || rawHealth.activeCalories != null || rawHealth.exerciseMinutes != null || rawHealth.workouts && rawHealth.workouts.length > 0) ? rawHealth : healthISO === iso ? latestHealthFromState : null;
	const hasHealthData = healthData && (healthData.steps != null || healthData.avgHeartRate != null || healthData.activeCalories != null || healthData.exerciseMinutes != null || healthData.workouts && healthData.workouts.length > 0);
	const [focus, setFocus] = (0, import_react.useState)(false);
	const [celebrate, setCelebrate] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (hydrated && tasks.length && done === tasks.length) {
			setCelebrate(true);
			const t = setTimeout(() => setCelebrate(false), 2400);
			return () => clearTimeout(t);
		}
	}, [
		done,
		tasks.length,
		hydrated
	]);
	if (!hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-background text-foreground flex items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-10 w-10 text-primary animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs font-bold uppercase tracking-widest text-muted-foreground",
				children: "Chargement de FORGE..."
			})]
		})
	});
	const weekDone = engine.getWeeklyCompletion(iso).completedDays;
	const sessionsDone = Object.values(state.days || {}).filter((d) => d && d.checked && Object.values(d.checked).some(Boolean)).length;
	const perfList = state.perf || [];
	const bestPull = Math.max(0, ...perfList.filter((p) => p.type === "pull").map((p) => p.value));
	const bestChair = Math.max(0, ...perfList.filter((p) => p.type === "chair").map((p) => p.value));
	const totalRun = perfList.filter((p) => p.type === "run5" || p.type === "run10").reduce((s, p) => s + p.value, 0);
	const bestLuc = Math.max(0, ...perfList.filter((p) => p.type === "luc").map((p) => p.value));
	const handleToggle = (id) => {
		const task = tasks.find((item) => item.id === id);
		const wasDone = !!checked[id];
		engine.completeExercise(id, iso);
		if (task && !wasDone) toast.success(`+${task.xp} XP`, { description: task.label });
	};
	const handleManualHealthInput = () => {
		const stepsInput = window.prompt("Saisir votre nombre de pas du jour (ex: 8500) :", String(healthData?.steps ?? 8500));
		if (stepsInput === null) return;
		const hrInput = window.prompt("Saisir votre fréquence cardiaque moyenne en bpm (ex: 68) :", String(healthData?.avgHeartRate ?? 68));
		if (hrInput === null) return;
		const addWorkout = window.confirm("Souhaitez-vous inclure une séance de Natation (1000m, 45 min, 320 kcal) à la synchro ?");
		const steps = parseInt(stepsInput, 10);
		const hr = parseInt(hrInput, 10);
		const workouts = [...healthData?.workouts ?? []];
		if (addWorkout) workouts.unshift({
			type: "Natation",
			durationMinutes: 45,
			distanceMeters: 1e3,
			distanceKm: 1,
			calories: 320
		});
		setHealth(iso, {
			...healthData,
			steps: !isNaN(steps) ? steps : healthData?.steps,
			avgHeartRate: !isNaN(hr) ? hr : healthData?.avgHeartRate,
			workouts
		});
		toast.success("Données Santé enregistrées !", { description: `${steps} pas • FC: ${hr} bpm ${addWorkout ? "• Natation 1000m (45 min)" : ""}` });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: `Bonjour ${state.userName}`,
			subtitle: `${mission.dayName} - ${mission.objective}`,
			right: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 text-xs text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
					variant: "outline",
					className: "border-primary/30 text-primary",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "mr-1 h-3 w-3" }),
						" ",
						streak,
						"j"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "hidden items-center gap-1 sm:inline-flex",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "h-3 w-3" }),
						" J-",
						dLeft
					]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6 px-4 pb-10 md:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative lg:col-span-2",
						children: [celebrate && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -inset-4 rounded-3xl bg-primary/10 blur-2xl animate-fade-in" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DayMissionCard, {
							mission,
							checked,
							onToggle: handleToggle,
							onStart: () => {
								startSession(iso);
								setFocus(true);
							}
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XPCard, {
							totalXP: total,
							xpToday
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StreakCard, {
							streak,
							daysLeft: dLeft
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-4 md:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" }),
							label: "Seances totales",
							value: sessionsDone,
							suffix: "jours actifs"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "h-4 w-4" }),
							label: "Semaine",
							value: `${weekDone}/7`,
							progress: weekDone / 7 * 100,
							accent: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "h-4 w-4" }),
							label: "Aujourd'hui",
							value: `${done}/${tasks.length}`,
							progress: mission.completionPct
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-4 w-4" }),
							label: "Badges",
							value: state.badges.length,
							suffix: "debloques"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "card-forge p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
								action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/programme",
									className: "inline-flex items-center gap-1 text-xs text-primary hover:underline",
									children: ["Programme ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3 w-3" })]
								}),
								children: "Checklist du jour"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DailyChecklist, {
								tasks,
								checked,
								onToggle: handleToggle
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "card-forge p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
								action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/progression",
									className: "inline-flex items-center gap-1 text-xs text-primary hover:underline",
									children: ["Voir ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3 w-3" })]
								}),
								children: "Objectifs cles"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ObjectiveCard, {
										label: "Tractions",
										current: bestPull,
										target: 17,
										unit: "reps",
										icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dumbbell, { className: "h-3.5 w-3.5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ObjectiveCard, {
										label: "Chaise",
										current: bestChair,
										target: 168,
										unit: "s",
										icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timer, { className: "h-3.5 w-3.5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ObjectiveCard, {
										label: "Course cumulee",
										current: Math.round(totalRun),
										target: 100,
										unit: "km",
										icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footprints, { className: "h-3.5 w-3.5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ObjectiveCard, {
										label: "Luc Leger",
										current: bestLuc,
										target: 12,
										unit: "paliers",
										icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-3.5 w-3.5" })
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "card-forge p-5 flex flex-col justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-2 border-b border-border/40",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
									action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											variant: "ghost",
											size: "sm",
											className: "h-6 text-[10px] px-2 text-muted-foreground hover:text-foreground gap-1",
											onClick: handleManualHealthInput,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3 w-3" }), " Saisie"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
											variant: "outline",
											className: "border-primary/30 text-primary flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-3 w-3 text-red-500 animate-pulse" }), " Live"]
										})]
									}),
									children: "Santé Connectée"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1 bg-muted/40 p-1 rounded-lg border border-border/40 shrink-0 self-start sm:self-auto",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											size: "icon",
											className: "h-6 w-6 text-muted-foreground hover:text-foreground",
											onClick: () => shiftHealthDate(-1),
											title: "Jour précédent",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-3.5 w-3.5" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											size: "sm",
											className: "h-6 text-[10px] px-2 font-semibold text-foreground hover:text-primary",
											onClick: () => setHealthISO(iso),
											title: "Revenir à aujourd'hui",
											children: healthISO === iso ? "Aujourd'hui" : (/* @__PURE__ */ new Date(`${healthISO}T12:00:00`)).toLocaleDateString("fr-FR", {
												day: "numeric",
												month: "short"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											size: "icon",
											className: "h-6 w-6 text-muted-foreground hover:text-foreground disabled:opacity-30",
											disabled: healthISO >= iso,
											onClick: () => shiftHealthDate(1),
											title: "Jour suivant",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3.5 w-3.5" })
										})
									]
								})]
							}), hasHealthData ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4 mt-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-1 sm:grid-cols-3 gap-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex items-center justify-between p-3 rounded-lg bg-primary/5 border border-primary/10",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footprints, { className: "h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-xs text-muted-foreground",
													children: "Pas du jour"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-sm font-bold tabular-nums text-foreground mt-0.5",
													children: [
														healthData.steps?.toLocaleString() ?? "0",
														" pas",
														" ",
														healthData.steps && healthData.steps > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "text-xs text-primary font-semibold",
															children: [
																"(",
																(healthData.steps * .74 / 1e3).toFixed(1),
																" km)"
															]
														})
													]
												})] })]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2.5 p-3 rounded-lg bg-card border border-border",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-5 w-5 text-red-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-xs text-muted-foreground",
												children: "Fréquence cardiaque"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-sm font-bold tabular-nums mt-0.5",
												children: healthData.avgHeartRate ? `${healthData.avgHeartRate} bpm` : "--"
											})] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2.5 p-3 rounded-lg bg-amber-500/5 border border-amber-500/20",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "h-5 w-5 text-amber-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-xs text-muted-foreground",
												children: "Calories actives"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-sm font-bold tabular-nums text-foreground mt-0.5",
												children: healthData.activeCalories ? `${healthData.activeCalories} kcal` : "--"
											})] })]
										})
									]
								}), (() => {
									const normalized = normalizeWorkouts(healthData.workouts);
									if (!normalized || normalized.length === 0) return null;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2 mt-3 pt-3 border-t border-border/40",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5 text-primary" }),
												"Exercices synchronisés (",
												normalized.length,
												")"
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "space-y-2",
											children: normalized.map((w, idx) => {
												const typeStr = String(w.type || "Natation").toLowerCase();
												const isSwim = typeStr.includes("natat") || typeStr.includes("swim") || typeStr.includes("nage");
												const isRun = typeStr.includes("cours") || typeStr.includes("run") || typeStr.includes("footing");
												typeStr.includes("velo") || typeStr.includes("cycle") || typeStr.includes("bike");
												const displayType = w.type || "Natation";
												const hasValidDur = w.durationMinutes != null && w.durationMinutes > 0 && w.durationMinutes < 1440;
												const meters = w.distanceMeters ?? (w.distanceKm ? Math.round(w.distanceKm * 1e3) : null);
												const km = w.distanceKm ?? (w.distanceMeters ? Number((w.distanceMeters / 1e3).toFixed(1)) : null);
												let distanceStr = "";
												if (meters && meters > 0) distanceStr = isSwim || meters < 1e3 ? `${meters}m` : `${km ?? (meters / 1e3).toFixed(1)} km`;
												else if (km && km > 0) distanceStr = isSwim || km < 1 ? `${Math.round(km * 1e3)}m` : `${km} km`;
												const hasValidDist = Boolean(distanceStr);
												return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between p-2.5 rounded-lg border border-primary/20 bg-primary/5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-2.5",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center text-primary",
															children: isSwim ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Waves, { className: "h-4 w-4 text-cyan-400" }) : isRun ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footprints, { className: "h-4 w-4 text-emerald-400" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dumbbell, { className: "h-4 w-4 text-primary" })
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "text-xs font-bold flex items-center gap-1.5",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-foreground",
																children: displayType
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
																variant: "outline",
																className: "text-[9px] py-0 px-1.5 border-primary/30 text-primary",
																children: "Apple Health"
															})]
														}), hasValidDur || hasValidDist ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
															className: "text-[11px] text-muted-foreground mt-0.5 font-medium",
															children: [
																hasValidDur && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Durée: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																	className: "font-semibold text-foreground",
																	children: [w.durationMinutes, " min"]
																})] }),
																hasValidDur && hasValidDist && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: " • " }),
																hasValidDist && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Distance: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "font-semibold text-foreground",
																	children: distanceStr
																})] })
															]
														}) : null] })]
													}), w.calories != null && w.calories > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-[10px] font-semibold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20",
														children: [w.calories, " kcal"]
													})]
												}, idx);
											})
										})]
									});
								})()]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "py-6 text-center text-muted-foreground space-y-3 mt-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-6 w-6 text-primary" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs font-semibold",
										children: "En attente de synchronisation..."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] text-muted-foreground leading-relaxed px-4",
										children: "Utilisez un Raccourci iOS avec l'URL de votre site pour synchroniser automatiquement vos pas, votre rythme cardiaque et vos séances."
									})
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-t border-border/40 pt-3 mt-4 text-[10px] text-muted-foreground flex justify-between items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Endpoint: `/api/sync-health`" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-primary",
									children: "Prêt"
								})]
							})]
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FocusSessionPanel, {
			open: focus,
			onClose: () => setFocus(false),
			mission,
			checked,
			onToggle: handleToggle
		})
	] });
}
//#endregion
export { Dashboard as component };
