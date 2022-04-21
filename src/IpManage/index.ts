import SpeedTest from "./SpeedTest";
import {IDnsMap, IDnsOption, initDNS} from "../dns";

const SpeedTestPool: { [key: string]: SpeedTest } = {};

interface IIpManageOption {
  hostList: any;
  interval: number;
  dnsProviders: string[];
  providers: IDnsOption;
  callback?: Function;
  silent?: Boolean;
}

interface IConfig {
  hostList: any;
  interval: number;
  dnsProviders: string[];
  dnsMap: IDnsMap;
  callback?: Function;
  silent?: Boolean;
}

export default class IpManage {
  private config: IConfig

  public constructor(option: IIpManageOption) {
    this.config = {
      ...option,
      dnsMap: initDNS(option.providers)
    }

    this.initSpeedTest()
  }

  public initSpeedTest() {
    let countArr = []
    const afterCb = () => {
      countArr.push(1)

      if (countArr.length === this.config.hostList.length) {
        this.config.callback?.()
      }
    }

    this.config.hostList.forEach((hostname: string) => {
      SpeedTestPool[hostname] = new SpeedTest({
        hostname,
        dnsMap: this.config.dnsMap,
        interval: this.config.interval,
        silent: this.config.silent
      });

      SpeedTestPool[hostname].test(afterCb)
    })
  }

  public getAllSpeedTester() {
    const allSpeed = [];

    for (const key in SpeedTestPool) {
      if (Object.prototype.hasOwnProperty.call(SpeedTestPool, key)) {
        allSpeed.push({
          hostname: SpeedTestPool[key].hostname,
          alive: SpeedTestPool[key].alive,
          backupList: SpeedTestPool[key].backupList
        });
      }
    }

    return allSpeed;
  }

  public getSpeedTester(hostname: string) {
    let instance = SpeedTestPool[hostname];

    if (!instance) {
      instance = new SpeedTest({
        hostname,
        dnsMap: this.config.dnsMap,
        interval: this.config.interval,
        silent: this.config.silent
      });
      SpeedTestPool[hostname] = instance;
    }

    return instance;
  }

  public reSpeedTest() {
    for (const key in SpeedTestPool) {
      if (Object.prototype.hasOwnProperty.call(SpeedTestPool, key)) {
        SpeedTestPool[key].test();
      }
    }
  }
}
