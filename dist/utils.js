export function handleDeviceIds(deviceIds) {
    if (Array.isArray(deviceIds)) {
        return deviceIds.join(',');
    }
    return deviceIds ? deviceIds : '';
}
