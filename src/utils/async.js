import React from 'react';

const asnyc = getComponent =>
    class AsyncComponent extends React.Component {
        static Component = null;
        state = { Component: AsyncComponent.Component };
        componentWillMount() {
            if (!this.state.Component) {
                let getter;
                if (typeof getComponent !== 'function') {
                    getter = Promise.resolve(getComponent);
                } else {
                    getter = getComponent;
                }
                getter().then((Component) => {
                    AsyncComponent.Component = Component;
                    this.setState({ Component });
                });
            }
        }
        render() {
            const { Component } = this.state;
            if (Component) {
                return <Component {...this.props} />;
            }
            return null;
        }
    };

function loadComponentAsync(importPromise) {
    return asnyc(() => importPromise.then(module => module.default));
}

export default loadComponentAsync;
