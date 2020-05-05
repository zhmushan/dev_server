# Dev Server

Feel free to import TypeScript files in the script tag!

[![tag](https://img.shields.io/github/tag/zhmushan/dev_server.svg)](https://github.com/zhmushan/dev_server)
[![Build Status](https://github.com/zhmushan/dev_server/workflows/ci/badge.svg?branch=master)](https://github.com/zhmushan/dev_server/actions)
[![license](https://img.shields.io/github/license/zhmushan/dev_server.svg)](https://github.com/zhmushan/dev_server)
[![tag](https://img.shields.io/badge/deno-v1.0.0_rc1-green.svg)](https://github.com/denoland/deno)

## Getting Started

Without install:

```sh
mkdir my_app
deno -A --unstable https://deno.land/x/dev_server/mod.ts my_app
```

Install & Run it:

```sh
deno install -A --unstable https://deno.land/x/dev_server/mod.ts
mkdir my_app
dev_server my_app
```

Print help info:

```sh
dev_server -h
```

Upgrade to the latest version:

```sh
deno cache --reload https://deno.land/x/dev_server/mod.ts
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
