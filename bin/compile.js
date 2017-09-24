'use strict';

const Promise = require('bluebird');
const Uglify = require('uglify-es');

const fs = Promise.promisifyAll(require('fs'));
const path = require('path');
const sass = Promise.promisifyAll(require('node-sass'));

async function isTypedFile(types, file, dir) {
    const stat = await fs.statAsync(`./${dir}/${file}`);
    const isType = new RegExp(`^[^_].+?\\.(${types.join('|')})$`);
    return stat.isFile() && isType.test(file);
}

async function isSassFile (file) {
    return await isTypedFile(['sass', 'scss'], file, 'styles');
}

async function isJSFile (file) {
    return await isTypedFile(['js', 'mjs'], file, 'scripts');
}

async function isHTMLFile (file) {
    return await isTypedFile(['html'], file, 'html');
}

async function renderSassFile (file) {
    const rendered = await sass.renderAsync({
        file: `./styles/${file}`,
        outputStyle: 'compressed'
    });
    return rendered.css.toString();
}

async function renderJSFile (file) {
    const input = await fs.readFileAsync(`./scripts/${file}`);
    const output = Uglify.minify(input.toString());

    // if (output.error) throw output.error;
    return output.code || '';
}

async function compileCSS () {
    const files = await fs.readdirAsync('./styles');
    const sassfiles = await Promise.filter(files, isSassFile);
    const compiledfiles = await Promise.map(sassfiles, renderSassFile);
    const stylesheet = compiledfiles.reduce((stylesheet, file) => stylesheet + file, "");
    return fs.writeFileAsync('./writh.css', stylesheet);
};

async function compileJS () {
    const files = await fs.readdirAsync('./scripts');
    const jsfiles = await Promise.filter(files, isJSFile);
    const minifiedfiles = await Promise.map(jsfiles, renderJSFile);
    const script = minifiedfiles.reduce((script, file) => script + file, "");
    return fs.writeFileAsync('./writh.js', script);
}

(async function main () {
    try { await compileCSS();} catch (e) { console.error('error in CSS:', e); }
    try { await compileJS();} catch (e) { console.error('error in JS:', e); }
    // try { await compileHTML();} catch (e) { console.error('error in HTML:', e); }
})();
