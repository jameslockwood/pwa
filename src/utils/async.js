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

const MyLoadingComponent = ({ isLoading, error, pastDelay }: LoadingProps) => {
    if (isLoading) {
        return pastDelay ? <div>Loading...</div> : null;
    } else if (error) {
        return <div>Error! Component failed to load</div>;
    }
    return null;
};

const loaderOptionDefaults = {
    LoadingComponent: MyLoadingComponent,
    delay: 200
};

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
