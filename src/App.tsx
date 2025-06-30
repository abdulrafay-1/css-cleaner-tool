import { useState } from 'react'
import { useDarkMode } from './hooks/useTheme'
import VscodeEditor from './components/VscodeEditor'
import { extractSelectorsAdvanced } from './utils/extractSelectors'
import { parseAdvancedCSS } from './utils/parseCss'
import { calculateStats, formatResult } from './utils/calcuatesStats'
import { BrushCleaning, Code, Code2, FileJson2, LucideMoon, LucideSun } from 'lucide-react'

const App = () => {
  const [html, setHtml] = useState('')
  const [css, setCss] = useState('')
  const [result, setResult] = useState('')
  const { dark, toggleDarkMode } = useDarkMode()

  // const handleCleanCss = () => {
  //   if (!html.trim() || !css.trim()) {
  //     setResult('');
  //     return;
  //   }

  //   try {
  //     const startTime = performance.now();

  //     // Extract classes more efficiently
  //     const usedClasses = new Set();
  //     const classMatches = html.match(/(?:class|className)\s*=\s*["'`]([^"'`]*)["'`]/g);

  //     if (classMatches) {
  //       classMatches.forEach(match => {
  //         const classes = match.replace(/(?:class|className)\s*=\s*["'`]([^"'`]*)["'`]/, '$1');
  //         classes.split(/\s+/).filter(Boolean).forEach(cls => usedClasses.add(cls));
  //       });
  //     }

  //     // Parse CSS more efficiently using string operations
  //     const cssRules = [];
  //     let currentPos = 0;
  //     const cssLength = css.length;

  //     while (currentPos < cssLength) {
  //       // Find next CSS rule
  //       const ruleStart = css.indexOf('.', currentPos);
  //       if (ruleStart === -1) break;

  //       const ruleEnd = css.indexOf('}', ruleStart);
  //       if (ruleEnd === -1) break;

  //       const rule = css.substring(ruleStart, ruleEnd + 1);
  //       const classMatch = rule.match(/^\.([a-zA-Z_-][a-zA-Z0-9_-]*)/);

  //       if (classMatch && usedClasses.has(classMatch[1])) {
  //         cssRules.push(rule);
  //       }

  //       currentPos = ruleEnd + 1;
  //     }

  //     const endTime = performance.now();
  //     const processingTime = Math.round(endTime - startTime);

  //     const result = cssRules.join('\n');
  //     setResult(result + `\n\n/* Processed in ${processingTime}ms */`);

  //   } catch (error) {
  //     console.error('Error cleaning CSS:', error);
  //     setResult('/* Error processing CSS. Please check your input. */');
  //   }
  // };


  // Types and Interfaces



  // Main cleaning function with full type safety
  const handleCleanCss = (): void => {
    if (!html.trim() || !css.trim()) {
      setResult('');
      return;
    }

    try {
      const startTime: number = performance.now();

      // Enhanced class and ID extraction
      const { usedClasses, usedIds } = extractSelectorsAdvanced(html);

      console.log(`Found ${usedClasses.size} classes and ${usedIds.size} IDs`);

      // Advanced SCSS/CSS Parser with type safety
      const parsedRules: string[] = parseAdvancedCSS(css, usedClasses, usedIds);

      const endTime: number = performance.now();
      const processingTime: number = Math.round(endTime - startTime);

      const stats = calculateStats(css, parsedRules, processingTime);
      const result: string = formatResult(parsedRules, stats);

      setResult(result);

    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('Error cleaning CSS:', errorMessage);
      setResult(`/* Error processing CSS: ${errorMessage} */`);
    }
  };


  // Count CSS rules with type safety


  // Format final result with type safety

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-10 max-w-7xl">
        {/* Header */}
        <div className="flex md:flex-row justify-between items-center mb-10 gap-4">
          <h1 className="flex items-center gap-1 text-2xl md:text-4xl font-extrabold text-blue-700 dark:text-blue-200 tracking-tight drop-shadow-sm text-center md:text-left">
            <BrushCleaning />
            {/* <img src="./css-brands.svg" width={34} height={34} alt="" /> */}
            <span>
            </span>
            CSS Cleaner Tool
          </h1>
          <button
            onClick={toggleDarkMode}
            className="flex items-center gap-2 px-2 py-2 cursor-pointer rounded-xl bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors duration-200 shadow-md font-semibold text-base"
          >
            {dark ? (
              <span className="text-yellow-400 text-xl">
                <LucideSun />
              </span>
            ) : (
              <span className="text-blue-500 text-xl">
                <LucideMoon />
              </span>
            )}
          </button>
        </div>

        {/* Input Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* HTML Input */}
          <div className="space-y-2">
            <label className="flex gap-1 text-base font-semibold text-blue-700 dark:text-blue-200 mb-1">
              <Code2 />
              HTML Input
            </label>
            <VscodeEditor
              value={html}
              onChange={setHtml}
              language="html"
              height="320px"
              placeholder="Paste your HTML code here..."
            />
          </div>

          {/* CSS Input */}
          <div className="space-y-2">
            <label className="flex gap-1 text-base font-semibold text-blue-700 dark:text-blue-200 mb-1">
              <FileJson2 />
              CSS Input
            </label>
            <VscodeEditor
              value={css}
              onChange={setCss}
              language="css"
              height="320px"
              placeholder="Paste your CSS code here..."
            />
          </div>
        </div>

        {/* Clean Button */}
        <div className="text-center mb-10">
          <button
            onClick={handleCleanCss}
            disabled={!html.trim() || !css.trim()}
            className="px-10 inline-flex gap-1 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 disabled:bg-gray-400 dark:disabled:bg-gray-700 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:cursor-not-allowed text-lg tracking-wide"
          >
            <BrushCleaning />
            Clean Unused CSS
          </button>
        </div>

        {/* Result Section */}
        <div className="space-y-2 mb-10">
          <div className="flex items-center justify-between">
            <label className="block text-base font-semibold text-blue-700 dark:text-blue-200">
              Cleaned CSS Result
            </label>
            {result && (
              <button
                onClick={() => navigator.clipboard.writeText(result)}
                className="px-4 py-2 text-sm bg-green-200 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg hover:bg-green-300 dark:hover:bg-green-800 transition-colors duration-200 font-semibold shadow"
              >
                📋 Copy
              </button>
            )}
          </div>
          <VscodeEditor
            value={result}
            onChange={() => { }}
            language="css"
            height="180px"
            placeholder="Cleaned CSS will appear here..."
            readOnly
          />
        </div>

        {/* Usage Instructions */}
        <div className="mt-8 p-8 bg-blue-100/70 dark:bg-blue-900/30 rounded-2xl border border-blue-200 dark:border-blue-800 shadow-md">
          <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-3 flex items-center gap-2">
            <span>ℹ️</span> How to use:
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-blue-800 dark:text-blue-200 text-base pl-4">
            <li>Paste your <span className="font-semibold">HTML</span> code in the left editor</li>
            <li>Paste your <span className="font-semibold">CSS</span> code in the right editor</li>
            <li>Click <span className="font-semibold">"Clean Unused CSS"</span> to remove unused CSS classes</li>
            <li>Copy the cleaned CSS from the result area</li>
          </ol>
        </div>
      </div>
    </div >
  )
}

export default App