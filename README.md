# Dev Server

Feel free to import TypeScript files in the script tag!

[![tag](https://img.shields.io/github/tag/zhmushan/dev_server.svg)](https://github.com/zhmushan/dev_server)
[![Build Status](https://github.com/zhmushan/dev_server/workflows/ci/badge.svg?branch=master)](https://github.com/zhmushan/dev_server/actions)
[![license](https://img.shields.io/github/license/zhmushan/dev_server.svg)](https://github.com/zhmushan/dev_server)
[![tag](https://img.shields.io/badge/deno-v1.0.0_rc2-green.svg)](https://github.com/denoland/deno)

## Getting Started

Without install:

```sh
deno run -A --unstable https://deno.land/x/dev_server/mod.ts --template hello_world
```

Install & Run it:

```sh
deno install -A --unstable https://deno.land/x/dev_server/mod.ts

dev_server my_app --template hello_world
```

Print help info:

```sh
dev_server -h
```

Upgrade to the latest version:

```sh
deno cache --reload --unstable https://deno.land/x/dev_server/mod.ts
```

Create project from template:

```sh
# Check from https://deno.land/x/dev_server/template/
dev_server my_app --template hello_world
dev_server my_app --template react
dev_server my_app --template angular
```

## TODOs

- [ ] Hot Module Replacement
- [ ] CSS Pre-Processors
- [ ] Building for Production
