import React from 'react';
import ItemsList from './items-list';

function Items(props) {
    const nonLocal = props.list.filter(i => !i.local);
    const local = props.list.filter(i => i.local);
    return (
        <div>
            <ItemsList
                list={nonLocal}
                loading={props.loading}
                parentsOnly={props.parentsOnly}
                header="Server"
            />
            <ItemsList list={local} parentsOnly={props.parentsOnly} header="Client" />
        </div>
    );
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
