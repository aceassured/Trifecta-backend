import { ParsedQs } from 'qs';

export function handleDeviceIds(deviceIds: string | ParsedQs | string[] | ParsedQs[] | undefined): string {
  if (Array.isArray(deviceIds)) {
    return deviceIds.join(',');
  }
  return deviceIds ? deviceIds as string : '';
}
