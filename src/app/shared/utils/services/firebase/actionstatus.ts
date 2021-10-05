export class ActionStatus {
  code: number;
  apiCode: any;
  result: any;
  message: string;
  description: string;
  // tslint:disable-next-line:member-ordering
  static RESSOURCE_NOT_FOUND_ERROR = -1;
  static NETWORK_ERROR = -2;
  static UNKNOW_ERROR = -10;
  static INVALID_ARGUMENT_ERROR = -3;
  static RESSOURCE_ALREADY_EXIST_ERROR = -4;
  static NOT_VALID_ACCOUNT_ERROR=-5;
  static SUCCESS = 0;
  static UPLOAD_PAUSED=10;
  static UPLOAD_RUNNING=11;
  static SUCCESS_END=1;

  constructor(code = ActionStatus.SUCCESS, message = 'success', description = '', result = null) {
    this.code = code;
    this.message = message;
    this.description = description;
    this.result = result;
  }

}
