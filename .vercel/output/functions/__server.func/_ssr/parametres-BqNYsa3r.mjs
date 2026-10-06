import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { g as useForge, i as PageHeader, m as totalXP, s as computeStreak } from "./AppShell-yhw2ilih.mjs";
import { n as Card, t as Button } from "./button-D_zJYbhK.mjs";
import { t as Input } from "./input-D8n0uREm.mjs";
import { t as Label } from "./label-Viy_17TP.mjs";
import { r as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/parametres-BqNYsa3r.js
var import_jsx_runtime = require_jsx_runtime();
function SettingsPage() {
	const { state, setState, reset } = useForge();
	const daysWithActivity = Object.values(state.days).filter((d) => Object.values(d.checked).some(Boolean)).length;
	const daysMissed = Object.values(state.days).filter((d) => d.checked && Object.values(d.checked).every((v) => !v)).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Paramètres",
		subtitle: "Personnalise ton compagnon FORGE."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-4 md:px-8 pb-10 grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "card-forge p-5 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[11px] uppercase tracking-wider text-muted-foreground",
						children: "Profil"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						className: "text-xs",
						children: "Prénom"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: state.userName,
						onChange: (e) => setState({
							...state,
							userName: e.target.value
						})
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						className: "text-xs",
						children: "Date cible (tests)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "date",
						value: state.targetDate,
						onChange: (e) => setState({
							...state,
							targetDate: e.target.value
						})
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "text-xs",
							children: "Token de synchronisation Santé (Raccourcis iOS)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "text",
							value: state.healthToken || "",
							onChange: (e) => setState({
								...state,
								healthToken: e.target.value
							}),
							placeholder: "my-super-secret-token"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[10px] text-muted-foreground mt-1",
							children: [
								"Ce token sécurise l'API. Il doit correspondre au header ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
									className: "text-primary",
									children: "X-Health-Token"
								}),
								" de votre Raccourci iOS."
							]
						})
					] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "card-forge p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[11px] uppercase tracking-wider text-muted-foreground mb-4",
					children: "Statistiques globales"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-4 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Séances réalisées",
							value: daysWithActivity
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Séances manquées",
							value: daysMissed
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "XP totale",
							value: totalXP(state),
							accent: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Streak actuel",
							value: computeStreak(state),
							accent: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Records enregistrés",
							value: state.perf.length
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Badges débloqués",
							value: state.badges.length
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "card-forge p-5 lg:col-span-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[11px] uppercase tracking-wider text-muted-foreground mb-3",
						children: "Données"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground mb-4",
						children: "Tes données sont stockées localement dans ton navigateur. Aucun serveur, aucune analyse."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => {
								const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
								const url = URL.createObjectURL(blob);
								const a = document.createElement("a");
								a.href = url;
								a.download = `forge-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`;
								a.click();
								URL.revokeObjectURL(url);
							},
							children: "Exporter"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "destructive",
							onClick: () => {
								if (confirm("Réinitialiser toutes les données ?")) {
									reset();
									toast.success("Données réinitialisées");
								}
							},
							children: "Réinitialiser"
						})]
					})
				]
			})
		]
	})] });
}
function Stat({ label, value, accent }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-[11px] uppercase tracking-wider text-muted-foreground",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `mt-1 text-2xl font-semibold tracking-tight ${accent ? "text-primary" : ""}`,
		children: value
	})] });
}
//#endregion
export { SettingsPage as component };
