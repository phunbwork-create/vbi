const fs = require('fs');
const path = require('path');
const { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType, BorderStyle } = require('docx');

const specMdPath = path.join(__dirname, '..', 'uc', 'UC-NK-001', 'UC-NK-001-spec.md');
const specDocxPath = path.join(__dirname, '..', 'uc', 'UC-NK-001', 'UC-NK-001-spec.docx');

const content = fs.readFileSync(specMdPath, 'utf8');

const lines = content.split('\n');
const children = [];

let inTable = false;
let tableRows = [];

function flushTable() {
    if (tableRows.length === 0) return;
    
    const docTableRows = tableRows.map((rowCells, rowIndex) => {
        return new TableRow({
            children: rowCells.map(cellText => {
                return new TableCell({
                    children: [new Paragraph({
                        children: [new TextRun({
                            text: cellText.replace(/<br>/g, '\n').replace(/`([^`]+)`/g, '$1').trim(),
                            bold: rowIndex === 0,
                            size: 20
                        })]
                    })],
                    width: { size: 100 / rowCells.length, type: WidthType.PERCENTAGE }
                });
            })
        });
    });

    children.push(new Table({
        rows: docTableRows,
        width: { size: 100, type: WidthType.PERCENTAGE }
    }));
    children.push(new Paragraph({ text: "" }));
    tableRows = [];
    inTable = false;
}

lines.forEach(line => {
    const trimmed = line.trim();
    
    if (trimmed.startsWith('|')) {
        if (trimmed.includes('---')) return; // skip header separator
        inTable = true;
        const cells = trimmed.split('|').slice(1, -1).map(c => c.trim());
        tableRows.push(cells);
        return;
    } else if (inTable) {
        flushTable();
    }
    
    if (trimmed.startsWith('# ')) {
        children.push(new Paragraph({
            text: trimmed.replace('# ', ''),
            heading: HeadingLevel.TITLE,
            spaceAfter: { before: 200, after: 200 }
        }));
    } else if (trimmed.startsWith('## ')) {
        children.push(new Paragraph({
            text: trimmed.replace('## ', ''),
            heading: HeadingLevel.HEADING_1,
            spaceBefore: 300,
            spaceAfter: 150
        }));
    } else if (trimmed.startsWith('### ')) {
        children.push(new Paragraph({
            text: trimmed.replace('### ', ''),
            heading: HeadingLevel.HEADING_2,
            spaceBefore: 200,
            spaceAfter: 100
        }));
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        children.push(new Paragraph({
            children: [new TextRun({ text: trimmed.replace(/^[-*]\s+/, '').replace(/\*\*([^*]+)\*\*/g, '$1'), size: 22 })],
            bullet: { level: 0 }
        }));
    } else if (trimmed.length > 0 && !trimmed.startsWith('---')) {
        children.push(new Paragraph({
            children: [new TextRun({ text: trimmed.replace(/\*\*([^*]+)\*\*/g, '$1'), size: 22 })],
            spaceAfter: { after: 120 }
        }));
    }
});

if (inTable) {
    flushTable();
}

const doc = new Document({
    sections: [{
        properties: {},
        children: children
    }]
});

Packer.toBuffer(doc).then(buffer => {
    fs.writeFileSync(specDocxPath, buffer);
    console.log('UC-NK-001-spec.docx generated successfully!');
}).catch(err => {
    console.error('Error generating docx:', err);
});
