export enum FireBaseConstant {
  AUTH_WRONG_PASSWORD = 'auth/wrong-password',
  AUTH_EMAIL_ALREADY_USE = 'auth/email-already-in-use',
  AUTH_USER_NOT_FOUND='auth/user-not-found',
  AUTH_WEAK_PASSWORD = 'auth/weak-password',
  NET_NETWORK_FAIL = 'auth/network-request-failed',
  STORAGE_OBJECT_NOT_FOUND = 'storage/object-not-found',
  STORAGE_UNAUTHORIZED="storage/unauthorized",
  STORAGE_CANCELED="storage/canceled",
  STORAGE_UNKNOWN="storage/unknown",

  DATABASE_DISCONNECTED = -4,
  DATABASE_NETWORK_ERROR = -24,
  DATABASE_OPERATION_FAILED = -2,
  DATABASE_PERMISSION_DENIED = -3,
  DATABASE_SERVICE_UNAVAILABLE = -10,
  DATABASE_UNKNOW_ERROR = -999,
  DESACTIVED_ACCOUNT=-998
}
