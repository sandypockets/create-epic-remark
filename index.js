const { program } = require('commander');
const { execSync } = require('child_process');

program
  .option('--example <type>', 'Specify the example to scaffold (next-tailwind, or nuxt-tailwind)');

program.addHelpText('after', `
Examples:
  $ create-epic-remark --example next-tailwind
  $ create-epic-remark --example nuxt-tailwind`);

program.parse(process.argv);

const options = program.opts();

if (!process.argv.slice(2).length) {
  console.error('Please specify an example to scaffold.');
  process.exit(1);
}

if (options.example) {
  const examplesDir = `https://github.com/sandypockets/epic-remark/examples/${options.example}`;

  try {
    console.log(`Creating new Epic Remark project with ${options.example} example...`);
    execSync(`npx degit ${examplesDir} my-epic-remark-project`, { stdio: 'inherit' });
    console.log('Project created successfully.');
  } catch (error) {
    console.error(`Failed to create project: ${error.message}`);
  }
} else {
  console.error('Please specify an example to scaffold.');
  program.help();
}