import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { g as useForge, i as PageHeader, o as cn, p as todayISO } from "./AppShell-yhw2ilih.mjs";
import { n as Card, t as Button } from "./button-D_zJYbhK.mjs";
import { t as Input } from "./input-D8n0uREm.mjs";
import { t as Label } from "./label-Viy_17TP.mjs";
import { r as toast } from "../_libs/sonner.mjs";
import { i as Track, n as Root, r as Thumb, t as Range } from "../_libs/radix-ui__react-slider.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/journal-BrYfTemx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
var Slider = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Root, {
	ref,
	className: cn("relative flex w-full touch-none select-none items-center", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Track, {
		className: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Range, { className: "absolute h-full bg-primary" })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thumb, { className: "block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" })]
}));
Slider.displayName = Root.displayName;
function JournalPage() {
	const { state, setJournal } = useForge();
	const [date, setDate] = (0, import_react.useState)(todayISO());
	const j = state.days[date]?.journal ?? {};
	const setField = (k, v) => setJournal(date, {
		...j,
		[k]: v
	});
	const sliderRow = (key, label, min = 1, max = 10) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between mb-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			className: "text-xs",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm text-primary font-medium tabular-nums",
			children: j[key] ?? "—"
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
		value: [j[key] ?? Math.round((min + max) / 2)],
		min,
		max,
		step: 1,
		onValueChange: (v) => setField(key, v[0])
	})] });
	const recent = Object.entries(state.days).filter(([, d]) => d.journal && Object.keys(d.journal).length > 0).sort((a, b) => b[0].localeCompare(a[0])).slice(0, 10);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Journal",
		subtitle: "Note l'invisible : énergie, humeur, sommeil, douleurs."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-4 md:px-8 pb-10 grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "card-forge p-5 lg:col-span-2 space-y-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						className: "text-xs",
						children: "Date"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "date",
						value: date,
						onChange: (e) => setDate(e.target.value)
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						className: "text-xs",
						children: "Sommeil (h)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "number",
						step: "0.5",
						value: j.sleep ?? "",
						onChange: (e) => setField("sleep", parseFloat(e.target.value) || void 0)
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 sm:grid-cols-2 gap-5",
					children: [
						sliderRow("energy", "Énergie"),
						sliderRow("fatigue", "Fatigue"),
						sliderRow("mood", "Humeur"),
						sliderRow("pain", "Douleurs", 0, 10)
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					className: "text-xs",
					children: "Hydratation (L)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "number",
					step: "0.1",
					value: j.hydration ?? "",
					onChange: (e) => setField("hydration", parseFloat(e.target.value) || void 0)
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					className: "text-xs",
					children: "Commentaires"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					rows: 5,
					value: j.notes ?? "",
					onChange: (e) => setField("notes", e.target.value),
					placeholder: "Comment s'est passée la journée ?"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => toast.success("Journal enregistré"),
						children: "Enregistrer"
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "card-forge p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[11px] uppercase tracking-wider text-muted-foreground mb-3",
				children: "Journées récentes"
			}), recent.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-sm text-muted-foreground",
				children: "Aucune entrée pour l'instant."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-3",
				children: recent.map(([d, day]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-lg border border-border bg-background/40 p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-muted-foreground",
							children: d
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs",
							children: [day.journal?.energy != null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-primary mr-2",
								children: ["E ", day.journal.energy]
							}), day.journal?.mood != null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-primary",
								children: ["H ", day.journal.mood]
							})]
						})]
					}), day.journal?.notes && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs mt-1.5 text-muted-foreground line-clamp-2",
						children: day.journal.notes
					})]
				}, d))
			})]
		})]
	})] });
}
//#endregion
export { JournalPage as component };
