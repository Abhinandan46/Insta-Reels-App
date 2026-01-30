import { useCallback, useMemo, useState, useEffect } from 'react'
import ReelCard from '../components/ReelCard.jsx'
import CreateReelModal from '../components/CreateReelModal.jsx'
import { ReelService } from '../services/ReelService.js'
import { PostService } from '../services/PostService.js'

const API_ORIGIN = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : (import.meta.env.DEV ? "http://localhost:5000" : "")
const normalizeMediaUrl = (url) => {
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  if (url.startsWith('/uploads')) return `${API_ORIGIN}${url}`
  return url
}

const FALLBACK_REELS = []

function Reels() {
  const [reels, setReels] = useState([])
  const [activeId, setActiveId] = useState(null)
  const [muted, setMuted] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      try {
        // Fetch both Instagram reels and uploaded video posts
        const [reelsResponse, postsResponse] = await Promise.all([
          ReelService.list(),
          PostService.list()
        ])

        // Process Instagram reels
        const processedReels = (reelsResponse.data || []).map((p) => {
          const username = p.user?.username || p.username || 'user'
          const videoUrl = normalizeMediaUrl(p.mediaUrl || p.videoUrl)
          if (!videoUrl && !p.embedHtml) return null
          return {
            id: p._id || p.id,
            username,
            userInitials: username.slice(0, 2).toUpperCase(),
            caption: p.caption || p.title || '',
            hashtags: Array.isArray(p.hashtags) ? p.hashtags : [],
            likes: p.likes ?? 0,
            comments: p.commentsCount ?? 0,
            shares: p.shares ?? 0,
            timeAgo: p.createdAt ? new Date(p.createdAt).toLocaleDateString() : 'just now',
            audio: p.audio || 'Original audio',
            videoUrl,
            embedHtml: p.embedHtml,
            author: p.author,
            title: p.title,
            type: 'reel', // Mark as Instagram reel
            createdAt: p.createdAt,
          }
        }).filter(Boolean)

        // Process uploaded video posts
        const processedVideos = (postsResponse.data || [])
          .filter((p) => {
            const type = p.type || (/\.mp4|\.webm|\.mov|\.m4v/i.test(p.mediaUrl || '') ? 'video' : 'image')
            return type === 'video'
          })
          .map((p) => {
            const username = p.user?.username || p.username || 'user'
            const videoUrl = normalizeMediaUrl(p.mediaUrl || p.videoUrl)
            if (!videoUrl) return null
            return {
              id: p._id || p.id,
              username,
              userInitials: username.slice(0, 2).toUpperCase(),
              caption: p.caption || '',
              hashtags: Array.isArray(p.hashtags) ? p.hashtags : [],
              likes: p.likes ?? 0,
              comments: p.commentsCount ?? 0,
              shares: p.shares ?? 0,
              timeAgo: p.createdAt ? new Date(p.createdAt).toLocaleDateString() : 'just now',
              audio: p.audio || 'Original audio',
              videoUrl,
              embedHtml: null,
              author: null,
              title: null,
              type: 'video', // Mark as uploaded video
              createdAt: p.createdAt,
            }
          }).filter(Boolean)

        // Combine and sort by creation date (newest first)
        const allContent = [...processedReels, ...processedVideos]
          .sort((a, b) => {
            const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0)
            const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0)
            return dateB - dateA
          })

        const finalReels = allContent.length ? allContent : FALLBACK_REELS
        if (!cancelled) {
          setReels(finalReels)
          if (finalReels.length > 0) setActiveId(finalReels[0].id)
        }
      } catch (err) {
        console.error('Failed to fetch reels:', err)
        if (!cancelled) {
          setReels(FALLBACK_REELS)
          if (FALLBACK_REELS.length > 0) setActiveId(FALLBACK_REELS[0].id)
        }
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  const activeIndex = useMemo(
    () => (reels && activeId ? reels.findIndex((r) => r.id === activeId) : -1),
    [activeId, reels],
  )

  const handleVisible = useCallback((id) => {
    setActiveId(id)
  }, [])

  const toggleMute = () => setMuted((m) => !m)

  const handleCreateSuccess = useCallback(async (newReel) => {
    // Refetch all content to include the new reel
    try {
      const [reelsResponse, postsResponse] = await Promise.all([
        ReelService.list(),
        PostService.list()
      ])

      // Process Instagram reels
      const processedReels = (reelsResponse.data || []).map((p) => {
        const username = p.user?.username || p.username || 'user'
        const videoUrl = normalizeMediaUrl(p.mediaUrl || p.videoUrl)
        if (!videoUrl && !p.embedHtml) return null
        return {
          id: p._id || p.id,
          username,
          userInitials: username.slice(0, 2).toUpperCase(),
          caption: p.caption || p.title || '',
          hashtags: Array.isArray(p.hashtags) ? p.hashtags : [],
          likes: p.likes ?? 0,
          comments: p.commentsCount ?? 0,
          shares: p.shares ?? 0,
          timeAgo: p.createdAt ? new Date(p.createdAt).toLocaleDateString() : 'just now',
          audio: p.audio || 'Original audio',
          videoUrl,
          embedHtml: p.embedHtml,
          author: p.author,
          title: p.title,
          type: 'reel',
          createdAt: p.createdAt,
        }
      }).filter(Boolean)

      // Process uploaded video posts
      const processedVideos = (postsResponse.data || [])
        .filter((p) => {
          const type = p.type || (/\.mp4|\.webm|\.mov|\.m4v/i.test(p.mediaUrl || '') ? 'video' : 'image')
          return type === 'video'
        })
        .map((p) => {
          const username = p.user?.username || p.username || 'user'
          const videoUrl = normalizeMediaUrl(p.mediaUrl || p.videoUrl)
          if (!videoUrl) return null
          return {
            id: p._id || p.id,
            username,
            userInitials: username.slice(0, 2).toUpperCase(),
            caption: p.caption || '',
            hashtags: Array.isArray(p.hashtags) ? p.hashtags : [],
            likes: p.likes ?? 0,
            comments: p.commentsCount ?? 0,
            shares: p.shares ?? 0,
            timeAgo: p.createdAt ? new Date(p.createdAt).toLocaleDateString() : 'just now',
            audio: p.audio || 'Original audio',
            videoUrl,
            embedHtml: null,
            author: null,
            title: null,
            type: 'video',
            createdAt: p.createdAt,
          }
        }).filter(Boolean)

      // Combine and sort by creation date (newest first)
      const allContent = [...processedReels, ...processedVideos]
        .sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0)
          const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0)
          return dateB - dateA
        })

      const finalReels = allContent.length ? allContent : FALLBACK_REELS
      setReels(finalReels)
      if (finalReels.length > 0 && !activeId) setActiveId(finalReels[0].id)
    } catch (err) {
      console.error('Failed to refresh reels:', err)
    }
  }, [activeId])

  return (
    <div className="flex h-screen w-full snap-y snap-mandatory flex-col overflow-y-scroll bg-black text-slate-50 sm:h-screen sm:px-0 px-1">
      {/* Create Reel Button */}
      <div className="fixed top-4 right-4 z-50 sm:top-4 sm:right-4">
        <button
          onClick={() => setShowCreateModal(true)}
          className="rounded-full bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700 sm:px-4"
        >
          <span className="sm:hidden">+</span>
          <span className="hidden sm:inline">+ Instagram Reel</span>
        </button>
      </div>

      {reels && reels.length > 0 ? (
        reels.map((reel) => (
          <ReelCard
            key={reel.id}
            reel={reel}
            isActive={activeId === reel.id}
            onVisible={handleVisible}
            index={reels.findIndex((r) => r.id === reel.id)}
            total={reels.length}
            muted={muted}
            onToggleMute={toggleMute}
          />
        ))
      ) : (
        <div className="text-center py-10">No reels available.</div>
      )}

      <CreateReelModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={handleCreateSuccess}
      />
    </div>
  )
}

export default Reels
