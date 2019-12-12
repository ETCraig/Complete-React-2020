import React from 'react';
import './collection.styles.scss';

import CollectionItem from '../../components/collection-item/collection-item.component';
import { selectCollection } from '../../redux/shop/shop.selector';

import { connect } from 'react-redux';

const CollectionPage = ({ collection }) => (
    <div className="collection-page">

    </div>
);

const mapStateToProps = (state, ownProps) => ({
    collection: selectCollection(ownProps.match.params.collectionId)(state)
});

export default connect(mapStateToProps)(CollectionPage);