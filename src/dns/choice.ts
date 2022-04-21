export class DynamicChoice {
  private key: any;
  private count: {};
  private createTime: Date;
  private backup: any[] | undefined;
  private value: any | undefined;

  public constructor(key: any) {
    this.key = key;
    this.count = {};
    this.createTime = new Date();
  }

  public setBackupList(backupList: any[]) {
    this.backup = backupList;
    this.value = backupList.shift();
  }
}
