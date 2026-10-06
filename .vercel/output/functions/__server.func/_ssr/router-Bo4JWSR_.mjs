import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useRouter, c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { r as ForgeProvider, t as AppShell } from "./AppShell-yhw2ilih.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import * as fs from "fs/promises";
import * as path from "path";
//#region node_modules/.nitro/vite/services/ssr/assets/router-Bo4JWSR_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-hmQIK2mY.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	window.__lovableReportRuntimeError?.({
		message,
		stack: error instanceof Error ? error.stack : void 0,
		filename: window.location.pathname
	});
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page introuvable"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Cette page n'existe pas ou a été déplacée."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Retour à l'accueil"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "Cette page n'a pas pu charger"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Quelque chose s'est mal passé. Réessaie ou reviens à l'accueil."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Réessayer"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Accueil"
					})]
				})
			]
		})
	});
}
var Route$10 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
			},
			{ title: "FORGE — Construis la meilleure version de toi-même" },
			{
				name: "description",
				content: "FORGE : compagnon quotidien de préparation physique et mentale. Suivi de programme, progression et gamification."
			},
			{
				name: "theme-color",
				content: "#09090b"
			},
			{
				name: "apple-mobile-web-app-capable",
				content: "yes"
			},
			{
				name: "apple-mobile-web-app-status-bar-style",
				content: "black-translucent"
			},
			{
				name: "apple-mobile-web-app-title",
				content: "FORGE"
			},
			{
				property: "og:title",
				content: "FORGE — Construis la meilleure version de toi-même"
			},
			{
				property: "og:description",
				content: "Compagnon quotidien de préparation physique et mentale."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.svg",
				type: "image/svg+xml"
			},
			{
				rel: "icon",
				href: "/favicon.png",
				type: "image/png"
			},
			{
				rel: "apple-touch-icon",
				sizes: "180x180",
				href: "/apple-touch-icon.png"
			},
			{
				rel: "apple-touch-icon-precomposed",
				sizes: "180x180",
				href: "/apple-touch-icon.png"
			},
			{
				rel: "manifest",
				href: "/manifest.json"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "fr",
		className: "dark",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$10.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ForgeProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {})] })
	});
}
var $$splitComponentImporter$7 = () => import("./psychotechniques-nYfc4O9I.mjs");
var Route$9 = createFileRoute("/psychotechniques")({
	component: lazyRouteComponent($$splitComponentImporter$7, "component"),
	head: () => ({ meta: [{ title: "Psychotechniques — FORGE" }] })
});
var $$splitComponentImporter$6 = () => import("./progression-CjImtFHh.mjs");
var Route$8 = createFileRoute("/progression")({
	component: lazyRouteComponent($$splitComponentImporter$6, "component"),
	head: () => ({ meta: [{ title: "Progression - FORGE" }] })
});
var $$splitComponentImporter$5 = () => import("./programme-pZEhCkYq.mjs");
var Route$7 = createFileRoute("/programme")({
	component: lazyRouteComponent($$splitComponentImporter$5, "component"),
	head: () => ({ meta: [{ title: "Programme - FORGE" }] })
});
var $$splitComponentImporter$4 = () => import("./performances-BtgI-Ai6.mjs");
var Route$6 = createFileRoute("/performances")({
	component: lazyRouteComponent($$splitComponentImporter$4, "component"),
	head: () => ({ meta: [{ title: "Performances — FORGE" }] })
});
var $$splitComponentImporter$3 = () => import("./parametres-BqNYsa3r.mjs");
var Route$5 = createFileRoute("/parametres")({
	component: lazyRouteComponent($$splitComponentImporter$3, "component"),
	head: () => ({ meta: [{ title: "Paramètres — FORGE" }] })
});
var $$splitComponentImporter$2 = () => import("./journal-BrYfTemx.mjs");
var Route$4 = createFileRoute("/journal")({
	component: lazyRouteComponent($$splitComponentImporter$2, "component"),
	head: () => ({ meta: [{ title: "Journal — FORGE" }] })
});
var $$splitComponentImporter$1 = () => import("./catalogue-C6y4ZMSs.mjs");
var Route$3 = createFileRoute("/catalogue")({
	component: lazyRouteComponent($$splitComponentImporter$1, "component"),
	head: () => ({ meta: [{ title: "Catalogue d'exercices — FORGE" }] })
});
var $$splitComponentImporter = () => import("./routes-CKgnHBPu.mjs");
var Route$2 = createFileRoute("/")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	head: () => ({ meta: [{ title: "Dashboard - FORGE" }] })
});
var isVercel = !!process.env.VERCEL;
var SYNC_DIR$1 = isVercel ? "/tmp" : path.join(process.cwd(), ".data", "sync");
var SECRET_TOKEN = process.env.HEALTH_SYNC_TOKEN || "my-super-secret-token";
async function ensureDir$1() {
	if (!isVercel) try {
		await fs.mkdir(SYNC_DIR$1, { recursive: true });
	} catch (e) {}
}
async function readStateData(token) {
	await ensureDir$1();
	const filePath = path.join(SYNC_DIR$1, `state-sync-${token}.json`);
	try {
		const raw = await fs.readFile(filePath, "utf-8");
		return JSON.parse(raw);
	} catch (error) {
		return null;
	}
}
async function writeStateData(token, data) {
	await ensureDir$1();
	const filePath = path.join(SYNC_DIR$1, `state-sync-${token}.json`);
	try {
		await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
	} catch (error) {
		console.error("Failed to write state sync file:", error);
	}
}
var Route$1 = createFileRoute("/api/sync-state")({ server: { handlers: {
	GET: async ({ request }) => {
		const data = await readStateData(request.headers.get("X-Sync-Token") || SECRET_TOKEN);
		if (!data) return new Response(JSON.stringify({ error: "No state found" }), {
			status: 404,
			headers: { "Content-Type": "application/json" }
		});
		return new Response(JSON.stringify(data), { headers: { "Content-Type": "application/json" } });
	},
	POST: async ({ request }) => {
		const token = request.headers.get("X-Sync-Token") || SECRET_TOKEN;
		try {
			const payload = await request.json();
			if (!payload || typeof payload !== "object") return new Response(JSON.stringify({ error: "Invalid payload format" }), {
				status: 400,
				headers: { "Content-Type": "application/json" }
			});
			await writeStateData(token, payload);
			return new Response(JSON.stringify({
				success: true,
				message: "State saved successfully"
			}), { headers: { "Content-Type": "application/json" } });
		} catch (error) {
			return new Response(JSON.stringify({
				error: "Failed to parse JSON state",
				details: error.message
			}), {
				status: 400,
				headers: { "Content-Type": "application/json" }
			});
		}
	}
} } });
var SYNC_DIR = !!process.env.VERCEL ? "/tmp" : path.join(process.cwd(), ".data", "sync");
var SYNC_FILE = path.join(SYNC_DIR, "health-sync-data.json");
globalThis.__HEALTH_SYNC_QUEUE__ = globalThis.__HEALTH_SYNC_QUEUE__ || [];
async function ensureDir() {
	try {
		await fs.mkdir(SYNC_DIR, { recursive: true });
	} catch (e) {}
}
function normalizeWorkoutsServer(rawWorkouts) {
	if (!rawWorkouts) return [];
	const workoutList = [];
	const addParsedItem = (item) => {
		if (typeof item === "string") {
			const matches = item.match(/\{[^{}]*\}/g);
			if (matches && matches.length > 0) {
				for (const m of matches) try {
					workoutList.push(JSON.parse(m));
				} catch (e) {
					workoutList.push({ type: m });
				}
				return;
			}
			try {
				workoutList.push(JSON.parse(item));
			} catch (e) {
				workoutList.push({ type: item });
			}
		} else if (Array.isArray(item)) for (const sub of item) addParsedItem(sub);
		else if (item && typeof item === "object") workoutList.push(item);
	};
	addParsedItem(rawWorkouts);
	const results = [];
	for (const w of workoutList) {
		if (!w || typeof w !== "object") continue;
		let calories = void 0;
		const rawActiveCal = String(w.activeCalories ?? w.calories ?? w.activeEnergyBurned ?? w.activeEnergy ?? w.energyBurned ?? w.totalEnergyBurned ?? w.workoutCalories ?? w.totalCalories ?? w.active_calories ?? w.active_energy_burned ?? "");
		if (rawActiveCal) {
			const numMatch = rawActiveCal.replace(",", ".").match(/(\d+(?:\.\d+)?)/);
			if (numMatch) {
				const val = Math.round(parseFloat(numMatch[1]));
				if (val > 0) calories = val;
			}
		}
		let avgHeartRate = void 0;
		const rawHR = String(w.avgHeartRate ?? w.heartRate ?? w.averageHeartRate ?? w.meanHeartRate ?? w.bpm ?? w.heartRateAvg ?? w.avg_heart_rate ?? w.heart_rate ?? w.HKQuantityTypeIdentifierHeartRate ?? "");
		if (rawHR) {
			const numMatch = rawHR.replace(",", ".").match(/(\d+(?:\.\d+)?)/);
			if (numMatch) {
				const val = Math.round(parseFloat(numMatch[1]));
				if (val > 0 && val < 250) avgHeartRate = val;
			}
		}
		if (!avgHeartRate) {
			const samples = w.heartRateSamples || w.heartRates || w.samples || w.heart_rate_samples;
			if (Array.isArray(samples)) {
				const arr = samples.map((s) => typeof s === "number" ? s : Number(s?.value ?? s?.bpm ?? s?.quantity ?? 0)).filter((n) => typeof n === "number" && n > 40 && n < 220);
				if (arr.length > 0) avgHeartRate = Math.round(arr.reduce((a, b) => a + b, 0) / arr.length);
			}
		}
		let rawType = String(w.type ?? w.activityType ?? w.workoutActivityType ?? w.name ?? w.workoutType ?? w.title ?? "").trim();
		if (rawType.startsWith("{")) try {
			const parsedType = JSON.parse(rawType);
			if (parsedType && typeof parsedType === "object") {
				if (parsedType.activeCalories && !calories) {
					const numMatch = String(parsedType.activeCalories).replace(",", ".").match(/(\d+(?:\.\d+)?)/);
					if (numMatch) calories = Math.round(parseFloat(numMatch[1]));
				}
				if (parsedType.avgHeartRate && !avgHeartRate) {
					const numMatch = String(parsedType.avgHeartRate).replace(",", ".").match(/(\d+(?:\.\d+)?)/);
					if (numMatch) avgHeartRate = Math.round(parseFloat(numMatch[1]));
				}
				rawType = String(parsedType.type ?? parsedType.name ?? "");
			}
		} catch (e) {}
		if (rawType.includes("kcal")) {
			const kcalMatch = rawType.replace(",", ".").match(/(\d+(?:\.\d+)?)\s*kcal/i);
			if (kcalMatch && !calories) {
				const val = Math.round(parseFloat(kcalMatch[1]));
				if (val > 0) calories = val;
			}
			rawType = "";
		}
		let type = "Natation";
		const lowerType = rawType.toLowerCase();
		if (lowerType.includes("swim") || lowerType.includes("natat") || lowerType.includes("nage") || lowerType.includes("hkworkoutactivitytypeswimming")) type = "Natation";
		else if (lowerType.includes("run") || lowerType.includes("cours") || lowerType.includes("footing") || lowerType.includes("hkworkoutactivitytyperunning")) type = "Course";
		else if (lowerType.includes("walk") || lowerType.includes("march") || lowerType.includes("hkworkoutactivitytypewalking")) type = "Marche";
		else if (lowerType.includes("cycle") || lowerType.includes("velo") || lowerType.includes("bike") || lowerType.includes("hkworkoutactivitytypecycling")) type = "Cyclisme";
		else if (rawType && !rawType.includes("{") && !rawType.includes("kcal")) type = rawType;
		let durationMinutes = void 0;
		const rawDur = Number(w.durationMinutes ?? w.duration ?? w.durationInMinutes ?? w.elapsedTime ?? w.totalDuration ?? 0);
		if (w.durationSec != null && Number(w.durationSec) > 0) durationMinutes = Math.round(Number(w.durationSec) / 60);
		else if (rawDur > 0) durationMinutes = rawDur > 300 ? Math.round(rawDur / 60) : rawDur;
		let distanceKm = void 0;
		let distanceMeters = void 0;
		const parseDistNum = (val) => {
			if (val == null) return void 0;
			const str = String(val).trim().replace(",", ".");
			if (str.includes("kcal")) return void 0;
			const match = str.match(/(\d+(?:\.\d+)?)/);
			if (!match) return void 0;
			const num = parseFloat(match[1]);
			return num > 0 ? num : void 0;
		};
		const dMeters = parseDistNum(w.distanceMeters ?? w.distanceInMeters ?? w.swimmingDistance ?? w.swimmingDistanceMeters ?? w.distanceSwimming ?? w.distanceSwimmingMeters ?? w.HKQuantityTypeIdentifierDistanceSwimming ?? w.HKQuantityTypeIdentifierDistanceSwimmingMeters ?? w.distanceWalkingRunningMeters);
		const dKm = parseDistNum(w.distanceKm ?? w.distanceInKm ?? w.swimmingDistanceKm ?? w.distanceSwimmingKm ?? w.distanceWalkingRunning);
		const dGen = parseDistNum(w.distance ?? w.totalDistance);
		if (dMeters) {
			distanceMeters = dMeters;
			distanceKm = Number((dMeters / 1e3).toFixed(2));
		} else if (dKm) {
			distanceKm = dKm;
			distanceMeters = Math.round(dKm * 1e3);
		} else if (dGen) if (dGen > 50) {
			distanceMeters = dGen;
			distanceKm = Number((dGen / 1e3).toFixed(2));
		} else {
			distanceKm = dGen;
			distanceMeters = Math.round(dGen * 1e3);
		}
		if (!calories) {
			if (type === "Natation") {
				if (distanceMeters && distanceMeters > 0) calories = Math.round(distanceMeters * .25);
				else if (durationMinutes && durationMinutes > 0) calories = Math.round(durationMinutes * 6);
			} else if (type === "Course") {
				if (distanceKm && distanceKm > 0) calories = Math.round(distanceKm * 65);
				else if (durationMinutes && durationMinutes > 0) calories = Math.round(durationMinutes * 10);
			} else if (type === "Marche") {
				if (distanceKm && distanceKm > 0) calories = Math.round(distanceKm * 45);
				else if (durationMinutes && durationMinutes > 0) calories = Math.round(durationMinutes * 4.5);
			} else if (durationMinutes && durationMinutes > 0) calories = Math.round(durationMinutes * 5);
		}
		results.push({
			type: type || "Natation",
			durationMinutes: durationMinutes && durationMinutes > 0 ? durationMinutes : void 0,
			distanceKm,
			distanceMeters,
			calories,
			avgHeartRate
		});
	}
	return results;
}
async function readSyncData() {
	const fileItems = [];
	try {
		await ensureDir();
		const raw = await fs.readFile(SYNC_FILE, "utf-8");
		const parsed = JSON.parse(raw);
		if (Array.isArray(parsed)) fileItems.push(...parsed);
	} catch (error) {}
	const memQueue = globalThis.__HEALTH_SYNC_QUEUE__ || [];
	const map = /* @__PURE__ */ new Map();
	for (const item of fileItems) if (item && typeof item === "object") {
		const key = item.date ? String(item.date).slice(0, 10) : JSON.stringify(item);
		map.set(key, item);
	}
	for (const item of memQueue) if (item && typeof item === "object") {
		const key = item.date ? String(item.date).slice(0, 10) : JSON.stringify(item);
		const existing = map.get(key) || {};
		map.set(key, {
			...existing,
			...item
		});
	}
	return (map.size > 0 ? Array.from(map.values()) : memQueue).map((item) => {
		const workouts = normalizeWorkoutsServer(item.workouts ?? item.health?.workouts ?? []);
		const rawCal = item.activeCalories ?? item.health?.activeCalories ?? item.calories ?? item.moveCalories ?? item.activeEnergyBurned;
		let activeCalories = rawCal != null && !isNaN(Number(rawCal)) && Number(rawCal) > 0 ? Number(rawCal) : void 0;
		if (activeCalories == null && workouts.length > 0) {
			const sumCal = workouts.reduce((acc, w) => acc + (w.calories || 0), 0);
			if (sumCal > 0) activeCalories = sumCal;
		}
		const rawHR = item.avgHeartRate ?? item.health?.avgHeartRate ?? item.heartRate ?? item.averageHeartRate ?? item.meanHeartRate;
		let avgHeartRate = rawHR != null && !isNaN(Number(rawHR)) && Number(rawHR) > 0 ? Number(rawHR) : void 0;
		if (avgHeartRate == null && workouts.length > 0) {
			const hrs = workouts.map((w) => w.avgHeartRate).filter((hr) => typeof hr === "number" && hr > 0);
			if (hrs.length > 0) avgHeartRate = Math.round(hrs.reduce((a, b) => a + b, 0) / hrs.length);
		}
		return {
			date: item.date ?? (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
			steps: item.steps ?? item.health?.steps,
			avgHeartRate,
			activeCalories,
			exerciseMinutes: item.exerciseMinutes ?? item.health?.exerciseMinutes,
			workouts,
			health: item.health ? {
				...item.health,
				avgHeartRate: avgHeartRate ?? item.health.avgHeartRate,
				activeCalories: activeCalories ?? item.health.activeCalories,
				workouts
			} : {
				steps: item.steps,
				avgHeartRate,
				activeCalories,
				exerciseMinutes: item.exerciseMinutes,
				workouts
			}
		};
	});
}
async function writeSyncData(data) {
	globalThis.__HEALTH_SYNC_QUEUE__ = data;
	await ensureDir();
	try {
		await fs.writeFile(SYNC_FILE, JSON.stringify(data, null, 2), "utf-8");
	} catch (error) {
		console.error("Failed to write health sync file:", error);
	}
}
async function mergeHealthIntoServerStates(payload) {
	try {
		const todayISO = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
		const rawDate = payload.date ? String(payload.date).trim() : todayISO;
		const date = rawDate.length >= 10 ? rawDate.slice(0, 10) : todayISO;
		const normalizedWorkouts = normalizeWorkoutsServer(payload.workouts ?? payload.health?.workouts ?? []);
		const steps = payload.health?.steps ?? payload.steps ?? payload.stepCount;
		let avgHeartRate = payload.health?.avgHeartRate ?? payload.avgHeartRate ?? payload.heartRate ?? payload.averageHeartRate ?? payload.meanHeartRate;
		if (avgHeartRate == null || isNaN(Number(avgHeartRate))) {
			const hrs = normalizedWorkouts.map((w) => w.avgHeartRate).filter((hr) => typeof hr === "number" && hr > 0);
			if (hrs.length > 0) avgHeartRate = Math.round(hrs.reduce((a, b) => a + b, 0) / hrs.length);
		}
		let activeCalories = payload.health?.activeCalories ?? payload.activeCalories ?? payload.calories ?? payload.moveCalories ?? payload.activeEnergyBurned;
		if (activeCalories == null || isNaN(Number(activeCalories))) {
			const sumCal = normalizedWorkouts.reduce((acc, w) => acc + (w.calories || 0), 0);
			if (sumCal > 0) activeCalories = sumCal;
		}
		const exerciseMinutes = payload.health?.exerciseMinutes ?? payload.exerciseMinutes ?? payload.exerciseTime ?? payload.workoutMinutes;
		const standHours = payload.health?.standHours ?? payload.standHours ?? payload.appleStandHours ?? payload.standTime;
		const dirsToSearch = [SYNC_DIR, "/tmp"];
		for (const dir of dirsToSearch) try {
			const files = await fs.readdir(dir);
			for (const f of files) if (f.startsWith("state-sync-") && f.endsWith(".json")) {
				const filePath = path.join(dir, f);
				try {
					const raw = await fs.readFile(filePath, "utf-8");
					const state = JSON.parse(raw);
					if (state && typeof state === "object") {
						state.days = state.days || {};
						const day = state.days[date] || { checked: {} };
						day.health = {
							...day.health,
							steps: steps != null ? Number(steps) : day.health?.steps,
							avgHeartRate: avgHeartRate != null ? Number(avgHeartRate) : day.health?.avgHeartRate,
							activeCalories: activeCalories != null ? Number(activeCalories) : day.health?.activeCalories,
							exerciseMinutes: exerciseMinutes != null ? Number(exerciseMinutes) : day.health?.exerciseMinutes,
							standHours: standHours != null ? Number(standHours) : day.health?.standHours,
							workouts: normalizedWorkouts.length ? normalizedWorkouts : day.health?.workouts ?? []
						};
						state.days[date] = day;
						state.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
						await fs.writeFile(filePath, JSON.stringify(state, null, 2), "utf-8");
					}
				} catch (e) {}
			}
		} catch (e) {}
	} catch (e) {}
}
var Route = createFileRoute("/api/sync-health")({ server: { handlers: {
	GET: async () => {
		const data = await readSyncData();
		return new Response(JSON.stringify(data), { headers: { "Content-Type": "application/json" } });
	},
	POST: async ({ request }) => {
		try {
			let body = null;
			try {
				body = await request.json();
			} catch (e) {
				const text = await request.text().catch(() => "");
				if (text) try {
					body = JSON.parse(text);
				} catch (err) {}
			}
			if (typeof body === "string") try {
				body = JSON.parse(body);
			} catch (e) {}
			console.log("Payload reçu sync-health:", JSON.stringify(body, null, 2));
			if (!body || typeof body !== "object") return new Response(JSON.stringify({ error: "Invalid payload format" }), {
				status: 400,
				headers: { "Content-Type": "application/json" }
			});
			const payload = body;
			const normalizedWorkouts = normalizeWorkoutsServer(payload.workouts ?? payload.health?.workouts ?? []);
			payload.workouts = normalizedWorkouts;
			if (!payload.health || typeof payload.health !== "object") payload.health = {};
			payload.health.workouts = normalizedWorkouts;
			let globalActiveCal = payload.health?.activeCalories ?? payload.activeCalories ?? payload.calories ?? payload.moveCalories ?? payload.activeEnergyBurned;
			if (globalActiveCal == null || isNaN(Number(globalActiveCal))) {
				const sumCal = normalizedWorkouts.reduce((acc, w) => acc + (w.calories || 0), 0);
				if (sumCal > 0) globalActiveCal = sumCal;
			}
			if (globalActiveCal != null && !isNaN(Number(globalActiveCal))) {
				payload.activeCalories = Number(globalActiveCal);
				payload.health.activeCalories = Number(globalActiveCal);
			}
			let globalAvgHR = payload.health?.avgHeartRate ?? payload.avgHeartRate ?? payload.heartRate ?? payload.averageHeartRate ?? payload.meanHeartRate;
			if (globalAvgHR == null || isNaN(Number(globalAvgHR))) {
				const hrs = normalizedWorkouts.map((w) => w.avgHeartRate).filter((hr) => typeof hr === "number" && hr > 0);
				if (hrs.length > 0) globalAvgHR = Math.round(hrs.reduce((a, b) => a + b, 0) / hrs.length);
			}
			if (globalAvgHR != null && !isNaN(Number(globalAvgHR))) {
				payload.avgHeartRate = Number(globalAvgHR);
				payload.health.avgHeartRate = Number(globalAvgHR);
			}
			const queue = globalThis.__HEALTH_SYNC_QUEUE__ || [];
			const dateKey = payload.date ? String(payload.date).slice(0, 10) : (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
			const existingIdx = queue.findIndex((q) => q && q.date && String(q.date).slice(0, 10) === dateKey);
			if (existingIdx >= 0) queue[existingIdx] = {
				...queue[existingIdx],
				...payload,
				workouts: normalizedWorkouts,
				health: {
					...queue[existingIdx].health || {},
					...payload.health,
					workouts: normalizedWorkouts
				}
			};
			else queue.push(payload);
			globalThis.__HEALTH_SYNC_QUEUE__ = queue;
			await writeSyncData(await readSyncData());
			await mergeHealthIntoServerStates(payload);
			return new Response(JSON.stringify({
				success: true,
				message: "Data synced successfully",
				date: dateKey,
				activeCalories: payload.activeCalories,
				avgHeartRate: payload.avgHeartRate,
				health: payload.health,
				workouts: normalizedWorkouts
			}), { headers: { "Content-Type": "application/json" } });
		} catch (error) {
			return new Response(JSON.stringify({
				error: "Failed to parse JSON",
				details: error.message
			}), {
				status: 400,
				headers: { "Content-Type": "application/json" }
			});
		}
	},
	DELETE: async () => {
		await writeSyncData([]);
		return new Response(JSON.stringify({
			success: true,
			message: "Sync data cleared"
		}), { headers: { "Content-Type": "application/json" } });
	}
} } });
var PsychotechniquesRoute = Route$9.update({
	id: "/psychotechniques",
	path: "/psychotechniques",
	getParentRoute: () => Route$10
});
var ProgressionRoute = Route$8.update({
	id: "/progression",
	path: "/progression",
	getParentRoute: () => Route$10
});
var ProgrammeRoute = Route$7.update({
	id: "/programme",
	path: "/programme",
	getParentRoute: () => Route$10
});
var PerformancesRoute = Route$6.update({
	id: "/performances",
	path: "/performances",
	getParentRoute: () => Route$10
});
var ParametresRoute = Route$5.update({
	id: "/parametres",
	path: "/parametres",
	getParentRoute: () => Route$10
});
var JournalRoute = Route$4.update({
	id: "/journal",
	path: "/journal",
	getParentRoute: () => Route$10
});
var CatalogueRoute = Route$3.update({
	id: "/catalogue",
	path: "/catalogue",
	getParentRoute: () => Route$10
});
var IndexRoute = Route$2.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$10
});
var ApiSyncStateRoute = Route$1.update({
	id: "/api/sync-state",
	path: "/api/sync-state",
	getParentRoute: () => Route$10
});
var rootRouteChildren = {
	IndexRoute,
	CatalogueRoute,
	JournalRoute,
	ParametresRoute,
	PerformancesRoute,
	ProgrammeRoute,
	ProgressionRoute,
	PsychotechniquesRoute,
	ApiSyncHealthRoute: Route.update({
		id: "/api/sync-health",
		path: "/api/sync-health",
		getParentRoute: () => Route$10
	}),
	ApiSyncStateRoute
};
var routeTree = Route$10._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
