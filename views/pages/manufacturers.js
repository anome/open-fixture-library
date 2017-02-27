module.exports = function(options) {
  const {manufacturers, manufacturersIndex} = options;

  let str = require('../partials/header')(options);

  str += '<h1>Manufacturers</h1>';

  for (man in manufacturers) {
    let manufacturer = manufacturers[man];
    let num = manufacturersIndex[man].length;
    let numFixtures = `${num} fixture${num == 1 ? '' : 's'}`;

    str += '<section class="manufacturer">';
    str += '<h2>' + (num > 0 ? `<a href="${man}">${manufacturer.name}</a>` : manufacturer.name) + '</h2>';

    if ('website' in manufacturer) {
      str += `<div class="website"><a href="${manufacturer.website}">Website</a></div>`;
    }
    if ('comment' in manufacturer) {
      str += `<p class="comment">${manufacturer.comment}</p>`;
    }

    str += '<div class="fixtures">' + numFixtures;
    if (num > 0) {
      str += ` - <a href="/${man}">View them</a>`;
    }
    str += '</div>';

    str += '</section>';
  }

  str += require('../partials/footer')(options);

  return str;
};