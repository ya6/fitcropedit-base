import { mergeObjects } from "./utils/utils";
import { initParams } from "./config";

export default class StateManager {
  constructor() {
    if (StateManager.instance) {
      return StateManager.instance;
    }
    this.state = { ...initParams };
    StateManager.instance = this;
  }

  updateState(newParams) {
    mergeObjects(this.state, newParams);
  }
}
