console.log('undifined')
require.config({ paths: { 'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.35.0/min/vs' }});
require(['vs/editor/editor.main'], function() {
    var htmlEditor = monaco.editor.create(document.getElementById('html-editor'), {
        value: '<!-- Write your HTML5 here -->',
        language: 'html',
        theme: 'vs-dark',
        automaticLayout: true
    });

    var cssEditor = monaco.editor.create(document.getElementById('css-editor'), {
        value: '/* Write your CSS4 here */',
        language: 'css',
        theme: 'vs-dark',
        automaticLayout: true
    });

    var jsEditor = monaco.editor.create(document.getElementById('js-editor'), {
        value: '// Write your JavaScript here',
        language: 'javascript',
        theme: 'vs-dark',
        automaticLayout: true
    });

    document.getElementById('run-code').addEventListener('click', () => {
        const htmlCode = htmlEditor.getValue();
        const cssCode = cssEditor.getValue();
        const jsCode = jsEditor.getValue();

        const output = document.getElementById('output');
        const iframeDocument = output.contentDocument || output.contentWindow.document;

        iframeDocument.open();
        iframeDocument.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>${cssCode}</style>
            </head>
            <body>
                ${htmlCode}
                <script>${jsCode}<\/script>
            </body>
            </html>
        `);
        iframeDocument.close();
    });

    Split(['#html-editor', '#css-editor', '#js-editor'], {
        sizes: [33, 33, 34],
        direction: 'vertical',
        gutterSize: 8,
        cursor: 'row-resize'
    });

    Split(['#editors', '#output-container'], {
        sizes: [50, 50],
        direction: 'vertical',
        gutterSize: 8,
        cursor: 'row-resize'
    });
});
