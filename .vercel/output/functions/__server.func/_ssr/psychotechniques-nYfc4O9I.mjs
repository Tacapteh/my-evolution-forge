import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { b as Pause, g as RotateCcw, v as Play } from "../_libs/lucide-react.mjs";
import { g as useForge, i as PageHeader, l as dowMon, p as todayISO } from "./AppShell-yhw2ilih.mjs";
import { n as Card, t as Button } from "./button-D_zJYbhK.mjs";
import { t as Input } from "./input-D8n0uREm.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DvextPjj.mjs";
import { t as Label } from "./label-Viy_17TP.mjs";
import { r as toast } from "../_libs/sonner.mjs";
import { t as buildDayMission } from "./forge-program-Cyg167X1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/psychotechniques-nYfc4O9I.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TYPES_BY_DAY = {
	1: "Calcul mental",
	2: "Mémoire",
	3: "Logique",
	4: "Suites",
	5: "Rotation spatiale",
	6: "Mix rapide",
	7: "Test complet"
};
function PsychoPage() {
	const { state, setPsycho, toggleTask } = useForge();
	const iso = todayISO();
	const day = state.days[iso];
	const psychoTask = buildDayMission(state, iso).tasks.find((task) => task.type === "psycho");
	const defType = TYPES_BY_DAY[dowMon(/* @__PURE__ */ new Date(iso + "T12:00:00"))];
	const [type, setType] = (0, import_react.useState)(day?.psycho?.type ?? defType);
	const [score, setScore] = (0, import_react.useState)(day?.psycho?.score?.toString() ?? "");
	const [seconds, setSeconds] = (0, import_react.useState)(0);
	const [running, setRunning] = (0, import_react.useState)(false);
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (running) ref.current = window.setInterval(() => setSeconds((s) => s + 1), 1e3);
		return () => {
			if (ref.current) window.clearInterval(ref.current);
		};
	}, [running]);
	const format = (s) => `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;
	const history = Object.entries(state.days).filter(([, d]) => d.psycho?.score != null || d.psycho?.duration).sort((a, b) => b[0].localeCompare(a[0])).slice(0, 20);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Psychotechniques",
		subtitle: `Exercice du jour : ${defType}`
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-4 md:px-8 pb-10 grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "card-forge p-5 lg:col-span-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[11px] uppercase tracking-wider text-muted-foreground mb-4",
					children: "Séance"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						className: "text-xs",
						children: "Type d'exercice"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: type,
						onValueChange: setType,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: Object.values(TYPES_BY_DAY).filter((v, i, a) => a.indexOf(v) === i).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: t,
							children: t
						}, t)) })]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						className: "text-xs",
						children: "Score"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "number",
						value: score,
						onChange: (e) => setScore(e.target.value),
						placeholder: "ex : 42"
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 rounded-xl border border-border bg-background/40 p-6 flex flex-col items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-5xl font-mono tabular-nums tracking-tight",
						children: format(seconds)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => setRunning((r) => !r),
							variant: running ? "secondary" : "default",
							children: running ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "h-4 w-4 mr-2" }), " Pause"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-4 w-4 mr-2" }), " Démarrer"] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							onClick: () => {
								setRunning(false);
								setSeconds(0);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-4 w-4 mr-2" }), " Reset"]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 flex justify-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => {
							setPsycho(iso, {
								type,
								score: score ? parseInt(score) : void 0,
								duration: seconds || void 0
							});
							if (psychoTask && !day?.checked[psychoTask.id]) toggleTask(iso, psychoTask.id);
							toast.success("Psychotechniques enregistrees");
						},
						children: "Enregistrer la séance"
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "card-forge p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[11px] uppercase tracking-wider text-muted-foreground mb-3",
				children: "Historique"
			}), history.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-sm text-muted-foreground",
				children: "Rien encore. Lance ton premier chrono."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "divide-y divide-border",
				children: history.map(([date, d]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "py-2.5 text-sm flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-muted-foreground w-20 shrink-0",
							children: date.slice(5)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex-1 truncate",
							children: d.psycho?.type ?? "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs",
							children: [d.psycho?.score != null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-primary font-medium",
								children: d.psycho.score
							}), d.psycho?.duration != null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground ml-2",
								children: format(d.psycho.duration)
							})]
						})
					]
				}, date))
			})]
		})]
	})] });
}
//#endregion
export { PsychoPage as component };
