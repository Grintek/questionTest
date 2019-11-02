import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {fetchBook} from '../../api';
import PropTypes from "prop-types";

class BookId extends Component{
    static propTypes = {
        fetchBook: PropTypes.func.isRequired,
        bookApp: PropTypes.object.isRequired,
        id: PropTypes.string
    };

    componentDidMount(){
        const {id} = this.props;
        console.log(id);
        this.props.fetchBook(id);
    }
    render() {
        const {book} = this.props.bookApp;
        console.log(book);
        return (
            <div>
                <h1>Название книги</h1>
                <h3>{book.name}
                    {console.log(book.name)}</h3>
                <h5>{book.description}</h5>
            </div>
        );
    }
}
function mapDispatchToProps(dispatch){
    return {
        fetchBook(id){
            dispatch(fetchBook(id));
        }
    }
}

function mapStateToProps(state) {
    return {
        bookApp: state.booksState
    };
}

export default connect( mapStateToProps, mapDispatchToProps )(BookId);