import React, { useRef } from "react";
import Markdown from "markdown-to-jsx";
import { jsPDF } from "jspdf";

export default function ClaudeRecipe(props) {
    const recipeShown = props.recipeShown;
    const recipeRef = useRef(null);

    const handleDownload = () => {
        // Initialize the PDF document
        const doc = new jsPDF({
            unit: "pt",
            format: "a4"
        });

        // Set the font family, weight, and size to match the recipe display style. 
        // Note: Using Helvetica (normal weight) as a substitute for your custom font.
        doc.setFont("Helvetica", "normal");
        doc.setFontSize(14);

        // Convert markdown to plain text so the PDF text remains selectable.
        const plainText = recipeShown
            //.replace(/(\*\*|__)(.*?)\1/g, "$2")       // remove bold formatting
            .replace(/(\*|_)(.*?)\1/g, "$2")           // remove italic formatting
            .replace(/`{1,3}([\s\S]+?)`{1,3}/g, "$1")   // remove inline code markers
            .replace(/~~(.*?)~~/g, "$1")                // remove strikethrough
            .replace(/#+\s*(.*)/g, "$1")                // remove heading markers
            .trim();

        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 20;
        const availableWidth = pageWidth - margin * 2; // for example: 560 pt on A4
        const lineHeightFactor = 1.4;
        const lineHeight = 18 * lineHeightFactor; // 18 is our font size

        // Wrap the text within the available width
        const lines = doc.splitTextToSize(plainText, availableWidth);

        // Paginate: print line by line and add a new page when content overflows.
        let cursorY = margin;
        lines.forEach(line => {
            if (cursorY + lineHeight > pageHeight - margin) {
                doc.addPage();
                cursorY = margin;
            }
            doc.text(line, margin, cursorY);
            cursorY += lineHeight;
        });

        // Download the generated PDF file.
        doc.save("recipe.pdf");
    };

    return (
        <section className="markdown-content" ref={recipeRef} id="recipeContent">
            <h1>Chef Claude recommends:</h1>
            <Markdown>{recipeShown}</Markdown>
            <button onClick={handleDownload} className="download-button">
                Download as PDF
            </button>
        </section>
    );
}