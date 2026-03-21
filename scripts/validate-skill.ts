import { existsSync, readFileSync, readdirSync } from "node:fs";
import { basename, join, resolve } from "node:path";

const NAME_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ALLOWED_FRONTMATTER_KEYS = new Set([
	"name",
	"description",
	"license",
	"compatibility",
	"metadata",
	"allowed-tools",
	"argument-hint",
	"disable-model-invocation",
	"user-invocable",
	"model",
	"effort",
	"context",
	"agent",
	"hooks",
]);

function fail(message: string): never {
	console.error(`[ERROR] ${message}`);
	process.exit(1);
}

function read(path: string): string {
	try {
		return readFileSync(path, "utf8");
	} catch (error) {
		if (error instanceof Error) {
			fail(`Missing file: ${path} (${error.message})`);
		}

		fail(`Missing file: ${path}`);
	}
}

function parseFrontmatter(text: string): string {
	const match = text.match(/^---\n([\s\S]*?)\n---\n/);
	if (!match) {
		fail("SKILL.md must start with YAML frontmatter delimited by ---");
	}

	return match[1];
}

function topLevelKeys(frontmatter: string): string[] {
	return frontmatter
		.split("\n")
		.filter((line) => line.length > 0 && !/^[ \t]/.test(line))
		.map((line) => line.match(/^([A-Za-z0-9_-]+):/)?.[1])
		.filter((key): key is string => Boolean(key));
}

function getFieldValue(frontmatter: string, key: string): string | undefined {
	const blockMatch = frontmatter.match(
		new RegExp(`^${key}:\\s+[|>]\\n((?:^[ \\t].*\\n?)*)`, "m"),
	);
	if (blockMatch) {
		return blockMatch[1].trim();
	}

	const scalarMatch = frontmatter.match(
		new RegExp(`^${key}:\\s*(.+?)\\s*$`, "m"),
	);
	return scalarMatch?.[1]?.trim();
}

function validateOpenAiYaml(path: string): void {
	const text = read(path);
	const requiredPatterns: Record<string, RegExp> = {
		display_name: /^\s+display_name:\s+".+"\s*$/m,
		short_description: /^\s+short_description:\s+".+"\s*$/m,
		default_prompt: /^\s+default_prompt:\s+".+"\s*$/m,
	};

	if (!/^interface:\s*$/m.test(text)) {
		fail("agents/openai.yaml must include a top-level 'interface:' key");
	}

	for (const [field, pattern] of Object.entries(requiredPatterns)) {
		if (!pattern.test(text)) {
			fail(`agents/openai.yaml is missing interface.${field}`);
		}
	}
}

function validateSkill(skillDirInput: string): void {
	const skillDir = resolve(skillDirInput);
	const skillMdPath = resolve(skillDir, "SKILL.md");
	const frontmatter = parseFrontmatter(read(skillMdPath));
	const skillName = getFieldValue(frontmatter, "name");
	const description = getFieldValue(frontmatter, "description");
	const compatibility = getFieldValue(frontmatter, "compatibility");
	const folderName = basename(skillDir);

	if (!skillName) {
		fail(`Frontmatter must include a non-empty 'name' field in ${skillMdPath}`);
	}

	if (!description) {
		fail(
			`Frontmatter must include a non-empty 'description' field in ${skillMdPath}`,
		);
	}

	const extraKeys = topLevelKeys(frontmatter).filter(
		(key) => !ALLOWED_FRONTMATTER_KEYS.has(key),
	);
	if (extraKeys.length > 0) {
		fail(
			`Unexpected frontmatter keys in ${skillMdPath}: ${extraKeys.join(", ")}`,
		);
	}

	if (skillName !== folderName) {
		fail(`Skill name '${skillName}' must match folder name '${folderName}'`);
	}

	if (!NAME_RE.test(skillName) || skillName.length > 64) {
		fail("Skill name must use lowercase letters, digits, and hyphens only");
	}

	if (description.length > 1024) {
		fail("Skill description must be 1024 characters or fewer");
	}

	if (compatibility && compatibility.length > 500) {
		fail("Skill compatibility must be 500 characters or fewer");
	}

	const openAiYamlPath = resolve(skillDir, "agents", "openai.yaml");
	if (existsSync(openAiYamlPath)) {
		validateOpenAiYaml(openAiYamlPath);
	}

	console.log(`Skill is valid: ${skillName}`);
}

function findSkillDirs(root: string): string[] {
	const skillsRoot = resolve(root);
	return readdirSync(skillsRoot, { withFileTypes: true })
		.filter((entry) => entry.isDirectory())
		.map((entry) => join(skillsRoot, entry.name))
		.filter((dir) => existsSync(join(dir, "SKILL.md")));
}

function main(): void {
	const skillArg = process.argv[2];
	const skillDirs = skillArg ? [skillArg] : findSkillDirs("skills");

	if (skillDirs.length === 0) {
		fail("No skill directories found");
	}

	for (const skillDir of skillDirs) {
		validateSkill(skillDir);
	}
}

main();
