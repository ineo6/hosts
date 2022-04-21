import DNSOverHTTPS from './https';
import DNSOverIpAddress from './ipaddress';

interface IProvider {
  type: string;
  server: string;
  cacheSize: number;
}

export interface IDnsOption {
  [key: string]: IProvider
}

export type DnsType = DNSOverHTTPS | DNSOverIpAddress

export interface IDnsMap {
  [key: string]: DnsType
}

export function initDNS(dnsProviders: IDnsOption) {
  const dnsMap: IDnsMap = {};

  for (const key in dnsProviders) {
    if (Object.prototype.hasOwnProperty.call(dnsProviders, key)) {
      const conf = dnsProviders[key];

      if (conf.type === 'ipaddress') {
        dnsMap[key] = new DNSOverIpAddress(conf.server);
      } else if (conf.type === 'https') {
        dnsMap[key] = new DNSOverHTTPS(conf.server);
      }
    }
  }
  return dnsMap;
}
