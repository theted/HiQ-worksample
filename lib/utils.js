/**
 * Sort an object by property values
 * @param {object} obj Object
 * @returns {array} Sorted values
 */
// TODO: kill it; this is bad!
const sortProperties = (obj) => {
  var sortable = []
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) { sortable.push([key, obj[key]]) }
  }

  sortable.sort((a, b) => b[1] - a[1])
  return sortable
}

module.exports = { sortProperties }
