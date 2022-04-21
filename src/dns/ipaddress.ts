import fetch from 'node-fetch';
import BaseDNS from './base';

const headers = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
};

export default class DNSOverIpAddress extends BaseDNS {
  public async _lookup(hostName: string) {
    const url = `https://${hostName}.ipaddress.com`;

    const res = await fetch(url, {
      headers: headers
    });
    if (res.status !== 200 && res.status !== 201) {
      this.log.info(`[dns] get ${hostName} ipaddress: error:${res}`);
      return;
    }
    const ret = await res.text();

    const regexp = /<tr><th>IP Address<\/th><td><ul class="comma-separated"><li>([^<]*)<\/li><\/ul><\/td><\/tr>/gm;
    const matched = regexp.exec(ret);
    let ip = null;

    if (matched && matched.length >= 1) {
      ip = matched[1];
      this.log.info(`[dns] get ${hostName} ipaddress:${ip}`);
      return [ip];
    }
    this.log.info(`[dns] get ${hostName} ipaddress: error`);
    return null;
  }
}
