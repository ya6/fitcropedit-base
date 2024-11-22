import { mergeObjects } from "../utils/utils";
import { initParams } from "../config";

export default class StateService {
  // publicParams = {
  //   //now height min 550px, (leftsidebar)
  //   //now width min 550px  (as window for UX)
  //   //for check regexp or range
  //   canvasMultiplier: { min: 0.5, max: 3 },
  //   containerWidth: "80%",
  //   containerHeight: "600px",
  // };

  constructor() {
    if (StateService.instance) {
      return StateService.instance;
    }
    this.state = structuredClone(initParams);
    StateService.instance = this;
  }
  updateState(newParams) {
    // todo add validation
    mergeObjects(this.state.public, newParams);
  }

  clearBaseImageData() {
    this.resetParams(this.state.data.baseImage)
  }


  saveBaseImageParams(params) {
    this.state.data.baseImage = {
      ...this.state.data.baseImage,
      ...params,
    };
  }

  resetParams(object) {
    for (let key in object) {
      if (typeof object[key] === "number") {
        object[key] = 0;
      } else {
        object[key] = "";
      }
    }
  }
}
