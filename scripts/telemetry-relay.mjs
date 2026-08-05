// ETS2 Telemetri CORS rölesi
// Funbit telemetry server'a (localhost:25555) CORS izni ekleyerek ulaşır.
// Çalıştır:  node scripts/telemetry-relay.mjs
// Sonra uygulama otomatik olarak bu adresi de dener:
//   http://localhost:8765/api/ets2/telemetry
import http from "node:http";

const TARGET =
  process.env.TELEMETRY_TARGET || "http://127.0.0.1:25555/api/ets2/telemetry";
const PORT = Number(process.env.TELEMETRY_RELAY_PORT || 8765);

const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Max-Age", "86400");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method !== "GET" || !req.url.startsWith("/api/ets2/telemetry")) {
    res.writeHead(404);
    res.end("not found");
    return;
  }

  try {
    const r = await fetch(`${TARGET}?_=${Date.now()}`, {
      headers: { Accept: "application/json" },
    });
    if (!r.ok) {
      res.writeHead(502);
      res.end(String(r.status));
      return;
    }
    const body = await r.text();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(body);
  } catch {
    res.writeHead(504, { "Content-Type": "text/plain" });
    res.end("telemetry unavailable");
  }
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Telemetry relay aktif: http://localhost:${PORT}/api/ets2/telemetry`);
});
