#!/usr/bin/env node

import { program } from 'commander';
import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));

program
  .name('create-epic-remark')
  .description('CLI to scaffold Epic Remark projects with TailwindCSS integration')
  .version(packageJson.version)
  .option('--example <type>', 'Specify the example to scaffold (next-tailwind, or nuxt-tailwind)')
  .helpOption('-h, --help', 'Display help for command')
  .addHelpText(
    'after',
    `
Description:
  Epic Remark is a tool to quickly scaffold projects with integrated TailwindCSS configurations. It supports Next.js and Nuxt.js frameworks.

Examples:
  $ create-epic-remark
  - Uses prompts to walk the user through scaffolding an example project.

  $ create-epic-remark --example next-tailwind
  - Scaffolds a project using the Next.js and TailwindCSS integration.

  $ create-epic-remark --example nuxt-tailwind
  - Scaffolds a project using the Nuxt.js and TailwindCSS integration.

Repository:
  For more details and source code, visit https://github.com/sandypockets/epic-remark

Author:
  - Created by sandypockets. Follow on GitHub: https://github.com/sandypockets

License:
  Distributed under the MIT. See LICENSE file for more information.

Contribution:
  Contributions to the project are welcome! See the repository's CONTRIBUTING guide for more details.
`
  );

const VALID_EXAMPLES = ['next-tailwind', 'nuxt-tailwind'];
program.parse(process.argv);
const options = program.opts();

const isValidExample = example => {
  return VALID_EXAMPLES.includes(example);
};

const scaffoldProject = async (example, projectName) => {
  const isValidProjectName = name => {
    const validNameRegex = /^[a-zA-Z_][a-zA-Z0-9_-]*$/;
    return validNameRegex.test(name);
  };

  if (!isValidProjectName(projectName)) {
    console.error(
      chalk.red(
        `Invalid project name: '${projectName}'. It should not start with a digit and should only contain alphanumeric characters, hyphens, and underscores.`
      )
    );
    process.exit(1);
  }

  if (!isValidExample(example)) {
    console.error(chalk.red(`Invalid example: '${example}'. Valid examples are ${VALID_EXAMPLES.join(', ')}.`));
    process.exit(1);
  }

  const examplesDir = `https://github.com/sandypockets/epic-remark/examples/${example}`;
  const fullPath = path.join(process.cwd(), projectName);
  console.log(chalk.blue(`You are about to clone the repository into: ${fullPath}`));

  const answers = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirmClone',
      message: 'Do you want to proceed?',
      default: false,
    },
  ]);

  if (answers.confirmClone) {
    const spinner = ora({ text: 'Cloning repository...\n', color: 'blue' }).start();
    try {
      execSync(`npx degit ${examplesDir} ${projectName}`, { stdio: 'inherit' });
      spinner.succeed('Project created successfully.');
    } catch (error) {
      if (error.message.includes('404')) {
        spinner.fail('The specified example could not be found.');
      } else if (error.message.includes('ENOTFOUND') || error.message.includes('network')) {
        spinner.fail('Failed to connect to GitHub. Please check your internet connection and try again.');
      } else {
        spinner.fail(`Failed to create project: ${error.message}`);
      }
      process.exit(1);
    }
  } else {
    console.log(chalk.yellow('Clone cancelled by the user.'));
    process.exit(0);
  }
};

const promptUserForOptions = async () => {
  const questions = [
    {
      type: 'list',
      name: 'example',
      message: 'Choose an epic-remark example project to scaffold:',
      choices: VALID_EXAMPLES,
    },
    {
      type: 'input',
      name: 'projectName',
      message: 'Enter a name for your new project:',
      default: 'my-epic-remark-project',
    },
  ];

  const answers = await inquirer.prompt(questions);
  await scaffoldProject(answers.example, answers.projectName);
};

if (!options.example) {
  await promptUserForOptions();
} else {
  let projectName = 'my-epic-remark-project';
  await scaffoldProject(options.example, projectName);
}
