import { XMarkIcon } from '@heroicons/react/24/outline'
import { ReactNode } from 'react'

export interface TagProps {
    onRemove: (tag: string) => void
    tag: string
}

export const RemovableTag = ({ onRemove, tag }: TagProps) => {
    return (
        <Tag>
            {tag}
            <XMarkIcon
                className="w-5 h-5 hover:text-gray-500 ml-1"
                onClick={() => onRemove(tag)}
            />
        </Tag>
    )
}

export const ReadOnlyTag = ({ tag }: { tag: string }) => <Tag>{tag}</Tag>

const Tag = ({ children }: { children: ReactNode | ReactNode[] }) => {
    return (
        <div className="flex flex-row items-center p-1 px-2 text-sm w-min h-min bg-indigo-400 rounded-full border-indigo-500 border border-solid text-gray-50">
            {children}
        </div>
    )
}
