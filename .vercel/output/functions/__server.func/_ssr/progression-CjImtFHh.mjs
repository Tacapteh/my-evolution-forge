import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { E as Footprints, U as Award, V as Brain, k as Dumbbell, n as Waves, o as Timer } from "../_libs/lucide-react.mjs";
import { g as useForge, i as PageHeader, p as todayISO } from "./AppShell-yhw2ilih.mjs";
import { n as Card } from "./button-D_zJYbhK.mjs";
import { t as Progress } from "./progress-BAbHzKg4.mjs";
import { n as DailyProgressBar, o as SessionHistoryItem } from "./program-components-CxYpUJUC.mjs";
import { n as buildHistoryItems, t as buildDayMission } from "./forge-program-Cyg167X1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/progression-CjImtFHh.js
var import_jsx_runtime = require_jsx_runtime();
function ProgressionPage() {
	const { state } = useForge();
	const today = todayISO();
	const mission = buildDayMission(state, today);
	const history = buildHistoryItems(state, today, 6);
	const best = (t) => Math.max(0, ...state.perf.filter((p) => p.type === t).map((p) => p.value));
	const psychoDays = Object.values(state.days).filter((d) => d.psycho?.score != null || d.psycho?.duration != null).length;
	const cards = [
		{
			icon: Dumbbell,
			label: "Tractions",
			cur: best("pull"),
			target: 17,
			unit: "reps"
		},
		{
			icon: Timer,
			label: "Chaise",
			cur: best("chair"),
			target: 168,
			unit: "s"
		},
		{
			icon: Footprints,
			label: "Course 10 km",
			cur: best("run10"),
			target: 10,
			unit: "km"
		},
		{
			icon: Award,
			label: "Luc Leger",
			cur: best("luc"),
			target: 12,
			unit: "paliers"
		},
		{
			icon: Waves,
			label: "Natation totale",
			cur: 0,
			target: 50,
			unit: "km"
		},
		{
			icon: Brain,
			label: "Psychotechniques",
			cur: psychoDays,
			target: 60,
			unit: "jours"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Progression",
		subtitle: "Journee en cours, regularite, données réelles et objectifs."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 px-4 pb-10 md:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-[minmax(0,1fr)_380px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DailyProgressBar, { mission }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "card-forge p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[11px] uppercase tracking-[0.14em] text-muted-foreground",
							children: "Aujourd'hui"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 text-2xl font-semibold text-primary",
							children: [
								"+",
								mission.xp,
								" XP"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 text-sm text-muted-foreground",
							children: mission.summary
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: cards.map((card) => {
					const pct = Math.min(100, card.cur / card.target * 100);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "card-forge p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-[11px] uppercase tracking-wider text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid h-7 w-7 place-items-center rounded-md bg-primary/15 text-primary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(card.icon, { className: "h-3.5 w-3.5" })
								}), card.label]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex items-baseline gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-3xl font-semibold tracking-tight",
									children: card.cur
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs text-muted-foreground",
									children: [
										"/ ",
										card.target,
										" ",
										card.unit
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
								value: pct,
								className: "mt-3 h-1.5"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 text-[11px] text-muted-foreground",
								children: [Math.round(pct), "% de l'objectif"]
							})
						]
					}, card.label);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-3 text-[11px] uppercase tracking-[0.14em] text-muted-foreground",
				children: "Historique simple"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 md:grid-cols-2 xl:grid-cols-3",
				children: history.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SessionHistoryItem, { item }, item.iso))
			})] })
		]
	})] });
}
//#endregion
export { ProgressionPage as component };
