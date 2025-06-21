import { useState, useEffect } from 'react'
import { Router, Route, Link, useLocation } from 'wouter'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Checkbox } from '@/components/ui/checkbox.jsx'
import { Star, Search, BookOpen, CheckCircle, ArrowRight, ArrowLeft, Menu, X } from 'lucide-react'
import lessonsData from './assets/lessons.json'
import './App.css'

function App() {
  const [lessons] = useState(lessonsData)
  const [progress, setProgress] = useState({})
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStarRating, setSelectedStarRating] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('repeatmd-progress')
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress))
    }
  }, [])

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('repeatmd-progress', JSON.stringify(progress))
  }, [progress])

  const updateLessonProgress = (lessonId, completed) => {
    setProgress(prev => ({
      ...prev,
      [lessonId]: { ...prev[lessonId], completed }
    }))
  }

  const updateChecklistProgress = (lessonId, checklistIndex, checked) => {
    setProgress(prev => ({
      ...prev,
      [lessonId]: {
        ...prev[lessonId],
        checklist: {
          ...prev[lessonId]?.checklist,
          [checklistIndex]: checked
        }
      }
    }))
  }

  const getOverallProgress = () => {
    const completedLessons = Object.values(progress).filter(p => p.completed).length
    return Math.round((completedLessons / lessons.length) * 100)
  }

  const getStarRatingProgress = (starRating) => {
    const starLessons = lessons.filter(l => l.star_rating === starRating)
    const completedStarLessons = starLessons.filter(l => progress[l.id]?.completed).length
    return Math.round((completedStarLessons / starLessons.length) * 100) || 0
  }

  const filteredLessons = lessons.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lesson.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStarRating = selectedStarRating ? lesson.star_rating === selectedStarRating : true
    return matchesSearch && matchesStarRating
  })

  const StarRating = ({ rating, size = 'sm' }) => {
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6'
    }
    
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map(star => (
          <Star
            key={star}
            className={`${sizeClasses[size]} ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }

  const Header = () => (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden mr-2"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            <Link href="/">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-8 h-8 text-blue-600" />
                <div>
                  <h1 className="text-xl font-bold text-gray-900">RepeatMD Academy</h1>
                  <p className="text-xs text-gray-500">Medical Spa Business Optimization</p>
                </div>
              </div>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2">
              <span className="text-sm text-gray-600">Overall Progress:</span>
              <Progress value={getOverallProgress()} className="w-24" />
              <span className="text-sm font-medium">{getOverallProgress()}%</span>
            </div>
            
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search lessons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  )

  const Sidebar = () => (
    <aside className={`
      fixed lg:static inset-y-0 left-0 z-40 w-64 bg-gray-50 border-r border-gray-200 transform transition-transform duration-300 ease-in-out
      ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    `}>
      <div className="p-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Lesson Categories</h3>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map(rating => {
              const count = lessons.filter(l => l.star_rating === rating).length
              const progress = getStarRatingProgress(rating)
              const labels = {
                5: 'NON-OPTIONAL',
                4: 'High Impact',
                3: 'Operational',
                2: 'Supporting',
                1: 'Nice-to-have'
              }
              
              return (
                <Button
                  key={rating}
                  variant={selectedStarRating === rating ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedStarRating(selectedStarRating === rating ? null : rating)}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-2">
                      <StarRating rating={rating} size="sm" />
                      <span className="text-sm">{labels[rating]}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">{count}</span>
                      <div className="w-8 h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-full bg-blue-600 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </Button>
              )
            })}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Insights</h3>
          <div className="space-y-3">
            <Card className="p-3">
              <p className="text-sm text-gray-700 italic">
                "Confused mind doesn't buy - simplify your offerings"
              </p>
            </Card>
            <Card className="p-3">
              <p className="text-sm text-gray-700 italic">
                "76% of patients become lifetime patients after 3rd visit"
              </p>
            </Card>
            <Card className="p-3">
              <p className="text-sm text-gray-700 italic">
                "Monthly recurring revenue creates 2-3x valuation multipliers"
              </p>
            </Card>
          </div>
        </div>
      </div>
    </aside>
  )

  const LessonList = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {selectedStarRating ? `${selectedStarRating}-Star Lessons` : 'All Lessons'}
          </h2>
          <p className="text-gray-600">
            {filteredLessons.length} lessons • {getOverallProgress()}% complete
          </p>
        </div>
        
        {selectedStarRating && (
          <Button variant="outline" onClick={() => setSelectedStarRating(null)}>
            Show All Lessons
          </Button>
        )}
      </div>

      <div className="grid gap-4">
        {filteredLessons.map((lesson, index) => {
          const isCompleted = progress[lesson.id]?.completed
          const checklistProgress = lesson.implementation_checklist.length > 0 
            ? Object.values(progress[lesson.id]?.checklist || {}).filter(Boolean).length / lesson.implementation_checklist.length * 100
            : 0

          return (
            <Card key={lesson.id} className={`transition-all duration-200 hover:shadow-md ${isCompleted ? 'bg-green-50 border-green-200' : ''}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <StarRating rating={lesson.star_rating} />
                      {isCompleted && <CheckCircle className="w-5 h-5 text-green-600" />}
                    </div>
                    <CardTitle className="text-lg">{lesson.title}</CardTitle>
                    {lesson.description && (
                      <CardDescription className="mt-1">{lesson.description}</CardDescription>
                    )}
                  </div>
                  <Link href={`/lesson/${lesson.id}`}>
                    <Button size="sm">
                      {isCompleted ? 'Review' : 'Start'}
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              
              {lesson.implementation_checklist.length > 0 && (
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Implementation Progress</span>
                    <span>{Math.round(checklistProgress)}%</span>
                  </div>
                  <Progress value={checklistProgress} className="mt-1" />
                </CardContent>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )

  const LessonDetail = ({ params }) => {
    const lesson = lessons.find(l => l.id === params.id)
    const currentIndex = lessons.findIndex(l => l.id === params.id)
    const previousLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null
    const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null
    
    if (!lesson) {
      return <div className="text-center py-8">Lesson not found</div>
    }

    const isCompleted = progress[lesson.id]?.completed
    const checklistProgress = progress[lesson.id]?.checklist || {}

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Lessons
            </Button>
          </Link>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={isCompleted}
              onCheckedChange={(checked) => updateLessonProgress(lesson.id, checked)}
            />
            <span className="text-sm">Mark as complete</span>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2 mb-2">
              <StarRating rating={lesson.star_rating} size="md" />
              <Badge variant={lesson.star_rating === 5 ? "destructive" : "secondary"}>
                {lesson.star_rating === 5 ? "NON-OPTIONAL" : `${lesson.star_rating}-Star`}
              </Badge>
            </div>
            <CardTitle className="text-2xl">{lesson.title}</CardTitle>
            {lesson.description && (
              <CardDescription className="text-base">{lesson.description}</CardDescription>
            )}
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="prose max-w-none">
              <div className="lesson-content">
                {lesson.content.split('\n').map((line, index) => {
                  // Handle headers
                  if (line.startsWith('# ')) {
                    return <h1 key={index} className="text-2xl font-bold text-gray-900 mt-6 mb-4">{line.substring(2)}</h1>
                  }
                  if (line.startsWith('## ')) {
                    return <h2 key={index} className="text-xl font-semibold text-gray-800 mt-5 mb-3">{line.substring(3)}</h2>
                  }
                  
                  // Handle bold text
                  if (line.includes('**')) {
                    const parts = line.split(/(\*\*[^*]+\*\*)/g)
                    return (
                      <p key={index} className="text-gray-700 leading-relaxed mb-3">
                        {parts.map((part, partIndex) => {
                          if (part.startsWith('**') && part.endsWith('**')) {
                            return <strong key={partIndex} className="font-semibold text-gray-900">{part.slice(2, -2)}</strong>
                          }
                          return part
                        })}
                      </p>
                    )
                  }
                  
                  // Handle quotes
                  if (line.startsWith('"') && line.endsWith('"')) {
                    return <blockquote key={index} className="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-4">{line}</blockquote>
                  }
                  
                  // Handle empty lines
                  if (line.trim() === '') {
                    return <div key={index} className="h-2"></div>
                  }
                  
                  // Regular paragraphs
                  return <p key={index} className="text-gray-700 leading-relaxed mb-3">{line}</p>
                })}
              </div>
            </div>

            {lesson.implementation_checklist.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Implementation Checklist</h3>
                <div className="space-y-3">
                  {lesson.implementation_checklist.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Checkbox
                        checked={checklistProgress[index] || false}
                        onCheckedChange={(checked) => updateChecklistProgress(lesson.id, index, checked)}
                        className="mt-1"
                      />
                      <span className={`text-sm ${checklistProgress[index] ? 'line-through text-gray-500' : ''}`}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {lesson.quick_insight && (
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <h4 className="font-medium text-blue-900 mb-2">💡 Quick Insight</h4>
                  <p className="text-blue-800 italic">{lesson.quick_insight}</p>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-between">
          {previousLesson ? (
            <Link href={`/lesson/${previousLesson.id}`}>
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Previous: {previousLesson.title.substring(0, 30)}...
              </Button>
            </Link>
          ) : <div />}
          
          {nextLesson ? (
            <Link href={`/lesson/${nextLesson.id}`}>
              <Button>
                Next: {nextLesson.title.substring(0, 30)}...
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          ) : <div />}
        </div>
      </div>
    )
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <div className="flex">
          <Sidebar />
          
          {/* Overlay for mobile */}
          {sidebarOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
          
          <main className="flex-1 p-6">
            <Route path="/" component={LessonList} />
            <Route path="/lesson/:id" component={LessonDetail} />
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App

