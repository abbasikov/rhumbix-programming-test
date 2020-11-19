import React from 'react';
import './App.css';
import axios from 'axios';
import _ from 'lodash';
import Autosuggest from 'react-autosuggest';

const terms = [
    {
        name:'about'
    },
    {
        name:'above'
    },
    {
        name:'across'
    },
    {
        name:'app'
    },
    {
        name:'apple'
    },
    {
        name:'appreciate'
    },
    {
        name:'bad'
    },
    {
        name:'ball'
    },
    {
        name:'balloon'
    },
    {
        name:'bell'
    },
    {
        name:'cat'
    }
];

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : terms.filter(lang =>
        lang.name.toLowerCase().slice(0, inputLength) === inputValue
    );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = suggestion => (
    <div className='suggestion'>
        {suggestion.name}
    </div>
);

class Rhumbix extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value:'',
            suggestions:[],
            giphyUrl:''
        }
        //this.handleChange  = this.handleChange.bind(this);
    }



    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    search = async (e)=>{
        let response = await axios.get(`https://api.giphy.com/v1/gifs/search?q=${this.state.value}&api_key=DLCVuTK6KZExOS7JoMq82bi5MaI6EbWO&limit=1`);
        this.setState(state=>{
            state.giphyUrl = response.data.data[0].images.original.url;
            return state;
        });
    }

    render() {
        const { value, suggestions } = this.state;

        const inputProps = {
            placeholder: 'Type a search term',
            value,
            onChange: this.onChange
        };
        return (
            <div>
                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps}
                />
                <button onClick={this.search}>Go</button>
                <br/>
                {
                    !_.isEmpty(this.state.giphyUrl)?<img src={this.state.giphyUrl} alt='' />:''
                }

            </div>
        );
    }
}


export default Rhumbix;
