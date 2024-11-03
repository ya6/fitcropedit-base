import { mergeObjects } from "../utils/utils";
import { initParams } from "../config";

export default class StateService {
  constructor() {
    if (StateService.instance) {
      return StateService.instance;
    }
    this.state = { ...initParams };
    StateService.instance = this;
  }

  updateState(newParams) {
    mergeObjects(this.state, newParams);
  }
}
