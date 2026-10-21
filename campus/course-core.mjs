/** Parse the existing classroom Markdown as data, without HTML evaluation. */
export function parseCourseMarkdown(input){
  if(typeof input!=='string'||new TextEncoder().encode(input).length>131072)
    throw new Error('Material inválido o demasiado grande');
  const result=[];
  for(const raw of input.replace(/\r\n?/g,'\n').split('\n')){
    const text=raw.trim();if(!text)continue;
    const heading=text.match(/^(#{1,4})\s+(.+)$/);
    if(heading){result.push({kind:'heading',level:heading[1].length,text:heading[2]});continue}
    if(/^[-*]\s+/.test(text)){result.push({kind:'item',text:text.replace(/^[-*]\s+/,'')});continue}
    if(/^\d+[.)]\s+/.test(text)){result.push({kind:'item',text:text.replace(/^\d+[.)]\s+/,'')});continue}
    if(/^>\s?/.test(text)){result.push({kind:'quote',text:text.replace(/^>\s?/,'')});continue}
    result.push({kind:'paragraph',text});
  }
  return result;
}
export function linkTokens(input){
  const parts=[];let last=0;
  for(const m of input.matchAll(/\[([^\]]{1,200})\]\(([^)\s]{1,1000})\)/g)){
    if(m.index>last)parts.push({kind:'text',text:input.slice(last,m.index)});
    parts.push({kind:'link',text:m[1],href:m[2]});last=m.index+m[0].length;
  }
  if(last<input.length)parts.push({kind:'text',text:input.slice(last)});
  return parts;
}
