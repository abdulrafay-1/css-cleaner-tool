import Editor from '@monaco-editor/react'
import { useDarkMode } from '../hooks/useTheme'

interface VscodeEditorProps {
    value: string
    onChange: (value: string) => void
    language: string
    height?: string
    placeholder?: string
    readOnly?: boolean
}

const VscodeEditor = ({ value, onChange, language, height = '250px', placeholder, readOnly = false }: VscodeEditorProps) => {
    const { dark } = useDarkMode()
    return (
        <Editor
            height={height}
            defaultLanguage={language}
            value={value}
            theme={dark ? 'vs-dark' : 'light'}
            onChange={v => onChange(v || '')}
            options={{
                minimap: { enabled: false },
                fontSize: 16,
                wordWrap: 'on',
                scrollBeyondLastLine: false,
                automaticLayout: true,
                readOnly,
                placeholder,
            }}
        />
    )
}

export default VscodeEditor
