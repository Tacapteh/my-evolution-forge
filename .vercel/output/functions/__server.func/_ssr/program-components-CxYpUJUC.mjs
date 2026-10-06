import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { E as Footprints, F as ChevronRight, I as ChevronLeft, O as Flag, R as Check, V as Brain, f as Sparkles, g as RotateCcw, j as Clock, k as Dumbbell, n as Waves, o as Timer, r as Trophy, t as X, v as Play } from "../_libs/lucide-react.mjs";
import { a as cleanTaskDetail, o as cn } from "./AppShell-yhw2ilih.mjs";
import { n as Card, t as Button } from "./button-D_zJYbhK.mjs";
import { t as Badge } from "./badge-BtatB9oZ.mjs";
import { n as CheckboxIndicator, t as Checkbox$1 } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as Progress } from "./progress-BAbHzKg4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/program-components-CxYpUJUC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Checkbox = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$1, {
	ref,
	className: cn("grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxIndicator, {
		className: cn("grid place-content-center text-current"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" })
	})
}));
Checkbox.displayName = Checkbox$1.displayName;
var MOMENTS = [
	["morning", "Matin"],
	["afternoon", "Apres-midi"],
	["evening", "Soir"],
	["psychotechniques", "Psychotechniques"]
];
function ProgramHeader({ weekLabel, onPrevious, onNext, onToday }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap items-center justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[11px] uppercase tracking-[0.14em] text-muted-foreground",
			children: "Semaine courante"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1 text-lg font-semibold",
			children: weekLabel
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					size: "sm",
					onClick: onToday,
					children: "Aujourd'hui"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					size: "icon",
					onClick: onPrevious,
					"aria-label": "Semaine precedente",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-4 w-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					size: "icon",
					onClick: onNext,
					"aria-label": "Semaine suivante",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" })
				})
			]
		})]
	});
}
function DayMissionCard({ mission, checked, onToggle, onStart }) {
	const groups = (0, import_react.useMemo)(() => groupTasksByMoment(mission.tasks), [mission.tasks]);
	const allDone = mission.status === "termine";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "card-forge overflow-hidden p-5 md:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 lg:grid-cols-[minmax(0,1fr)_240px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-2 flex flex-wrap items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "outline",
								className: "border-primary/30 text-primary",
								children: "Mission du jour"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground",
								children: mission.dayName
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl font-semibold tracking-tight md:text-3xl",
							children: mission.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: mission.objective
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3.5 w-3.5" }),
										"~",
										mission.estimatedMinutes,
										" min"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { className: "h-3.5 w-3.5" }),
										"Priorite ",
										mission.priority
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5" }),
										"+",
										mission.xp,
										" XP"
									]
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DailyProgressBar, {
					mission,
					compact: true
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4",
				children: MOMENTS.map(([key, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SessionBlock, {
					title: label,
					tasks: groups[key],
					checked,
					onToggle
				}, key))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-sm text-muted-foreground",
					children: mission.summary
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "lg",
					onClick: onStart,
					disabled: allDone,
					className: "sm:w-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "mr-2 h-4 w-4" }), allDone ? "Journee terminee" : mission.doneCount ? "Reprendre la seance" : "Commencer la seance"]
				})]
			})
		]
	});
}
function SessionBlock({ title, tasks, checked, onToggle }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-border bg-background/40 p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 flex items-center justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[11px] uppercase tracking-[0.14em] text-muted-foreground",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-[11px] text-muted-foreground",
				children: [tasks.reduce((sum, task) => sum + (task.estimatedMinutes ?? 0), 0), " min"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SessionChecklist, {
			tasks,
			checked,
			onToggle,
			dense: true
		})]
	});
}
function SessionChecklist({ tasks, checked, onToggle, dense = false }) {
	if (tasks.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-sm text-muted-foreground/60",
		children: "Libre"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: cn("space-y-2", dense && "space-y-1.5"),
		children: tasks.map((task) => {
			const done = !!checked[task.id];
			const Icon = iconForTask(task.type);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: cn("flex items-start gap-2 rounded-lg border px-3 py-2 transition-all", done ? "border-primary/25 bg-primary/10" : "border-transparent hover:border-border hover:bg-muted/50"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
						checked: done,
						onCheckedChange: () => onToggle(task.id),
						className: "mt-0.5"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: cn("mt-0.5 h-4 w-4 shrink-0", done ? "text-primary" : "text-muted-foreground") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("text-sm leading-snug", done && "text-muted-foreground line-through"),
							children: task.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-0.5 flex flex-wrap gap-x-2 gap-y-1 text-[11px] text-muted-foreground",
							children: [task.detail && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: cleanTaskDetail(task.detail) }), task.rest && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Repos ", task.rest] })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "shrink-0 text-[11px] text-primary",
						children: ["+", task.xp]
					})
				]
			}, task.id);
		})
	});
}
function FocusSessionPanel({ open, mission, checked, onToggle, onClose }) {
	const firstUndone = Math.max(0, mission.tasks.findIndex((task) => !checked[task.id]));
	const [index, setIndex] = (0, import_react.useState)(firstUndone === -1 ? 0 : firstUndone);
	(0, import_react.useEffect)(() => {
		if (open) setIndex(firstUndone);
	}, [
		firstUndone,
		mission.iso,
		open
	]);
	if (!open) return null;
	const task = mission.tasks[index];
	const done = checked[task.id];
	const last = index === mission.tasks.length - 1;
	const complete = mission.status === "termine";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-[60] bg-background/95 backdrop-blur-xl",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex h-full flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b border-border px-4 py-3 md:px-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-primary" }), "Mode focus"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs tabular-nums text-muted-foreground",
							children: [
								index + 1,
								"/",
								mission.totalCount
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							onClick: onClose,
							"aria-label": "Fermer",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid flex-1 place-items-center px-4 py-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-full max-w-2xl text-center",
						children: complete ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto max-w-md",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mx-auto grid h-20 w-20 place-items-center rounded-full bg-primary/15 text-primary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "h-9 w-9" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-6 text-3xl font-semibold",
									children: "Seance terminee"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted-foreground",
									children: "XP ajoute, resume du jour mis a jour."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									className: "mt-8",
									onClick: onClose,
									children: "Retour mission"
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-[11px] uppercase tracking-[0.18em] text-muted-foreground",
								children: ["Etape ", index + 1]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-3 text-3xl font-semibold tracking-tight md:text-5xl",
								children: task.label
							}),
							task.detail && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-muted-foreground",
								children: cleanTaskDetail(task.detail)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mx-auto mt-6 grid max-w-md gap-2",
								children: (task.steps ?? []).map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rounded-lg border border-border bg-card px-4 py-2 text-sm text-muted-foreground",
									children: step
								}, step))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 flex flex-wrap justify-center gap-2 text-xs text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "rounded-full border border-border px-3 py-1",
										children: [task.estimatedMinutes, " min"]
									}),
									task.rest && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "rounded-full border border-border px-3 py-1",
										children: ["Repos ", task.rest]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "rounded-full border border-primary/30 px-3 py-1 text-primary",
										children: [
											"+",
											task.xp,
											" XP"
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 flex flex-wrap justify-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "outline",
										onClick: () => setIndex((value) => Math.max(0, value - 1)),
										disabled: index === 0,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "mr-1 h-4 w-4" }), "Precedent"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										onClick: () => {
											onToggle(task.id);
											if (!done && !last) setIndex((value) => value + 1);
										},
										className: "min-w-[180px]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mr-2 h-4 w-4" }), done ? "Decocher" : "Valider"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "outline",
										onClick: () => setIndex((value) => Math.min(mission.tasks.length - 1, value + 1)),
										disabled: last,
										children: ["Suivant", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "ml-1 h-4 w-4" })]
									})
								]
							})
						] })
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-t border-border px-4 py-4 md:px-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DailyProgressBar, { mission })
				})
			]
		})
	});
}
function DailyProgressBar({ mission, compact = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("rounded-lg border border-border bg-background/40 p-4", compact && "self-start"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[11px] uppercase tracking-[0.14em] text-muted-foreground",
				children: "Progression du jour"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-1 text-sm text-muted-foreground",
				children: [
					mission.doneCount,
					"/",
					mission.totalCount,
					" faites - ",
					mission.remainingCount,
					" restantes"
				]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-right",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-2xl font-semibold text-primary tabular-nums",
					children: [mission.completionPct, "%"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[11px] text-muted-foreground",
					children: mission.status === "termine" ? "Termine" : "En cours"
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
			value: mission.completionPct,
			className: "mt-3 h-1.5"
		})]
	});
}
function SessionHistoryItem({ item }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-border bg-card p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-xs text-muted-foreground",
					children: [
						item.dayName,
						" - ",
						item.iso.slice(5)
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 text-sm font-medium",
					children: item.highlight
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-right",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-sm font-semibold text-primary tabular-nums",
						children: [item.completionPct, "%"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: item.completed ? "default" : "outline",
						className: "mt-1",
						children: item.completed ? "Termine" : "En cours"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
				value: item.completionPct,
				className: "mt-3 h-1.5"
			}),
			item.note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 line-clamp-2 text-xs text-muted-foreground",
				children: item.note
			})
		]
	});
}
function groupTasksByMoment(tasks) {
	return {
		morning: tasks.filter((task) => task.moment === "morning"),
		afternoon: tasks.filter((task) => task.moment === "afternoon"),
		evening: tasks.filter((task) => task.moment === "evening"),
		psychotechniques: tasks.filter((task) => task.moment === "psychotechniques")
	};
}
function iconForTask(type) {
	if (type === "swim") return Waves;
	if (type === "pull") return Dumbbell;
	if (type === "chair") return Timer;
	if (type === "run") return Footprints;
	if (type === "psycho") return Brain;
	if (type === "hydration") return Sparkles;
	if (type === "stretch") return RotateCcw;
	return Check;
}
//#endregion
export { ProgramHeader as a, FocusSessionPanel as i, DailyProgressBar as n, SessionHistoryItem as o, DayMissionCard as r, Checkbox as t };
