import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { api } from '../services/api'

function Backdrop({ children, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur px-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm sm:max-w-lg rounded-2xl border border-slate-800 bg-slate-950/90 p-4 sm:p-6 text-slate-50 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </motion.div>
  )
}

function CreateReelModal({ open, onClose, onSuccess }) {
  const { token } = useAuth()
  const [igUrl, setIgUrl] = useState('')
  const [caption, setCaption] = useState('')
  const [hashtags, setHashtags] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const validateUrl = (url) => {
    try {
      const u = new URL(url)
      return u.hostname === 'www.instagram.com' || u.hostname === 'instagram.com'
    } catch {
      return false
    }
  }

  const handleSubmit = async () => {
    setError('')
    if (!igUrl) {
      setError('Please provide an Instagram URL.')
      return
    }
    if (!validateUrl(igUrl)) {
      setError('Please provide a valid Instagram URL.')
      return
    }
    setLoading(true)
    try {
      const tags = hashtags.split(/[#\s]+/).filter(Boolean)
      const response = await api.post('/reels', {
        igUrl,
        caption,
        hashtags: tags,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setLoading(false)
      onSuccess && onSuccess(response.data)
      onClose()
      setIgUrl('')
      setCaption('')
      setHashtags('')
    } catch (err) {
      setError(err.response?.data?.message || err.message)
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <Backdrop onClose={onClose}>
          <div className="space-y-4">
            <header className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold tracking-tight text-indigo-400">Create Instagram Reel</h2>
                <p className="mt-1 text-xs text-slate-400">Paste an Instagram Reel URL to share on your feed!</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full bg-slate-800 px-2 py-1 text-xs text-slate-300 hover:bg-slate-700"
              >
                Close
              </button>
            </header>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Instagram Reel URL
                </label>
                <input
                  type="url"
                  value={igUrl}
                  onChange={(e) => setIgUrl(e.target.value)}
                  placeholder="https://www.instagram.com/reel/..."
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Caption (optional)
                </label>
                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Add a caption..."
                  rows={3}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Hashtags (optional)
                </label>
                <input
                  type="text"
                  value={hashtags}
                  onChange={(e) => setHashtags(e.target.value)}
                  placeholder="#reel #instagram"
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              {error && (
                <p className="text-sm text-red-400">{error}</p>
              )}

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Reel'}
              </button>
            </div>
          </div>
        </Backdrop>
      )}
    </AnimatePresence>
  )
}

export default CreateReelModal