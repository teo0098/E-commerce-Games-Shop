import React from 'react';

const isSearchEngineOn = React.createContext({
    on: false,
    setSearchEngine: () => {}
});

export default isSearchEngineOn;