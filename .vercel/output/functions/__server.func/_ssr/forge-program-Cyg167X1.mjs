import { t as createTrainingEngine } from "./trainingEngine-BrV9Cuh-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/forge-program-Cyg167X1.js
function toLocalISO(date) {
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
function buildDayMission(state, dateISO) {
	const mission = createTrainingEngine(state, { toggleTask: () => {} }, { todayISO: dateISO }).getMission(dateISO);
	return {
		iso: mission.iso,
		title: mission.title,
		dayName: mission.dayName,
		objective: mission.objective,
		priority: mission.priority,
		tasks: mission.tasks.map((task) => ({
			...task,
			moment: task.moment ?? "afternoon",
			estimatedMinutes: task.estimatedMinutes ?? 15,
			steps: task.steps ?? [task.label]
		})),
		doneCount: mission.doneCount,
		remainingCount: mission.remainingCount,
		totalCount: mission.totalCount,
		completionPct: mission.completionPct,
		xp: mission.xp,
		estimatedMinutes: mission.estimatedMinutes,
		status: mission.status,
		psychotechnique: mission.psychotechnique,
		summary: mission.summary
	};
}
function buildHistoryItems(state, todayISO, count = 7) {
	const today = /* @__PURE__ */ new Date(`${todayISO}T12:00:00`);
	return Array.from({ length: count }, (_, index) => {
		const date = new Date(today);
		date.setDate(today.getDate() - index);
		const iso = toLocalISO(date);
		const mission = buildDayMission(state, iso);
		const firstDone = mission.tasks.find((task) => state.days[iso]?.checked[task.id]);
		const firstPlanned = mission.tasks.find((task) => task.type !== "hydration");
		return {
			iso,
			dayName: mission.dayName,
			doneCount: mission.doneCount,
			totalCount: mission.totalCount,
			completionPct: mission.completionPct,
			completed: mission.status === "termine",
			highlight: firstDone?.label ?? firstPlanned?.label ?? "Repos",
			note: state.days[iso]?.journal?.notes
		};
	});
}
//#endregion
export { buildHistoryItems as n, buildDayMission as t };
