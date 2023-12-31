# `create-epic-remark`
`create-epic-remark` is a CLI tool for scaffolding examples from the `epic-remark` repository. It is designed to make starting a new project with `epic-remark` as easy as possible, so you can focus on writing content, and not on set up.

* [`epic-remark` GitHub repository](https://github.com/sandypockets/epic-remark)
* [`epic-remark` NPM package](https://www.npmjs.com/package/epic-remark)

![npm bundle size](https://img.shields.io/bundlephobia/minzip/create-epic-remark)
![npm bundle size](https://img.shields.io/bundlephobia/min/create-epic-remark)
![npm](https://img.shields.io/npm/v/create-epic-remark)
![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/sandypockets/create-epic-remark/ci.yml)
![GitHub issues](https://img.shields.io/github/issues/sandypockets/create-epic-remark)
![GitHub pull requests](https://img.shields.io/github/issues-pr/sandypockets/create-epic-remark)
![npm](https://img.shields.io/npm/dt/create-epic-remark)
![npm](https://img.shields.io/npm/dw/create-epic-remark)
![NPM](https://img.shields.io/npm/l/create-epic-remark)

## Features
- Quick setup for `epic-remark` projects.
- Supports various examples tailored for different setups (Next.js and Nuxt.js so far)
- Lightweight and easy to use.

## Installation
You don't need to install `create-epic-remark` - it's designed to be used with `npx`:

```bash
npx create-epic-remark
```

If you to prefer to install the package, you can do so with `npm` or `yarn`: 

```bash
npm install -g create-epic-remark
```

```bash
npm exec create-epic-remark
```

```bash
yarn create epic-remark
```

## Usage
When you run `create-epic-remark`, the CLI will offer some prompts to help walk you through selecting and scaffolding an `epic-remark` example.

```bash
npx create-epic-remark
```

However if you prefer to specify the example ahead of time, you can skip the prompts by passing the `--example` flag:

```bash
npx create-epic-remark --example [example-name]
```

## Available Examples
* `next-tailwind`: A Next.js setup with Tailwind CSS.
* `nuxt-tailwind`: A Nuxt.js setup with Tailwind CSS.

## Contributing
Contributions are welcome! Please see the [contributing docs](CONTRIBUTING.md) for more details.

## Support
If you encounter any issues or have questions, please open an issue on the GitHub repository.

## License
This project is licensed under the MIT License - see the [license](LICENSE.md) file for details.