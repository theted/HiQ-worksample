const sortProperties = (obj) => {
  // convert object into array
  var sortable = []
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) { sortable.push([key, obj[key]]) }
  } // each item is an array in format [key, value]

  // sort items by value
  sortable.sort((a, b) => b[1] - a[1])
  return sortable // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
}

module.exports = { sortProperties }
