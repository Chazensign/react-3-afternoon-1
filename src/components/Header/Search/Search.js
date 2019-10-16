import React, { Component } from 'react';

import './Search.css';

import SearchIcon from 'react-icons/lib/md/search';

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT

export default class Search extends Component {
  render() {
    return (
      <section className="Search__parent">

        <div className="Search__content">
          <input name='searchVal' onChange={(event) => this.props.handleChangeFn(event.target.value)} placeholder="Search Your Feed" />

          <SearchIcon onClick={this.props.postSearchFn} id="Search__icon" />
        </div>
        
      </section>
    )
  }
}