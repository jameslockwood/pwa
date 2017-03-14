import React from 'react';

function ItemsList(props) {
    const list = [];
    props.list.forEach((i) => {
        if (props.parentsOnly && !i.children) {
            return;
        }
        list.push(
            <li key={i.id}>
                {i.name} - {i.age} {i.children ? '(children)' : ''} {i.local ? '(local)' : ''}
            </li>
        );
    });
    return (
        <div>
            <h3>{props.header} {props.loading ? ' - Loading' : ''}</h3>
            <ul>{list}</ul>
            {!list.length && !props.loading ? <p>None Available</p> : null}
        </div>
    );
}

ItemsList.defaultProps = {
    list: [],
    parentsOnly: false,
    loading: false,
    header: ''
};

ItemsList.propTypes = {
    list: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    header: React.PropTypes.string.isRequired,
    parentsOnly: React.PropTypes.bool.isRequired,
    loading: React.PropTypes.bool.isRequired
};

export default ItemsList;
