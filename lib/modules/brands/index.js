module.exports = brands;

function brands(options, callback) {
  return new brands.Brands(options, callback);
}


brands.Brands = function (options, callback) {

  var self = this;
  module.exports.Super.call(this, options, null);
  if (callback) {
    // Invoke callback on next tick so that the blog object
    // is returned first and can be assigned to a variable for
    // use in whatever our callback is invoking
    process.nextTick(function () {
      return callback(null);
    });
  }

};