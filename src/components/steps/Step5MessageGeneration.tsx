import { useState, useEffect } from 'react'
import { useCampaign } from '@/contexts/CampaignContext'
import { mockMessages } from '@/lib/mockData'
import type { Message } from '@/lib/mockData'
import { Sparkles, Check, Edit2, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

interface Step5MessageGenerationProps {
  onNext: () => void
  onBack: () => void
}

export function Step5MessageGeneration({ onNext, onBack }: Step5MessageGenerationProps) {
  const { state, updateState } = useCampaign()
  const [isGenerating, setIsGenerating] = useState(!state.generatedMessages || state.generatedMessages.length === 0)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(state.selectedMessage || null)
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null)
  const [editedMessageContent, setEditedMessageContent] = useState('')
  const [showCustomForm, setShowCustomForm] = useState(false)
  const [customMessage, setCustomMessage] = useState('')

  // Simulate AI message generation
  useEffect(() => {
    if (isGenerating) {
    const timer = setTimeout(() => {
      const generatedMessages = [
          mockMessages.casual[0],
          mockMessages.professional[0],
          mockMessages['value-first'][0],
        ].filter(Boolean)
      updateState({ generatedMessages })
      setIsGenerating(false)
    }, 2000)

    return () => clearTimeout(timer)
    }
  }, [isGenerating, updateState])

  const allMessages = (state.generatedMessages || []).slice(0, 3)

  const handleUseMessage = (message: Message) => {
    setSelectedMessage(message)
    setShowCustomForm(false)
    setEditingMessageId(null)
    updateState({ selectedMessage: message })
  }

  const handleEditMessage = (message: Message) => {
    setEditingMessageId(message.id)
    setEditedMessageContent(message.content)
    setShowCustomForm(false)
  }

  const handleSaveEdit = () => {
    if (editingMessageId && editedMessageContent.trim()) {
      const updatedMessage: Message = {
        id: editingMessageId,
        tone: allMessages.find(m => m.id === editingMessageId)?.tone || 'casual',
        content: editedMessageContent,
      }
      setSelectedMessage(updatedMessage)
      setEditingMessageId(null)
      setEditedMessageContent('')
      updateState({ selectedMessage: updatedMessage })
    }
  }

  const handleCancelEdit = () => {
    setEditingMessageId(null)
    setEditedMessageContent('')
  }

  const handleUseCustom = () => {
    if (customMessage.trim()) {
      const customMessageObj: Message = {
        id: 'custom',
        tone: 'casual',
        content: customMessage,
      }
      setSelectedMessage(customMessageObj)
      updateState({ selectedMessage: customMessageObj })
      setShowCustomForm(false)
    }
  }

  const handleNext = () => {
    if (selectedMessage) {
      onNext()
    }
  }

  const getToneLabel = (tone: string) => {
    switch (tone) {
      case 'casual': return 'Casual & Conversational 💬'
      case 'professional': return 'Professional & Consultative 🤝'
      case 'value-first': return 'Direct & Value-First 🎯'
      default: return tone
    }
  }

  if (isGenerating) {
  return (
    <Card className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-2 text-[var(--text)] tracking-tight flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-[var(--color-accent)]" />
        Generating personalized messages
      </h2>
        <p className="text-[var(--subtle)] mb-6 font-medium">
          AI is crafting multiple message variations for your sample prospects...
      </p>

        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-pulse">
              <Sparkles className="w-16 h-16 text-[var(--color-accent)] mx-auto mb-4" />
            </div>
            <p className="text-lg font-semibold mb-2 text-[var(--text)]">Generating messages...</p>
            <p className="text-sm text-[var(--subtle)]">
              This may take a few moments
            </p>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-2 text-[var(--text)] tracking-tight">Choose or create your message</h2>
      <p className="text-[var(--subtle)] mb-8 font-medium">
        Select a generated message, edit one, or create your own from scratch.
      </p>

      {/* Generated Messages */}
      {allMessages.length > 0 && (
        <div className="space-y-4 mb-8">
          <h3 className="text-lg font-semibold text-[var(--text)] mb-4">Generated Messages</h3>
          <div className="grid grid-cols-1 gap-4">
            {allMessages.map((message) => {
              const isSelected = selectedMessage?.id === message.id && !editingMessageId
              const isEditing = editingMessageId === message.id

              if (isEditing) {
                return (
                  <Card key={message.id} className="p-5 bg-[var(--color-accent-light)] border-0">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium text-[var(--subtle)]">{getToneLabel(message.tone)}</span>
                      </div>
                      <textarea
                        value={editedMessageContent}
                        onChange={(e) => setEditedMessageContent(e.target.value)}
                        rows={6}
                        className="w-full px-4 py-3 rounded-[var(--radius-ctl)] bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] placeholder-[var(--subtle)] focus:outline-none focus:ring-4 focus:ring-[var(--color-accent-light)] transition-premium resize-none"
                      />
                      <div className="flex gap-2">
                        <Button onClick={handleSaveEdit} className="flex-1 text-sm py-2" disabled={!editedMessageContent.trim()}>
                          Save Changes
                        </Button>
                        <Button variant="secondary" onClick={handleCancelEdit} className="flex-1 text-sm py-2">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </Card>
                )
              }

              return (
                <Card
                  key={message.id}
                  className={cn(
                    'p-5 transition-premium border-0',
                    isSelected
                      ? 'bg-[var(--color-accent-light)] shadow-[var(--shadow-card-hover)]'
                      : 'bg-[var(--muted)] hover:bg-[var(--muted)]/80 hover:shadow-[var(--shadow-card)]'
                  )}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <span className="text-sm font-medium text-[var(--subtle)]">{getToneLabel(message.tone)}</span>
                    {isSelected && (
                      <span className="px-3 py-1 text-xs font-semibold bg-[var(--color-accent)] text-white rounded-full flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        Selected
                      </span>
                    )}
                  </div>
                  <div className="mb-4">
                    <p className="text-sm text-[var(--text)] whitespace-pre-line bg-[var(--muted)] p-4 rounded-[var(--radius-sm)]">
                      {message.content}
                    </p>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <Button
                      variant={isSelected ? 'primary' : 'secondary'}
                      onClick={() => handleUseMessage(message)}
                      className="text-sm py-2"
                    >
                      {isSelected ? 'Selected' : 'Use This'}
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => handleEditMessage(message)}
                      className="text-sm py-2"
                    >
                      <Edit2 className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {/* Create from Scratch */}
      {!showCustomForm ? (
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => {
              setShowCustomForm(true)
              setEditingMessageId(null)
            }}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create from Scratch
          </Button>
        </div>
      ) : (
        <Card className="p-6 mb-6 bg-[var(--color-accent-light)] border-0">
          <h3 className="text-lg font-semibold mb-4 text-[var(--text)]">Create Custom Message</h3>
          <div className="space-y-4">
            <textarea
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder="Write your custom message here..."
              rows={6}
              className="w-full px-4 py-3 rounded-[var(--radius-ctl)] bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] placeholder-[var(--subtle)] focus:outline-none focus:ring-4 focus:ring-[var(--color-accent-light)] transition-premium resize-none"
            />
            <div className="flex gap-3">
              <Button
                onClick={handleUseCustom}
                disabled={!customMessage.trim()}
                className="flex-1"
              >
                Use This Message
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setShowCustomForm(false)
                  setCustomMessage('')
                }}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="flex gap-3">
        <Button variant="secondary" onClick={onBack} className="flex-1">Back</Button>
        <Button onClick={handleNext} disabled={!selectedMessage} className="flex-1">Continue</Button>
      </div>
    </Card>
  )
}
