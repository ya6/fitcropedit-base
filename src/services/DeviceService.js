export default class DeviceService {
  constructor() {
    this.init();
  }

  init() {
    console.log("");
    console.log("Device type--> ", this.getDeviceType());
    console.log("");
    console.log(
      "width--> ",
      window.innerWidth,
      "height--> ",
      window.innerHeight,
      "userAgent--> ",
      navigator.userAgent
    );
  }

  getDeviceType() {
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
      return "Unknown";
    }
  }
}
