import CollectionsOverview from './collections-overview.component';
import { selectIsCollectionFetching } from '../../redux/shop/shop.selector';
import WithSpinner from '../with-spinner/with-spinner.component';

import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionFetching
});

const CollectionsOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;