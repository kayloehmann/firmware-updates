const { execFileSync } = require("node:child_process");
const path = require("node:path");

const root = path.resolve(__dirname, "../../..");
const biome = require.resolve("@biomejs/biome/bin/biome");

function formatWithBiome(text, filename) {
	return execFileSync(
		process.execPath,
		[biome, "format", "--stdin-file-path=" + filename],
		{
			cwd: root,
			encoding: "utf8",
			input: text,
			stdio: ["pipe", "pipe", "pipe"],
		},
	);
}

function formatChangelog(raw) {
	const normalized = raw.trim().replace(/\r\n/g, "\n");
	try {
		return formatWithBiome(normalized, "firmware-changelog.md").trim();
	} catch {
		return normalized;
	}
}

module.exports = { formatChangelog, formatWithBiome };
