import axios from "axios";

// TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //

const Card = (article) => {
  
  const {headline, authorPhoto, authorName} = article;
  
  const card = document.createElement('div');
  const headlineDiv = document.createElement('div');
  const authorDiv = document.createElement('div');
  const imgContainer = document.createElement('div');
  const authorImg = document.createElement('img');
  const authorNameSpan = document.createElement('span');

  card.classList.add('card');
  headlineDiv.classList.add('headline');
  headlineDiv.textContent = headline;
  authorDiv.classList.add('author');
  imgContainer.classList.add('img-container');
  authorImg.src = authorPhoto;
  authorNameSpan.textContent = `By ${authorName}.`

  card.appendChild(headlineDiv);
  card.appendChild(authorDiv);
  authorDiv.appendChild(imgContainer);
  imgContainer.appendChild(authorImg);
  authorDiv.appendChild(authorNameSpan);

  card.addEventListener('click', event => {
    console.log(headline);
  })
  return card;
}

 // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `http://localhost:5000/api/articles` (test it with console.log!!).
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //

const cardAppender = (selector) => {
  
  axios.get(`http://localhost:5000/api/articles`)
    .then(resolution => {
      console.log(resolution);

      const articles = resolution.data.articles;
      const articlesArray = [].concat(
        articles.bootstrap,
        articles.javascript,
        articles.jquery,
        articles.node,
        articles.technology
      );
      articlesArray.forEach(article => {
        document.querySelector(selector).appendChild(Card(article));
      })
    })
    .catch(error => {
      console.error(error);
    })

}

export { Card, cardAppender }
