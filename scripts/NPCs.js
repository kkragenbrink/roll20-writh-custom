function setNPCTokenHP(token, represents) {
	const hpformulaAttr = getSheetAttribute(represents, "npc_hpformula");
	const conAttr = getSheetAttribute(represents, "npcd_con");
	if (!hpformulaAttr || !conAttr) return;
	const hpformula = hpformulaAttr.get("current");
	const hpmod = Math.floor(parseInt(conAttr.get("current")) / 2) - 5;
	let [hitDie, hitDieType] = hpformula.split("d");
	if (hitDieType.indexOf("+") > -1) {
		[hitDieType] = hitDieType.split("+");
	}
	if (hitDieType.indexOf("-") > -1) {
		[hitDieType] = hitDieType.split("-");
	}
	let hp = 0;
	for (let i = 0; i < +hitDie; i++) {
		hp += randomInteger(+hitDieType) + hpmod;
	}

	setTimeout(() => token.set("bar1_link", null), 50);
	setTimeout(() => token.set("bar1_value", hp), 50);
	setTimeout(() => token.set("bar1_max", hp), 50);
}

function trackNPCToken(token, represents) {
	const list = state.writh.npcs[represents] || [];
	list.push(token.id);
	state.writh.npcs[represents] = list;
}

function untrackNPCToken(token, represents) {
	const list = state.writh.npcs[represents] || [];
	const idx = list.indexOf(token.id);
	list.splice(idx, 1);
	state.writh.npcs[represents] = list;
}

function setOrdinalTokenName(token, represents) {
	const list = state.writh.npcs[represents] || [];
	const ord = getOrdinal(list.length);
	let name = token.get("name");
	if (!name) {
		const nameAttr = getSheetAttribute(represents, "npc_name");
		name = nameAttr.get("current");
	}
	token.set("name", ord + " " + name);
}