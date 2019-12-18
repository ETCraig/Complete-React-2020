import React from 'react';
import { DirectoryMenuContainer } from './directory.styles';

import MenuItem from '../menu-item/menu-item.component';
import { selectDirectorySections } from '../../redux/directory/directory.selector';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

const Directory = ({ sections }) => (
    <DirectoryMenuContainer>
        {sections.map(({ id, ...otherSectionProps }) => (
            <MenuItem key={id} {...otherSectionProps} />
        ))}
    </DirectoryMenuContainer>
);

const mapStateToProps = createStructuredSelector({
    sections: selectDirectorySections
});

export default connect(mapStateToProps)(Directory);