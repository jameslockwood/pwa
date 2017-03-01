import React from 'react';

function Items(props) {
    const list = [];
    props.list.forEach((i) => {
        if (props.parentsOnly && !i.children) {
            return;
        }
        if (props.filter && i.value.toLowerCase().indexOf(props.filter.toLowerCase()) === -1) {
            return;
        }
        list.push(<li key={i.id}>
            {i.value} {i.children ? '(children)' : ''}
        </li>);
    });
    return (
        <ul>{list}</ul>
    )
}

Items.defaultProps = {
    list: [],
    filter: '',
    parentsOnly: false
};

Items.propTypes = {
    list: React.PropTypes.arrayOf(React.PropTypes.object),
    filter: React.PropTypes.string
};

export default Items;
