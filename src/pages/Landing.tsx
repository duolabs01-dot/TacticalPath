import { Link } from "react-router-dom";

export function Landing() {
  return (
    <>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center text-white font-bold text-lg">♞</div>
              <span className="font-display text-2xl font-bold text-gray-800">TacticalPath</span>
            </div>

            <div className="hidden md:flex items-center space-x-1 bg-gray-100 rounded-full p-1">
              <a href="#product" className="nav-pill px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:text-primary-600">Product</a>
              <a href="#how-it-works" className="nav-pill px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:text-primary-600">How It Works</a>
              <a href="#classroom" className="nav-pill px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:text-primary-600">For Coaches</a>
              <a href="#prototype" className="nav-pill px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:text-primary-600">Demo</a>
            </div>

            <button className="hidden md:block px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-full transition-all shadow-lg shadow-primary-500/30 hover:shadow-primary-500/40">
              Request Pilot Access
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 floating-animation"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 floating-animation" style={{animationDelay: '2s'}}></div>

        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
                🎓 Built for Scholastic Chess Programs
              </div>

              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Where Chess Class 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-500">Comes Alive</span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                TacticalPath helps coaches turn game play into skill-building moments. Students play, learn from their mistakes, and master tactical themes—one safe, structured loop at a time.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold text-lg rounded-2xl transition-all shadow-xl shadow-primary-500/30 hover:shadow-primary-500/40 hover:scale-105">
                  Start Free Pilot →
                </button>
                <button className="px-8 py-4 bg-white hover:bg-gray-50 text-gray-700 font-bold text-lg rounded-2xl transition-all shadow-lg border-2 border-gray-200 hover:border-primary-300">
                  See How It Works
                </button>
              </div>

              <div className="flex items-center gap-6 pt-4 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-accent-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  No credit card required
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-accent-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  4-week free pilot
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-3xl card-shadow p-8 relative z-10">
                <div className="aspect-square bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="text-center space-y-4 p-8">
                    <div className="text-8xl">♟️</div>
                    <div className="font-display text-2xl font-bold text-gray-800">Classroom in Session</div>
                    <div className="text-gray-600">12 students actively playing</div>

                    <div className="grid grid-cols-3 gap-3 mt-6">
                      <div className="bg-white rounded-xl p-3 shadow-sm">
                        <div className="text-2xl font-bold text-primary-600">8</div>
                        <div className="text-xs text-gray-500">Games Live</div>
                      </div>
                      <div className="bg-white rounded-xl p-3 shadow-sm">
                        <div className="text-2xl font-bold text-accent-500">24</div>
                        <div className="text-xs text-gray-500">Drills Done</div>
                      </div>
                      <div className="bg-white rounded-xl p-3 shadow-sm">
                        <div className="text-2xl font-bold text-warm-500">4</div>
                        <div className="text-xs text-gray-500">Waiting</div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-4 right-4 w-3 h-3 bg-accent-500 rounded-full pulse-soft"></div>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 w-full h-full bg-primary-200 rounded-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Positioning Section */}
      <section id="product" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Not Another Chess App
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              TacticalPath is a <strong>scholastic classroom platform</strong>—built specifically for school chess clubs, after-school programs, and coaching classrooms.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
              <div className="text-3xl mb-3">❌</div>
              <h3 className="font-bold text-lg text-red-800 mb-2">Not a Consumer App</h3>
              <p className="text-red-700 text-sm">No solo rating grinding. No subscription pressure. No adult competitive framing.</p>
            </div>

            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
              <div className="text-3xl mb-3">❌</div>
              <h3 className="font-bold text-lg text-red-800 mb-2">Not a Coach Marketplace</h3>
              <p className="text-red-700 text-sm">No booking systems. No public directories. You bring your own coach.</p>
            </div>

            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
              <div className="text-3xl mb-3">❌</div>
              <h3 className="font-bold text-lg text-red-800 mb-2">Not Raw Engine Output</h3>
              <p className="text-red-700 text-sm">No dense Stockfish lines. No confusing notation dumps. Kid-friendly explanations only.</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-3xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center px-3 py-1 bg-accent-200 text-accent-800 rounded-full text-xs font-bold mb-4">
                  ✓ WHAT IT IS
                </div>
                <h3 className="font-display text-3xl font-bold text-gray-900 mb-4">
                  A Complete Classroom Loop
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-accent-500 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-sm font-bold">✓</div>
                    <div><strong>Students play live games</strong> against classmates or bots</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-accent-500 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-sm font-bold">✓</div>
                    <div><strong>System finds the single most teachable turning point</strong> per game</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-accent-500 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-sm font-bold">✓</div>
                    <div><strong>Student completes 3 targeted drills</strong> from a verified puzzle library</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-accent-500 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-sm font-bold">✓</div>
                    <div><strong>Student gains theme mastery progress</strong> and returns to waiting room</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-accent-500 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-sm font-bold">✓</div>
                    <div><strong>Coach gets actionable blindspot heatmap</strong> for next week's lesson</div>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-6 card-shadow">
                <div className="text-center mb-4">
                  <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Core Loop</div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 bg-primary-50 rounded-xl p-3">
                    <div className="w-8 h-8 bg-primary-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">1</div>
                    <div className="text-sm font-medium text-gray-800">Play Game</div>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-0.5 h-6 bg-primary-300"></div>
                  </div>
                  <div className="flex items-center gap-3 bg-primary-50 rounded-xl p-3">
                    <div className="w-8 h-8 bg-primary-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">2</div>
                    <div className="text-sm font-medium text-gray-800">Find Turning Point</div>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-0.5 h-6 bg-primary-300"></div>
                  </div>
                  <div className="flex items-center gap-3 bg-accent-50 rounded-xl p-3">
                    <div className="w-8 h-8 bg-accent-500 text-white rounded-lg flex items-center justify-center font-bold text-sm">3</div>
                    <div className="text-sm font-medium text-gray-800">Complete 3 Drills</div>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-0.5 h-6 bg-accent-300"></div>
                  </div>
                  <div className="flex items-center gap-3 bg-accent-50 rounded-xl p-3">
                    <div className="w-8 h-8 bg-accent-500 text-white rounded-lg flex items-center justify-center font-bold text-sm">4</div>
                    <div className="text-sm font-medium text-gray-800">Mastery Progress</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              A Typical 45-Minute Club Session
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From login to mastery—here's how TacticalPath structures your chess club time.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 card-shadow card-hover">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center text-2xl font-bold mb-4">0:05</div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Students Arrive</h3>
              <p className="text-gray-600 text-sm">Kids log in with visual password cards. They land in the Mastery Map waiting room.</p>
            </div>

            <div className="bg-white rounded-2xl p-6 card-shadow card-hover">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center text-2xl font-bold mb-4">0:10</div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Coach Reviews Heatmap</h3>
              <p className="text-gray-600 text-sm">See what themes your class missed last week. Teach a quick mini-lesson.</p>
            </div>

            <div className="bg-white rounded-2xl p-6 card-shadow card-hover">
              <div className="w-12 h-12 bg-accent-100 text-accent-600 rounded-xl flex items-center justify-center text-2xl font-bold mb-4">0:35</div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Live Play + Drills</h3>
              <p className="text-gray-600 text-sm">Auto-pair students. When games end, kids get one lesson + 3 drills automatically.</p>
            </div>

            <div className="bg-white rounded-2xl p-6 card-shadow card-hover">
              <div className="w-12 h-12 bg-warm-100 text-warm-600 rounded-xl flex items-center justify-center text-2xl font-bold mb-4">0:45</div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Wrap-Up & Celebrate</h3>
              <p className="text-gray-600 text-sm">Pause play. Review progress together. Give shoutouts. Session ends clean.</p>
            </div>
          </div>
        </div>
      </section>

      {/* For Coaches Section */}
      <section id="classroom" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-bold mb-4">
                🎯 FOR COACHES & CLUBS
              </div>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                Your Classroom Command Center
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Everything you need to run a smooth, engaging chess program—with none of the administrative headache.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4 bg-gray-50 rounded-xl p-4">
                  <div className="w-10 h-10 bg-primary-600 text-white rounded-lg flex items-center justify-center flex-shrink-0">👥</div>
                  <div>
                    <h4 className="font-bold text-gray-900">Classroom Roster Management</h4>
                    <p className="text-sm text-gray-600">Bulk import students. Generate printable login cards with picture passwords.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-gray-50 rounded-xl p-4">
                  <div className="w-10 h-10 bg-primary-600 text-white rounded-lg flex items-center justify-center flex-shrink-0">⚡</div>
                  <div>
                    <h4 className="font-bold text-gray-900">One-Tap Auto-Pairing</h4>
                    <p className="text-sm text-gray-600">Pair the whole class instantly. Or manually match students. Your call.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-gray-50 rounded-xl p-4">
                  <div className="w-10 h-10 bg-accent-500 text-white rounded-lg flex items-center justify-center flex-shrink-0">🗺️</div>
                  <div>
                    <h4 className="font-bold text-gray-900">Blindspot Heatmap</h4>
                    <p className="text-sm text-gray-600">See exactly which tactical themes your whole class is struggling with.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-gray-50 rounded-xl p-4">
                  <div className="w-10 h-10 bg-accent-500 text-white rounded-lg flex items-center justify-center flex-shrink-0">📊</div>
                  <div>
                    <h4 className="font-bold text-gray-900">Weekly Progress Reports</h4>
                    <p className="text-sm text-gray-600">Export parent-ready PDFs showing theme mastery growth—not just wins/losses.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-gray-50 to-primary-50 rounded-3xl p-8 card-shadow">
                <div className="bg-white rounded-2xl p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-gray-900">Classroom Blindspot Heatmap</h4>
                    <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full font-semibold">This Week</span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700">Back-Rank Mates</span>
                        <span className="font-bold text-red-600">70% missed</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-red-500 h-3 rounded-full" style={{width: '70%'}}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700">Hanging Pieces</span>
                        <span className="font-bold text-orange-600">55% missed</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-orange-500 h-3 rounded-full" style={{width: '55%'}}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700">Basic Forks</span>
                        <span className="font-bold text-yellow-600">40% missed</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-yellow-500 h-3 rounded-full" style={{width: '40%'}}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700">Basic Pins</span>
                        <span className="font-bold text-green-600">25% missed</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-green-500 h-3 rounded-full" style={{width: '25%'}}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700">Missed Captures</span>
                        <span className="font-bold text-green-600">20% missed</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-green-500 h-3 rounded-full" style={{width: '20%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-accent-50 border-2 border-accent-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">💡</div>
                    <div>
                      <div className="font-bold text-accent-800 text-sm">Coach Recommendation</div>
                      <div className="text-accent-700 text-sm mt-1">Teach back-rank mate patterns tomorrow. 70% of your students missed it this week.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Students Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              The Student Experience
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Safe. Structured. Skill-building. No harsh ratings. No confusing jargon.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-3xl overflow-hidden card-shadow">
              <div className="bg-gradient-to-br from-primary-500 to-primary-700 p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="font-bold text-lg">Mastery Map</div>
                  <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">Chloe's Progress</div>
                </div>
                <div className="text-3xl font-display font-bold mb-2">Welcome back, Chloe! 👋</div>
                <div className="text-primary-100">Chess Club • Mrs. Johnson's 6th Grade</div>
              </div>

              <div className="p-6 space-y-4">
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">⏳</span>
                    <span className="font-bold text-yellow-800">Waiting for next round...</span>
                  </div>
                  <button className="w-full mt-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-4 rounded-xl transition-all">
                    Play a Bot While You Wait →
                  </button>
                </div>

                <div>
                  <div className="font-semibold text-gray-700 mb-3">Your Theme Mastery</div>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="flex items-center gap-2">
                          <span>♞</span> Forks
                        </span>
                        <span className="font-bold text-primary-600">Level 3</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="mastery-bar bg-primary-500 h-2.5 rounded-full" style={{width: '60%'}}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="flex items-center gap-2">
                          <span>♖</span> Pins
                        </span>
                        <span className="font-bold text-primary-600">Level 2</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="mastery-bar bg-primary-500 h-2.5 rounded-full" style={{width: '40%'}}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="flex items-center gap-2">
                          <span>♛</span> Checkmates
                        </span>
                        <span className="font-bold text-accent-600">Level 4</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="mastery-bar bg-accent-500 h-2.5 rounded-full" style={{width: '80%'}}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="flex items-center gap-2">
                          <span>⚠️</span> Hanging Pieces
                        </span>
                        <span className="font-bold text-orange-600">Level 1</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="mastery-bar bg-orange-500 h-2.5 rounded-full" style={{width: '20%'}}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="flex items-center gap-2">
                          <span>💎</span> Captures
                        </span>
                        <span className="font-bold text-accent-600">Level 3</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="mastery-bar bg-accent-500 h-2.5 rounded-full" style={{width: '65%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 card-shadow">
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="font-bold text-xl text-gray-900 mb-2">One Lesson Per Game</h3>
                <p className="text-gray-600">After every game, we show ONE teachable moment with simple arrows and one sentence. Not overwhelming engine dumps.</p>
              </div>

              <div className="bg-white rounded-2xl p-6 card-shadow">
                <div className="text-4xl mb-3">🧩</div>
                <h3 className="font-bold text-xl text-gray-900 mb-2">3 Targeted Drills</h3>
                <p className="text-gray-600">Immediately practice the theme from that mistake. Reinforce learning while it's fresh.</p>
              </div>

              <div className="bg-white rounded-2xl p-6 card-shadow">
                <div className="text-4xl mb-3">📈</div>
                <h3 className="font-bold text-xl text-gray-900 mb-2">Growth Mindset Metrics</h3>
                <p className="text-gray-600">Track theme mastery levels, not harsh Elo ratings. Personal bests, not public leaderboards.</p>
              </div>

              <div className="bg-white rounded-2xl p-6 card-shadow">
                <div className="text-4xl mb-3">🛡️</div>
                <h3 className="font-bold text-xl text-gray-900 mb-2">Safe Environment</h3>
                <p className="text-gray-600">No public chat. No stranger matchmaking. Only classmates and coach-assigned bots.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pilot Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-accent-100 text-accent-700 rounded-full text-sm font-bold mb-4">
              🎓 PILOT PROGRAM
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Start Your Free Pilot Today
            </h2>
            <p className="text-xl text-gray-600">
              No commitment. No credit card. Just a complete classroom experience for 4 weeks.
            </p>
          </div>

          <div className="bg-gradient-to-br from-primary-50 via-white to-accent-50 rounded-3xl p-8 md:p-12 card-shadow border-2 border-primary-200">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="text-5xl font-display font-bold text-primary-600 mb-2">FREE</div>
                <div className="text-xl text-gray-600 mb-6">4-Week Pilot Program</div>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-accent-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                    <span className="text-gray-700">Up to 30 active students</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-accent-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                    <span className="text-gray-700">All 5 launch puzzle themes</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-accent-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                    <span className="text-gray-700">Live classroom play mode</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-accent-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                    <span className="text-gray-700">Coach heatmap & reports</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-accent-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                    <span className="text-gray-700">White-glove onboarding support</span>
                  </li>
                </ul>

                <button className="w-full px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold text-lg rounded-2xl transition-all shadow-xl shadow-primary-500/30 hover:scale-105">
                  Apply for Free Pilot →
                </button>
              </div>

              <div className="bg-white rounded-2xl p-6 card-shadow">
                <div className="text-center mb-6">
                  <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Post-Pilot Option</div>
                  <div className="text-3xl font-display font-bold text-gray-900 mt-2">$99<span className="text-lg text-gray-500 font-normal">/month</span></div>
                  <div className="text-sm text-gray-500">or $400/semester</div>
                </div>

                <div className="border-t pt-4">
                  <div className="text-sm text-gray-600 space-y-2">
                    <p>✓ Same flat rate, up to 30 students</p>
                    <p>✓ No per-seat pricing complexity</p>
                    <p>✓ Easy budget approval for PTAs & clubs</p>
                    <p>✓ Cancel anytime</p>
                  </div>
                </div>

                <div className="mt-6 bg-gray-50 rounded-xl p-4">
                  <div className="text-xs text-gray-500 text-center">
                    <strong>Note:</strong> We don't do subscriptions in v1. After your free pilot, it's a simple classroom license. No tricks.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prototype Demo Section */}
      <section id="prototype" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-warm-100 text-warm-700 rounded-full text-sm font-bold mb-4">
              🔬 PROTOTYPE DEMO
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Try the Working Prototype
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We've built early interactive pieces. These are <strong>mocked demos</strong>—not the full classroom product—but they show where we're headed.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl overflow-hidden card-shadow card-hover">
              <div className="bg-gradient-to-br from-primary-500 to-primary-700 p-6 text-white">
                <div className="text-3xl mb-2">🧩</div>
                <h3 className="font-bold text-xl">Puzzle Play Demo</h3>
                <p className="text-primary-100 text-sm mt-1">One working tactical puzzle</p>
              </div>
              <div className="p-6">
                <p className="text-gray-600 text-sm mb-4">
                  Try our mate-in-1 puzzle with real move validation. This is a single hardcoded example—our full library will have 750 verified puzzles across 5 themes.
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                  <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-semibold">PROTOTYPE ONLY</span>
                  <span>• Local-only • One puzzle</span>
                </div>
                <Link to="/puzzle-play" className="w-full px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-all">
                  Try Puzzle Demo →
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden card-shadow card-hover">
              <div className="bg-gradient-to-br from-accent-500 to-accent-700 p-6 text-white">
                <div className="text-3xl mb-2">♟️</div>
                <h3 className="font-bold text-xl">Game Replay Demo</h3>
                <p className="text-accent-100 text-sm mt-1">Step through a sample game</p>
              </div>
              <div className="p-6">
                <p className="text-gray-600 text-sm mb-4">
                  Watch a hardcoded Italian Game replay with move-by-move stepping. Future version will analyze real student games and find turning points.
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                  <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-semibold">PROTOTYPE ONLY</span>
                  <span>• Hardcoded PGN • No analysis</span>
                </div>
                <Link to="/game-analysis" className="w-full px-6 py-3 bg-accent-600 hover:bg-accent-700 text-white font-bold rounded-xl transition-all">
                  View Game Replay →
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6 max-w-4xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="text-3xl">⚠️</div>
              <div>
                <h4 className="font-bold text-yellow-800 mb-2">What's Not Built Yet</h4>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• No real backend, auth, or multiplayer</li>
                  <li>• No actual turning-point detection or drill assignment</li>
                  <li>• No coach dashboard or classroom orchestration</li>
                  <li>• No real puzzle library (just this one demo)</li>
                  <li>• No student accounts or roster management</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 hero-gradient text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-6">
            Ready to Transform Your Chess Club?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join our pilot program. Get white-glove onboarding. See your students build real tactical skills.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-primary-700 font-bold text-lg rounded-2xl hover:bg-gray-100 transition-all shadow-xl hover:scale-105">
              Apply for Free Pilot →
            </button>
            <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-lg rounded-2xl transition-all border-2 border-white/30">
              Schedule a Demo Call
            </button>
          </div>
          <div className="mt-8 text-blue-200 text-sm">
            <p>📧 hello@tacticalpath.app • 📍 Built for schools, clubs, and scholastic programs</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">For Coaches</a></li>
                <li><a href="#" className="hover:text-white transition-colors">For Schools</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pilot Program</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Curriculum Themes</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Research Basis</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Connect</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Newsletter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
            <p>© 2026 TacticalPath. Built for scholastic chess programs. Not a consumer app.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
