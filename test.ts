import { assertEquals, fs } from "./dev_deps.ts";
import { resolveDir } from "./util.ts";
const { test } = Deno;
const { readJson } = fs;

test("template.json", async function () {
  const metadata = await resolveDir("./template");
  assertEquals(metadata, await readJson("./template.json"));
});
