export function getNestedObjects(dataObj, objKey) {
  // intialize an empty array to store all matched results
  let results = [];
  getObjects(dataObj, objKey);

  function getObjects(dataObj, objKey) {
    // loop through the key-value pairs on the object/json.
    Object.entries(dataObj).map(entry => {
      const [key, value] = entry;
      // check if the current key matches the required key.
      if (key === objKey) {
        results = [...results, { [key]: value }];
      }

      // check if the current value is an object/array.
      // if the current value is an object, call the function again.
      // if the current value is an array, loop through it, check for an object, and call the function again.
      if (Object.prototype.toString.call(value) === "[object Object]") {
        getObjects(value, objKey);
      } else if (Array.isArray(value)) {
        value.map(val => {
          if (Object.prototype.toString.call(val) === "[object Object]") {
            getObjects(val, objKey);
          }
        });
      }
    });
  }

  // return an array of all matches, or return "no match"
  if (results.length === 0) {
    return "No match";
  } else {
    return results;
  }
}
