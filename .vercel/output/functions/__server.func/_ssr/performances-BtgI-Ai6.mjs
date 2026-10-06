import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { D as Flame, E as Footprints, K as Activity, a as Trash2, f as Sparkles, j as Clock, k as Dumbbell, n as Waves, w as Heart, z as Calendar } from "../_libs/lucide-react.mjs";
import { d as normalizeWorkouts, g as useForge, h as unlockBadges, i as PageHeader, n as BADGES, o as cn, p as todayISO } from "./AppShell-yhw2ilih.mjs";
import { n as Card, t as Button } from "./button-D_zJYbhK.mjs";
import { t as Input } from "./input-D8n0uREm.mjs";
import { t as Badge } from "./badge-BtatB9oZ.mjs";
import { r as toast } from "../_libs/sonner.mjs";
import { t as Progress } from "./progress-BAbHzKg4.mjs";
import { a as ResponsiveContainer, i as Line, n as YAxis, o as Tooltip, r as XAxis, t as LineChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/performances-BtgI-Ai6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AppleHealthDataCard({ className, compact = false }) {
	const { state } = useForge();
	const healthAnalysis = (0, import_react.useMemo)(() => {
		const daysWithData = [];
		let totalSteps = 0;
		let totalHeartRate = 0;
		let hrCount = 0;
		let totalSwimMeters = 0;
		let totalRunKm = 0;
		let totalActiveCalories = 0;
		const allISOs = Object.keys(state.days || {}).sort().reverse();
		for (const iso of allISOs) {
			const day = state.days[iso];
			if (!day || !day.health) continue;
			const h = day.health;
			const normalizedW = normalizeWorkouts(h.workouts);
			let daySwimMeters = 0;
			let dayRunKm = 0;
			for (const w of normalizedW) {
				const typeStr = String(w.type || "").toLowerCase();
				const isSwim = typeStr.includes("natat") || typeStr.includes("swim") || typeStr.includes("nage");
				const isRun = typeStr.includes("cours") || typeStr.includes("run") || typeStr.includes("footing");
				const m = w.distanceMeters ?? (w.distanceKm ? Math.round(w.distanceKm * 1e3) : 0);
				const km = w.distanceKm ?? (m ? m / 1e3 : 0);
				if (isSwim) daySwimMeters += m;
				else if (isRun) dayRunKm += km;
			}
			let dayAvgHR = h.avgHeartRate;
			if ((dayAvgHR == null || dayAvgHR === 0) && normalizedW.length > 0) {
				const hrs = normalizedW.map((w) => w.avgHeartRate).filter((hr) => typeof hr === "number" && hr > 0);
				if (hrs.length > 0) dayAvgHR = Math.round(hrs.reduce((a, b) => a + b, 0) / hrs.length);
			}
			let dayActiveCal = h.activeCalories;
			if ((dayActiveCal == null || dayActiveCal === 0) && normalizedW.length > 0) {
				const sumCal = normalizedW.reduce((acc, w) => acc + (w.calories || 0), 0);
				if (sumCal > 0) dayActiveCal = sumCal;
			}
			if (h.steps != null && h.steps > 0 || dayAvgHR != null && dayAvgHR > 0 || dayActiveCal != null && dayActiveCal > 0 || normalizedW.length > 0) {
				if (h.steps) totalSteps += h.steps;
				if (dayAvgHR) {
					totalHeartRate += dayAvgHR;
					hrCount++;
				}
				if (dayActiveCal) totalActiveCalories += dayActiveCal;
				totalSwimMeters += daySwimMeters;
				totalRunKm += dayRunKm;
				daysWithData.push({
					iso,
					steps: h.steps,
					avgHeartRate: dayAvgHR,
					activeCalories: dayActiveCal,
					exerciseMinutes: h.exerciseMinutes,
					workouts: normalizedW,
					swimMeters: daySwimMeters,
					runKm: dayRunKm
				});
			}
		}
		const recordedDaysCount = daysWithData.length;
		const avgSteps = recordedDaysCount ? Math.round(totalSteps / recordedDaysCount) : 0;
		const avgBpm = hrCount ? Math.round(totalHeartRate / hrCount) : 0;
		return {
			daysWithData: daysWithData.slice(0, 7),
			recordedDaysCount,
			avgSteps,
			avgBpm,
			totalSwimMeters,
			totalSwimKm: Number((totalSwimMeters / 1e3).toFixed(2)),
			totalRunKm: Number(totalRunKm.toFixed(1)),
			totalActiveCalories
		};
	}, [state.days]);
	const targetRunKm = 100;
	const targetSwimMeters = 1e4;
	const targetDailySteps = 8e3;
	const runPct = Math.min(100, Math.round(healthAnalysis.totalRunKm / targetRunKm * 100));
	const swimPct = Math.min(100, Math.round(healthAnalysis.totalSwimMeters / targetSwimMeters * 100));
	const stepsPct = Math.min(100, Math.round(healthAnalysis.avgSteps / targetDailySteps * 100));
	if (compact) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: cn("card-forge p-3 border-primary/20 bg-card/60 backdrop-blur-sm", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center justify-between gap-3 text-xs",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-4 w-4 text-red-500 animate-pulse" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-bold text-foreground",
						children: "Apple Santé"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						variant: "outline",
						className: "border-primary/30 text-primary text-[9px] px-1 py-0",
						children: [healthAnalysis.recordedDaysCount, " j sync"]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-4 text-muted-foreground font-medium",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footprints, { className: "h-3.5 w-3.5 text-emerald-400" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "text-foreground",
								children: healthAnalysis.totalRunKm
							}),
							" km"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Waves, { className: "h-3.5 w-3.5 text-cyan-400" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "text-foreground",
								children: healthAnalysis.totalSwimKm
							}),
							" km"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "h-3.5 w-3.5 text-amber-400" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "text-foreground",
								children: healthAnalysis.totalActiveCalories
							}),
							" kcal"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-3.5 w-3.5 text-red-400" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "text-foreground",
								children: healthAnalysis.avgBpm || "--"
							}),
							" bpm"
						]
					})
				]
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: cn("card-forge p-5 md:p-6 border-primary/30 bg-card/80 backdrop-blur-md space-y-6 shadow-md", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border/60",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-9 w-9 rounded-xl bg-primary/15 text-primary grid place-items-center shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-5 w-5 text-red-500 animate-pulse" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-base font-bold tracking-tight",
							children: "Données Réelles (Apple Santé)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "outline",
							className: "border-primary/30 text-primary text-[9px] uppercase font-bold px-1.5 py-0",
							children: "iOS Sync"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground mt-0.5",
						children: "Croisement synthétique des capteurs Apple Health & du programme."
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-right text-xs font-semibold text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-foreground",
						children: healthAnalysis.recordedDaysCount
					}), " jour(s) synchronisé(s)"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-3.5 rounded-xl border border-primary/20 bg-primary/5 space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-xs font-bold text-muted-foreground uppercase tracking-wider",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1.5 text-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footprints, { className: "h-4 w-4 text-emerald-400" }), " Course Réelle"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-emerald-400 font-bold",
									children: [runPct, "%"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-baseline justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-2xl font-extrabold tabular-nums text-foreground",
									children: [
										healthAnalysis.totalRunKm,
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-normal text-muted-foreground",
											children: "km"
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs text-muted-foreground",
									children: [
										"Cible : ",
										targetRunKm,
										" km"
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
								value: runPct,
								className: "h-1.5 bg-muted"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-3.5 rounded-xl border border-cyan-500/20 bg-cyan-500/5 space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-xs font-bold text-muted-foreground uppercase tracking-wider",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1.5 text-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Waves, { className: "h-4 w-4 text-cyan-400" }), " Natation Réelle"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-cyan-400 font-bold",
									children: [swimPct, "%"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-baseline justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-2xl font-extrabold tabular-nums text-foreground",
									children: healthAnalysis.totalSwimMeters >= 1e3 ? `${healthAnalysis.totalSwimKm} km` : `${healthAnalysis.totalSwimMeters} m`
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground",
									children: "Cible : 10 km"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
								value: swimPct,
								className: "h-1.5 bg-muted"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-3.5 rounded-xl border border-primary/20 bg-background/50 space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-xs font-bold text-muted-foreground uppercase tracking-wider",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1.5 text-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-4 w-4 text-primary" }), " Pas Quotidien"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-primary font-bold",
									children: [stepsPct, "%"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-baseline justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-2xl font-extrabold tabular-nums text-foreground",
									children: [
										healthAnalysis.avgSteps.toLocaleString(),
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-normal text-muted-foreground",
											children: "pas/j"
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground",
									children: "Cible : 8k"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
								value: stepsPct,
								className: "h-1.5 bg-muted"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-3.5 rounded-xl border border-red-500/20 bg-red-500/5 space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-xs font-bold text-muted-foreground uppercase tracking-wider",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1.5 text-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-4 w-4 text-red-500" }), " Rythme Cardiaque"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-red-400 font-bold",
									children: "Moyenne"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-baseline justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-2xl font-extrabold tabular-nums text-foreground",
									children: [
										healthAnalysis.avgBpm ? `${healthAnalysis.avgBpm}` : "--",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-normal text-muted-foreground",
											children: "bpm"
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground",
									children: "Repos / Effots"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] text-muted-foreground italic",
								children: "Capteurs Apple Watch"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-3.5 rounded-xl border border-amber-500/20 bg-amber-500/5 space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-xs font-bold text-muted-foreground uppercase tracking-wider",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1.5 text-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "h-4 w-4 text-amber-500" }), " Calories Actives"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-amber-400 font-bold",
									children: "Brûlées"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-baseline justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-2xl font-extrabold tabular-nums text-foreground",
									children: [
										healthAnalysis.totalActiveCalories ? `${healthAnalysis.totalActiveCalories}` : "--",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-normal text-muted-foreground",
											children: "kcal"
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground",
									children: "Total Période"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] text-muted-foreground italic",
								children: "Capteurs Apple Watch"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3 pt-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
					className: "text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-3.5 w-3.5 text-primary" }), " 7 Derniers Jours Enregistrés"]
				}), healthAnalysis.daysWithData.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-4 text-center text-xs text-muted-foreground italic rounded-lg border border-border/40 bg-muted/10",
					children: "Aucune donnée Apple Santé synchronisée pour l'instant."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: healthAnalysis.daysWithData.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-lg border border-border/60 bg-card/60 hover:bg-muted/20 transition-colors text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold text-foreground w-20 shrink-0",
								children: formatShortDate(d.iso)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-2 text-muted-foreground font-medium",
								children: [
									d.steps != null && d.steps > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1 bg-primary/10 text-primary px-2 py-0.5 rounded font-bold",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footprints, { className: "h-3 w-3" }),
											" ",
											d.steps.toLocaleString(),
											" pas"
										]
									}),
									d.avgHeartRate != null && d.avgHeartRate > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1 bg-red-500/10 text-red-400 px-2 py-0.5 rounded font-bold",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-3 w-3" }),
											" ",
											d.avgHeartRate,
											" bpm"
										]
									}),
									d.activeCalories != null && d.activeCalories > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1 text-amber-400",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "h-3 w-3" }),
											" ",
											d.activeCalories,
											" kcal"
										]
									})
								]
							})]
						}), d.workouts.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-1.5 shrink-0",
							children: d.workouts.map((w, idx) => {
								const tStr = String(w.type || "").toLowerCase();
								const isSwim = tStr.includes("natat") || tStr.includes("swim") || tStr.includes("nage") || w.type === "Natation";
								const isRun = tStr.includes("cours") || tStr.includes("run") || tStr.includes("footing");
								const distStr = w.distanceMeters ? isSwim || w.distanceMeters < 1e3 ? `${w.distanceMeters}m` : `${(w.distanceMeters / 1e3).toFixed(1)}km` : w.distanceKm ? `${w.distanceKm}km` : "";
								const subInfo = [
									w.durationMinutes ? `${w.durationMinutes} min` : "",
									distStr,
									w.calories ? `${w.calories} kcal` : "",
									w.avgHeartRate ? `${w.avgHeartRate} bpm` : ""
								].filter(Boolean).join(" • ");
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1 border border-border bg-background px-2 py-0.5 rounded text-[10px] text-foreground font-semibold",
									children: [
										isSwim ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Waves, { className: "h-3 w-3 text-cyan-400" }) : isRun ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footprints, { className: "h-3 w-3 text-emerald-400" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dumbbell, { className: "h-3 w-3 text-primary" }),
										w.type || "Natation",
										" ",
										subInfo && `• ${subInfo}`
									]
								}, idx);
							})
						})]
					}, d.iso))
				})]
			})
		]
	});
}
function formatShortDate(iso) {
	return (/* @__PURE__ */ new Date(`${iso}T12:00:00`)).toLocaleDateString("fr-FR", {
		day: "numeric",
		month: "short"
	});
}
var TYPES = [
	{
		v: "pull",
		l: "Tractions Pronation (reps)"
	},
	{
		v: "pull_lsit",
		l: "Tractions L-Sit (reps)"
	},
	{
		v: "pull_supine_iso",
		l: "Supination Iso 90° (s)"
	},
	{
		v: "pull_supine_neg",
		l: "Supination Négatives (reps)"
	},
	{
		v: "push_military",
		l: "Pompes Militaires (reps)"
	},
	{
		v: "push_diamond",
		l: "Pompes Diamant (reps)"
	},
	{
		v: "push_declined",
		l: "Pompes Déclinées (reps)"
	},
	{
		v: "push_triceps",
		l: "Extensions Triceps Sol (reps)"
	},
	{
		v: "chair",
		l: "Chaise au Mur (s)"
	},
	{
		v: "squat",
		l: "Squats (reps)"
	},
	{
		v: "lunge",
		l: "Fentes (reps/jambe)"
	},
	{
		v: "calves",
		l: "Extensions Mollets (reps)"
	},
	{
		v: "commando",
		l: "Gainage Commando (s)"
	},
	{
		v: "luc",
		l: "Luc Léger (paliers)"
	},
	{
		v: "vma",
		l: "VMA estimée (km/h)"
	},
	{
		v: "run5",
		l: "5 km (min)"
	},
	{
		v: "run10",
		l: "10 km (min)"
	},
	{
		v: "weight",
		l: "Poids (kg)"
	},
	{
		v: "hr",
		l: "Fréquence cardiaque (bpm)"
	},
	{
		v: "sleep",
		l: "Sommeil (h)"
	}
];
var ALL_CATALOG_EXERCISES = [
	{
		type: "pull",
		label: "Tractions Pronation",
		category: "pull",
		unit: "reps",
		fallback: 10,
		icon: "🏋️"
	},
	{
		type: "pull_lsit",
		label: "Tractions L-Sit",
		category: "pull",
		unit: "reps",
		fallback: 6,
		icon: "🦵"
	},
	{
		type: "pull_supine_iso",
		label: "Supination Iso 90°",
		category: "pull",
		unit: "s",
		fallback: 30,
		icon: "⏱️"
	},
	{
		type: "pull_supine_neg",
		label: "Supination Négatives",
		category: "pull",
		unit: "reps",
		fallback: 8,
		icon: "⏳"
	},
	{
		type: "push_military",
		label: "Pompes Militaires",
		category: "push",
		unit: "reps",
		fallback: 25,
		icon: "💥"
	},
	{
		type: "push_diamond",
		label: "Pompes Diamant",
		category: "push",
		unit: "reps",
		fallback: 20,
		icon: "💎"
	},
	{
		type: "push_declined",
		label: "Pompes Déclinées",
		category: "push",
		unit: "reps",
		fallback: 20,
		icon: "🪑"
	},
	{
		type: "push_triceps",
		label: "Extensions Triceps Sol",
		category: "push",
		unit: "reps",
		fallback: 15,
		icon: "💪"
	},
	{
		type: "chair",
		label: "Chaise au Mur",
		category: "legs",
		unit: "s",
		fallback: 60,
		icon: "🧱"
	},
	{
		type: "squat",
		label: "Squats",
		category: "legs",
		unit: "reps",
		fallback: 40,
		icon: "🦵"
	},
	{
		type: "lunge",
		label: "Fentes",
		category: "legs",
		unit: "reps",
		fallback: 20,
		icon: "🏃"
	},
	{
		type: "calves",
		label: "Extensions Mollets",
		category: "legs",
		unit: "reps",
		fallback: 30,
		icon: "🦶"
	},
	{
		type: "commando",
		label: "Gainage Commando",
		category: "core",
		unit: "s",
		fallback: 90,
		icon: "⚡"
	},
	{
		type: "luc",
		label: "Luc Léger",
		category: "cardio",
		unit: "palier",
		fallback: 7,
		icon: "🔊",
		step: "0.5"
	},
	{
		type: "vma",
		label: "VMA estimée",
		category: "cardio",
		unit: "km/h",
		fallback: 14.5,
		icon: "🏃",
		step: "0.1"
	},
	{
		type: "run5",
		label: "5 km Chrono",
		category: "cardio",
		unit: "min",
		fallback: 25,
		icon: "⏱️"
	},
	{
		type: "run10",
		label: "10 km Chrono",
		category: "cardio",
		unit: "min",
		fallback: 52,
		icon: "🏁"
	},
	{
		type: "weight",
		label: "Poids",
		category: "health",
		unit: "kg",
		fallback: 75,
		icon: "⚖️",
		step: "0.5"
	},
	{
		type: "hr",
		label: "Fréquence Cardiaque Repos",
		category: "health",
		unit: "bpm",
		fallback: 60,
		icon: "❤️"
	},
	{
		type: "sleep",
		label: "Sommeil",
		category: "health",
		unit: "h",
		fallback: 8,
		icon: "😴",
		step: "0.5"
	}
];
var CATEGORIES = [
	{
		id: "all",
		label: "Tous les exos",
		icon: "🔥"
	},
	{
		id: "pull",
		label: "Tirage / Dos",
		icon: "🏋️"
	},
	{
		id: "push",
		label: "Poussée / Bras",
		icon: "💥"
	},
	{
		id: "legs",
		label: "Bas du corps",
		icon: "🧱"
	},
	{
		id: "core",
		label: "Core & Abdo",
		icon: "⚡"
	},
	{
		id: "cardio",
		label: "Cardio & VMA",
		icon: "🏃"
	},
	{
		id: "health",
		label: "Santé",
		icon: "🩺"
	}
];
function PerformancesPage() {
	const { state, addPerf, removePerf } = useForge();
	const [selectedCategory, setSelectedCategory] = (0, import_react.useState)("all");
	const [useCustomDate, setUseCustomDate] = (0, import_react.useState)(false);
	const [customDate, setCustomDate] = (0, import_react.useState)(todayISO());
	const activeDate = useCustomDate ? customDate : todayISO();
	const seriesFor = (t) => state.perf.filter((p) => p.type === t).sort((a, b) => a.date.localeCompare(b.date)).map((p) => ({
		date: p.date.slice(5),
		value: p.value
	}));
	const unlocked = new Set(unlockBadges(state));
	const filteredExercises = ALL_CATALOG_EXERCISES.filter((ex) => selectedCategory === "all" || ex.category === selectedCategory);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Performances",
		subtitle: "Historique des records, données réelles et ajustement des maxis."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-4 md:px-8 pb-10 space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppleHealthDataCard, { compact: true }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "rounded-xl border border-primary/30 bg-primary/10 p-4 md:p-5 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col md:flex-row md:items-center justify-between gap-3 pb-2 border-b border-primary/20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "text-base font-bold text-foreground flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-primary" }), " Mes Répétitions & Performances"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground mt-0.5",
							children: "Saisis directement tes performances pour recalculer dynamiquement le volume de tes entraînements."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 bg-background/70 p-1.5 rounded-lg border border-border shrink-0 self-start md:self-auto",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setUseCustomDate(false),
									className: `flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-all ${!useCustomDate ? "bg-primary text-primary-foreground font-semibold shadow-xs" : "text-muted-foreground hover:text-foreground"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Aujourd'hui" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setUseCustomDate(true),
									className: `flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-all ${useCustomDate ? "bg-primary text-primary-foreground font-semibold shadow-xs" : "text-muted-foreground hover:text-foreground"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Autre date" })]
								}),
								useCustomDate && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "date",
									value: customDate,
									onChange: (e) => setCustomDate(e.target.value),
									className: "h-7 w-32 text-xs bg-card border-primary/40 px-2"
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar",
						children: CATEGORIES.map((cat) => {
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setSelectedCategory(cat.id),
								className: `flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${selectedCategory === cat.id ? "bg-primary text-primary-foreground shadow-sm" : "bg-background/60 text-muted-foreground hover:bg-background hover:text-foreground"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: cat.icon }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: cat.label })]
							}, cat.id);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 pt-1",
						children: filteredExercises.map((item) => {
							const currentMax = (() => {
								const list = state.perf.filter((p) => p.type === item.type).map((p) => p.value);
								return list.length > 0 ? Math.max(...list) : item.fallback;
							})();
							const handleSave = (inputEl) => {
								const val = parseFloat(inputEl.value);
								if (!isNaN(val) && val > 0) {
									addPerf({
										type: item.type,
										value: val,
										date: activeDate
									});
									inputEl.value = "";
									toast.success(`${item.label} mis à jour : ${val} ${item.unit} (${useCustomDate ? customDate : "Aujourd'hui"})`);
								}
							};
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border border-border bg-background/90 p-3 space-y-2 hover:border-primary/40 transition-colors",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-semibold text-foreground flex items-center gap-1.5 truncate",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.icon }),
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "truncate",
												children: item.label
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-primary font-bold shrink-0",
										children: [
											currentMax,
											" ",
											item.unit
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "number",
										step: item.step || "1",
										placeholder: `Nouveau (${item.unit})`,
										className: "h-8 text-xs bg-card",
										onKeyDown: (e) => {
											if (e.key === "Enter") handleSave(e.target);
										}
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										className: "h-8 text-xs shrink-0 px-2.5",
										onClick: (e) => {
											const inputEl = e.currentTarget.previousElementSibling;
											handleSave(inputEl);
										},
										children: "Save"
									})]
								})]
							}, item.type);
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6",
				children: TYPES.map((t) => {
					const data = seriesFor(t.v);
					const best = data.length ? Math.max(...data.map((d) => d.value)) : 0;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "card-forge p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline justify-between mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[11px] uppercase tracking-wider text-muted-foreground",
								children: t.l
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xl font-semibold mt-0.5",
								children: best || "—"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs text-muted-foreground",
								children: [
									data.length,
									" entrée",
									data.length > 1 ? "s" : ""
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-32",
							children: data.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
								width: "100%",
								height: "100%",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
									data,
									margin: {
										top: 5,
										right: 5,
										left: -20,
										bottom: 0
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
											dataKey: "date",
											tick: {
												fontSize: 10,
												fill: "hsl(0 0% 60%)"
											},
											axisLine: false,
											tickLine: false
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
											tick: {
												fontSize: 10,
												fill: "hsl(0 0% 60%)"
											},
											axisLine: false,
											tickLine: false,
											width: 30
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
											contentStyle: {
												background: "hsl(0 0% 15%)",
												border: "1px solid hsl(0 0% 25%)",
												borderRadius: 8,
												fontSize: 12
											},
											labelStyle: { color: "hsl(0 0% 80%)" }
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
											type: "monotone",
											dataKey: "value",
											stroke: "var(--primary)",
											strokeWidth: 2,
											dot: { r: 2 }
										})
									]
								})
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full grid place-items-center text-xs text-muted-foreground/60",
								children: "Ajoute au moins 2 valeurs"
							})
						})]
					}, t.v);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "card-forge p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[11px] uppercase tracking-wider text-muted-foreground mb-3",
					children: "Historique récent"
				}), state.perf.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-sm text-muted-foreground",
					children: "Aucune performance enregistrée pour le moment."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y divide-border",
					children: [...state.perf].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 15).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "py-2.5 flex items-center gap-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-24 text-muted-foreground text-xs",
								children: p.date
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex-1 truncate",
								children: TYPES.find((t) => t.v === p.type)?.l
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-medium",
								children: p.value
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								onClick: () => removePerf(p.id),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
							})
						]
					}, p.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "card-forge p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[11px] uppercase tracking-wider text-muted-foreground mb-3",
					children: "Badges"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3",
					children: BADGES.map((b) => {
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `rounded-lg border p-3 transition-all ${unlocked.has(b.id) ? "border-primary/40 bg-primary/10" : "border-border bg-background/40 opacity-60"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm font-medium",
								children: b.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[11px] text-muted-foreground mt-0.5",
								children: b.description
							})]
						}, b.id);
					})
				})]
			})
		]
	})] });
}
//#endregion
export { PerformancesPage as component };
