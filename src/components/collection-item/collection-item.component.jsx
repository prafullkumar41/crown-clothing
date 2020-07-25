import React from 'react';
import {connect} from 'react-redux';
import {AddItem} from '../../redux/cart/cart.action';

import CutomButton from '../custom-button/custom-button.component';

import './collection-item.style.scss';

const CollectionItem = ({item, AddItem}) => {
    const { name, price, imageUrl} = item;
    return(
    <div className='collection-item'>
        <div 
        className='image'
        style ={{
                backgroundImage: `url(${imageUrl})`
            }}    
        />
            <div className='collection-footer'>
                <span className='name'>{name}</span>
                <span className='price'>${price}</span>
            </div>
         <CutomButton className='custom-button' onClick={() => AddItem(item)} inverted>
             Add To Cart
         </CutomButton>
    </div>
)};

const mapdispatchToProps = (dispatch) => ({
    AddItem: (item) => dispatch(AddItem(item))
})

export default connect(null, mapdispatchToProps)(CollectionItem);