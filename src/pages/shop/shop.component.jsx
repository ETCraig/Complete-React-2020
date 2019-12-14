import React, { Component } from 'react';

import CollectionPage from '../collection/collection.component';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import { firestore, convertCollectionsSnapShotToMap } from '../../firebase/firebasae.utils';
import { updateCollections } from '../../redux/shop/shop.actions';

import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

class ShopPage extends Component {
    unsubscribeFromSnapShot = null;

    componentDidMount() {
        const { updateCollections } = this.props;
        const collectionRef = firestore.collection('collections');

        this.unsubscribeFromSnapShot = collectionRef.onSnapshot(async snapshot => {
            const collectionsMap = convertCollectionsSnapShotToMap(snapshot);
            updateCollections(collectionsMap);
        });
    }

    render() {
        const { match } = this.props;
        return (
            <div className="shop-page">
                <Route exact path={`${match.path}`} component={CollectionsOverview} />
                <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    collections: collectionsMap => dispatch(updateCollections(collectionsMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);