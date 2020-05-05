import { assertEquals } from "https://deno.land/std@v1.0.0-rc1/testing/asserts.ts";
import { readJson } from "https://deno.land/std@v1.0.0-rc1/fs/mod.ts";
import { resolveDir } from "./util.ts";
const { test } = Deno;

test("template.json", async function () {
  const metadata = await resolveDir("./template");
  assertEquals(metadata, await readJson("./template.json"));
});
