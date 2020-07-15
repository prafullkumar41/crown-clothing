import React from 'react';

import MenuItem from '../menu-items/menu-items.component';

import { createStructuredSelector } from 'reselect';
import {connect} from 'react-redux';
import { selectDirectorySections} from '../../redux/directory/directory.selectors';

import './directory.style.scss';

const Directory = ({sections}) => 
       <div className='directory-menu'>
          { sections.map( ({id,...otherSectionProps}) =>
                <MenuItem key={id} {...otherSectionProps}/>
              )
          }           
       </div>

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
})

export default connect(mapStateToProps)(Directory);