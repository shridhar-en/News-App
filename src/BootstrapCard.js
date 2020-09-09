import React from 'react';

export const BootstrapCard = (props) => {
    return(
        <div class="card" style={{width: '18rem', margin: '10px'}}>
            <img src={props.article.urlToImage} class="card-img-top" />
            <div class="card-body">
                <h5 class="card-title">{props.article.title}</h5>
                <p class="card-text">{props.article.description}</p>
            </div>
            <div>
                <a href={props.article.url} target='_blank'><button>Read more</button></a>
            </div>
        </div>
    )
}