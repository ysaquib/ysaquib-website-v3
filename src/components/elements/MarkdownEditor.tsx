/**
 * File: MarkdownEditor.tsx
 * Author: Yusuf Saquib
 */

import React, { FC, useEffect, useState } from 'react';
// import { RegisterOptions, UseFormRegister } from 'react-hook-form';
import { IconAsterisk, IconBold, IconBulletList, IconCheckedList, IconCheckedListAlt, IconCode, IconCodeBlock, IconHeader1, IconHeader2, IconHeader3, IconHeader4, IconHeader5, IconHeader6, IconImage, IconItalic, IconLink, IconNumberedList, IconQuote, IconSeparator, IconStrikethrough, IconTable } from './Icons';

interface ToolbarProps
{
    editorContent: string;
    setEditorContent: React.Dispatch<React.SetStateAction<string>>;
    editorSelection: number[];
    setEditorSelection: React.Dispatch<React.SetStateAction<number[]>>;
    getEditorSelection: () => void;
}

const Formatting = 
{
    bold:               ["**", "**"],
    italic:             ["_", "_"],
    strikethrough:      ["~~", "~~"],
    h1:                 ["# ", ""],
    h2:                 ["## ", ""],
    h3:                 ["### ", ""],
    h4:                 ["#### ", ""],
    h5:                 ["##### ", ""],
    h6:                 ["###### ", ""],
    blockquote:         ["> ", ""],
    ol:                 ["1. ", ""],
    ul:                 ["- ", ""],
    deflist:            [": ", ""],
    tasklist:           ["- [ ] ",""],
    tasklist_checked:   ["- [x] ",""],
    math:               ["$", "$"],
    code:               ["`", "`"],
    codeblock:          ["```language\n", "\n```"],
    separator:          ["---\n", ""],
    link:               ["[", "](url)"],
    image:              ["![", "](url)"],
    footnote:           ["[^", "]"],
    headerid:           ["{#", "}"],
    table:              ["|  Column 1  |  Column 2  |\n| ---------- | ---------- |\n|    Text    |    Text    |\n|            |            |\n", ""]

}

