#!/usr/bin/env node
// Fundamentum skill installer — copies the bundled skills into a Claude Code
// skills directory (global ~/.claude/skills or project ./.claude/skills).
// Zero dependencies: uses only the Node standard library.

import { readdir, cp, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { homedir } from 'node:os';
import { createInterface } from 'node:readline/promises';
import process from 'node:process';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..'); // package root — where the skill folders live

const HELP = `fundamentum — install documentation-first Claude Code skills

Usage:
  npx fundamentum [add] [skills...] [options]
  npx fundamentum list

Arguments:
  skills...            Names of skills to install (default: all bundled skills)

Options:
  -g, --global        Install into ~/.claude/skills (every project)
  -p, --project       Install into ./.claude/skills (this repo only)
  -f, --force         Overwrite an existing skill without asking
  -h, --help          Show this help

With no --global/--project flag, you'll be asked which one.

Examples:
  npx fundamentum                 # install all skills, ask scope
  npx fundamentum add primer -g   # install just 'primer' globally
  npx fundamentum --project       # install all into this repo
`;

/** Discover bundled skills = top-level dirs that contain a SKILL.md. */
async function discoverSkills() {
  const entries = await readdir(ROOT, { withFileTypes: true });
  const skills = [];
  for (const e of entries) {
    if (!e.isDirectory()) continue;
    if (e.name.startsWith('.') || e.name === 'bin' || e.name === 'node_modules') continue;
    if (existsSync(join(ROOT, e.name, 'SKILL.md'))) skills.push(e.name);
  }
  return skills.sort();
}

function parseArgs(argv) {
  const args = [...argv];
  // optional leading verb
  if (['add', 'install', 'i'].includes(args[0])) args.shift();
  const flags = new Set();
  const names = [];
  for (const a of args) {
    if (a === '-h' || a === '--help') flags.add('help');
    else if (a === '-g' || a === '--global') flags.add('global');
    else if (a === '-p' || a === '--project') flags.add('project');
    else if (a === '-f' || a === '--force') flags.add('force');
    else if (a.startsWith('-')) throw new Error(`Unknown option: ${a}`);
    else names.push(a);
  }
  return { flags, names, verb: argv[0] };
}

async function main() {
  const { flags, names, verb } = parseArgs(process.argv.slice(2));

  if (flags.has('help')) {
    process.stdout.write(HELP);
    return;
  }

  const available = await discoverSkills();
  if (available.length === 0) throw new Error(`No skills found in ${ROOT}`);

  if (verb === 'list') {
    process.stdout.write(`Bundled skills:\n${available.map((s) => `  - ${s}`).join('\n')}\n`);
    return;
  }

  // Which skills?
  let selected = available;
  if (names.length) {
    const unknown = names.filter((n) => !available.includes(n));
    if (unknown.length) {
      throw new Error(
        `Unknown skill(s): ${unknown.join(', ')}\nAvailable: ${available.join(', ')}`,
      );
    }
    selected = names;
  }

  // Interactive prompts share one readline instance.
  const interactive = process.stdin.isTTY && process.stdout.isTTY;
  const rl = interactive ? createInterface({ input: process.stdin, output: process.stdout }) : null;

  try {
    // Scope: global vs project.
    let scope;
    if (flags.has('global')) scope = 'global';
    else if (flags.has('project')) scope = 'project';
    else if (rl) {
      process.stdout.write(
        `\nFundamentum — installing: ${selected.join(', ')}\n\n` +
          `Where should these skills go?\n` +
          `  1) Global   ${join(homedir(), '.claude', 'skills')}   (available in every project)\n` +
          `  2) Project  ${join(process.cwd(), '.claude', 'skills')}   (this repo only)\n`,
      );
      const ans = (await rl.question('Choose [1/2]: ')).trim();
      scope = ans === '2' || ans.toLowerCase().startsWith('p') ? 'project' : ans === '1' || ans.toLowerCase().startsWith('g') ? 'global' : null;
      if (!scope) throw new Error('No scope chosen. Aborting.');
    } else {
      throw new Error('Non-interactive shell: pass --global or --project.');
    }

    const targetBase =
      scope === 'global'
        ? join(homedir(), '.claude', 'skills')
        : join(process.cwd(), '.claude', 'skills');

    await mkdir(targetBase, { recursive: true });

    const force = flags.has('force');
    const installed = [];
    for (const name of selected) {
      const src = join(ROOT, name);
      const dest = join(targetBase, name);

      if (existsSync(dest) && !force) {
        if (rl) {
          const ans = (await rl.question(`  ${dest} exists. Overwrite? [y/N]: `)).trim().toLowerCase();
          if (ans !== 'y' && ans !== 'yes') {
            process.stdout.write(`  skipped ${name}\n`);
            continue;
          }
        } else {
          process.stdout.write(`  skipped ${name} (exists; use --force)\n`);
          continue;
        }
      }

      await cp(src, dest, { recursive: true, force: true });
      installed.push(name);
      process.stdout.write(`  ✓ ${name} → ${dest}\n`);
    }

    if (installed.length) {
      process.stdout.write(
        `\nDone. Installed ${installed.length} skill(s) into the ${scope} directory.\n` +
          `Restart Claude Code (or start a new session) to pick them up.\n`,
      );
    } else {
      process.stdout.write(`\nNothing installed.\n`);
    }
  } finally {
    rl?.close();
  }
}

main().catch((err) => {
  process.stderr.write(`Error: ${err.message}\n`);
  process.exit(1);
});
