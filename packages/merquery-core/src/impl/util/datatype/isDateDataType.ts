import * as _ from "lodash";

export function isDateDataType(value: unknown) {
  if (!_.isString(value)) return false;

  try {
    let dateTimeParts = value.split(/[- :]/); // regular expression split that creates array with: year, month, day, hour, minutes, seconds values
    dateTimeParts[1] = (Number(dateTimeParts[1]) - 1).toString(); // monthIndex begins with 0 for January and ends with 11 for December so we need to decrement by one

    const D: any = Date;

    new D(...dateTimeParts);

    return true;
  } catch (e) {
    return false;
  }
}
