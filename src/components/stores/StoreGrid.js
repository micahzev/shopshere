import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { array } from 'prop-types';

import StoreTableRow from '~/src/components/stores/StoreTableRow';

import '~/src/styles/store-admin.css';

class StoreGrid extends Component {

  constructor(props) {
    super(props);
    this.state = {
      alphabetically:true,
      status:'All',
      visible:'All',
      category:'All',
      statusCode:'All',
      visibleCode:'All',
    }
  }

  static propTypes = {
      categories: array.isRequired
    };

    static defaultProps = {
      categories: [{
        text:"loading",
        id:0
      }],
    };



  sortAlphabetically() {

    this.setState({
      alphabetically:!this.state.alphabetically
    });

  }

  sortCategory(event) {

    const value = event.target.getAttribute("name");

    this.setState({
      category:value
    });

  }

  sortStatus(event) {

    const value = event.target.getAttribute("name");


    if (value=="All"){
      this.setState({
        status:value,
        statusCode:value
      });
    } else if (value=="Activated") {
      this.setState({
        status:true,
        statusCode:value
      });
    } else if (value=="Deactivated") {
      this.setState({
        status:false,
        statusCode:value
      });
    }

  }

  sortVisible(event) {

        const value = event.target.getAttribute("name");

        if (value=="All"){
          this.setState({
            visible:value,
            visibleCode:value
          });
        } else if (value=="Yes") {
          this.setState({
            visible:true,
            visibleCode:value
          });
        } else if (value=="No") {
          this.setState({
            visible:false,
            visibleCode:value
          });
        }

  }

  render() {

    let {
      shops,
      categories,
      users
    } = this.props;

    const shopslength = shops.length;

    shops = this.state.alphabetically ? _.orderBy(shops, ['name'], ['asc']) : _.orderBy(shops, ['name'], ['desc']);

    shops = this.state.status == 'All' ? shops : _.filter(shops, { 'isActivated': this.state.status});

    shops = this.state.visible == 'All' ? shops : _.filter(shops, { 'visible': this.state.visible});

    shops = this.state.category == 'All' ? shops : _.filter(shops, { 'category': this.state.category});

    const categoryName = this.state.category=='All' ? { text: 'All' } : _.find(categories, {'id':this.state.category});

    const filteredlength = shops.length;

    return (
      <div className="storeGrid">

        <div className="button-panel">

          <div className="dropdown">
              <button className="dropbtn" onClick={this.sortAlphabetically.bind(this)}> Sort Alphabetically: <br/> <u>{this.state.alphabetically ? "Up" : "Down" }</u></button>
          </div>

          <div className="dropdown">
            <button className="dropbtn">Sort by Category: <br/> <u>{categoryName.text}</u></button>
            <div className="dropdown-content">
              <div name="All" onClick={this.sortCategory.bind(this)}>All</div>
              {categories.map((cat)=>{
                return(<div name={cat.id} onClick={this.sortCategory.bind(this)} key={cat.id}>{cat.text}</div>)
              })}
            </div>
          </div>

          <div className="dropdown">
            <button className="dropbtn">Sort by Status: <br/> <u>{this.state.statusCode}</u></button>
            <div className="dropdown-content">
              <div name="All" onClick={this.sortStatus.bind(this)}>All</div>
              <div name="Activated" onClick={this.sortStatus.bind(this)}>Activated</div>
              <div name="Deactivated" onClick={this.sortStatus.bind(this)}>Deactivated</div>
            </div>
          </div>

          <div className="dropdown">
            <button className="dropbtn">Sort by Visible: <br/> <u>{this.state.visibleCode}</u></button>
            <div className="dropdown-content">
              <div name="All" onClick={this.sortVisible.bind(this)}>All</div>
              <div name="Yes" onClick={this.sortVisible.bind(this)}>Yes</div>
              <div name="No"  onClick={this.sortVisible.bind(this)}>No</div>
            </div>
          </div>
        </div>

        <h4 className="number-info">Showing {filteredlength} of {shopslength} Stores</h4>

        <div className="headingRow">
          <div className="headingCell">
            Store Name
          </div>
          <div className="headingCell">
            Owner
          </div>
          <div className="headingCell">
            Category
          </div>
          <div className="statusHeadingCell">
            Status
          </div>
          <div className="statusHeadingCell">
            Visible
          </div>
          <div className="actionHeadingCell">
            Action
          </div>
        </div>
        <hr className="rule"/>
        {shops.map((shop)=>{
          return (
            <div key={shop.id}>
              <StoreTableRow
                shop={shop}
                users={users}
                categories={categories}
                activateShop={this.props.activateShop}
                deactivateShop={this.props.deactivateShop}
                deleteShop={this.props.deleteShop}
                PatchShop={this.props.PatchShop}  />
              <hr/>
            </div>
          )
        })}
      </div>
      );
  }
}


export default StoreGrid;
