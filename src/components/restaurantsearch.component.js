import React, {Component} from 'react';

class SearchBar extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="input-group">
          <input className="form-control"
                 type="text"
                 value={this.props.searchText}
                 onKeyPress={this.props.searchTextChange}
                 onChange={this.props.searchTextChange}
                 placeholder="Search restaurants by name"/>
          <span className="pl-1 input-group-btn">
          <button type="submit" className="btn btn-primary"
                  onClick={this.props.searchByValue}>Search</button>
          </span>
            <span className="pl-1 input-group-btn">
            <button type="clear" className="btn btn-primary"
                    onClick={this.props.clearSearch}>Clear</button>
          </span>
        </div>
    );
  };
}

export default SearchBar;