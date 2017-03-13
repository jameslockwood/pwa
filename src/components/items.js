import React from 'react';

function Items(props) {
    if (props.loading) {
        return <span>Loading...</span>;
    }
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
    return <ul>{list}</ul>;
}

Items.defaultProps = {
    list: [],
    parentsOnly: false,
    loading: false
};

Items.propTypes = {
    list: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    parentsOnly: React.PropTypes.bool.isRequired,
    loading: React.PropTypes.bool.isRequired
};

export default Items;
