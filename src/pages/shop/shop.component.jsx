import React from 'react';

import CollectionOverviewContainer from '../../components/collection-overview/collections-overview.container';
import CollectionPageContainer from '../collection/collection.container';

import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchCollectionsStart} from '../../redux/shop/shop.actions';



class ShopPage extends React.Component {
   
    componentDidMount() {
        const {fetchCollectionsStart} =this.props;
        fetchCollectionsStart();

    }



 render () {
     const {match} = this.props;
     return(
        
            <div className='shop-page'>
                <Route exact path={`${match.path}`}  
               component ={CollectionOverviewContainer}  
              />
                <Route path={`${match.path}/:collectionId`}
                 component={CollectionPageContainer}
                 />
            </div>
               
     )
}

}


const mapDispathToProps = dispatch => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
})



export default connect(null, mapDispathToProps)(ShopPage);