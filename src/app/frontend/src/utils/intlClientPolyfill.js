// Contains utils to download the locale data for the current language, eventually
// requiring the `Intl` polyfill for browser not supporting it
// It is used in client.js *before* rendering the root component.
// (code borrowed from Isomorphic5000)

/**
 * Imports.
 */
import Debug from 'debug';
import isIntlLocaleSupported from 'intl-locales-supported';

const debug = Debug('intl');

/**
 * Returns a promise which is resolved when Intl has been polyfilled.
 */
const loadIntlPolyfill = function (locale) {

    if (window.Intl && isIntlLocaleSupported(locale)) {
        // all fine: Intl is in the global scope and the locale data is available
        return Promise.resolve();
    }

    return new Promise((resolve) => {
        debug('Intl or locale data for %s not available, downloading the polyfill...', locale);

        // When building: create a intl chunk with webpack
        // When executing: run the callback once the chunk has been download.
        require.ensure(['intl'], (require) => {
            require('intl'); // apply the polyfill
            debug('Intl polyfill for %s has been loaded', locale);
            resolve();
        }, 'intl');
    });
};

/** 
 * Returns a promise which is resolved as the required locale-data chunks
 * has been downloaded with webpack's require.ensure. For each language,
 * we make two different chunks: one for browsers supporting `intl` and one
 * for those who don't.
 * The react-intl locale-data is required, for example, by the FormattedRelative
 * component.
 */
const loadLocaleData = function (locale) {

    const hasIntl = isIntlLocaleSupported(locale);

    // Make sure ReactIntl is in the global scope: this is required for adding locale-data
    // Since ReactIntl needs the `Intl` polyfill to be required (sic) we must place
    // this require here, when loadIntlPolyfill is supposed to be present
    require('expose?ReactIntl!react-intl');

    return new Promise((resolve) => {

        switch (locale) {

            //
            // Italian
            //
            case 'it':
                if (!hasIntl) {
                    require.ensure([
                        'intl/locale-data/jsonp/it',
                        'react-intl/dist/locale-data/it'
                    ], (require) => {
                        require('intl/locale-data/jsonp/it');
                        require('react-intl/dist/locale-data/it');
                        debug('Intl and ReactIntl locale-data for %s has been downloaded', locale);
                        resolve();
                    }, 'locale-it');
                }
                else {
                    require.ensure([
                        'react-intl/dist/locale-data/it'
                    ], (require) => {
                        require('react-intl/dist/locale-data/it');
                        debug('ReactIntl locale-data for %s has been downloaded', locale);
                        resolve();
                    }, 'locale-it-no-intl');
                }
                break;

            //
            // French
            //
            case 'fr':
                if (!hasIntl) {
                    require.ensure([
                        'intl/locale-data/jsonp/fr',
                        'react-intl/dist/locale-data/fr'
                    ], (require) => {
                        require('intl/locale-data/jsonp/fr');
                        require('react-intl/dist/locale-data/fr');
                        debug('Intl and ReactIntl locale-data for %s has been downloaded', locale);
                        resolve();
                    }, 'locale-fr');
                }
                else {
                    require.ensure([
                        'react-intl/dist/locale-data/fr'
                    ], (require) => {
                        require('react-intl/dist/locale-data/fr');
                        debug('ReactIntl locale-data for %s has been downloaded', locale);
                        resolve();
                    }, 'locale-fr-no-intl');
                }
                break;

            //
            // Portuguese
            //
            case 'pt':
                if (!hasIntl) {
                    require.ensure([
                        'intl/locale-data/jsonp/pt',
                        'react-intl/dist/locale-data/pt'
                    ], (require) => {
                        require('intl/locale-data/jsonp/pt');
                        require('react-intl/dist/locale-data/pt');
                        debug('Intl locale-data for %s has been downloaded', locale);
                        resolve();
                    }, 'locale-pt');
                }
                else {
                    require.ensure([
                        'react-intl/dist/locale-data/pt'
                    ], (require) => {
                        require('react-intl/dist/locale-data/pt');
                        debug('ReactIntl locale-data for %s has been downloaded', locale);
                        resolve();
                    }, 'locale-pt-no-intl');
                }
                break;

            //
            // English (default)
            //
            default:
                if (!hasIntl) {
                    require.ensure([
                        'intl/locale-data/jsonp/en'
                    ], (require) => {
                        require('intl/locale-data/jsonp/en');
                        debug('Intl locale-data for %s has been downloaded', locale);
                        resolve();
                    }, 'locale-en');
                }
                else {
                    resolve();
                }
        
        } // EOS (End-of-Switch)
    });
};

/**
 * Export.
 */
export {loadIntlPolyfill, loadLocaleData};
