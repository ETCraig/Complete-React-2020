import React, { Component } from 'react';
import './directory.styles.scss';

import { MenuItem } from '../menu-item/menu-item.component';

class Directory extends Component {
    constructor() {
        super();

        this.state = {
            sections: []
        }
    }
    render() {
        return (
            <div className="directory-menu">
                {this.state.sections.map(({ title, imageUrl, size, id }) => (
                    <MenuItem key={id} title={title} imageUrl={imageUrl} size={size} />
                ))}
            </div>
        );
    }
}

export default Directory;