// Publiceert de dist-map naar de gh-pages branch van deze repository.
// Gebruik: npm run deploy
import { execSync } from "node:child_process";
import { rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const dist = join(import.meta.dirname, "dist");
const remote = execSync("git remote get-url origin", { encoding: "utf8" }).trim();
const run = (cmd) => execSync(cmd, { cwd: dist, stdio: "inherit" });

writeFileSync(join(dist, ".nojekyll"), "");
rmSync(join(dist, ".git"), { recursive: true, force: true });
run("git init -b gh-pages");
run("git add -A");
run('git commit -m "Deploy Het Levenspad"');
run(`git push -f ${remote} gh-pages`);
rmSync(join(dist, ".git"), { recursive: true, force: true });
console.log("\nKlaar! De nieuwe versie staat binnen ~1 minuut online.");
