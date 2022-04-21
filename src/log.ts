// @ts-ignore
import log from "log";

export function disableLog() {
  log.error.disable();
  log.info.disable();
}

export function createLogger(silent?: Boolean) {
  if (!silent) {
    disableLog()
  }

  return log;
}
