import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Card } from './Card';

const categories = ['general', 'business', 'entertainment', 'health', 'science', 'sports', 'technology'];

class NewsApp extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            category: 'general',
            articles: [],
            loading: true,
         }
    }
    componentDidMount = () => {
       axios({
           url: 'http://newsapi.org/v2/top-headlines',
           method: 'GET',
           params: {
            country: 'in',
            category: this.state.category,
            apiKey: 'f3879544dfd2456292e0fc287704a963',
           }
       }).then((response) => {
           this.setState({
               articles: [...this.state.articles, ...response.data.articles],
               loading: false
           })
       })
    }
    shouldComponentUpdate(prevState, prevProps){
        return true;
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.category !== this.state.category){
            this.componentDidMount();
        }
    }

    handleChange = (category) => {
        this.setState({
            category: category,
            articles: [],
            loading: true
        })
    } 
    render() { 
        return ( 
            <Fragment>
                {
                    this.state.loading && <div className="spinner-border text-danger" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                }
               <div>
               {
                    categories.map(category => {
                        return <button key={category} className={ this.state.category === category ? ('btn btn-danger m-2'): ('btn btn-primary m-2')}
                        onClick={() => this.handleChange(category)}
                        >{category}</button>
                    })
                }
               </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', margin: '2px', padding: '5px'}}>
                {
                    this.state.articles.map(article => {
                        return <Card key={article.title} article={article} />
                    })
                }
                </div>
            </Fragment>
         );
    }
}
 
export default NewsApp;