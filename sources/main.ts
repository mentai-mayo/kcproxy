
import ProxyServer from "./proxy/main.js";
import { handler } from "./handler.js";

const proxyserver = new ProxyServer();
proxyserver.on("communication", handler);
proxyserver.listen(8080);

process.on("SIGINT", process.exit.bind(process, 0));
