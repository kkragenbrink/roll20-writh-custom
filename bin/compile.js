'use strict';

const Promise = require('bluebird');
const Uglify = require('uglify-es');

const fs = Promise.promisifyAll(require('fs'));
const path = require('path');
const sass = Promise.promisifyAll(require('node-sass'));

async function isTypedFile(types, file, path) {
    const stat = await fs.statAsync(`${path}/${file}`);
    const isType = new RegExp(`^[^_].+?\\.(${types.join('|')})$`);
    return stat.isFile() && isType.test(file);
}

async function isSassFile (file) {
    return await isTypedFile(['sass', 'scss'], file, './styles');
}

async function isJSFile (file, path) {
    return await isTypedFile(['js', 'mjs'], file, path);
}

async function isHTMLFile (file) {
    return await isTypedFile(['html'], file, './html');
}

async function renderSassFile (file) {
    const rendered = await sass.renderAsync({
        file: `./styles/${file}`,
        outputStyle: 'compressed'
    });
    return rendered.css.toString();
}

async function renderJSFile (file, path) {
    const input = await fs.readFileAsync(`${path}/${file}`);
    const output = Uglify.minify(input.toString(), {compress:false, mangle:false});

    // if (output.error) throw output.error;
    return output.code || '';
}

const html_include = /^\s*@include "(.*)";$/gm;
async function parseHTMLFile (content) {

    const matches = content.match(html_include);
    if (!matches) return content;

    return Promise.reduce(matches, async (content, match) => {
        html_include.lastIndex = 0;
        const [_, filename] = html_include.exec(match) || [];

        if (!filename) {
            console.error(`${match} returned no filenames.`);
            return content;
        }

        const [file, extension] = filename.split('.');
        const contents = await renderIncludeByExtension(file, extension);
        return content.replace(match, contents);
    }, content);
}

async function renderIncludeByExtension (file, extension) {
    const filename = `${file}.${extension}`;

    if (extension === 'html') return await renderHTMLFile(filename);
    if (extension === 'js') return await renderJSFile(filename, './html');
}

async function renderHTMLFile (file) {
    const input = await fs.readFileAsync(`./html/${file}`);
    const contents = input.toString();

    return await parseHTMLFile (contents);
}

async function compileCSS () {
    const files = await fs.readdirAsync('./styles');
    const sassfiles = await Promise.filter(files, isSassFile);

    await Promise.map(sassfiles, async (file) => {
        const contents = await renderSassFile(file);
        return await fs.writeFileAsync(`./${file}`.replace('scss','css'), contents);
    });
}

async function compileJS () {
    const files = await fs.readdirAsync('./scripts');
    const jsfiles = await Promise.filter(files, (file) => isJSFile(file, './scripts'));
    const minifiedfiles = await Promise.map(jsfiles, (file) => renderJSFile(file, './scripts'));
    const script = minifiedfiles.join('\n');
    return fs.writeFileAsync('./writh.js', script);
}

async function compileHTML () {
    const files = await fs.readdirAsync('./html');
    const htmlfiles = await Promise.filter(files, isHTMLFile);

    await Promise.map(htmlfiles, async (file) => {
        const view = await renderHTMLFile(file);
        return fs.writeFileAsync(`./${file}`, view);
    });
}

(async function main () {
    try { await compileCSS();} catch (e) { console.error('error in CSS:', e); }
    try { await compileJS();} catch (e) { console.error('error in JS:', e); }
    try { await compileHTML();} catch (e) { console.error('error in HTML:', e); }
})();
