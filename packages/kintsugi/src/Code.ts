// Based on https://deno.land/std@0.102.0/http/http_status.ts
export enum Code {
  Continue = 'Continue', // 100
  SwitchingProtocols = 'SwitchingProtocols', // 101
  Processing = 'Processing', // 102
  EarlyHints = 'EarlyHints', // 103
  OK = 'OK', // 200
  Created = 'Created', // 201
  Accepted = 'Accepted', // 202
  NonAuthoritativeInfo = 'NonAuthoritativeInfo', // 203
  NoContent = 'NoContent', // 204
  ResetContent = 'ResetContent', // 205
  PartialContent = 'PartialContent', // 206
  MultiStatus = 'MultiStatus', // 207
  AlreadyReported = 'AlreadyReported', // 208
  IMUsed = 'IMUsed', // 226
  MultipleChoices = 'MultipleChoices', // 300
  MovedPermanently = 'MovedPermanently', // 301
  Found = 'Found', // 302
  SeeOther = 'SeeOther', // 303
  NotModified = 'NotModified', // 304
  UseProxy = 'UseProxy', // 305
  TemporaryRedirect = 'TemporaryRedirect', // 307
  PermanentRedirect = 'PermanentRedirect', // 308
  BadRequest = 'BadRequest', // 400
  Unauthorized = 'Unauthorized', // 401
  PaymentRequired = 'PaymentRequired', // 402
  Forbidden = 'Forbidden', // 403
  NotFound = 'NotFound', // 404
  MethodNotAllowed = 'MethodNotAllowed', // 405
  NotAcceptable = 'NotAcceptable', // 406
  ProxyAuthRequired = 'ProxyAuthRequired', // 407
  RequestTimeout = 'RequestTimeout', // 408
  Conflict = 'Conflict', // 409
  Gone = 'Gone', // 410
  LengthRequired = 'LengthRequired', // 411
  PreconditionFailed = 'PreconditionFailed', // 412
  RequestEntityTooLarge = 'RequestEntityTooLarge', // 413
  RequestURITooLong = 'RequestURITooLong', // 414
  UnsupportedMediaType = 'UnsupportedMediaType', // 415
  RequestedRangeNotSatisfiable = 'RequestedRangeNotSatisfiable', // 416
  ExpectationFailed = 'ExpectationFailed', // 417
  Teapot = 'Teapot', // 418
  MisdirectedRequest = 'MisdirectedRequest', // 421
  UnprocessableEntity = 'UnprocessableEntity', // 422
  Locked = 'Locked', // 423
  FailedDependency = 'FailedDependency', // 424
  TooEarly = 'TooEarly', // 425
  UpgradeRequired = 'UpgradeRequired', // 426
  PreconditionRequired = 'PreconditionRequired', // 428
  TooManyRequests = 'TooManyRequests', // 429
  RequestHeaderFieldsTooLarge = 'RequestHeaderFieldsTooLarge', // 431
  UnavailableForLegalReasons = 'UnavailableForLegalReasons', // 451
  InternalServerError = 'InternalServerError', // 500
  NotImplemented = 'NotImplemented', // 501
  BadGateway = 'BadGateway', // 502
  ServiceUnavailable = 'ServiceUnavailable', // 503
  GatewayTimeout = 'GatewayTimeout', // 504
  HTTPVersionNotSupported = 'HTTPVersionNotSupported', // 505
  VariantAlsoNegotiates = 'VariantAlsoNegotiates', // 506
  InsufficientStorage = 'InsufficientStorage', // 507
  LoopDetected = 'LoopDetected', // 508
  NotExtended = 'NotExtended', // 510
  NetworkAuthenticationRequired = 'NetworkAuthenticationRequired', // 511
  UnexpectedError = 'UnexpectedError',
  CircuitSuspended = 'CircuitSuspended',
  Timeout = 'Timeout',
  StopPropagation = 'StopPropagation',
  Fail = 'Fail',
  BadArgument = 'BadArgument',
}
