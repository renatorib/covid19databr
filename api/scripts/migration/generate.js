const fs = require("fs");
const chalk = require("chalk");

const MIGRATIONS_PATH = `migrations`;
const TEMPLATE_PATH = `scripts/migration/generate-template.js`;

const DATE = new Date().toISOString().substr(0, 10);
const TIME = new Date().getTime();
const NAME = process.argv[2];

if (NAME == null) {
  console.error(chalk`Please give a {blue.underline name} to the migration.`);
  console.error(chalk`Example: {magenta.italic yarn migration name_goes_here}`);
  process.exit(1);
}

const file = `${MIGRATIONS_PATH}/${TIME}_${DATE}_${NAME}.js`;
const template = fs.readFileSync(TEMPLATE_PATH);

console.log(chalk`Created migration {green ${NAME}} \nFile: {blue ${file}}`);

fs.writeFileSync(file, template, "utf8");
