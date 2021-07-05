import React from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

class StreamShow extends React.Component{
    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id);
    }

     render(){
         if(!this.props.stream){
             return <div>Loding...</div>;
         }

         const {title, description} = this.props.stream;
         return(
             <div>
                <h1>{title}</h1>
                <p>{description}</p>
             </div>
         );
     }
}

const mapStateToProps = (state, ownprops) => {
    return {stream: state.streams[ownprops.match.params.id] };
};

export default connect(mapStateToProps,{fetchStream})(StreamShow);