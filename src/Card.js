import React from 'react';

 export const Card = props => {
    return (
        <div className="card" style={{ width: '18rem', margin: '7px' }}>
                        <img src={props.article.urlToImage} className="card-img-top" alt="" style={{ height: '180px' }} />
                        <div className="card-body">
                          <h5 className="card-title">{props.article.title}</h5>
                          {/* <p className="card-text">{props.article.description}</p> */}
                          <a href={props.article.url} className="btn btn-primary">More Information</a>
                        </div>
                      </div>
    );
}