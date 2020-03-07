const  getOptions = require('loader-utils').getOptions;

function loader(source) {
    const options = getOptions(this);

    console.log("SOURCE", source);

    return `export default ${ JSON.stringify(source) }`;
}


module.exports = loader;
