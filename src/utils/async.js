// @flow

import React from 'react';
import Loadable from 'react-loadable';

type LoadingProps = {
    isLoading: boolean,
    error: Error | null,
    pastDelay: boolean
};
type LoadingOptions = Object;
type LoadingFunction = () => void;

// our default loading mask when async components are loading
const DefaultLoadingComponent = ({ isLoading, error, pastDelay }: LoadingProps) => {
    if (isLoading) {
        return pastDelay ? <div>Loading...</div> : null;
    } else if (error) {
        return <div>Error! Component failed to load</div>;
    }
    return null;
};

// defaults as per https://github.com/thejameskyle/react-loadable
const loaderOptionDefaults = {
    LoadingComponent: DefaultLoadingComponent,
    delay: 200
};

// higher order component which takes either
// 1 - options object as per react-loadable library
// 2 - function which when invoked loads the component and returns a promise
export default function AsyncComponent(opts: LoadingOptions | LoadingFunction) {
    let loaderOptions = {};
    if (typeof opts === 'function') {
        loaderOptions = {
            loader: opts
        };
    } else if (typeof opts === 'object') {
        loaderOptions = opts;
    } else {
        throw new Error('Invalid options provided.  Must be function or object.');
    }
    if (!loaderOptions.loader) {
        throw new Error('Must provide a loader function in options');
    }
    return Loadable({
        ...loaderOptionDefaults,
        ...loaderOptions
    });
}
