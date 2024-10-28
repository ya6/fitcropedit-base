export function mergeObjects(target, source) {
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (typeof source[key] === "object" && source[key] !== null) {
        if (!target.hasOwnProperty(key) || typeof target[key] !== "object" || target[key] === null) {
          target[key] = {};
        }
        mergeObjects(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
  }
}
