import React from 'react';

function Items(props) {
    const list = props.list.map(i => (
        <li key={i.id}>{i.value}</li>
    ));
    return (
        <ul>{list}</ul>
    )
}

Items.defaultProps = {
    list: []
};

Items.propTypes = {
    list: React.PropTypes.arrayOf(React.PropTypes.object)
};

export default Items;
