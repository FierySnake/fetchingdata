//POSTS
fetch('https://jsonplaceholder.typicode.com/posts')
.then(response => response.json())
.then(function(data){
  //pick two random articles
  var rand1 = data[Math.floor(Math.random() * data.length)];
  var rand2 = data[Math.floor(Math.random() * data.length)];

  var header = document.getElementsByTagName("P");

  header[0].innerHTML = rand1.body;
  header[1].innerHTML = rand2.body;

});


function getComments(bool,number)
{
  if(bool == false)
  {
    fetch('https://jsonplaceholder.typicode.com/comments?postId=1')
      .then(response => response.json())
      .then(function(data){

        var paragraph = document.createElement('p');
        var data_attribute = document.createAttribute("data-comments");
        data_attribute.value = "body";
        paragraph.setAttributeNode(data_attribute);

        var name = document.createElement('a');
        var data_attribute = document.createAttribute("data-comments");
        data_attribute.value = "email";
        var href_attribute = document.createAttribute("href");
        name.setAttributeNode(data_attribute);
        name.setAttributeNode(href_attribute);

        var commentnode = document.getElementById(`comments-${number}`);

        paragraph.innerHTML = data[number-1].body.split("\n").join("<br />");
        commentnode.insertBefore(paragraph,commentnode.childNodes[2]);
        href_attribute.value = `mailto:${data[number-1].email}`;
        name.innerHTML = "<br/>" + data[number-1].name;
        paragraph.append(name);

      })
  }
    return true;
}


(function (window){
  'use strict';

  const BUTTON_SELECTOR = '[data-posts="id"]';

  //have not shown any comments yet
  var comments_shown_1 = false;
  var comments_shown_2 = false;

  let buttons = document.querySelectorAll(BUTTON_SELECTOR);

  buttons.forEach(function (button) {
    'use strict';

    let sectionSelector = `#comments-${button.value}`;
    let commentSection = document.querySelector(sectionSelector);


    button.addEventListener('click', function (event) {

      if(button.value ==1)
      {
        comments_shown_1 = getComments(comments_shown_1,button.value);
      }
      else
        comments_shown_2 = getComments(comments_shown_2,button.value);

      if (commentSection.hidden) {
        commentSection.hidden = false;
        button.textContent = 'Hide comments';
      } else {
        commentSection.hidden = true;
        button.textContent = 'Show comments';
      }

      event.preventDefault();
    });
  });
})(window);
