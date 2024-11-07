export default class DeviceService {
  deviceData = { type: undefined, width: undefined, height: undefined };
  constructor(stateService) {
    this.appState = stateService.state;

    this.init();
  }

  init() {
    this.getDeviceInfo();
    this.storeDeviceInfo();
  }

  getDeviceInfo() {
    this.deviceData.type = this.getDeviceType();
    this.deviceData.width = window?.innerWidth;
    this.deviceData.height = window?.innerHeight;
  }

  getDeviceType() {
    if (window?.navigator?.userAgent) {
      const userAgent = navigator.userAgent.toLowerCase();
      if (userAgent.includes("android")) {
        return "Android";
      } else if (userAgent.includes("iphone")) {
        return "iPhone";
      } else if (userAgent.includes("ipad")) {
        return "iPad";
      } else if (userAgent.includes("ipod")) {
        return "iPod";
      } else if (userAgent.includes("windows phone")) {
        return "Windows Phone";
      } else if (userAgent.includes("windows")) {
        return "Windows";
      } else if (userAgent.includes("mac os")) {
        return "Mac OS";
      } else if (userAgent.includes("linux")) {
        return "Linux";
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  //
  storeDeviceInfo() {
    this.appState.device = { ...this.appState.device, ...this.deviceData };
  }
}
