import React from 'react';
import axios from 'axios';
import { BootstrapCard } from './BootstrapCard';
import InfiniteScroll from 'react-infinite-scroller';

const categories = ['general', 'business', 'entertainment', 'health', 'science', 'sports', 'technology'];

export default class New extends React.Component {

    // only once - at the time of initial render / page refresh / page reload
    constructor(props){
        super(props);
        this.state = {
            category: 'general',
            articles: [],
            loading: true,
            totalResults: 0,
            page: 0
        }
    }

    componentDidMount(){
        this.loadNews();
    }

    shouldComponentUpdate(prevState, prevProps){
        return true;
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.category !== this.state.category){
            this.loadNews();
        }
    }

    //declaration
    loadNews = () => {
        axios({
            url: 'http://newsapi.org/v2/top-headlines',
            method: 'GET',
            params: {
                country: 'in',
                category: this.state.category,
                apiKey: 'f3879544dfd2456292e0fc287704a963',
                page: this.state.page + 1
            }
        }).then((response) => {
            console.log(response);
            this.setState({
                articles: [...this.state.articles, ...response.data.articles],
                loading: false,
                totalResults: response.data.totalResults,
                page: this.state.page + 1
            })
        }).catch((err) => {
            console.log(err)
            this.setState({
                loading: false
            })
        })
    }

    handleCategoryChange = (category) => {

        this.setState({
            category: category,
            articles: [],
            loading: true,
            totalResults: 0,
            page: 0
        })
    }

    render(){
        return(
            <div>
                <div>
                    {
                        categories.map((value, index) => {
                            return (
                                <button
                                    className={this.state.category === value ? 'btn btn-danger' : 'btn btn-primary'}
                                    style={{margin: '10px'}}
                                    onClick={() => { this.handleCategoryChange(value)}}
                                >
                                    {value}
                                </button>
                            )
                        })
                    }
                </div>
                {
                    this.state.loading ?
                        <div class="spinner-border text-primary" role="status">
                            <span class="sr-only">Loading...</span>
                        </div> :
                        null
                }

                {
                    !this.state.loading && this.state.articles.length === 0 && (
                        <div>
                            Sorry, No news at the moment.
                        </div>
                    )
                }

                <InfiniteScroll
                    dataLength={this.state.totalResults}
                    next={this.loadNews}
                    hasMore={this.state.totalResults !== this.state.articles.length}
                    loader={
                        <div class="spinner-border text-primary" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    }
                >
                    {
                        !this.state.loading && this.state.articles.length > 0  && (
                            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                                {
                                    this.state.articles.map((article, index) => {
                                        return (
                                            <BootstrapCard article={article} />
                                        )
                                    })
                                }
                            </div>
                        )
                    }
                </InfiniteScroll>

            </div>
        )
    }
}
