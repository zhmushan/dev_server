import { assertEquals } from "https://deno.land/std@v0.42.0/testing/asserts.ts";
import { resolveDir } from "./util.ts";
import templateMetadata from "./template.json";
const { test } = Deno;

test("template.json", async function () {
  const metadata = await resolveDir("./template");
  assertEquals(metadata, templateMetadata);
});
