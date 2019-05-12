/* eslint-disable strict */
const apiKey = '2pqSwDQ9ahgyRpXWYqwcjhqafwElndIRwIfSBKN5';
const searchURL = 'https://developer.nps.gov/api/v1/parks';

function formatQueryString(params) {
  const queryItem = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  return queryItem.join('&');
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('.js-search-results').empty();
  let array = responseJson;
  for (let i=0;i<array.data.length; i++) {
    $('.js-search-results').append(
      `<li>
        <p>${array.data[i].fullName}</p>
        <p>${array.data[i].description}</p>
        <a href='${array.data[i].url}'>Visit Site</a>`
    );
  }

}

function getParks(query, maxNum=10) {
  const params = {
    stateCode: query,
    limit: maxNum,
    api_key: apiKey,
  };

  const queryString = formatQueryString(params);
  const url = `${searchURL}?${queryString}`;
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('.js-error-message').text(`${err.message}`);
    });


}

function watchForm() {
  console.log('App is Ready');
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('.js-states-list').val();
    const maxNum = $('.js-park-num').val()-1;
    getParks(searchTerm,maxNum);
  });
}

$(watchForm);