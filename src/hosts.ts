import fetch from 'node-fetch';
import cheerio from 'cheerio';
import path from 'path';
import fs from 'fs';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import IpManage from "./IpManage";
import {githubUrls, providers} from './constants';
import {buildHosts} from "./utils";

dayjs.extend(utc);
dayjs.extend(timezone);

const headers = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
};

const filePath = {
  tpl: path.join('./', 'template.md'),
  dest: path.join('./', 'README.md'),
  hosts: path.join('./', 'hosts'),
};

const nextFilePath = {
  tpl: path.join('./', 'template.md'),
  hosts: path.join('./', 'hosts'),
  bothHosts: path.join('./', 'next-hosts'),
}

const ipAddressBaseUrl = 'https://www.ipaddress.com/site/';

const tpl = `
{content}
# Please Star : https://github.com/ineo6/hosts
# Mirror Repo : https://gitlab.com/ineo6/hosts
`;

function resolveUrl(host: string) {
  return ipAddressBaseUrl + host;
}

async function findIp(host: string) {
  const url = resolveUrl(host);

  const response = await fetch(url, {
    headers: headers
  });
  const htmlText = await response.text();

  const $ = cheerio.load(htmlText);

  const ipList: string[] = [];

  $('#dns tr')
    .each((i, element) => {
      let td = $(element).children();

      if ($(td[0]).text() === 'A') {
        ipList.push($(element)
          .children()
          .last()
          .text());
      }
    });

  return ipList;
}

async function findIpWrapper(host: string) {
  let retryCount = 3;

  let result: string[] = [];

  try {
    result = await findIp(host);
  } catch (err) {
    if (retryCount > 1) {
      retryCount--;
      result = await findIp(host);
    } else {
      console.log(`${host} is failed.`);
    }
  }

  return result;
}

function writeHosts(name: string, content: string) {
  fs.writeFileSync(name, content);
}

interface UpdateConfig {
  mdTpl?: string;
  mdDest?: string;
  hostDest: string;
}

function hostsTpl(content: string, time: string) {
  return [
    '# 地址可能会变动，请务必关注GitHub、Gitlab获取最新消息',
    '# 也可以关注公众号：湖中剑，保证不迷路',
    '# GitHub Host Start\n',
    `${content}\n`,
    `# Update at: ${time}\n`,
    '# GitHub Host End'
  ].join('\n');
}

function updateMd(content: string, config: UpdateConfig) {
  let previousHosts = '';

  try {
    previousHosts = fs.readFileSync(config.hostDest, 'utf-8');
  } catch (err) {
  }

  const regMatch = previousHosts.match(/GitHub Host Start([\s\S]*)# Update at/);
  const previousHostRule = regMatch ? regMatch[1].trim() : '';

  const needUpdate = previousHostRule !== content;

  if (needUpdate) {
    console.log('发现新的Hosts，即将更新文件！');

    const updateTime = dayjs()
      .tz('Asia/Shanghai')
      .format('YYYY-MM-DD HH:mm:ss');

    const nextHosts = hostsTpl(content, updateTime);

    if (config.mdTpl && config.mdDest) {
      const template = fs.readFileSync(config.mdTpl, 'utf-8');

      const replacedMdContent = template.replace('{hostContent}', nextHosts)
        .replace('{update_time}', updateTime);

      fs.writeFileSync(config.mdDest, replacedMdContent);
    }

    writeHosts(config.hostDest, nextHosts);
  }
}

interface IAlive {
  time?: number;
  host: string;
  status?: string;
}

export interface HostData {
  name: string;
  ip: IAlive[]
}

export async function updateHosts() {
  let result: HostData[] = [];

  for (let i = 0; i < githubUrls.length; i++) {
    console.log(`${i + 1}/${githubUrls.length}:${githubUrls[i]}`);
    const ips = await findIpWrapper(githubUrls[i]);

    result.push({
      name: githubUrls[i],
      ip: ips.map(item => {
        return {
          host: item
        }
      })
    })
  }

  await saveHosts(result, {
    mdTpl: filePath.tpl,
    mdDest: filePath.dest,
    hostDest: filePath.hosts
  })
}

async function saveHosts(hostData: HostData[], config: UpdateConfig) {
  try {
    updateMd(tpl.replace('{content}', buildHosts(hostData))
      .trim(), config);
  } catch (err) {
    console.error(err.message);
  }
}

const speedConfig = {
  interval: 0,
  hostList: githubUrls,
  dnsProviders: ["usa", "quad9", "iqDNS-tls", 'iqDNS'],
  providers,
}

export function updateNextHosts() {
  let ipManage: IpManage;

  ipManage = new IpManage({
    ...speedConfig,
    callback: () => {
      const result = ipManage.getAllSpeedTester()

      const newHosts: HostData[] = []

      result.forEach(item => {
        newHosts.push({
          name: item.hostname,
          ip: item.alive
        })
      })

      saveHosts(newHosts, {
        hostDest: nextFilePath.hosts
      })

      saveHosts(newHosts, {
        hostDest: nextFilePath.bothHosts
      })
    }
  });
}
