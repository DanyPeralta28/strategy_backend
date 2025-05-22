import * as fs from 'fs';
import { marked } from 'marked';
import { join } from 'path';

const parseIndexMDToHtml = (indexBody: string, mdBody: string) => {
    const firstDelimiter = '<div class="delimiter1"></div>';
    const lastDelimiter = '<div class="delimiter2"></div>';
    const indexFirstParts = indexBody.split(firstDelimiter)[0];
    const indexLastParts = indexBody.split(lastDelimiter)[1];

    const newIndex = `${indexFirstParts}${firstDelimiter} <div id='readme-div'>${mdBody}</div> ${lastDelimiter}${indexLastParts}`;
    return newIndex;
}

export const appUseReadmeHTLM = () => {
    const readmePath = join(__dirname, '../../', 'README.md');
    const readmeContent = fs.readFileSync(readmePath, 'utf8');
    const htmlContent = marked.parse(readmeContent);
  
    const indexPath = join(__dirname, '../../', 'public', 'readme.html');
    const indexContent = fs.readFileSync(indexPath, 'utf8');
    fs.writeFileSync(indexPath, parseIndexMDToHtml(indexContent, htmlContent as string));
}