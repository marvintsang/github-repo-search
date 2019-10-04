function watchForm(){
    $('form').submit(function(event){
    event.preventDefault();
    let formInput = $('#formInputName').val();
    //console.log(formInput);
    searchUsernameUrl(formInput);
    })
}

$(watchForm);

function searchUsernameUrl(formInput){
  let theUrl=`https://api.github.com/search/users?q=${formInput}`;
  //console.log(theUrl);
  getUsernameRepo(theUrl);
}

function getUsernameRepo(theUrl){
  fetch(theUrl)
  .then(response=>{
    if(response.ok){
      return response.json();
    }
    throw new Error (response.statusText);
  })
  .then(responseJson=>displayResults(responseJson))
}
function displayResults(responseJson){
  //console.log(responseJson);
  //console.log(responseJson.items)
  //console.log(responseJson.items[0].login);
  resultItems = responseJson.items;
  userName = resultItems[0].login;
  userNameRepo = resultItems[0].repos_url;
  //console.log(userNameRepo);
  $('.userNameArea').html(`<p>Username found is ${userName}. Here are his repos.`);
  findRepos(userName)
  
}

function findRepos(userName){
  repoUrl= `https://api.github.com/users/${userName}/repos`;
  fetch(repoUrl)
  .then(response=>{
    if(response.ok){
      return response.json();
    }
    throw new Error (response.statusText);
  })
  .then(responseJson=>displayResultsRepo(responseJson))
}

function displayResultsRepo(responseJson){
  //console.log(responseJson[0].html_url)
  //console.log(responseJson[0].description);
  //console.log(responseJson[0].name);
  //console.log(responseJson.length);
  $('.userRepoArea').html('')
  for (i=0;i<responseJson.length;i++){
    $('.userRepoArea').append(`
    <div class="oneRepo"><p>The repo name is ${responseJson[i].name}</p>
    <p>Description: ${responseJson[i].description}</p>
    <p><a href=${responseJson[i].html_url}>${responseJson[i].html_url}</a></p></div>`)
  }
}
