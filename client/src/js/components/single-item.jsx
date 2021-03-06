import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchSingleItem } from '../actions/get-single-item';
import EditItem from './edit-item';
import { formatAsCurrency } from '../utils';


class SingleItem extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.body.scrollTop = 0;
    this.props.dispatch(fetchSingleItem(this.props.params.id));
  }

  renderCategoryLink() {
    const { categoryId } = this.props.currentItem;
    return <Link to={`/category/${categoryId}/items`} className="dark-blue hover-navy link">{this.props.categories[categoryId].name}</Link>;
  }

  renderReceiptLink() {
    const { receipt } = this.props.currentItem
    return <a href={`${receipt}`} className="dark-blue hover-navy link">View receipt</a>;
  }

  renderDefinitionLists(property, i) {
    let ddValue, dtValue;
    switch (property) {
      case 'replaceValue' :
        dtValue = `${property.slice(0, 7)}ment ${property.slice(-5)}`;
        ddValue = formatAsCurrency(this.props.currentItem.replaceValue);
        break;
      case 'categoryId' :
        dtValue = `${property.slice(0, 8)}`;
        ddValue = this.renderCategoryLink();
        break;
      case 'receipt' :
        dtValue = property;
        ddValue = this.renderReceiptLink();
        break;
      case 'purchaseDate' :
        dtValue = `${property.slice(0, 8)} ${property.slice(-4)}`;
        ddValue = this.props.currentItem[property];
        break;
      case 'placePurchased' :
        dtValue = `${property.slice(0, 5)} ${property.slice(-9)}`;
        ddValue = this.props.currentItem[property];
        break;
      case 'serialNumber' :
        dtValue = `${property.slice(0, 6)} ${property.slice(-6)}`;
        ddValue = this.props.currentItem[property];
        break;
      case 'notes' :
        dtValue = property;
        ddValue = this.props.currentItem[property];
        break;
    }

    return (
      <dl key={`${i}-${this.props.currentItem._id}`} className="flex flex-wrap lh-title mv2">
        <dt className="mr2 fw4 ttc">{dtValue}:</dt>
        <dd className="ml0 dark-gray">{ddValue}</dd>
      </dl>
    );
  }

  renderSingleItem() {
    const { name, image } = this.props.currentItem;

    const keys = Object.keys(this.props.currentItem).filter((property) => {
      return property !== '_id' && property !== '__v' && property !== 'ownerId' && property !== 'accessToken' && property !== 'image' && property !== 'name';
    });

    const imgStyle = (image === '/assets/image.svg') ? '' : 'ba b--light-gray br2';
    const sharedStyle = 'w-50 f5 link br2 ph3 pv2 mv3 white fw4 tc';

    if (this.props.children) {
      return <EditItem params={this.props.params} />;
    } else {
      return (
        <article className="mw6 mw8-ns center">
          <header className="mb4 bt bb b--black-20">
            <h2 className="ph3 fw3 f4 tracked">{this.props.currentItem.name}</h2>
          </header>
          <div className="mw6 mw8-ns center ph3">
            <div className="flex flex-column flex-row-ns">
              <div className="w-100 w-50-ns mt3 mb3 mb0-ns mr4-ns">
                <img src={`${image}`} alt={name} className={imgStyle} />
              </div>
              <div className="w-100 w-50-ns">
                {keys.map((property, i) => this.renderDefinitionLists(property, i))}
                <div className="flex edit tr">
                  <Link to={`${this.props.location.pathname}/delete`} className={`${sharedStyle} mr2 bg-red hover-bg-dark-red`}>Delete Item</Link>
                  <Link to={`${this.props.location.pathname}/edit`} className={`${sharedStyle} ml2 white bg-dark-blue hover-bg-navy`}>Edit Item</Link>
                </div>
              </div>
            </div>
          </div>
        </article>
      );
    }
  }

  render() {
    if (!this.props.currentItem) {
      return (
        <article className="mw6 mw8-ns center">
          <header className="mb4 bt bb b--black-20">
            <h2 className="ph3 fw3 f4 tracked">Loading item...</h2>
          </header>
        </article>
      );
    }

    return (
      <div>
        {this.renderSingleItem()}
      </div>
    );
  }
}


const mapStateToProps = (state, props) => {
  return {
    categories: state.categories,
    currentItem: state.items[props.params.id]
  }
};


export default connect(mapStateToProps)(SingleItem);
