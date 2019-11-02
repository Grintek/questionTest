import React, {Component} from 'react';
import PropType from 'prop-types';
import {fetchAllBooks} from '../../api';
import connect from "react-redux/es/connect/connect";
import Button from '@material-ui/core/Button';

class BooksApp extends Component {
    static propTypes = {
        fetchAllBooks: PropType.func.isRequired,
        user: PropType.object.isRequired
    };

    componentDidMount(){
        this.props.fetchAllBooks();
    }

    render() {
        const {books} = this.props.user;
        console.log(this.props.user);
        const style = {display: 'block'};
        return (
            <div>
                <h1>Books {books.length}</h1>
                    {books.map((e) =>
                        <div style={style} key={e.id}>
                        <Button href={`/books/${e.id}`} key={e.id}>
                            {e.name}
                        </Button>
                        </div>
                    )}
            </div>
        )
    }
}
function mapDispatchToProps(dispatch) {
    return{
        fetchAllBooks(){
            dispatch(fetchAllBooks());
        }
    }
}

function mapStateToProps(state) {
    return {
        user: state.booksState
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksApp);
