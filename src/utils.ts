import {HostData} from "./hosts";

function lJust(str: string, total: number, pad?: string) {
  return str + Array(total - str.length)
    .join(pad || ' ');
}

export function buildHosts(hostData: HostData[]) {
  let generatedContent = ''

  hostData.forEach(host => {
    if (host.ip?.length) {
      generatedContent += lJust(host.ip[0].host, 30) + host.name + '\n';
    }
  })

  return generatedContent
}
