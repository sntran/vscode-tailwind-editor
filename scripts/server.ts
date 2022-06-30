#!/usr/bin/env -S deno run --allow-net --allow-read --watch
import { serve } from "https://deno.land/std@0.145.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.145.0/http/file_server.ts";

serve((req: Request) => {
  return serveDir(req, {
    showDirListing: true,
  });
}, { port: 8888 });
