import {
  Application,
  NotFoundException,
} from "https://deno.land/x/abc@v0.2.11/mod.ts";
import { logger } from "https://deno.land/x/abc@v0.2.11/middleware/logger.ts";
import { Header, MIME } from "https://deno.land/x/abc@v0.2.11/constants.ts";
import { join } from "https://deno.land/std@v0.42.0/path/mod.ts";
import { exists } from "https://deno.land/std@v0.42.0/fs/mod.ts";
import { parse } from "https://deno.land/std@v0.42.0/flags/mod.ts";
const { readFile, transpileOnly, cwd, stat, args, exit } = Deno;

interface ServerArgs {
  _: string[];
  // -p --port
  p: number;
  port: number;
  // -h --help
  h: boolean;
  help: boolean;
}

const serverArgs = parse(args) as ServerArgs;

if (serverArgs.h ?? serverArgs.help) {
  console.log(`Dev Server
INSTALL:
  deno install --allow-net --allow-read --unstable https://deno.land/x/dev_server/mod.ts
USAGE:
  dev_server [path] [options]
OPTIONS:
  -h, --help          Prints help information
  -p, --port <PORT>   Set port`);
  exit();
}

const port = serverArgs.port ?? serverArgs.p ?? 8080;
const target = join(cwd(), serverArgs._[0] ?? ".");

const app = new Application();
app.start({ port, hostname: "0.0.0.0" });
console.log(`Server running at http://127.0.0.1:${port}/`);

app.use(logger()).get("/*files", async (c) => {
  if (c.path === "/") {
    return c.redirect("/index.html");
  }
  const p = join(target, c.path);
  if (!await exists(p) || (await stat(p)).isDirectory) {
    throw new NotFoundException();
  }
  const f = await readFile(p);
  if (/\.[j|t]sx?$/.test(c.path)) {
    c.response.headers.set(
      Header.ContentType,
      MIME.ApplicationJavaScriptCharsetUTF8,
    );
    return transform(c.path, decoder(f));
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
    {
      strict: false,
      jsx: "react",
      sourceMap: false,
    },
  );

  return result[rootName].source;
}

function decoder(b: Uint8Array) {
  return new TextDecoder().decode(b);
}
