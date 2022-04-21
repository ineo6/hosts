import http from 'http';
import parser from "yargs-parser";
import chalk from "chalk";
import portfinder from 'portfinder';
import IpManage from "./IpManage";
import {githubUrls, providers} from "./constants";
import {HostData} from "./hosts";
import {buildHosts} from "./utils";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const pkg = require('../package.json');

const argv = parser(process.argv.slice(2));

const speedConfig = {
  interval: 10 * 60 * 1000,
  hostList: githubUrls,
  dnsProviders: ["usa", "quad9", "iqDNS-tls", 'iqDNS'],
  providers,
};

const defaultPort = 8080;

let ipManage: IpManage;

(async () => {
  try {
    const {interval, debug, port = defaultPort} = argv;

    await createServer({port});

    ipManage = new IpManage({
      ...speedConfig,
      silent: !debug,
      interval: interval >= 0 ? interval * 1000 : speedConfig.interval
    });
  } catch (e) {
    console.error(chalk.red(e.message));
    console.error(e.stack);
    process.exit(1);
  }
})();

function getHosts() {
  const result = ipManage.getAllSpeedTester();

  const newHosts: HostData[] = [];

  result.forEach(item => {
    newHosts.push({
      name: item.hostname,
      ip: item.alive
    })
  });

  return buildHosts(newHosts);
}

async function createServer({port}: { port: number }) {
  const foundPort = await portfinder.getPortPromise({port});

  http.createServer((request, response) => {
    response.writeHead(200, {'Content-Type': 'text-plain;charset=utf-8'});

    response.end(getHosts());
  }).listen(foundPort);

  const localUrl = `http://localhost:${foundPort}`;

  console.log();
  console.log(
    [
      `  当前版本：${pkg.version}`,
      `  Github Hosts 运行在:`,
      `  - Local:   ${chalk.cyan(localUrl)}`,
    ].join('\n'),
  );
  console.log();
}
