

module.exports = handle = promise => promise
    .then(res => [null, res])
    .catch(err => [err, null]);
    