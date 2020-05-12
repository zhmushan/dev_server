import type { DirMetadata } from "./types.ts";

import {
  Application,
  NotFoundException,
  logger,
  Header,
  MIME,
  path,
  fs,
  flags,
  colors,
} from "./deps.ts";
const { readFile, transpileOnly, cwd, stat, args, exit } = Deno;
const { join } = path;
const { exists, ensureDir, writeFileStr } = fs;
const { parse } = flags;
const { green } = colors;
const hasOwnProperty = Object.prototype.hasOwnProperty;

interface ServerArgs {
  _: string[];
  // -p --port
  p: number;
  port: number;
  // --tsconfig
  tsconfig: string;
  // --template
  template: string;
  // -h --help
  h: boolean;
  help: boolean;
}

const serverArgs = parse(args) as ServerArgs;

if (serverArgs.h ?? serverArgs.help) {
  console.log(`Dev Server
INSTALL:
  deno install -A --unstable https://deno.land/x/dev_server/mod.ts
USAGE:
  dev_server [path] [options]
OPTIONS:
  -h, --help          Prints help information
  -p, --port <port>   Set port
  --tsconfig <path>   Path to tsconfig.json
  --template <name>   Create app with template`);
  exit();
}

const port = serverArgs.port ?? serverArgs.p ?? 8080;
const target = join(cwd(), serverArgs._[0] ?? ".");
const tsconfigPath = join(target, serverArgs.tsconfig ?? "tsconfig.json");
let compilerOptions: Deno.CompilerOptions = {};

if (typeof serverArgs.template === "string") {
  const templateMetadata: DirMetadata = await fetch(
    "https://deno.land/x/dev_server/template.json",
  ).then((resp) => resp.json());

  const url = "https://deno.land/x/dev_server/template";

  if (hasOwnProperty.call(templateMetadata, serverArgs.template)) {
    const template = templateMetadata[serverArgs.template];
    const processes: Promise<unknown>[] = [];
    if (typeof template === "object") {
      await createDirFromMetadata(
        target,
        `${url}/${serverArgs.template}`,
        template,
      );
    }
    await Promise.all(processes);

    async function createDirFromMetadata(
      localPath: string,
      resourcePath: string,
      metadata: DirMetadata,
    ) {
      await ensureDir(localPath);
      for (const k in metadata) {
        const maybeMetadata = metadata[k];
        const lp = join(localPath, k);
        const rp = `${resourcePath}/${k}`;
        if (typeof maybeMetadata === "object") {
          await createDirFromMetadata(lp, rp, maybeMetadata);
        } else {
          const p = fetch(rp)
            .then((resp) => resp.text())
            .then((data) => writeFileStr(lp, data))
            .then(() => console.log(`${green("Create")} ${lp}`));

          processes.push(p);
        }
      }
    }
  }
}

if (await exists(tsconfigPath)) {
  const tsconfig: { compilerOptions: Deno.CompilerOptions } = JSON.parse(
    decode(await readFile(tsconfigPath)),
  );
  if (hasOwnProperty.call(tsconfig, "compilerOptions")) {
    compilerOptions = { ...compilerOptions, ...tsconfig.compilerOptions };
  }
}

const app = new Application();
app.start({ port, hostname: "0.0.0.0" });
console.log(`Server running at http://127.0.0.1:${port}/`);

app.use(logger()).get("/*files", async (c) => {
  if (c.path === "/") {
    return c.redirect("/index.html");
  }

  const p = join(target, c.path);
  if (!(await exists(p)) || (await stat(p)).isDirectory) {
    throw new NotFoundException();
  }
  const f = await readFile(p);
  if (/\.[j|t]sx?$/.test(c.path)) {
    c.response.headers.set(
      Header.ContentType,
      MIME.ApplicationJavaScriptCharsetUTF8,
    );
    return transform(c.path, decode(f));
  } else if (c.path === "/index.html") {
    return c.htmlBlob(f);
  }

  c.blob(f);
});

async function transform(rootName: string, source: string) {
  const result = await transpileOnly(
    {
      [rootName]: source,
    },
    compilerOptions,
  );

  return result[rootName].source;
}

function decode(b: Uint8Array) {
  return new TextDecoder().decode(b);
}
