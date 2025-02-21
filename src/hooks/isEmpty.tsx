export function isEmpty(value:null|undefined|0|string|Array<any>) {
    return value == null || value == undefined || value == 0 || (typeof value === "string" && !value?.trim()) || (Array?.isArray(value) && !value?.length);
  }
  