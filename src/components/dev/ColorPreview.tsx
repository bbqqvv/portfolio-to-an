'use client'

import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'

/**
 * Component để preview color palette
 * Chỉ dùng cho development - không deploy lên production
 */
export function ColorPreview() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const colors = {
    light: {
      backgrounds: [
        { name: 'Primary', value: 'rgb(254, 252, 248)', class: 'bg-[#FEFCF8]' },
        { name: 'Secondary', value: 'rgb(255, 251, 243)', class: 'bg-[#FFFBF3]' },
        { name: 'Card', value: 'rgb(255, 255, 255)', class: 'bg-white' },
      ],
      texts: [
        { name: 'Primary', value: 'rgb(30, 30, 35)', class: 'text-[#1E1E23]' },
        { name: 'Secondary', value: 'rgb(75, 75, 85)', class: 'text-[#4B4B55]' },
        { name: 'Muted', value: 'rgb(115, 115, 125)', class: 'text-[#73737D]' },
      ],
      accents: [
        { name: 'Orange', value: 'rgb(230, 126, 34)', class: 'bg-[#E67E22]' },
        { name: 'Light Orange', value: 'rgb(255, 159, 67)', class: 'bg-[#FF9F43]' },
      ]
    },
    dark: {
      backgrounds: [
        { name: 'Primary', value: 'rgb(15, 20, 28)', class: 'bg-[#0F141C]' },
        { name: 'Secondary', value: 'rgb(22, 30, 42)', class: 'bg-[#161E2A]' },
        { name: 'Card', value: 'rgb(26, 35, 50)', class: 'bg-[#1A2332]' },
      ],
      texts: [
        { name: 'Primary', value: 'rgb(240, 245, 255)', class: 'text-[#F0F5FF]' },
        { name: 'Secondary', value: 'rgb(185, 195, 210)', class: 'text-[#B9C3D2]' },
        { name: 'Muted', value: 'rgb(135, 145, 165)', class: 'text-[#8791A5]' },
      ],
      accents: [
        { name: 'Warm Amber', value: 'rgb(255, 171, 64)', class: 'bg-[#FFAB40]' },
        { name: 'Light Amber', value: 'rgb(255, 197, 112)', class: 'bg-[#FFC570]' },
      ]
    }
  }

  const currentColors = theme === 'dark' ? colors.dark : colors.light

  return (
    <div className="fixed bottom-4 right-4 z-50 p-6 bg-white dark:bg-[#0F141C] rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700 max-w-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Color Preview
        </h3>
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="px-3 py-1 text-sm bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
        >
          Toggle Theme
        </button>
      </div>

      {/* Current Theme Badge */}
      <div className="mb-4">
        <span className="inline-block px-3 py-1 text-xs font-semibold bg-pink-100 dark:bg-slate-700 text-pink-600 dark:text-pink-400 rounded-full">
          {theme === 'dark' ? '🌙 Dark - Graphite Blue' : '🌞 Light - Soft Warm'}
        </span>
      </div>

      {/* Background Colors */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
          Backgrounds
        </h4>
        <div className="space-y-2">
          {currentColors.backgrounds.map((color) => (
            <div key={color.name} className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-lg border border-gray-300 dark:border-slate-600 ${color.class}`} />
              <div>
                <div className="text-xs font-medium text-gray-900 dark:text-white">
                  {color.name}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {color.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Text Colors */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
          Text Colors
        </h4>
        <div className="space-y-2">
          {currentColors.texts.map((color) => (
            <div key={color.name} className={`${color.class} text-sm font-medium`}>
              {color.name}: {color.value}
            </div>
          ))}
        </div>
      </div>

      {/* Accent Colors */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
          Accent Colors
        </h4>
        <div className="flex gap-2">
          {currentColors.accents.map((color) => (
            <div key={color.name} className="flex-1">
              <div className={`w-full h-16 rounded-lg ${color.class} flex items-center justify-center`}>
                <span className="text-white text-xs font-semibold">
                  {color.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gradient Preview */}
      <div>
        <h4 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
          Gradient
        </h4>
        <div className="h-16 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
          <span className="text-white font-semibold">
            Orange → Amber
          </span>
        </div>
      </div>

      {/* Close button */}
      <button
        onClick={() => {
          const preview = document.getElementById('color-preview')
          if (preview) preview.style.display = 'none'
        }}
        className="mt-4 w-full py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
      >
        Close Preview
      </button>
    </div>
  )
}
