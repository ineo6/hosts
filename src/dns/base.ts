// @ts-ignore
import LRU from 'lru-cache';
import {DynamicChoice} from './choice';
import {createLogger} from "../log";

const log = createLogger()

const cacheSize = 1024;

class IpCache extends DynamicChoice {
  private lookupCount: number;

  public constructor(hostName: any) {
    super(hostName);
    this.lookupCount = 0;
  }

  /**
   * 获取到新的ipList
   * @param ipList
   */
  public setBackupList(ipList: any[]) {
    super.setBackupList(ipList);
    this.lookupCount++;
  }
}

export default abstract class BaseDNS {
  public dnsServer: string;

  protected log = log;

  private cache: any;

  public constructor(dnsServer: string) {
    this.cache = new LRU({
      maxSize: cacheSize
    });

    this.dnsServer = dnsServer;
  }

  public async lookup(hostName: any) {
    try {
      let ipCache = this.cache.get(hostName);
      if (ipCache) {
        if (ipCache.value) {
          ipCache.doCount(ipCache.value, false);
          return ipCache.value;
        }
      } else {
        ipCache = new IpCache(hostName);
        this.cache.set(hostName, ipCache);
      }

      let ipList = await this._lookup(hostName);
      if (!ipList) {
        // 没有获取到ipv4地址
        ipList = [];
      }
      ipList.push(hostName); // 把原域名加入到统计里去

      ipCache.setBackupList(ipList);
      this.log.info(
        `[dns counter]:${hostName}`,
        ipCache.value,
        ipList,
        JSON.stringify(ipCache)
      );
      this.log.info(`[DNS] ${hostName} -> ${ipCache.value}`);

      return ipCache.value;
    } catch (error) {
      this.log.error(`[DNS] cannot resolve hostName ${hostName} (${error})`, error);
      return hostName;
    }
  }

  public abstract _lookup(hostName: string): any
}