const Toolbar : FC<ToolbarProps> = ({editorContent, setEditorContent, editorSelection, setEditorSelection, getEditorSelection}) =>
{
    /**
     * TODO: Add basic keyboard shortcuts.
     * TODO: Add auto continue list functionality?
     */
    function formatMarkdown (options: string[])
    {
        const prefix = options[0];
        const suffix = options[1];

        const start = editorSelection[0];
        const end = editorSelection[1];

        const newStart = start + prefix.length;
        const newEnd = end + prefix.length;

        const newContent = editorContent.slice(0, start) + prefix + editorContent.slice(start, end) + suffix + editorContent.slice(end);
        setEditorContent(newContent);
        setEditorSelection([newStart, newEnd]);
    }

    return (
        <div className="toolbar" onMouseDown={getEditorSelection}>
            <div className="toolbar_button svg_icon" onClick={() => formatMarkdown(Formatting.bold)}>{IconBold}</div>
            <div className="toolbar_button svg_icon" onClick={() => formatMarkdown(Formatting.italic)}>{IconItalic}</div>
            <div className="toolbar_button svg_icon" onClick={() => formatMarkdown(Formatting.strikethrough)}>{IconStrikethrough}</div>

            <div className="toolbar_divider" />

            <div className="toolbar_button svg_icon" onClick={() => formatMarkdown(Formatting.h1)}>{IconHeader1}</div>
            <div className="toolbar_button svg_icon" onClick={() => formatMarkdown(Formatting.h2)}>{IconHeader2}</div>
            <div className="toolbar_button svg_icon" onClick={() => formatMarkdown(Formatting.h3)}>{IconHeader3}</div>
            <div className="toolbar_button svg_icon" onClick={() => formatMarkdown(Formatting.h4)}>{IconHeader4}</div>
            <div className="toolbar_button svg_icon" onClick={() => formatMarkdown(Formatting.h5)}>{IconHeader5}</div>
            <div className="toolbar_button svg_icon" onClick={() => formatMarkdown(Formatting.h6)}>{IconHeader6}</div>
            
            <div className="toolbar_divider" />

            <div className="toolbar_button svg_icon" onClick={() => formatMarkdown(Formatting.blockquote)}>{IconQuote}</div>
            {/* <div className="toolbar_button svg_icon" onClick={() => formatMarkdown(Formatting.math)}>{IconFunction}</div> */}
            <div className="toolbar_button svg_icon" onClick={() => formatMarkdown(Formatting.code)}>{IconCode}</div>
            <div className="toolbar_button svg_icon" onClick={() => formatMarkdown(Formatting.codeblock)}>{IconCodeBlock}</div>
        
            <div className="toolbar_divider" />

            <div className="toolbar_button svg_icon" onClick={() => formatMarkdown(Formatting.ul)}>{IconBulletList}</div>
            <div className="toolbar_button svg_icon" onClick={() => formatMarkdown(Formatting.ol)}>{IconNumberedList}</div>
            <div className="toolbar_button svg_icon" onClick={() => formatMarkdown(Formatting.tasklist)}>{IconCheckedList}</div>
            <div className="toolbar_button svg_icon" onClick={() => formatMarkdown(Formatting.deflist)}>{IconCheckedListAlt}</div>
            
            <div className="toolbar_divider" />
            
            <div className="toolbar_button svg_icon" onClick={() => formatMarkdown(Formatting.separator)}>{IconSeparator}</div>
            <div className="toolbar_button svg_icon" onClick={() => formatMarkdown(Formatting.link)}>{IconLink}</div>
            <div className="toolbar_button svg_icon" onClick={() => formatMarkdown(Formatting.image)}>{IconImage}</div>
            <div className="toolbar_button svg_icon" onClick={() => formatMarkdown(Formatting.table)}>{IconTable}</div>
            
            <div className="toolbar_divider" />
            
            {/* <div className="toolbar_button svg_icon" onClick={() => formatMarkdown(Formatting.headerid)}>{IconHashtag}</div> */}
            <div className="toolbar_button svg_icon" onClick={() => formatMarkdown(Formatting.footnote)}>{IconAsterisk}</div>

        </div>
    );
}

interface EditorProps
{
    name: string;
    className?: string;
    setContent?: React.Dispatch<React.SetStateAction<string>>;
    content?: string;
}

const Editor: FC<EditorProps> = ({className="", content, setContent, name, ...props}) => 
{

    const [editorContent, setEditorContent] = useState(content ?? "");
    const [editorSelection, setEditorSelection] = useState([0,0]);

    const editorRef = React.useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        setContent && setContent(editorContent);
    }, [editorContent, editorRef, setContent]);

    useEffect(() => {
        editorRef.current?.focus();
        // console.log(editorSelection);
        editorRef.current?.setSelectionRange(editorSelection[0], editorSelection[1]);

    }, [editorSelection, editorRef]);


    const handleEditorChange = () => 
    {
        getEditorSelection();
        const content: string = editorRef.current?.value ?? "";
        setEditorContent(content);
        // console.log(content);
    }

    const getEditorSelection = () =>
    {
        const start : number = editorRef.current?.selectionStart ?? 0;
        const end : number = editorRef.current?.selectionEnd ?? 0;
        setEditorSelection([start, end]);
        // console.log(start,end);
    }
    
    return (
        <div className="editor_wrapper">

        <Toolbar 
            editorContent={editorContent}
            setEditorContent={setEditorContent}
            editorSelection={editorSelection}
            setEditorSelection={setEditorSelection}
            getEditorSelection={getEditorSelection}
            />
        <textarea 
            ref={editorRef}
            value={editorContent}
            // {...register(name, registration)} {...props}
            id={`${name}_input`}
            name={name} 
            className="editor_area" 
            onChange={handleEditorChange}
            rows={25}/>
        </div>
    );
}

export default Editor;