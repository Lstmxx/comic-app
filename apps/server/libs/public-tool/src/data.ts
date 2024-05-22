/**
 * 客户端 ip 字符串 转化纯 ip
 */
export const toIp = (ip: string) =>
  ip?.replace?.('::ffff:', '').replace('::1', '127.0.0.1');
